import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { collection } from "@/data/data";
import { useState, useEffect } from "react";

export function CarouselPlugin() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<any>(null); // Use the setApi prop to get the Embla API

  useEffect(() => {
    if (emblaApi) {
      // Update activeIndex when slide changes
      emblaApi.on("select", () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      });

      // Set initial active index
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      <Carousel setApi={setEmblaApi} className="w-full">
        <CarouselContent>
          {collection.map((coll, index) => (
            <CarouselItem key={index}>
              <div className="relative lg:h-[700px] h-[500px] md:h-[600px] w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full bg-gray-100">
                  <div className="relative w-full h-full">
                    <img
                      src={coll.img}
                      alt={`Collection ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-24 sm:px-32 md:px-24 lg:px-32">
                  <div className="max-w-md">
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 text-black">
                      {coll.name}
                    </h2>
                    <h3 className="text-xl md:text-3xl font-medium mb-8 text-black">
                      {/* {coll.description} */}
                    </h3>
                    <Button
                      variant="outline"
                      className="bg-zinc-700 text-white border-none rounded-none px-8 hover:bg-zinc-600"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {collection.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === activeIndex ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer" />
      </Carousel>
    </div>
  );
}