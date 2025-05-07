
import CartItemList from "./CartItemList"
import OrderSummary from "./OrderSummary"


function Cart() {
 
  // const navigate=useNavigate()
  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen p-10">
      {/* {!cartData || cartData.length === 0 ?
        
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-4">
        <p className="text-xl font-semibold">Your Cart Is Empty</p>
        <button onClick={()=>navigate('/')} className="border-1 focus:border-2 border-black rounded-full w-fit py-1 px-7  ">Go Home</button>
        </div>
        : */}
        <div className="flex justify-between">
        <CartItemList/>
        <OrderSummary/>
      
        </div>
          
{/* } */}
    </div>
  )
}

export default Cart