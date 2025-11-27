import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import LoginModal from "./LoginModal";
import AppLink from "./AppLink";

export default function ProductCard({ image, name, oldPrice, price, onClick, productID, addToCart, loading }) {
if (loading) {
  return (
    <div className="group relative bg-white border border-[#9999999c] rounded-xl overflow-hidden animate-pulse">
        
        {/* Image Skeleton */}
        <div className="relative bg-gray-300 h-64 w-full animate-pulse rounded"></div>

        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
  );
}
const token = localStorage.getItem("token");
  const userId=localStorage.getItem("userId")
      const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Modal close ka function
  const closeModal = () => setIsLoginModalOpen(false);
  return (
    <>
    <div className="group relative bg-white border border-[#9999999c] rounded-xl hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative overflow-hidden flex items-center justify-center bg-[#F6F7FB]">
        <img
          src={image}
          alt="Portable Electric Grinder Maker"
          loading="lazy"
          decoding="async"
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute left-0 bottom-0 md:translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 md:group-hover:translate-y-0">
          <button className="flex items-center justify-center w-9 h-9 rounded-full shadow-1 ease-out duration-200 text-dark bg-white 
          hover:text-[#4B3EC4]" onClick={onClick}>
            <FaEye />
          </button>
          <button className="flex items-center justify-center w-9 h-9 rounded-full shadow-1 ease-out duration-200 text-dark bg-white 
          hover:text-[#4B3EC4]" onClick={()=>{userId && token ? addToCart(productID,1):setIsLoginModalOpen(true)}} >
            <FaCartShopping />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 hover:text-[#4B3EC4] transition-colors truncate">
          <AppLink to={`/product-details/${productID}`}>{name}</AppLink>
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-gray-900">RS.{price}</span>
          <span className="text-sm line-through text-gray-400">
            RS.{oldPrice}
          </span>
        </div>
      </div>
    </div>

            <LoginModal
        isModal={isLoginModalOpen}
        closeModal={closeModal}
      />
      </>
  );
}
