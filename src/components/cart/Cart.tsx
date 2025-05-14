
// import { useNavigate } from "react-router-dom"
import CartItemList from "./CartItemList"
import OrderSummary from "./OrderSummary"
import { useCart } from "../context/CartContext"
import Summary from "../common/Summary"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { instance } from "@/api/axiosInstance";


function Cart() {
 
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
          // console.warn("Skipping invalid cart item:", item);
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
  
  console.log('cart',cartData)
  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen p-10">
      {/* {cartData.length === 0 ?
        
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-4">
        <p className="text-xl font-semibold">Your Cart Is Empty</p>
        <button onClick={()=>navigate('/')} className="border-1 focus:border-2 border-black rounded-full w-fit py-1 px-7  ">Go Home</button>
        </div>
        : */}
        <div className="flex justify-between gap-10">
        <CartItemList/>
        
          <Summary name={'Checkout'} onClick={handleCheckout}/>
      
        </div>
{/* } */}
    </div>
  )
}

export default Cart