import { CarouselPlugin } from "@/components/carousel/CarouselPlugin";

import Product from "@/components/products/Product";


function Home() {
  return (
    <>
      <div className="w-full ">
        <div className="space-y-10">
          <CarouselPlugin />
          <Product />
           
        </div>
      </div>
    </>
  );
}

export default Home;
