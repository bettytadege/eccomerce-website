/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import ProductOption from "./ProductOption";
import ProductPreview from "./ProductPreview";

import { instance } from "@/api/axiosInstance";
import { useParams } from "react-router-dom";
import { Products } from "../types/type";
import RelatedProduct from "./RelatedProduct";
import ProductOptionSkeleton from "./ProductOptionSkeleton";
import ProductDetailSkeleton from "./ProductDetailSkeleton";



function ProductDetail() {
  const[product,setProduct]=useState<Products | null>(null)
  const { id } = useParams();
  
  const fetchProducts=async(id:string)=>{
    if(!id){
      throw Error('id is undefined')
    }
    try {
      const res=await instance.get(`product/${id}`)
      
      setTimeout(() => {
        setProduct(res.data);
      }, 500);
      return res
    } catch (error:any) {
      if(error.status === 404){
        
        throw Error('failed to fetch products')
      }
      console.log(error)
    }
  }
  useEffect(()=>{fetchProducts(id as string)},[id])
  return (
     <>
    {!product ? (
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16 sm:gap-32 mx-4 sm:mx-8 lg:mx-20 mt-10 items-center md:items-start">
        <ProductDetailSkeleton/>
        <ProductOptionSkeleton />
      </div>
    ) : (
      <div className="w-full min-h-screen space-y-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16 sm:gap-32 mx-4 sm:mx-8 lg:mx-20 mt-10 items-center md:items-start">
          <ProductPreview product={product} />
          <ProductOption product={product} />
        </div>
        <RelatedProduct categoryId={product.categoryId} productId={product.id} />
      </div>
    )}
  </>
);
}

export default ProductDetail;
