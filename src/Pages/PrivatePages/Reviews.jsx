import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useGetReviewedProducts, useGetUnReviewedProducts, useSubmitReview } from "../../hooks/useReviews";
import Input from "../../components/Input";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import AppLink from "../../components/AppLink";

function Reviews() {
  const [tab, setTab] = useState("ready-for-review");
  const [isModal,setIsModal]=useState(false)
  const [selectedProduct,setSelectedProduct]=useState({})

  const [form,setForm]=useState({ orderId:null, comment:"", rating:0 })

const userId=useAuthStore(state=>state.userId)
  // Example products (tum API se fetch karoge)

const { isLoading, data: readyToReviewProducts=[] } = useGetUnReviewedProducts();
const { isLoading : ReviewedProLoading, data: ReviewProducts=[] } = useGetReviewedProducts();
const { isPending, mutate, isError, error }=useSubmitReview()
// console.log("reviewed products :", ReviewProducts);
console.log("unreviewed products :", readyToReviewProducts);

  const handleRating = ( star) => {
    setForm((prev) => ({
      ...prev,
      rating: star,
    }));
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "Very Poor",
      2: "Poor",
      3: "Average",
      4: "Good",
      5: "Excellent"
    };
    return texts[rating] || "";
  };

  const openModal=(product)=>{

    setSelectedProduct(product)
    setIsModal(true)
    setForm({orderId:product.orderId, comment: "", rating: 0 });
  }

  const closeModal=()=>{
    setIsModal(false)
    setSelectedProduct({})
    setForm({orderId:null, comment: "", rating: 0 });
  }
useEffect(()=>{
  console.log(form);
  
},[form])
  const queryClient = useQueryClient();

const hanleSubmit = (e) => {
  e.preventDefault();
  if (!form.rating || form.comment.trim() === "") {
    toast.error("Please fill All Form");
    return;
  }

  const data = { productId: selectedProduct.productId, userId, ...form };
  console.log("Submitting review data:", data);
  // ✅ Mutate with onSuccess/onError to get response
  mutate(data, {
    onSuccess: (res) => {
      console.log("Review submitted successfully. Server response:", res);
      // Agar chahe to toast ya state update yahan kar sakte ho
      toast.success(res.message || "Review submitted!");
      console.log("error message" ,res.message);
      
            // 🚀 Instant UI refresh (NO reload)
      queryClient.invalidateQueries(["unreviewed-products", userId]);
      queryClient.invalidateQueries(["reviewed-products", userId]);
      if(!isPending){
        closeModal();
      }

    },
    onError: (err) => {
      console.error("Error submitting review:", err);
      toast.error(err.message || "Something went wrong!");
    }
  });

  
};
  const tabs = [
    { id: "ready-for-review", label: "Ready for Review", count: readyToReviewProducts?.length || 0 },
    { id: "reviewed", label: "Reviewed", count: ReviewProducts?.length || 0 }
  ];
  return (
    <div className="relative">
      {/* TABS */}
      <div className="flex gap-8 p-4 sticky top-15 bg-white z-40">
        {tabs.map((item)=>(
          <Button
          text={
            <p className="flex items-center justify-center gap-2">{item.label} <span className={`w-6 h-6 text-xs rounded-full flex items-center justify-center ${
                      tab === item.id 
                        ? "bg-[#4B3EC4] text-white" 
                        : "bg-[#CCCCCC] text-gray-600"
                    }`}>
                      {item.count}
                    </span></p>
          }
          onClick={() => setTab(item.id)}
          className={`border-t-4 font-semibold pt-4 px-1 rounded-lg w-full ${
            tab === item.id
              ? "border-[#4B3EC4] text-[#4B3EC4]"
              : "border-[#CCCCCC] text-[#CCCCCC] "
          }`}
        />
        ))}
        

      </div>

      {/* ------------ READY FOR REVIEW LIST ------------- */}
      {tab === "ready-for-review" && (
        <div className="p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Your Reviews</h1>
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
          )}
          {readyToReviewProducts?.map((product) => ( 
            <button onClick={()=>openModal(product)}
              key={product._id}
              className="border border-gray-300 hover:border-[#4B3EC4] duration-200 rounded-lg p-4 mb-4 bg-white  flex gap-4 w-full text-left group"
            >
                <img src={product.product.images[0]} className="w-25 rounded-md h-max" />

              <div>
              <p className="font-medium text-gray-800 group-hover:text-[#4B3EC4]">{product.product.name}</p>
              <p className="text-sm text-gray-500">{product.product.price}</p>

              
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ------------ REVIEWED TAB ------------- */}
     {tab === "reviewed" && (
  <div className="p-4 md:p-8 w-full max-w-[1800px]">
    {ReviewedProLoading && (
       <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
    )}
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Reviews</h1>
      <p className="text-gray-600 mt-2">
        {ReviewProducts?.length} product{ReviewProducts?.length !== 1 ? 's' : ''} reviewed
      </p>
    </div>

    {ReviewProducts?.length > 0 ? (
      <div className="space-y-6">
        {ReviewProducts?.map((rp) => {
          const reviewDate = new Date(rp.review.createdAt);
          const formattedDate = reviewDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          return (
            <div key={rp.product._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300" >
              {/* Main Content */}
              <div className="p-6">
                {/* Product Header */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={rp.product.images[0]}
                        alt={rp.product.name}
                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl border border-gray-200"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/160x160/f3f4f6/9ca3af?text=📷';
                        }}
                      />
                      {/* Reviewed Badge */}
                      <div className="absolute -top-2 -right-2">
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                          Reviewed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-3 overflow-hidden">
                          <AppLink to={`/product-details/${rp.product._id}`}>
                            {rp.product.name}
                          </AppLink>
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className={`w-5 h-5 ${index < rp.review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-lg font-bold text-gray-900">
                            {rp.review.rating}.0
                          </span>
                          <span className="text-sm text-gray-500">
                            {formattedDate}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-2xl font-bold text-gray-900">
                            Rs. {rp.product.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        
                        <AppLink to={`/product-details/${rp.product._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Buy Again
                        </AppLink>
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Review</h4>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          "{rp.review.comment}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orders Section */}
                {rp?.orders && rp?.orders?.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Orders with this product ({rp.orders.length})
                      </h4>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Show details
                      </button>
                    </div>

                    <div className="space-y-4">
                      {rp.orders.map((order) => (
                        <div
                          key={order.orderId}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                            <div>
                              <p className="text-sm text-gray-500">Order ID</p>
                              <p className="font-medium text-gray-900">{order.orderId}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Items in this order:</p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200"
                                >
                                  <img
                                    src={item.images?.[0]}
                                    alt={`Item ${idx + 1}`}
                                    className="w-10 h-10 object-cover rounded border border-gray-200"
                                  />
                                  <div className="flex-1 ">
                                    <p className="text-sm text-gray-900 line-clamp-3 overflow-hidden">
                                      {item.name || `Item ${idx + 1}`}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                      Rs. {item.price?.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      /* Empty State */
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Reviews Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          You haven't reviewed any products yet. Start sharing your experience to help other customers!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Review Recent Purchases
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    )}

  </div>
)}

          <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-500 ${
      isModal 
        ? "opacity-100 visible backdrop-blur-sm bg-black/50" 
        : "opacity-0 invisible backdrop-blur-0 bg-black/0"
    }`}>
      <div className={`relative w-full max-w-md transform transition-all duration-500 max-h-full ${isModal ? "scale-100 translate-y-0" : "scale-0 translate-y-8"}`}>
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-3 -right-3 p-3 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 group"
              >
                <FaTimes className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
      
              {/* Modal Content */}
              {isModal &&
              <form onSubmit={hanleSubmit} className="p-5 space-y-2.5 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 max-h-[92vh] overflow-hidden overflow-x-hidden overflow-y-scroll hide-scrollbar">
                <div className="flex gap-3 ">
                  <img src={selectedProduct?.product.images[0]} className="w-25 rounded-md h-max" />
                  <div>
                    <h1 className="truncate flex-1">{selectedProduct?.product.name}</h1>
                    <p>RS. {selectedProduct?.product.price}</p>
                  </div>
              
                </div>
                <label>Comment</label>
                <textarea class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#4B3EC4]" rows="5" 
                placeholder="Write your review here..." value={form.comment} onChange={(e)=> setForm(prev => ({ ...prev, comment: e.target.value })) }></textarea>
                {/* Rating Section */}
                <label>Rating</label>
                <div className="flex items-center my-3 ">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xl cursor-pointer" onClick={() => handleRating( star)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
                        <defs>
                          <linearGradient id="star-gradient" x1="0%">
                            <stop offset="0%" stopColor="#4B3EC4" />
                          </linearGradient>
                        </defs>

                        <path d="M10.7125 0.834866L7.78319 7.04035L1.22918 8.03866C0.053853 8.21677 -0.417174 9.73064 0.435161 10.5977L5.17683 15.4253L4.05534 22.2447C3.85347 23.4774 5.09609 24.4007 6.13683 23.8242L12 20.6043L17.8632 23.8242C18.9039 24.396 20.1465 23.4774 19.9447 22.2447L18.8232 15.4253L23.5648 10.5977C24.4172 9.73064 23.9461 8.21677 22.7708 8.03866L16.2168 7.04035L13.2875 0.834866C12.7626 -0.271247 11.2419 -0.285308 10.7125 0.834866Z"
                          fill={form.rating >= star ? "url(#star-gradient)" : "none"} stroke={
                          form.rating >= star ? "url(#star-gradient)": "#4B3EC4" } strokeWidth="1.2"/>
                      </svg>
                    </span>
                  ))}
                </div>

                {/* Rating text */}
                <span className="ml-3 text-gray-500">
                  {getRatingText(form.rating)}
                </span>
                </div>
                <Button type="submit" text="Submit" loading={isPending} />
              </form>
}
            </div>
    </div>
    </div>
  );
}

export default Reviews;
