/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "@/api/axiosInstance";
import {  useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import Summary from "../common/Summary";

export default function OrderSummary() {
  const navigate = useNavigate ();
  const { cartData } = useCart();
  const { userId } = useParams<{ userId: string }>();
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const subTotal = cartData.reduce((total, cart) => {
    const itemCost = (cart?.quantity || 0) * (cart?.productVariant?.price || 0);
    return total + itemCost;
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    

    try {
   

      const orderResults = [];
      for (const item of cartData) {
        if (
          !item?.productVariant?.productId ||
          !item?.variantId ||
          !item?.quantity ||
          item.quantity <= 0 ||
          !item?.id
        ) {
         
          continue;
        }

        const payload = {
          userId:item.userId,
          productId: item.productVariant.productId,
          quantity: item.quantity,
          variantId: item.variantId,
          cartId: item.id,
          
        };

        console.log("Sending payload for item:", payload);

        const response = await instance.post("order", payload);
        const result = response.data;
        orderResults.push(result);
        console.log(`Order created for cart item ${item.id}:`, result);
      }

      navigate(`/checkout/${userId}`, { state: { orders: orderResults, subTotal } });
    } catch (error: any) {
      if(error.code === 400){
        toast.error('')
      }
      console.error("Error creating order:", error);
      // setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  if(loading){
    return <div className="bg-gray-200 h-40 w-32"></div>
  }

  return (
    
    <Summary name={'Checkout'} onClick={handleCheckout} subTotal={0} />
  );
}