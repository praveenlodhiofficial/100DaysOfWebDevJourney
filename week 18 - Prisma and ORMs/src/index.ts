import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

async function createUser() {
    await client.user.create({
        data: {
            username: 'shourya',
            email: 'shourya@123',
            password: '20204284'
        }
    })
}

async function deleteUser() {
    await client.user.delete({
        where: {
            id: 1
        }
    })
}

async function updateUser() {
    await client.user.update({
        where: {
            id: 2
        },
        data: {
            username: 'paplu'
        }
    })
}

async function findOneUser() {
    const user = await client.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    })
    console.log(user)
}

findOneUser()