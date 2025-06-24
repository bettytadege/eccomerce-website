import { Card } from "../ui/card"

function UserOrders() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-semibold text-lg py-10">Orders</h1>
      <Card className="shadow-none border-0 h-28">
        <div className="flex flex-col justify-center items-center gap-2 py-4 text-sm text-center">
          <p className="font-semibold">No orders yet</p>
          <span>Go to store to place an order</span>
        </div>
      </Card>
    </div>
  )
}

export default UserOrders
