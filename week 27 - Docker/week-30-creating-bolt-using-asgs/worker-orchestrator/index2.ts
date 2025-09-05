import { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingInstancesCommand, TerminateInstanceInAutoScalingGroupCommand } from "@aws-sdk/client-auto-scaling";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import config from "./config";
import express from "express";
import type { Machine } from "./types";

const app = express();

// --------------------------------------> AWS -------------------------------------->
const client = new AutoScalingClient({ region: config.aws.region, credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
} });

const ec2Client = new EC2Client({ region: config.aws.region, credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
} });

/*
    TODO: DO NOT STORE IN LOCAL STORAGE, USE A DATABASE INSTEAD LIKE REDIS OR POSTGRES, so even if worker orchestrator restarts, the data is not lost and should be persisted.
    Machines array in local storage 
*/
const ALL_MACHINES: Machine[] = [];

// --------------------------------------> REFRESH INSTANCES -------------------------------------->    
async function refreshInstances() {
    try {
        // Clear existing machines
        ALL_MACHINES.length = 0;
        
        // Get Auto Scaling instances
        const command = new DescribeAutoScalingInstancesCommand();
        const data = await client.send(command);
        
        if (data.AutoScalingInstances && data.AutoScalingInstances.length > 0) {
            // Get instance IDs for EC2 details
            const instanceIds = data.AutoScalingInstances.map(x => x.InstanceId!).filter(Boolean);
            
            if (instanceIds.length > 0) {
                const ec2InstanceCommand = new DescribeInstancesCommand({
                    InstanceIds: instanceIds
                });
                
                const ec2Response = await ec2Client.send(ec2InstanceCommand);
                
                // Extract instances from reservations and flatten the array
                const instances = ec2Response.Reservations?.flatMap(reservation => 
                    reservation.Instances?.filter(instance => 
                        instance.PublicDnsName && instance.State?.Name === 'running'
                    ) || []
                ) || [];
                
                // Map instances to Machine objects
                const machines = instances.map(instance => ({
                    ip: instance.PublicDnsName!,
                    isUsed: false,
                    assignedProject: undefined,
                }));
                
                ALL_MACHINES.push(...machines);
            }
        }
        
        console.log(`Refreshed ${ALL_MACHINES.length} machines:`, JSON.stringify(ALL_MACHINES, null, 2));
    } catch (error) {
        console.error('Error refreshing instances:', error);
    }
}

refreshInstances();

setInterval(async () => {
    await refreshInstances();
}, 10 * 1000);


// --------------------------------------> EXPRESS -------------------------------------->

// TODO: Make it authenticated, so only the worker-orchestrator can get the machine not anyone
app.get("/:projectId", (req, res) => {
    const idleMachine = ALL_MACHINES.find(x => x.isUsed === false);
    if (!idleMachine) {
        // scale up the infrasturcture
        res.status(404).send("No idle machine found");
        return;
    }

    idleMachine.isUsed = true;
    
    // scale up the infrasturcture
    const command = new SetDesiredCapacityCommand({
        AutoScalingGroupName: config.asg.name,
        // 3 machines at max, if 2 are used, we need to scale up to 4
        DesiredCapacity: ALL_MACHINES.length + (3 - ALL_MACHINES.filter(x => x.isUsed === false).length),
        
    })
    client.send(command);

    res.send({
        ip: idleMachine.ip
    });
})

// TODO: Make it authenticated, so only the worker-orchestrator can destroy the machine not anyone
app.post("/destroy", (req, res) => {
    const { machineId } = req.body;

    const command = new TerminateInstanceInAutoScalingGroupCommand({
        InstanceId: machineId,
        ShouldDecrementDesiredCapacity: true
    })
    client.send(command);
    res.send("Machine destroyed");

})

// --------------------------------------> START THE SERVER -------------------------------------->
app.listen(config.express.port, () => {
    console.log(`Server is running on port ${config.express.port}`);
})