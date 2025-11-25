import React from 'react'
import { FaTimes } from "react-icons/fa";
import Button from './Button';

function ProductModal ({isModal, closeModal, image, name, discountPrice, price, brand, category, tags=[], inStock, description, id, addToCart,isPending }) {
  return (
        <div className={`fixed inset-0 bg-[#0000005e] flex items-center justify-center p-4 z-50 transition-all duration-300 ${
            isModal ? "opacity-100 visible translate-0" : "opacity-0 invisible translate-y-64"
          }`}
        >
          <div className={` bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar relative `}>
            {/* Header */}
            <Button icon={FaTimes}
                onClick={closeModal}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors absolute right-2 top-2 z-100"
              />
    
            {/* Modal Body */}
            <div className="relative z-80 flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                      // alt={singleProduct._id}
                      src={image}
                      className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                    />
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 sm:pr-12 leading-tight">{name}</h2>
                      <section >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>
                        <div className="flex items-baseline gap-3 mt-3">
        <p className="text-xl md:text-2xl font-bold text-[#4B3EC4]">Rs. {discountPrice}</p>
        {discountPrice && (
          <p className="text-lg text-gray-400 line-through">Rs. {price}</p>
        )}
      </div>
                        <p className="text-gray-500 text-sm mt-1">
        Brand: <span className="font-medium">{brand || "No Brand"}</span> | 
        Category: <span className="font-medium">{category}</span>
      </p>
                        {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags?.map((tag, i) => (
          <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
            #{tag}
          </span>
        ))}
      </div>
                        <p className={`mt-2 text-sm ${inStock ? "text-green-600" : "text-red-600"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
                        {/* Description */}
      <div className="mt-4 max-h-40 overflow-y-auto border-t pt-3 text-gray-700 text-sm">
        {description}
      </div>
    
      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button className="bg-[#4B3EC4] hover:opacity-90 text-white px-6 py-2 rounded-md transition" onClick={()=>addToCart(id,1)}>
          {isPending ? "Adding..." : "Add to Cart"}
        </button>
      </div>
                      </section>
                    </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProductModal 