export default function OrderCard({ order, onOpen, onCancel, loading, statusColors }) {
  
  // ------------------------------
  // SHIMMER / LOADING SKELETON UI
  // ------------------------------
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
        <div className="flex flex-col lg:flex-row justify-between gap-4">

          {/* Left Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-40 bg-gray-300 rounded"></div>

            <div className="h-4 w-20 bg-gray-200 rounded mt-4"></div>
            <div className="h-5 w-32 bg-gray-300 rounded"></div>

            <div className="flex gap-2 mt-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Right Buttons Skeleton */}
          <div className="flex flex-col items-end gap-3">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-300 rounded-lg"></div>
            <div className="h-8 w-28 bg-gray-300 rounded-lg"></div>
          </div>

        </div>
      </div>
    );
  }

  // ------------------------------
  // ACTUAL ORDER CARD UI
  // ------------------------------
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md"
      onClick={() => onOpen(order)}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        {/* Left info */}
        <div className="flex-1">

          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{order._id}</p>

          <p className="text-sm text-gray-500 mt-3">Date</p>
          <p className="font-medium">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {/* Preview */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex -space-x-2">
              {order.items.slice(0, 3).map((item, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                  {item.quantity}
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                  +{order.items.length - 3}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col items-end gap-3">

          <span className={`px-3 py-1 text-sm rounded-full ${statusColors[order.status]}`}>
            {order.status}
          </span>

          {order.status !== "Cancelled" && (
            <button
              className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
              onClick={(e) => { 
                e.stopPropagation(); 
                onCancel(order._id); 
              }}
            >
              Cancel Order
            </button>
          )}

          <button
            className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
            onClick={(e) => { 
              e.stopPropagation(); 
              onOpen(order); 
            }}
          >
            View Details
          </button>

        </div>
      </div>
    </div>
  );
}
