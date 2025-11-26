import { Link } from "react-router-dom";
import Button from "./Button";

export default function SearchDropdown({ showDropdown, filteredProducts }) {
  if (!showDropdown) return null;

  return (
    <div className="absolute top-14 left-0 px-2 right-0 w-full max-w-[700px] mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
      {filteredProducts.length > 0 ? (
        <div className="max-h-80 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Search Results ({filteredProducts.length})
              </h3>
              <span className="text-xs text-gray-500">Products</span>
            </div>
          </div>

          {/* Product List */}
          <div className="divide-y flex flex-col gap-1.5 divide-gray-100">
            {filteredProducts.map((item, index) => (
              <Link
                to={`/product-details/${item._id}`}
                key={item._id || index}
                className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer rounded-lg group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 group-hover:border-blue-300 transition-colors"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=📷")
                    }
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#4B3EC4] transition-colors">
                      {item.name}
                    </h4>

                    {item.category && (
                      <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full mt-1">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-900">
                      Rs. {item.price.toLocaleString()}
                    </span>
                    {item.originalPrice &&
                      item.originalPrice > item.price && (
                        <span className="block text-xs text-gray-400 line-through">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Press Enter to search all products</span>
              <span>↑↓ to navigate</span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 text-sm mb-4">
            We couldn't find any products matching your search.
          </p>

          <Button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#4B3EC4] bg-blue-50 rounded-lg hover:bg-blue-100"
            onClick={() => console.log("View all products")}
            text={`View all products <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>`}
          />
        </div>
      )}
    </div>
  );
}
