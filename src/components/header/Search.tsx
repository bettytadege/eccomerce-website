import { useState } from "react";
import { CiSearch } from "react-icons/ci"
import { Input } from "../ui/input";
import { X } from "lucide-react";


function Search() {
   const [open, setOpen] = useState<boolean>(false);
   const handleSearchBar=()=>{
    setOpen(true)
    try {
      console.log('click')
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <>
   
    <div className="" onClick={handleSearchBar}>
    <CiSearch size={25}/>
    </div>
    {open && 
    <>
    <div className="fixed inset-0 bg-black/30 z-40" onClick={()=>setOpen(false)}></div>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white px-6 py-4 shadow flex justify-center items-center gap-4">
      <Input placeholder="search" className="border-black  focus:ring-2 py-2 w-[50%]"/>
      <X onClick={()=>setOpen(false)}/>
    </nav>
    </>
}
    </>


  )
}

export default Search