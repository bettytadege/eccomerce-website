import { useState } from "react"
import { MdDeleteOutline } from "react-icons/md";

type CartItemProps={
    img:string,
    name:string,
    price:number,
    variation1:string,
    variation2:string
}

function CartItem({img,name,price,variation1,variation2}:CartItemProps) {
      const[count,setCount]=useState<number>(1)
  return (
    <>
    <div className="w-full bg-white h-32">
     <div className="flex justify-between items-center">
        <div className="flex gap-7">
        <div className="w-32 h-32 ">
        <img src={img} alt="" className="w-full h-full rounded-md" />
        </div>
        <div className="text-[#000000BF] space-y-2 text text-sm">
            <p className="text-black">{name}</p>
            <p>Br{price}</p>
            <p>Color: {variation1}</p>
            <p>size:{variation2}</p>
        </div>
        </div>
        <div className="flex items-center gap-2">
        <div className="text-black w-32 py-2.5 bg-white   border-1 border-black  text-center  rounded-md">
              <div className="flex  justify-around">
                <button disabled={count <= 1}   className={count <= 1 ?'cursor-not-allowed disabled:opacity-5 ':'cursor-pointer'} onClick={()=>(setCount(count - 1))}>-</button>
                <p>{count}</p>
                <button className="cursor-pointer" onClick={()=>(setCount(count + 1))}>+</button>
              </div>
            </div>
            <div className="hover:text-red-500">
              <MdDeleteOutline size={20} />
              </div>
            </div>
     </div>
    </div>
    <hr />
    
    </>
  )
}

export default CartItem