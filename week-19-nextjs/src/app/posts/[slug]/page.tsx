import prisma from "@/lib/db";

interface Params {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: Params) {  
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  return (
    <div className="flex flex-col gap-10 m-10 p-10 border-dashed text-center items-center border rounded-xl">
      <h1 className="text-5xl">{post?.title}</h1>
      <p className="text-xl text-start w-full">{post?.content}</p>
    </div>
  );
}
