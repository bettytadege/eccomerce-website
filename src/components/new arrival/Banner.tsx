

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { Card, CardContent } from "../ui/card"

const images = [
  "https://s.alicdn.com/@img/imgextra/i2/O1CN01ozxKbu1c1N7DpGDHT_!!6000000003540-2-tps-760-608.png",
  "https://pixelixe.com/blog/images/250/e-commerce-banner-strategy.jpg",
  "https://s.alicdn.com/@img/imgextra/i3/O1CN01ghTrQo1VeZhwJZBjr_!!6000000002678-2-tps-760-608.png",
]

function Banner() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className=" border w-[35%] h-[320px] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="h-full"
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <Card className="rounded-none border-none shadow-none h-full">
                <CardContent className="p-0 h-full w-full">
                  
                  <img
                    src={src}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Banner
