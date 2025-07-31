import Head from "next/head";
import Image from "next/image";
import AddToCartButton from "../../../components/AddToCartButton";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <>
      <Head>
        <title>{product.title} | E-Shop</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="w-full md:w-1/3 h-auto object-contain"
          priority
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-md text-gray-500 mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-md text-yellow-600 mb-4">
            <strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count} reviews)
          </p>
          <p className="text-2xl font-bold text-green-600 mb-6">${product.price}</p>
          <AddToCartButton 
            id={product.id} 
            title={product.title} 
            price={product.price} 
            image={product.image} 
          />
        </div>
      </div>
    </>
  );
}
