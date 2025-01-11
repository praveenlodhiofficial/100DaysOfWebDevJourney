interface userType {
    firstName: string,
    lastName: string,
    age: number,
}

function greet(user: userType) {
    console.log(`My name is ${user.firstName} ${user.lastName} & my age is ${user.age}.`)
}

let user: userType = {
    firstName: 'Praveen',
    lastName: 'Lodhi',
    age: 21
}














// function greet (user: {
//     name: string,
//     age: number,
// }) {
//     console.log(`Hello, ${user.name} of age ${user.age}.`)
// }

// greet ({
//     name: 'Praveen Lodhi',
//     age: 20,
// })