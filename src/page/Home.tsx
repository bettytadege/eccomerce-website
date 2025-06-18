import { CarouselPlugin } from "@/components/carousel/CarouselPlugin";
import Banner from "@/components/new arrival/Banner";
import NewArrival from "@/components/new arrival/NewArrival";

import Product from "@/components/products/Product";


function Home() {
  return (
    <>
      <div className="w-full ">
        <div className="space-y-10">
          <CarouselPlugin />
          <div className="flex gap-10 mx-10">
          <NewArrival/>
          <Banner/>
          </div>
          <Product />
           
        </div>
      </div>
    </>
  );
}

export default Home;
