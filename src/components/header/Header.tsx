
import Menu from "./Menu"
import Message from "./Message"
import Profile from "../profile/Profile"
import Search from "./Search"
import ShoppingCart from "./ShoppingCart"


function Header() {
  return (
    <>
   <div className="w-full  py-7 bg-white shadow-xs">
    <div className="flex justify-between mx-8 ">
        <Menu/>
        <div className="flex gap-5">
            <Search/>
            <Message/>
            <ShoppingCart/>
            <Profile/>
        </div>
    </div>
   </div>
    </>
  )
}

export default Header