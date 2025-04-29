import { PiShieldCheckLight } from "react-icons/pi"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"


function OrderSummary() {
  const navigate=useNavigate()
  return (
    <>
    <div className="bg-white w-[30%] h-fit p-7 rounded-md space-y-6">
        <h1 className="font-semibold text-xl">Summary</h1>
        <div className="flex justify-between">
        <p>Esimated total</p>
        <span className="font-semibold text-lg">ETB0.00</span>
  
        </div>
        <Button onClick={()=>navigate('/checkout')}  className="w-full bg-[#1689FE] rounded-md py-5 hover:bg-[#168afee1]">
        <PiShieldCheckLight size={20} color="white" />
            Checkout</Button>
    </div>
    
    </>
  )
}

export default OrderSummary