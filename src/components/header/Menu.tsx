import { useEffect, useState } from "react";
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { LuStar } from "react-icons/lu";
import { instance } from "@/api/axiosInstance";
import { Category } from "../types/type";

function Menu() {
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  console.log('categories',categories)
  const handleCategoryMenu = async() => {
    setOpen(!open);
    try {
      const rootCategories=await instance.get('categories')
      // console.log('root categories',rootCategories)
      const children = rootCategories.data
      .flatMap((category:Category) => category.children)
      // console.log('childrenNames',children)
      setCategories(children)
    } catch (error) {
      console.log('error',error)
    }
   
  };
  useEffect(() => {
    
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

   
    // return () => {
    //   document.body.style.overflow = 'auto'
    // }
  }, [open])

  

  return (
    <>
      <div
        className="cursor-pointer z-50 relative"
        onClick={handleCategoryMenu}
      >
        <GrMenu size={25} />
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={handleCategoryMenu}
          ></div>

          <nav className="fixed top-0 left-0 min-h-[810px] h-screen w-[80%] lg:w-[22%] md:w-[30%] sm:w-[35%] bg-white z-50 shadow-lg transition-transform duration-300 ">
            <div className="mx-6">
            <div className="float-end p-6 ">
             
              <button onClick={handleCategoryMenu}>
                <IoMdClose size={24} />
              </button>
            </div>
          <div className="p-8 border-b "/>
          </div>
            <div className="p-6 space-y-4 ">
              <div className="flex gap-4 items-center">
              <GoHome size={20}/> 
              <Link to='/' onClick={()=>setOpen(false)}>Home</Link>
              </div>
              <div className="flex gap-4 items-center">
              <LuStar   size={20}/> 
              <Link to=''>New Arrivals</Link>
              </div>
            <div className=" border-b"/>
            </div>

            <ul className="px-10 flex flex-col gap-5 overflow-y-auto h-[550px] ">
              {categories.map((children)=>(
              <><li>
                  <Link to={`/allproducts/${children.id}`} onClick={()=>setOpen(false)} className="hover:underline">
                    {children.name}
                  </Link>
                </li></>
            ))}
            <div className="p-8 border-b " />
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

export default Menu;
