
import { Skeleton } from '../ui/skeleton'

function ProductDetailSkeleton() {
  return (
    <div className="lg:w-[60%] md:w-[50%] bg-white mb-8">
    <div className="h-full lg:flex md:flex lg:gap-x-8 md:gap-4 animate-pulse">
      
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="bg-gray-200 w-16 h-16 rounded"
          />
        ))}
      </div>

      
      <div className="flex-1 h-full flex items-center justify-center">
        <Skeleton className="bg-gray-200 lg:w-[650px] lg:h-[550px] md:w-full md:h-full rounded" />
      </div>
    </div>
  </div>
  )
}

export default ProductDetailSkeleton