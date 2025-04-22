import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  
} from "@/components/ui/carousel";

export function CarouselPlugin() {

  return (
    <>
    <div className="relative w-full]">
      <Carousel className="w-full ">
        <CarouselContent>
        
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index + 1}>
              <div className="relative lg:h-[700px] h-[500px] md:h-[600px] w-full">
                
                <div className="absolute inset-0 w-full h-full bg-gray-100">
                  <div className="relative w-full h-full">
                    <img
                      src="httpscom/cdn/shop/files/O1CN01VedEWv1VaRxxpUWRg__2215138292669-0-cib.jpg?v=1717500894&width=720"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24">
                  <div className="max-w-md">
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 text-black">
                      Collection {index + 1}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-medium mb-8 text-black">
                      Discover Our Latest Arrivals
                    </h3>
                    <Button
                      variant="outline"
                      className="bg-zinc-700 text-white  border-none rounded-none px-8"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 cursor-pointer">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === 3 ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer" />
      </Carousel>
    </div>
    </>
  );
}
