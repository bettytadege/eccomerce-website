import { Key, useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { Products } from '../types/type';
import { instance } from '@/api/axiosInstance';

type RelatedProductProps={
    categoryId:string,
    productId:string
}
function RelatedProduct({categoryId,productId}:RelatedProductProps) {
const [products, setProducts] = useState<Products[]>([]);

const fetchProducts = async (subcategoryId: string, productId: string) => {
  if (!subcategoryId || !productId) return;

  try {
    const response = await instance.get(
      `product/${subcategoryId}/related?exclude=${productId}`
    );
    // console.log("related products", response);
    setProducts(response.data);
  } catch (error) {
    console.log(error);
    setProducts([]);
  }
};

useEffect(() => {
  if (categoryId && productId) {
    fetchProducts(categoryId, productId);
  }
}, [categoryId, productId]);

  return (
<>
  {products.length >= 1 &&
  <div className="py-14 space-y-10">
    
   <div className="font-semibold text-xl mx-40">Related Products</div>
  <div className="  flex  justify-center w-full">
        <div className="grid grid-cols-2 gap-4 sm:g6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-5 place-items-center">
          {products.map((product: Products, key: Key | null) => (
            <ProductItem
              key={key}
              img={product.image[0]}
              name={product.name}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>
        </div>
      </div>
}

</>
  )
}

export default RelatedProduct