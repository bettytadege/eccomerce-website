import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card } from "../ui/card"


import ProfileUpdateModal from "./ProfileUpdateModal";
import { BiSolidPencil } from "react-icons/bi";

function EditProfile() {
   const[openModal,setOpenModal]=useState(false)
   const{userData}=useAuth()

     console.log('userData',userData)

  return (
    <>
    <div className="w-full min-h-screen bg-[#F5F5F5]">
    {/* <NavBarProfile/> */}
    <div className="mx-36 ">
    <h1 className="font-semibold text-lg py-10">Profile</h1>
    <Card className="shadow-none border-0 h-32">
      <ul className="text-sm pl-8 py-4 space-y-3.5">
        <li className="flex items-center gap-3">
          <p className="text-[#707070]">{userData?.name?userData?.name:'Name'}</p>
          
          <span className="font-bold">
            <div className="" onClick={()=>setOpenModal(true)}>
          <BiSolidPencil color="#1773b0" size={12} />
          </div>
        </span>
        
        </li>
        <li className="space-y-">
          <p className="text-[#707070]">Email</p>
          <span>{userData.email}</span>
        </li>
      </ul>
    </Card>
    
   </div>
   </div>
   <ProfileUpdateModal  open={openModal} onClose={()=>setOpenModal(false)}/>
   </>
  )
}

export default EditProfile