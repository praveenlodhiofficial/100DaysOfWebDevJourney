"use client";

import Container from "@/components/ui/container";
import { RefreshCwIcon } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRFetchingExample() {
  const { data, error, isLoading, mutate } = useSWR(
    "https://dummyjson.com/products",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 30000,
      errorRetryCount: 3,
    }
  );

  const handleRefresh = () => {
    mutate();
  };

  if (isLoading)
    return (
      <div className="text-center text-2xl font-medium text-green-300">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-2xl font-medium text-red-300">Error</div>
    );

  return (
    <Container classname="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium uppercase">SWR Fetching Example</h1>
        <RefreshCwIcon className="w-6 h-6 text-green-300 cursor-pointer rotate-0 active:rotate-45 transition-all duration-800" onClick={handleRefresh} />
      </div>

      <div className="space-y-1 rounded-md grid grid-cols-3 gap-4 justify-center items-center">
        {data.products.map((product: Product) => {
          return (
            <Link
              href={`/data-fetching/swr-fetching/${product.id}`}
              key={product.id}
              className="border p-4 rounded-md space-y-3 h-full"
            >
              <h1 className="text-lg">{product.title}</h1>
              <p className="text-xs text-green-300">Price: {product.price}</p>
              <p className="text-xs">{product.description}</p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
