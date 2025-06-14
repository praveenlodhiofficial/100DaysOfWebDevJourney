import Container from "@/components/ui/container";
import Link from "next/link";

interface product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface ProductResponse {
  product: product[];
  total: number;
}

async function getProducts(): Promise<ProductResponse> {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch the products");
  }

  return response.json();
}

export default async function ServerFetching() {
  const products = await getProducts();

  return (
    <Container classname="flex flex-col gap-10">
      <h1 className="text-xl font-medium uppercase">
        Server Side Fetching of Products
      </h1>
      <p>Total no. of Products present: {products.total}</p>

      <div className="space-y-1 rounded-md grid grid-cols-3 gap-4 justify-center items-center">
        
        {/* @ts-ignore */}
        {products.products.map((product: any) => {
          return (
            <Link
              href={`/data-fetching/server-fetching/${product.id}`}
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
