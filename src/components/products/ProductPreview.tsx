import { Key } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { Products } from "../types/type";

function ProductPreview({ product }: { product: Products }) {
  const handleProductImage = () => {
    // Add logic to change main image if needed
  };

  // Show skeleton while loading or if images are missing
  if (!product || !product.image) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="w-full sm:w-[70% h-auto sm:h-[300px] bg-white">
      <div className="flex  gap-4 sm:gap-x-8 h-full">
        {/* Thumbnail images (left side on desktop, top on mobile) */}
        <div className="flex flex-col gap-2 overflow-x-auto sm:overflow-visible">
          {product.image.map((img: string | undefined, key: Key | null | undefined) => (
            <div
              onClick={handleProductImage}
              key={key}
              className="bg-blue-100 w-16 h-16 hover:outline-black hover:scale-105 cursor-pointer hover:outline-2 transition-all duration-100 shrink-0"
            >
              <img
                src={img}
                alt={`Thumbnail ${key}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main carousel */}
        <div className="flex-1 h-full">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {product.image.map((img: string | undefined, key: Key | null) => (
                <CarouselItem key={key}>
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={img}
                      alt={`Product image ${key}`}
                      className="w-full sm:max-h-[400px] md:max-h-[550px] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white cursor-pointer" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white cursor-pointer" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
