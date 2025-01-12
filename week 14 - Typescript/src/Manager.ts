interface People {
    name: string,
    age: number,

    isLegal(): boolean
}

class Manager implements People {
    name: string;
    age: number;

    constructor ( name: string, age: number ) {
        this.name = name;
        this.age = age;
    }

    isLegal() {
        return this.age > 18;
    }
}

const user1 = new Manager ('Praveen', 21)
const user2 = new Manager ('Shourya', 16)

console.log(user1)
console.log(`User1 is of Legal age : ${user1.isLegal()}`)

console.log(user2)
console.log(`User2 is of Legal age : ${user2.isLegal()}`)