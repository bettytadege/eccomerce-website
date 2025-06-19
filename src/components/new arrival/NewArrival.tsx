import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useEffect, useState } from 'react'
import { instance } from '@/api/axiosInstance'
import { Products } from '../types/type'

function NewArrival() {


  const [newarrivals, setNewarrivals] = useState<Products[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const item = 4

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - item)
    }
  }

  const handleNext = () => {
    if (currentIndex + item < newarrivals.length) {
      setCurrentIndex(currentIndex + item)
    }
  }

  const fetchNewArrivalProduct = async () => {
    try {
      const res = await instance.get('product/new-arrival?limit=20')
      console.log(' new arrivals:', res.data)
      setNewarrivals(res.data.newArrival)
    } catch (error) {
      console.error('Error :', error)
    }
  }

  useEffect(() => {
    fetchNewArrivalProduct()
  }, [])

  const visibleItems = newarrivals.slice(currentIndex, currentIndex + item)

  return (
    <div className="bg-gray-100 border w-[65%] h-[320px] ">
      <p className="font-semibold p-4 text-xl">New Arrivals</p>
      <div className="flex items-center gap-1">
        {
          currentIndex > 0 &&

          <button

            className="bg-black/50 backdrop-blur-lgaspect-square size-8 flex items-center justify-center disabled:opacity-50"
            onClick={handlePrev}
          >
            <ChevronLeft color='white' />
          </button>
        }

        <div className="flex px-2  gap-4 flex-1">
          {visibleItems.map((product, index) => (
            <div className="w-[190px] h-[220px] bg-white hover:scale-105" key={index}>
              <div className="w-[190px] h-[150px] p-3">
                <img
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-5 font-semibold text-sm">
                <p className='line-clamp-1'>{product.name}</p>
                <p>{product.price} ETB</p>
              </div>
            </div>
          ))}
        </div>

        {currentIndex + item < newarrivals.length &&
          <button

            onClick={handleNext}
            className="bg-black/50 backdrop-blur-lg aspect-square size-8 flex items-center justify-center disabled:opacity-50"
          >
            <ChevronRight color="white" />
          </button>
        }
      </div>
    </div>
  )
}

export default NewArrival
