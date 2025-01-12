interface Legal {
    name: string,
    age: number,
}

let users: Legal[] = [{
    name: 'Praveen',
    age: 21
}, {
    name: 'Piyush',
    age: 20
}, {
    name: 'Shourya',
    age: 17
}, {
    name: 'Parshav',
    age: 16
}];

for (let i = 0 ; i < users.length ;  i++) {
    if (users[i].age >= 18) {
        console.log(`${users[i].name} is of legal age.`)
    } else {
        console.log(`${users[i].name} is not of a legal age.`)
    }
}