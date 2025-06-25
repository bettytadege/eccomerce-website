import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { instance } from '@/api/axiosInstance'
import { Products } from '../types/type'

function NewArrival() {
  const [newarrivals, setNewarrivals] = useState<Products[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(4)

  const updateItemsToShow = () => {
    const width = window.innerWidth

    if (width >= 1280) {
      setItemsToShow(4) // xl
    } else if (width >= 1024) {
      setItemsToShow(4) // lg
    } else if (width >= 768) {
      setItemsToShow(4) // md
    } else if (width >= 615) {
      setItemsToShow(3) // sm
    } else if (width >= 450) {
      setItemsToShow(2) // sm
    } else {
      setItemsToShow(1) // xs
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsToShow)
    }
  }

  const handleNext = () => {
    if (currentIndex + itemsToShow < newarrivals.length) {
      setCurrentIndex(currentIndex + itemsToShow)
    }
  }

  const fetchNewArrivalProduct = async () => {
    try {
      const res = await instance.get('product/new-arrival?limit=20')
      setNewarrivals(res.data.newArrival)
    } catch (error) {
      console.error('Error :', error)
    }
  }

  useEffect(() => {
    fetchNewArrivalProduct()
    updateItemsToShow()
    window.addEventListener('resize', updateItemsToShow)
    return () => window.removeEventListener('resize', updateItemsToShow)
  }, [])

  const visibleItems = newarrivals.slice(currentIndex, currentIndex + itemsToShow)

  return (
    <div className="bg-gray-100 border w-full lg:w-[65%] h-auto py-4">
      <p className="font-semibold px-4 text-xl mb-2">New Arrivals</p>
      <div className="flex items-center gap-1 px-2">
        {currentIndex > 0 && (
          <button
            className="bg-black/50 rounded-md size-8 flex items-center justify-center"
            onClick={handlePrev}
          >
            <ChevronLeft color="white" size={20} />
          </button>
        )}

        <div className="flex gap-4 overflow-hidden flex-1">
          {visibleItems.map((product, index) => (
            <div
              key={index}
              className="bg-white flex-shrink-0   hover:scale-105 transition-transform"
              style={{ width: `calc(100% / ${itemsToShow} - 1rem)` }}
            >
              <div className="w-full h-[150px] p-2">
                <img
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="px-4 py-1 font-semibold text-sm">
                <p className="line-clamp-1">{product.name}</p>
                <p>{product.price} ETB</p>
              </div>
            </div>
          ))}
        </div>

        {currentIndex + itemsToShow < newarrivals.length && (
          <button
            onClick={handleNext}
            className="bg-black/50 rounded-md size-8 flex items-center justify-center"
          >
            <ChevronRight color="white" size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default NewArrival
