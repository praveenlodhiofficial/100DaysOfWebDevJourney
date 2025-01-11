interface employee {
    employeeName: string;
    age: number;
    id?: number;
};

interface manager {
    ManagerName: string;
    department: string;
};

type TeamLead = employee & manager;

const teamLead: TeamLead = {
    employeeName: 'praveen',
    age: 20,
    ManagerName: 'Lodhi',
    department: 'CSE',
};
