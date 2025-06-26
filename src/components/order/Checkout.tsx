
import { instance } from '@/api/axiosInstance'
import Summary from '../common/Summary'
import AddressSection from './AddressSection'

import OrderItemDetail from './OrderItemDetail'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Order } from '../types/type'





function Checkout() {
  // const [payment,setPayment]=useState()
  const [order,setOrder]=useState<Order[]>([])
   const{userId,}=useParams<string>()

  //calculate total
   const total = order?.reduce((sum, item) => {
  return sum + (item?.subTotal );
}, 0) ?? 0;




  const fetchOrder=async(id:string)=>{
    const res=await instance.get(`order?userId=${id}`)
    // console.log('order',res)
    setOrder(res.data)
  }
  useEffect(()=>{if(userId)fetchOrder(userId)},[userId])


  const handlePayment=async()=>{
    // console.log('payment')
    const pay=await instance.post('initialize')
    console.log('payment',pay)
  }
  return (
    <>
    <div className="bg-[#F5F5F5] w-full min-h-screen p-10">
    
    <div className="flex gap-10 w-full">
    <div className="space-y-3 w-full">
  
    <AddressSection/>
    <OrderItemDetail order={order}/>
    {/* <PaymentMethod/> */}
    </div>
        <Summary name={'poceed to pay'} onClick={handlePayment} subTotal={total} item={order?.length}/>
    </div>
    </div>
    </>
  )
}

export default Checkout