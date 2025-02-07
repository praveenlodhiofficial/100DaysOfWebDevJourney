import { createPost } from "@/actions/actions";
import prisma from "@/lib/db"
import Link from "next/link"

export default async function PostsPage() {
  const postsCount = await prisma.post.count();

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      title: true,
      slug: true,
    }

  })

  return (
    <>
      <div className="flex flex-col gap-10 m-10 p-10 border-dashed text-center items-center border rounded-xl" >
        <h1 className="text-5xl">All Posts ({postsCount})</h1>

        <div className="flex gap-5 w-full">

          <div className="w-2/3 border border-dashed rounded-lg p-5">
            {posts.map((post) => (
              <div key={post.id} className="text-start text-xl">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </div>
            ))}
          </div>

          <form action={createPost} className="flex flex-col gap-3 items-center justify-center border rounded-lg border-dashed p-5 w-1/3">

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="border rounded-lg bg-transparent border-dashed py-2 px-3 w-full"
            />

            <input
              type="text"
              name="content"
              id="content"
              placeholder="Content"
              className="border rounded-lg bg-transparent border-dashed py-2 px-3 w-full"
            />

            <button
              type="submit"
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
