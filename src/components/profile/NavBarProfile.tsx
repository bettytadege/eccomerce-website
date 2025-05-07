import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
function NavBarProfile() {
    const[open,setOpen]=useState<boolean>(false)
    const handleProfileMenu=()=>{
        setOpen(!open)
    }
  return (
    <>
      <div className="w-full bg-white py-3 h-[4.2rem]">
        <div className=" flex justify-between items-center  mx-56">
          <ul className="flex gap-3">
            <li className="hover:bg-[#F5F5F5] hover:rounded-md  transition-all duration-200 px-4 py-2 text-sm">
              <Link to="/">Shop</Link>
            </li>
            <li className="hover:bg-[#F5F5F5] hover:rounded-md  transition-all duration-200 px-4 py-2 text-sm">
              <Link to="">Orders</Link>
            </li>
          </ul>

          <div className="flex items-center hover:bg-[#F5F5F5] hover:rounded-md  transition-all duration-200 px-3 py-2" onClick={handleProfileMenu}>
            <CgProfile size={27} opacity={0.5} />
            {open?<RiArrowDropUpLine  size={20}  />:<RiArrowDropDownLine size={20} onClick={handleProfileMenu} />}
            
            
          </div>
        </div>
        {open && <ProfileMenu setOpen={setOpen}/>}
      </div>
    </>
  );
}

export default NavBarProfile;
