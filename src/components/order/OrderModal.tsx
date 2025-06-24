import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CiLocationOn, CiMail, CiUser } from "react-icons/ci";
import { PiPhoneThin } from "react-icons/pi";


import { instance } from "@/api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


type OrderModalProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  order: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string[];
    };
    selectedAttributes: Record<string, string>;
    count: number;
    selectedVariantId: string;
    variantImage: string;
    variantPrice: number;
  };
};

const inputValue = [
  { key: "name", placeholder: "Name", icon: <CiUser /> },
  { key: "phonenumber", placeholder: "Phone Number (+251-)", icon: <PiPhoneThin /> },
  { key: "city", placeholder: "City", icon: <CiLocationOn /> },
  { key: "street", placeholder: "Street Address", icon: <CiLocationOn /> },
  { key: "state", placeholder: "State", icon: <CiLocationOn /> },
  { key: "postalcode", placeholder: "Postal Code (optional)", icon: <CiMail /> },
];

export function OrderModal({ open, onClose, order }: OrderModalProps) {
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


  const total = order?.variantPrice * order?.count;
  const payload={
    variantId: order.selectedVariantId,
    productId: order.product.id,
    userId: userData?.id,
    quantity: order.count,
    subTotal: total,
   
      city: form.city,
      street: form.street,
      state: form.state,
      postalCode: form.postalcode,
    
  }

  const handleOrder = async () => {
    try {
      const res = await instance.post("order",payload);
      console.log("order response", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!w-[600px] !max-w-[800px] !h-auto p-10">
        <div className="space-y-5">
          {/* Order Summary */}
          <div className="box-border border p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-5 relative">
                {order.count > 1 && (
                  <div className="bg-red-500 absolute top-1/12 left-1/3 translate-x-1/2 text-sm flex items-center justify-center transform -translate-y-1/2 text-white w-6 h-6 rounded-full">
                    {order.count}
                  </div>
                )}
                <img
                  src={order.variantImage}
                  alt=""
                  className="bg-black object-cover w-20 h-[75px] rounded-sm"
                />
                <div className="text-gray-500">
                  {Object.entries(order.selectedAttributes).map(([name, value]) => (
                    <p key={name} className="text-sm">
                      {name}: {value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="text-black font-semibold">
                <p>{order.variantPrice} ETB</p>
              </div>
            </div>
            <div className="flex font-semibold justify-between p-3 rounded-sm bg-[#F9F9F9] border-gray-400">
              <span>Total</span>
              <p>{total} ETB</p>
            </div>
          </div>

          {/* Shipping Form */}
          <form className="space-y-3 w-[500px]">
            {inputValue.map(({ key, placeholder, icon }) => (
              <div className="relative" key={key}>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {icon}
                </span>
                <Input
                  placeholder={placeholder}
                  className="pl-10 focus:ring-1"
                  // value={form[key]}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </form>
        </div>

        <DialogFooter className="flex justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={handleOrder}
            className="bg-[#1689FE] rounded-lg py-5 px-7 text-white hover:bg-[#168afed8]"
          >
            Continue Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



