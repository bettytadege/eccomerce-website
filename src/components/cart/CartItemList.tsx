import { useEffect } from "react"
import CartItem from "./CartItem"

import { instance } from "@/api/axiosInstance"

import { useCart } from "../context/CartContext"
import { useParams } from "react-router-dom"


function CartItemList() {

const{cartData,setCartData}=useCart()

const {userId}=useParams<{userId:string}>()
// console.log('cart data',cartData)
  const fetchData=async(id:string)=>{
    console.log('id',id)
try {
  const res=await instance.get('cart',{
    params:{userId:id}
  })
  setCartData(res.data)
} catch (error) {
  console.log('error',error)
}
  }
  useEffect(()=>{fetchData(userId)},[userId])

  return (
    <>
    <div className="bg-white lg:w-[65%] md:w-[55%] sm:w-full w-full h-fit flex flex-col gap-5 p-3 ">
        <CartItem   cartData={cartData}/>
       
    </div>
    </>
  )
}

export default CartItemList