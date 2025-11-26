import React, { useEffect, useState } from 'react'
import { useDeleteOrder, useGetOrders } from '../../hooks/useOrders'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import { FaTimes } from "react-icons/fa";
import { useProductsStore } from '../../stores/productsStore';

function Orders() {
    const [orderStatus, setOrderStatus] = useState("All orders")
    const [isModal, setisModal] = useState(false)
    const [orders, setOrders] = useState([])
    const [orderDetail, setOrderDetail] = useState(null)

    const userId = localStorage.getItem("userId");
    const { isLoading, error, products } = useProductsStore()
    const { data } = useGetOrders(userId)
    
    const productsIds = orderDetail?.items?.map((item) => item.product)
    const filteredProducts = products?.filter(product => productsIds?.includes(product._id))

    useEffect(() => {
        if (data) {
            setOrders(data.orders || [])
        }
    }, [data])

    const filteredOrders = orders?.filter(order => 
        orderStatus === "All orders" ? order : order.status === orderStatus
    )

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: 'numeric',
        month: "long",
        day: "numeric"
    })

    const statusColors = {
        "Pending": "bg-yellow-100 text-yellow-800",
        "Processing": "bg-blue-100 text-blue-800",
        "Shipped": "bg-purple-100 text-purple-800",
        "Delivered": "bg-green-100 text-green-800",
        "Cancelled": "bg-red-100 text-red-800"
    }

    const deleteOrder=useDeleteOrder()
    const hanleDeleteOrder=(orderId)=>{
      deleteOrder.mutate({orderId})
    }
    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-5 2xl:mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-2">Manage and track your orders</p>
                </div>

                {/* Status Filter */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {["All orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                            <Button text={`${status} ${status==="All orders"? orders.length:orders.filter(item=> item.status === status).length}`}
                                key={status}
                                onClick={() => setOrderStatus(status)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    orderStatus === status
                                        ? "bg-[#4B3EC4] text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            />

                        ))}
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders?.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => {
                                    setOrderDetail(order)
                                    setisModal(true)
                                }}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Order ID</p>
                                                <p className="font-medium text-gray-900">{order._id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Date</p>
                                                <p className="font-medium text-gray-900">
                                                    {dateFormatter.format(new Date(order.createdAt))}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="font-medium text-gray-900">
                                                    Rs. {order.totalAmount?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Items Preview */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex -space-x-2">
                                                {order.items?.slice(0, 3).map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                                                    >
                                                        {item.quantity}
                                                    </div>
                                                ))}
                                                {order.items?.length > 3 && (
                                                    <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                                                        +{order.items.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        {/* Shipping Address */}
                                        <p className="text-sm text-gray-600">
                                            Shipping to: {order.shippingAddress?.fullName}, {order.shippingAddress?.city}
                                        </p>
                                    </div>

                                    {/* Status and Action */}
                                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                                            {order.status}
                                        </span>
                                        {order.status==="Cancelled" ?"":(
                                          <Button text='Cancel order' type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium 
                                        text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                                        onClick={(e) => { e.stopPropagation();hanleDeleteOrder(order._id)}} />
                                        )}
                                        
                                        <Button text='View details' className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium 
                                      text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
                                        onClick={()=>{setOrderDetail(item);setisModal(true)}} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-500 mb-6">
                                {orderStatus === "All orders" 
                                    ? "You haven't placed any orders yet." 
                                    : `No ${orderStatus.toLowerCase()} orders found.`
                                }
                            </p>
                            <Link
                                to="/shop"
                                className="inline-flex items-center px-6 py-3 bg-[#4B3EC4] text-white font-medium rounded-lg hover:opacity-90 transition-colors"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                <div className={`fixed inset-0 bg-[#0000005e] bg-opacity-50 flex items-center justify-center p-4 z-50 transition-all duration-300 ${
                    isModal ? "opacity-100 visible translate-0" : "opacity-0 invisible translate-y-64"
                }`}>
                    <div className={`bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
                        isModal ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
                    }`}>
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                                    <p className="text-gray-600 mt-1">Order #{orderDetail?._id}</p>
                                </div>
                                <button
                                    onClick={() => { setisModal(false); setOrderDetail(null) }}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="p-6 space-y-6">
                            {/* Order Status and Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-500">Order Status</p>
                                    <p className={`font-medium ${statusColors[orderDetail?.status] || "bg-gray-100 text-gray-800"} px-2 py-1 rounded-full text-sm inline-block mt-1`}>
                                        {orderDetail?.status}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-medium text-gray-900 mt-1">
                                        {orderDetail?.createdAt ? dateFormatter.format(new Date(orderDetail.createdAt)) : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-medium text-gray-900 mt-1 capitalize">
                                        {orderDetail?.paymentMethod}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-medium text-gray-900 mt-1">
                                        Rs. {orderDetail?.totalAmount?.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                                <div className="text-gray-600">
                                    <p >name : <span className="font-medium">{orderDetail?.shippingAddress?.fullName}</span> </p>
                                    <p>Address : <span className="font-medium">{orderDetail?.shippingAddress?.address}</span> </p>
                                    <p>City :  <span className="font-medium">{orderDetail?.shippingAddress?.city}, {orderDetail?.shippingAddress?.postalCode}</span></p>
                                    <p>Country : <span className="font-medium">{orderDetail?.shippingAddress?.country}</span></p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items ({orderDetail?.items?.length || 0})</h3>
                                <div className="space-y-4">
                                    {filteredProducts?.map((product) => {
                                        const orderItem = orderDetail?.items?.find(item => item.product === product._id)
                                        return (
                                            <div key={product._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                <img
                                                    src={product.images?.[0]}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                                        <Link to={`/product-details/${product._id}`}>
                                                            {product.name}
                                                        </Link>
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{product.brand}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Quantity: {orderItem?.quantity}</p>
                                                    <p className="font-medium text-gray-900">
                                                        Rs. {(orderItem?.price * orderItem?.quantity)?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total Amount:</span>
                                    <span>Rs. {orderDetail?.totalAmount?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders