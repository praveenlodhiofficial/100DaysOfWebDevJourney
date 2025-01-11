interface userType {
    firstName: string,
    lastName: string,
    age: number,
}

let user1: userType = {
    firstName: 'Praveen',
    lastName: 'Praveen',
    age : 20,
}

function isLegal (user: userType) {
    if (user.age > 18) {
        return true;
    } else {
        return false;
    }
}