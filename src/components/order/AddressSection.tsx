import OrderForm from "./OrderForm";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function AddressSection() {
  const [openModal, setOpenModal] = useState(false);
  const { userData } = useAuth();
  // console.log("user", userData);
  // console.log(typeof userData);
  // const userId=useParams<string>()
  // const fetchAddress=async(id:string)=>{
  //           try {
  //             console.log('userid',id)
  //             const response=await instance.get(`user/${id}`)
  //             console.log('fetching address',response)
  //             setAddress(response.data)
  //           } catch (error) {
  //             console.log(error)
  //           }

  //         }
  // useEffect(()=>{fetchAddress(userId)},[userId])
  return (
    <>
      <div className="bg-white w-full h- p-6">
        <p className="font-semibold text-xl"> Address</p>
        {userData?.address ? (
          <div className="flex justify-between">
            <div className="text-[#666666] text-sm">
              <div className="text-black flex gap-10">
                <p className="font-semibold">{userData.name}</p>
                <p>{userData?.phoneNumber}</p>
              </div>
            
                <>
                  <p>{userData?.address?.street}</p>
                  <p>
                    {userData?.address?.city}, {userData?.address?.state}, {userData?.address?.postalCode}
                  </p>
                </>
              
            </div>
            <button
              className="text-[#1689FE]"
              onClick={() => setOpenModal(true)}
            >
              Change
            </button>
          </div>
        ) : (
          <button className="text-[#1689FE]" onClick={() => setOpenModal(true)}>
            Add Address
          </button>
        )}
      </div>
      <OrderForm open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default AddressSection;
