import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ image, name, oldPrice, price, onClick, productID, addToCart }) {
  return (
    <div className="group relative bg-white border border-[#9999999c] rounded-xl hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative overflow-hidden flex items-center justify-center bg-[#F6F7FB]">
        <img
          src={image}
          alt="Portable Electric Grinder Maker"
          loading="lazy"
          decoding="async"
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button className="flex items-center justify-center w-9 h-9 rounded-full shadow-1 ease-out duration-200 text-dark bg-white 
          hover:text-blue" onClick={onClick}>
            <FaEye />
          </button>
          <button className="flex items-center justify-center w-9 h-9 rounded-full shadow-1 ease-out duration-200 text-dark bg-white 
          hover:text-blue" onClick={()=>addToCart(productID,1)}>
            <FaCartShopping />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate">
          <Link to={`/product-details/${productID}`}>{name}</Link>
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-gray-900">RS.{price}</span>
          <span className="text-sm line-through text-gray-400">
            RS.{oldPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
