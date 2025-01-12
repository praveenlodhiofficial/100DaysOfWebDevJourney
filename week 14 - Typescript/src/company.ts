interface UsersType {
    name: string;
    age: number;
    address: {
        pincode: number;
        city: string;
        state: string;
    };
    sex?: string; // Optional property
}

let users: UsersType = {
    name: 'Praveen Lodhi',
    age: 21,
    address: {
        pincode: 123456,
        city: 'Mumbai',
        state: 'Maharashtra'
    },
    sex: 'Male'
};

function print(users: UsersType) {
    console.log(`My name is ${users.name}.`);
    console.log(`My age is ${users.age}.`);
    if (users.sex) {
        console.log(`My sex is ${users.sex}.`);
    } else {
        console.log('Sex information is not available.');
    }
    console.log(`My address is ${users.address.city}, ${users.address.state}, (${users.address.pincode}).`);
}
