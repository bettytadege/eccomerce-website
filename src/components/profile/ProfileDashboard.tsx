import { Outlet } from "react-router-dom"
import NavBarProfile from "./NavBarProfile"



function ProfileDashboard() {
  return (
    <>
    <div className="w-full min-h-screen bg-[#F5F5F5] ">
      <NavBarProfile/>
      <div className="">
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default ProfileDashboard