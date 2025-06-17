/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, ReactNode, useContext, useState } from "react";
import { Cart } from "../types/type";
type CartTypes={
    cartData:Cart[],
    setCartData:(data:any)=>void
}
const CartContext = createContext<CartTypes | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const[cartData,setCartData]=useState<Cart[]>([])
  const value={
    cartData,setCartData
  }
  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("usecart must be used within an CartProvider");
  }
  return context;
};
