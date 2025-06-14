'use client'

import Container from "@/components/ui/container";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCwIcon } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsResponse {
  posts: Post[];
  total: number;
}

export default function ReactQueryFetchingExample() {

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<PostsResponse>({
      queryKey: ["posts"],
      queryFn: async () => {
        const response = await fetch("https://dummyjson.com/posts")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        } 
          return response.json()
      },
      staleTime: 1000 * 60 * 2,
    })

    const handleRefresh = () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }

  if (error) return <div className="text-center text-2xl font-medium text-red-300">Error</div>;
  if (isLoading) return <div className="text-center text-2xl font-medium text-green-300">Loading...</div>;


  return (
    <Container classname="flex flex-col gap-10">
      <h1 className="text-xl font-medium uppercase">React Query Fetching Example</h1>

      <div className="space-y-1 rounded-md grid grid-cols-3 gap-4 justify-center items-center">
        {data?.posts.map((post) => (
          <Link href={`/data-fetching/react-query/${post.id}`} key={post.id}>
            <div className="border p-4 rounded-md space-y-3 h-full">
              <h1 className="text-lg">{post.title}</h1>
              <p className="text-xs">{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

