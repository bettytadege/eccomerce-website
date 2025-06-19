import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Order } from "../types/type";

function OrderItemDetail({order}:{ order:Order[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const items = 6;

  const handleNext = () => {
    if (startIndex + items < order.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const orders = order.slice(startIndex, startIndex + items);

  return (
    <div className="bg-white w-full p-5">
      <div className="flex items-center gap-4">
        {startIndex > 0 && (
          <button onClick={handlePrev} className="bg-black/10 p-3 rounded-md">
            <FaChevronLeft />
          </button>
        )}

        <div className="flex gap-6 items-center overflow-hidden">
          {orders.map((orderItem, index) => {
            const image =
              orderItem?.productVariant?.attribute?.find(
                (att) => att?.name === "Color" && att?.image
              )?.image || orderItem?.product?.image?.[0];

            const price =
              orderItem?.productVariant?.price ?? orderItem?.product?.price;

            return (
              <div key={index} className="space-y-2 w-[120px]">
                <div className="bg-blue-50 rounded-md w-30 h-30">
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm">ETB {price}</p>
              </div>
            );
          })}
        </div>

        {startIndex + items < order.length && (
          <button onClick={handleNext} className="bg-black/10 p-3 rounded-md">
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderItemDetail;
