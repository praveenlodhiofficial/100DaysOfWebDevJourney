"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function UseEffectFetchingExample() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);

  async function fetchListOfProducts() {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const result = await res.json();

      if (result) {
        setIsLoading(true);
        setData(result?.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(true);
      }
      
      //   not seeing loader before data fetches
      if (isLoading) return <div className="text-center text-2xl font-medium text-green-300">Loading...</div>;
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  return (
    <Container classname="flex flex-col gap-10">
      <h1 className="text-xl font-medium uppercase">Use Effect Fetching Example</h1>

      <div className="space-y-1 rounded-md grid grid-cols-3 gap-4 justify-center items-center">
        {data.map((product: Product) => {
          return (
            <Link
              href={`/data-fetching/use-effect/${product.id}`}
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
