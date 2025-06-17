import { CiLocationOn, CiMail, CiUser } from "react-icons/ci";
import { PiPhoneThin } from "react-icons/pi";
import { Input } from "../ui/input";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { instance } from "@/api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

type OrderFormProps = {
  open: boolean;
  onClose: (open: boolean) => void;
};

function OrderForm({ open, onClose }: OrderFormProps) {
  const [form, setForm] = useState<{
    name: string;
    phonenumber: string;
    city: string;
    street: string;
    state: string;
    postalcode: string;
  }>({
    name: "",
    phonenumber: "",
    city: "",
    street: "",
    state: "",
    postalcode: "",
  });
  const { userData } = useAuth();
  // console.log("user", userData.id);
  const id=userData?.id
  const{userId}=useParams()
  const payload = {
    userId: userId,
    city: form.city,
    street: form.street,
    state: form.state,
    postalCode: form.postalcode,
  };

  const { setUserData } = useAuth();
  const handleAddress = async (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault();
   
    try {
      const response = await instance.post('address', payload);
      console.log("address", response);
      
      const updateUser= await instance.patch(`user/${userId}`,{ name:form.name,
        phoneNumber:form.phonenumber,addressId:response.data.id})
        setUserData(updateUser.data)
        
        onClose(true)
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("order form", form);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!w-[800px] !max-w-[1000px] !h-auto p-10">
        <p className="text-center font-semibold">Add Address</p>
        <form action="" className="p-8 space-y-6 mx- w-full " onSubmit={handleAddress}>
          <div className="space-y-4">
            <p className="font-semibold">Contact Information</p>
            <div className="flex gap-5 w-full">
              {/* Name */}
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <CiUser className="text-xl" />
                </span>
                <Input
                  value={form.name }
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="contact name*"
                  className="pl-12 focus:outline-none focus:ring-[.5px] w-full"
                />
              </div>

              {/* Phone */}
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <PiPhoneThin className="text-xl" />
                </span>
                <Input
                  type="tel"
                  value={form.phonenumber }
                  onChange={(e) =>
                    setForm({ ...form, phonenumber: e.target.value })
                  }
                  placeholder="Phone number (+251-)"
                  className="pl-12 w-full focus:outline-none focus:ring-[.5px]"
                />
              </div>
            </div>
          </div>
          {/* Address */}
          <div className="space-y-7">
            <p className="font-semibold">Address </p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <CiLocationOn className="text-xl" />
              </span>
              <Input
                value={form.city }
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="city*"
                className="pl-12 focus:outline-none focus:ring-[.5px]"
              />
            </div>

            <div className="flex gap-4">
              {/* City */}
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <CiLocationOn className="text-xl" />
                </span>
                <Input
                  placeholder="street*"
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  className="pl-12 focus:outline-none focus:ring-[.5px]"
                />
              </div>
              {/* State */}
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <CiLocationOn className="text-xl" />
                </span>
                <Input
                  placeholder="state*"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="pl-12 focus:outline-none focus:ring-[.5px]"
                />
              </div>
            </div>

            {/* Postal Code */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <CiMail className="text-xl" />
              </span>
              <Input
                placeholder="postal code*"
                value={form.postalcode}
                onChange={(e) =>
                  setForm({ ...form, postalcode: e.target.value })
                }
                className="pl-12 focus:outline-none focus:ring-[.5px]"
              />
            </div>

            {/* Save Info */}
            <div>
              <input type="checkbox" name="" id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer p-2"
              >
                Save this information for faster check-out next time
              </label>
            </div>
          </div>
          {/*  Button */}
          <div className=" flex gap-10">
            <Button
            type="submit"
              className="bg-[#1689FE] font-semibold w-1/5 rounded-3xl"
             
            >
              Confirm
            </Button>
            <DialogClose className="bg-white  border-black w-1/5  border text-black rounded-3xl">
              Cancel
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default OrderForm;
