
import { Skeleton } from '../ui/skeleton'

function ProductOptionSkeleton() {
  return (
    <>
    <div className="lg:w-[40%] ">
    <div className="flex flex-col gap-10 ">
      <div className="space-y-4 md:space-y-2">
        <Skeleton className="bg-gray-200 w-full h-10" />

        <div className="flex justify-between">
          <Skeleton className="bg-gray-200 w-full h-6" />
        </div>
        <hr />
        <div className="space-y-2">
          <Skeleton className="bg-gray-200 w-full h-6" />
          <Skeleton className="bg-gray-200 w-40 h-6" />
          <Skeleton className="bg-gray-200 w-14 h-6" />
        </div>
      </div>
     
    <div className="space-y-5">
      <div className="">
        <Skeleton className="bg-gray-200 w-40 h-8" />
      </div>

      <div className="flex gap-4">
        <Skeleton className="bg-gray-200 w-14 h-9" />
        <Skeleton className="bg-gray-200 w-14 h-9" />
        <Skeleton className="bg-gray-200  w-14 h-9" />
      </div>
      </div>
      <div className="space-y-2">
          
          <Skeleton className="bg-gray-200 w-40 h-8" />
          
          <Skeleton className="bg-gray-200 w-40 h-8" />
          </div>
          <div className="flex gap-10">
          <Skeleton className="bg-gray-200 w-full h-10" />
          
          <Skeleton className="bg-gray-200 w-full h-10" />
        </div>
        </div>
    </div>
    </>
  )
}

export default ProductOptionSkeleton