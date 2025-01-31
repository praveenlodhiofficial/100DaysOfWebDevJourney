import prisma from "@/lib/db"

export default async function PostPage() {
  
//   const posts = await prisma.post.findMany ()


  return (
    <>
      <div className="flex flex-col gap-10 m-10 p-10 border-dashed text-center items-center border rounded-xl" >
        <h1 className="text-5xl">All Posts (0)</h1>

        <div className="flex gap-5 w-full">

          <div className="w-2/3 border border-dashed rounded-lg p-5">
            
          </div>

          <form action="" className="flex flex-col gap-3 items-center justify-center border rounded-lg border-dashed p-5 w-1/3">
          
          <input 
          type="text" 
          name="title" 
          id="title" 
          placeholder="Title"
          className="border rounded-lg bg-transparent border-dashed py-2 px-3 w-full"
          />

          <input 
          type="text" 
          name="title" 
          id="title" 
          placeholder="Title"
          className="border rounded-lg bg-transparent border-dashed py-2 px-3 w-full"
          />

          <button
          className="rounded-lg bg-white  bg-opacity-10 py-2 px-3 w-full"
          
          >
            Add Blog
          </button>

        </form>

        </div>

      </div>
    </>
  )
}