import EditTodoModalButton from "@/components/EditTodoModal";
import DeleteTodoModalButton from "@/components/DeleteTodoModal";
import React from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface TodoStatusFilterProps {
  todos: Todo[];
  status: string;
  title: string;
}

const TodoStatusFilter: React.FC<TodoStatusFilterProps> = ({
  todos,
  status,
  title,
}) => {
  const filteredTodos = todos.filter((todo) => todo.status === status);

  return (
    <div className="space-y-5">
      <h1 className="bg-black text-white p-1 rounded-md text-lg uppercase text-center w-full font-semibold">
        {title} {`(${filteredTodos.length})`}
      </h1>
      <div className="grid grid-cols-1 gap-5">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400">
            No {title.toLowerCase()} todos
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo._id} className="border p-5 rounded-xl">
              <div className="flex items-center justify-between space-y-2">
                <div className="text-xs items-center flex gap-2">
                  <p>{new Date(todo.createdAt).toLocaleDateString()}</p>
                  <p>|</p>
                  <p className="uppercase">
                    {new Date(todo.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-xs uppercase flex gap-1">
                  <EditTodoModalButton
                    todoId={todo._id}
                    initialTitle={todo.title}
                    initialDescription={todo.description}
                    initialStatus={todo.status}
                  />
                  <DeleteTodoModalButton todoId={todo._id} />
                </div>
              </div>
              <h1 className="text-lg font-semibold line-clamp-1">
                {todo.title}
              </h1>
              <p className="line-clamp-3 text-sm">{todo.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoStatusFilter;
