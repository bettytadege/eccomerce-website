import CartItem from "./CartItem"


function CartItemList() {
  return (
    <>
    <div className="bg-white w-[65%] h-fit flex flex-col gap-5 p-3 ">
        <CartItem name="Women zip up jackets" price={3400} variation1="Black" variation2="M" img="https://ae-pic-a1.aliexpress-media.com/kf/S22ac17c4171b45f3a830df9f99c26411t.png"/>
        <CartItem name="Women zip up jackets" price={3400} variation1="Black" variation2="M" img="https://ae-pic-a1.aliexpress-media.com/kf/S22ac17c4171b45f3a830df9f99c26411t.png"/>
        <CartItem name="Women zip up jackets" price={3400} variation1="Black" variation2="M" img="https://ae-pic-a1.aliexpress-media.com/kf/S22ac17c4171b45f3a830df9f99c26411t.png"/>
        <CartItem name="Women zip up jackets" price={3400} variation1="Black" variation2="M" img="https://ae-pic-a1.aliexpress-media.com/kf/S22ac17c4171b45f3a830df9f99c26411t.png"/>
        
    </div>
    </>
  )
}

export default CartItemList