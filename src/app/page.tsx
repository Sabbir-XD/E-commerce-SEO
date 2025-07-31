import ProductCard from "@/components/ProductCard";
import Head from "next/head";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Head>
        <title>E-Shop | Home</title>
        <meta
          name="description"
          content="Explore our wide range of products with best prices."
        />
      </Head>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
