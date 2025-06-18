import { ChevronLeft, ChevronRight } from 'lucide-react'
import img1 from '../../assets/images/bag2.jpg'
import { useEffect, useState } from 'react'
import { instance } from '@/api/axiosInstance'

function NewArrival() {
  const staticNewArrivals = [
    { name: 'Women Jacket 1', price: 45, image: [img1] },
    { name: 'Women Jacket 2', price: 55, image: [img1] },
    { name: 'Women Jacket 3', price: 60, image: [img1] },
    { name: 'Women Jacket 4', price: 70, image: [img1] },
    { name: 'Women Jacket 5', price: 80, image: [img1] },
    { name: 'Women Jacket 6', price: 90, image: [img1] },
    { name: 'Women Jacket 6', price: 90, image: [img1] },
    { name: 'Women Jacket 6', price: 90, image: [img1] },
    { name: 'Women Jacket 6', price: 90, image: [img1] },
  ]

  const [newarrivals, setNewarrivals] = useState([])
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
      setNewarrivals(res.data)
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
          // disabled={currentIndex === 0}
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
          // disabled={currentIndex + item >= newarrivals.length}
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
