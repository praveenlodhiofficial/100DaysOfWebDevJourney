interface todoType {
    title: string,
    description: string,
    isDone: boolean,
}

const todo: todoType = {
    title: 'Todo 01',
    description: 'This is the first todo in the list.',
    isDone: true,
}

function printTodo (todo: todoType) {
    console.log(`Title: ${todo.title}`)
    console.log(`Description: ${todo.description}`)
}