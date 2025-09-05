const config = {
    express: {
        port: process.env.EXPRESS_PORT!,
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_ACCESS_SECRET!,
        region: process.env.AWS_REGION!,
    },
    asg: {
        name: process.env.AUTO_SCALING_GROUP_NAME!,
    },
}

export default config;