
import { useEffect, useState } from "react";
import ProductOption from "./ProductOption";
import ProductPreview from "./ProductPreview";

import { instance } from "@/api/axiosInstance";
import { useParams } from "react-router-dom";
import { Product } from "../types/type";


function ProductDetail() {
  const[product,setProduct]=useState<Product[]>([])
  
  
  const { id } = useParams();
  // console.log('id param',id)
  const fetchProducts=async(id:string)=>{
    if(!id){
      throw Error('id is undefined')
    }
    try {
      const res=await instance.get(`product/${id}`)
      // console.log('product',res)
      // setProduct(res.data)
      setTimeout(() => {
        setProduct(res.data);
      }, 500);
      return res
    } catch (error:any) {
      if(error.status === 404){
        console.log('first')
        throw Error('failed to fetch products')
      }
      console.log(error)
    }
  }
  useEffect(()=>{fetchProducts(id)},[id])
  return (
    <>
      <div className="w-full h-screen ">
        <div className="lg:flex lg:gap-16 md:flex md:gap-10 lg:mx-20 md:mx-8 mt-10">
          <ProductPreview product={product} />
          <ProductOption  product={product}/>
        </div>
       
      </div>
    </>
  );
}

export default ProductDetail;
