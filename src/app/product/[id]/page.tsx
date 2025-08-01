import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Back button */}
        <Link 
          href="/" 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to products
        </Link>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Product image */}
          <div className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto max-h-96 object-contain"
              priority
            />
          </div>

          {/* Product details */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 h-full">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-orange-200 text-gray-600 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating?.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating?.rate} ({product.rating?.count} reviews)
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <AddToCartButton 
                id={product.id} 
                title={product.title} 
                price={product.price} 
                image={product.image} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}