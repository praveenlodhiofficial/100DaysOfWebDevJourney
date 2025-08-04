import CreateTodoModal from "@/components/CreateTodoModal";
import TodoStatusFilter from "@/components/TodoStatusFilter";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todo`, {
    cache: "no-store",
  });
  const data = await response.json();
  const todos = data.todos || [];

  return (
    <div className="min-h-screen w-full flex flex-col items-center ">
      <div className="max-w-6xl w-full p-10 items-center flex flex-col border-red-500 gap-10">
        {/* Heading */}
        <div className="flex gap-10 justify-between items-center w-full">
          <h1 className="text-3xl uppercase font-bold text-center">Todos { `(${todos.length})`}</h1>
          <CreateTodoModal />
        </div>

        {/* Status Tabs */}
        <div className="grid grid-cols-3 gap-10 h-fit w-full">
          <TodoStatusFilter todos={todos} status="pending" title="Pending" />
          <TodoStatusFilter todos={todos} status="in_progress" title="In Progress" />
          <TodoStatusFilter todos={todos} status="completed" title="Completed" />
        </div>
      </div>
    </div>
  );
}
