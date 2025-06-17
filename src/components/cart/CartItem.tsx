/* eslint-disable @typescript-eslint/no-explicit-any */

import { MdDeleteOutline } from "react-icons/md";
import { Cart } from "../types/type";
import { instance } from "@/api/axiosInstance";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

type CartItemProps = {
  cartData: Cart[];
};

function CartItem({ cartData }: CartItemProps) {
  const { setCartData } = useCart();
  const navigate=useNavigate()

  if (! cartData || cartData.length === 0) {
    <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 h-80">
    <p className="text-xl font-semibold">Your Cart Is Empty</p>
    <button onClick={()=>navigate('/')} className="border-1 focus:border-2 border-black rounded-full w-fit py-1 px-7  ">Go Home</button>
    </div>
  } 

  const handleRemoveCartItem = async (id: string) => {
    try {
      await instance.delete(`cart/${id}`);
      setCartData((prev: Cart[]) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleQuantityChange = async (newQuantity: number, id: string) => {
    try {
      
      setCartData((prev: Cart[]) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      await instance.patch(`cart/${id}`, { quantity: newQuantity });

     
    } catch (error) {
      console.error("Failed to update quantity");
    }
  };

  return (
    <>
      {cartData.map((item) => {
        const image =
          item.productVariant?.attribute?.find((attr) => attr.image)?.image ||
          item.productVariant?.product?.image;

        return (
          <div key={item.id} className="w-full bg-white h-auto py-4">
            <div className="flex justify-between items-center px-4">
              <div className="flex gap-7" >
                <div className="w-32 h-32"onClick={() => navigate(`/product/${item.productVariant?.productId}`)}>
                  {image ? (
                    <img
                      src={image}
                      alt={item.productVariant?.product?.name || "Product"}
                      className="w-full h-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500"></div>
                  )}
                </div>
                <div className="text-[#000000BF] space-y-2 text-sm">
                  <p className="text-black font-medium">
                    {item.productVariant?.product?.name}
                  </p>
                  <p>Br {item.productVariant?.price}</p>
                  <div className="">
                    {item.productVariant?.attribute?.map((attr, index) => (
                      <p className="" key={index}>
                        { attr.name}:{attr.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 py-2.5 bg-white border border-black rounded-md text-center">
                  <div className="flex justify-around items-center">
                    <button
                      disabled={item.quantity <= 1}
                      className={`${
                        item.quantity <= 1
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                      onClick={() =>
                        handleQuantityChange(item.quantity - 1, item.id)
                      }
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                       disabled={item?.productVariant?.stock <= 1}
                      className="cursor-pointer"
                      onClick={() =>
                        handleQuantityChange(item.quantity + 1, item.id)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className="hover:text-red-500 cursor-pointer"
                  onClick={() => handleRemoveCartItem(item.id)}
                >
                  <MdDeleteOutline size={20} />
                </div>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        );
      })}
    </>
  );
}

export default CartItem;
