import CartItemList from "./CartItemList"
import OrderSummary from "./OrderSummary"


function Cart() {
  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen p-10">
        <div className="flex justify-between">
        <CartItemList/>
        <OrderSummary/>
        </div>
    </div>
  )
}

export default Cart