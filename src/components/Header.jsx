import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useGetCart } from "../hooks/useCart";
import { useUserStore } from "../stores/userStore";
import { useCartStore } from "../stores/cartStore";
import { useProductsStore } from "../stores/productsStore";

const profilPopup = [
  {
    name: "Your Orders",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18.1797 1.99902H5.82617C4.46164 1.99902 3.35547 3.10519 3.35547 4.46973V20.5293C3.35547 21.8938 4.46164 23 5.82617 23H18.1797C19.5442 23 20.6504 21.8938 20.6504 20.5293V4.46973C20.6504 3.10519 19.5442 1.99902 18.1797 1.99902Z"
          stroke="#1A1A1A"
          strokeWidth="1.5"
        />
        <path
          d="M8.29492 8.17627H15.707M8.29492 13.1177H15.707M8.29492 18.0591H13.2363"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    link: "/Orders",
  },

  {
    name: "My Profile",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16.1226 6.75C15.9388 9.22828 14.0601 11.25 11.9976 11.25C9.9351 11.25 8.05307 9.22875 7.8726 6.75C7.6851 4.17188 9.51322 2.25 11.9976 2.25C14.482 2.25 16.3101 4.21875 16.1226 6.75Z"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0001 14.25C7.92199 14.25 3.78293 16.5 3.01699 20.7469C2.92465 21.2588 3.21433 21.75 3.75011 21.75H20.2501C20.7864 21.75 21.0761 21.2588 20.9837 20.7469C20.2173 16.5 16.0782 14.25 12.0001 14.25Z"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    ),
    link: "/MyProfile",
  },
  {
    name: "Your Reviews",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.60061 8.64407H16.3116M7.60061 12.9996H12.5005M10.1322 20.1916L7.60061 21.7105V18.4439H5.42287C4.55651 18.4439 3.72563 18.0998 3.11302 17.4872C2.50041 16.8745 2.15625 16.0437 2.15625 15.1773V6.46632C2.15625 5.59996 2.50041 4.76909 3.11302 4.15648C3.72563 3.54387 4.55651 3.19971 5.42287 3.19971H18.4893C19.3557 3.19971 20.1866 3.54387 20.7992 4.15648C21.4118 4.76909 21.756 5.59996 21.756 6.46632V11.3663"
          stroke="#1A1A1A"
          strokeWidth="1.63331"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.2712 21.5117L15.9062 22.7509C15.836 22.7874 15.757 22.8037 15.6781 22.798C15.5992 22.7922 15.5235 22.7646 15.4593 22.7183C15.3951 22.672 15.3451 22.6088 15.3148 22.5357C15.2845 22.4626 15.2751 22.3825 15.2877 22.3044L15.7396 19.6792L13.8264 17.8204C13.7693 17.7652 13.7289 17.6951 13.7098 17.618C13.6906 17.5409 13.6935 17.46 13.7182 17.3845C13.7428 17.309 13.7882 17.242 13.8491 17.191C13.91 17.14 13.984 17.1072 14.0627 17.0963L16.7065 16.7131L17.889 14.3252C17.9244 14.254 17.9789 14.1942 18.0464 14.1524C18.1139 14.1105 18.1918 14.0884 18.2712 14.0884C18.3506 14.0884 18.4285 14.1105 18.496 14.1524C18.5635 14.1942 18.618 14.254 18.6534 14.3252L19.8359 16.7131L22.4797 17.0963C22.5582 17.1076 22.6319 17.1406 22.6925 17.1916C22.7532 17.2426 22.7984 17.3096 22.823 17.3849C22.8475 17.4603 22.8505 17.541 22.8316 17.618C22.8127 17.6949 22.7727 17.7651 22.716 17.8204L20.8028 19.6792L21.2536 22.3033C21.2672 22.3816 21.2585 22.4621 21.2286 22.5356C21.1987 22.6092 21.1487 22.6729 21.0844 22.7195C21.0201 22.7661 20.944 22.7938 20.8648 22.7993C20.7856 22.8049 20.7064 22.7881 20.6362 22.7509L18.2712 21.5117Z"
          stroke="#1A1A1A"
          strokeWidth="1.63331"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    link: "/Reviews",
  },
  {
    name: "Customer Support",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M19.936 7.9999H20.998C21.5285 7.9999 22.0372 8.21061 22.4123 8.58569C22.7873 8.96076 22.998 9.46947 22.998 9.9999V13.9999C22.998 14.5303 22.7873 15.039 22.4123 15.4141C22.0372 15.7892 21.5285 15.9999 20.998 15.9999H19.936C19.6925 17.9333 18.7516 19.7113 17.29 21.0001C15.8285 22.289 13.9467 23.0001 11.998 22.9999V20.9999C13.5893 20.9999 15.1155 20.3678 16.2407 19.2425C17.3659 18.1173 17.998 16.5912 17.998 14.9999V8.9999C17.998 7.4086 17.3659 5.88248 16.2407 4.75726C15.1155 3.63204 13.5893 2.9999 11.998 2.9999C10.4067 2.9999 8.88062 3.63204 7.75541 4.75726C6.63019 5.88248 5.99805 7.4086 5.99805 8.9999V15.9999H2.99805C2.46761 15.9999 1.95891 15.7892 1.58383 15.4141C1.20876 15.039 0.998047 14.5303 0.998047 13.9999V9.9999C0.998047 9.46947 1.20876 8.96076 1.58383 8.58569C1.95891 8.21061 2.46761 7.9999 2.99805 7.9999H4.06005C4.30408 6.0668 5.24513 4.28917 6.70662 3.00058C8.16811 1.71198 10.0496 1.00098 11.998 1.00098C13.9465 1.00098 15.828 1.71198 17.2895 3.00058C18.751 4.28917 19.692 6.0668 19.936 7.9999ZM2.99805 9.9999V13.9999H3.99805V9.9999H2.99805ZM19.998 9.9999V13.9999H20.998V9.9999H19.998ZM7.75805 15.7849L8.81805 14.0889C9.77108 14.686 10.8734 15.0018 11.998 14.9999C13.1227 15.0018 14.225 14.686 15.178 14.0889L16.238 15.7849C14.9674 16.5812 13.4976 17.0024 11.998 16.9999C10.4985 17.0024 9.02872 16.5812 7.75805 15.7849Z"
          fill="#1A1A1A"
        />
      </svg>
    ),
    link: "https://wa.me/923111555374",
  },
  {
    name: "Notifications",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5.42716 11.5112C5.35708 12.8514 5.43772 14.278 4.2406 15.1756C3.96537 15.3815 3.74203 15.6489 3.58836 15.9564C3.43469 16.2639 3.35495 16.603 3.35547 16.9468C3.35547 17.9039 4.1062 18.7199 5.08348 18.7199H18.9076C19.8848 18.7199 20.6356 17.9039 20.6356 16.9468C20.6356 16.2498 20.3072 15.5932 19.7504 15.1756C18.5533 14.278 18.6339 12.8514 18.5639 11.5112C18.4775 9.82745 17.7478 8.24116 16.5254 7.07993C15.3031 5.91871 13.6815 5.27124 11.9955 5.27124C10.3095 5.27124 8.68793 5.91871 7.4656 7.07993C6.24326 8.24116 5.51355 9.82745 5.42716 11.5112Z"
          stroke="#1A1A1A"
          strokeWidth="1.44001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.8772 18.72C14.8772 19.4838 14.5738 20.2164 14.0337 20.7565C13.4936 21.2966 12.761 21.6 11.9972 21.6C11.2334 21.6 10.5008 21.2966 9.96072 20.7565C9.42062 20.2164 9.11719 19.4838 9.11719 18.72M10.5572 3.47991C10.5572 4.27479 11.2023 5.27992 11.9972 5.27992C12.7921 5.27992 13.4372 4.27479 13.4372 3.47991C13.4372 2.68502 12.7921 2.3999 11.9972 2.3999C11.2023 2.3999 10.5572 2.68502 10.5572 3.47991Z"
          stroke="#1A1A1A"
          strokeWidth="1.44001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    link: "/Notification",
  },
  {
    name: "Sign Out",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M13.4742 21.2456H8.33717C7.04531 21.3047 5.78214 20.8527 4.82096 19.9876C3.85979 19.1224 3.27789 17.9136 3.20117 16.6226V7.37862C3.27789 6.08769 3.85979 4.87887 4.82096 4.0137C5.78214 3.14852 7.04531 2.69657 8.33717 2.75563H13.4732"
          stroke="#F04438"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.7925 12.0005H7.43945"
          stroke="#F04438"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M16.0801 17.1367L20.4841 12.7327C20.677 12.538 20.7853 12.2749 20.7853 12.0007C20.7853 11.7266 20.677 11.4635 20.4841 11.2687L16.0801 6.86475"
          stroke="#F04438"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    link: "",
    // onclick: handleLogout
  },
];

function Header() {
  const [searchVal, setSearchVal] = useState('');
  const userData=useUserStore((state)=>state.user)
  const [showDropdown, setShowDropdown]=useState(false)
  const containerRef=useRef(null)
// console.log(userData);
const {isLoading, error, products}=useProductsStore()
  const cartItems=useCartStore((state)=>state.cart)

    const filteredProducts=products?.filter((product)=>product.name.toLowerCase().includes(searchVal.toLowerCase()))
    // console.log(filteredProducts);
    useEffect(()=>{
      const handleClickOutside=(event)=>{
        if(containerRef.current && !containerRef.current.contains(event.target)){
          setShowDropdown(false);
        }
      }
      document.addEventListener("mousedown",handleClickOutside)
      return ()=>document.removeEventListener("mousedown",handleClickOutside)
    },[])

  return (
    <div className="w-full px-4 sm:px-6 xl:px-0 sticky top-0 z-50 bg-white shadow-lg @container">
      <div className="flex mx-auto max-w-7xl flex-col @xsm:flex-row gap-2 lg:gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 py-2 2xl:py-5">
        {/* Logo and Search Section */}
        <div className="flex w-full gap-3 lg:gap-5 flex-row justify-between sm:items-center sm:gap-6">
          <Link className="shrink-0 text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors" to="/">
            SHOPNEST
          </Link>

          <div className="sm:hidden flex items-center justify-end gap-1 xl:gap-5 w-full @xsm:w-auto">
              {/* Account - Hidden on mobile, visible on xl and up */}
              {!userData?(
              <Link to="/login" className="items-center gap-2.5 hidden xl:flex hover:text-blue-600 transition-colors" >
                <div className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 rounded-full hover:border-blue-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M10.5186 10.0869C13.8936 10.087 16.6296 12.8232 16.6299 16.1982V16.5107C16.6297 16.9248 16.2939 17.2607 15.8799 17.2607C15.466 16.2605 15.13 16.9247 15.1299 16.5107V16.1982C15.1296 13.6516 13.0652 11.587 10.5186 11.5869H7.48047C4.93384 11.587 2.86939 13.6516 2.86914 16.1982V16.5107C2.86899 16.9248 2.5332 17.2607 2.11914 17.2607C1.70502 17.2607 1.36929 16.9248 1.36914 16.5107V16.1982C1.36939 12.8232 4.10541 10.087 7.48047 10.0869H10.5186ZM8.99902 0.740234C11.2345 0.740301 13.0469 2.55263 13.0469 4.78809C13.0465 7.02326 11.2343 8.83587 8.99902 8.83594C6.76376 8.83589 4.9515 7.02328 4.95117 4.78809C4.95117 2.55261 6.76356 0.740277 8.99902 0.740234ZM8.99902 2.24023C7.59199 2.24028 6.45117 3.38104 6.45117 4.78809C6.4515 6.19485 7.59219 7.33589 8.99902 7.33594C10.4058 7.33587 11.5465 6.19484 11.5469 4.78809C11.5469 3.38105 10.406 2.2403 8.99902 2.24023Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="group">
                  <span className="block uppercase font-medium text-xs text-gray-600">
                    account
                  </span>
                  <p className="font-medium text-sm text-gray-800 hover:text-blue-600">
                    Sign In / Register
                  </p>
                </div>
              </Link>):(
                <Link to="/profileLayout" className="items-center gap-2.5 flex hover:text-blue-600 transition-colors w-8 h-8 lg:w-auto lg:h-auto" >
                  <img src={userData?.image} className="rounded-full w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 flex-shrink-0 object-cover" />
                <div className="group hidden xl:inline-block">
                  <span className="block font-medium text-xs text-gray-600">
                    {userData?.name}
                  </span>
                  <p className="font-medium text-sm text-gray-800 hover:text-blue-600">
                    {userData?.email}
                  </p>
                </div>
              </Link>
              )}              
              {/* Cart */}
                <Link to="/cart" 
                  className="flex items-center gap-2.5 w-8 h-8 justify-center hover:text-blue-600 transition-colors"
                  title="Cart"
                >
                  <span className="relative inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M12 4V5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5V4M2.5 17H15.5C16.3284 17 17 16.3284 17 15.5V2.5C17 1.67157 16.3284 1 15.5 1H2.5C1.67157 1 1 1.67157 1 2.5V15.5C1 16.3284 1.67157 17 2.5 17Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="flex items-center justify-center font-medium text-xs absolute -right-2 -top-2 bg-red-600 w-4 h-4 rounded-full text-white">
                      {cartItems?.items?.length || 0}
                    </span>
                  </span>
                </Link>
            </div>

           <div className="relative mx-auto hidden sm:inline-block" ref={containerRef}>
                <div className="relative min-w-[200px] max-w-[475px] w-full sm:min-w-[300px] lg:min-w-[370px] border border-gray-300 rounded-full focus-within:border-gray-900 focus-within:ring-1 transition-all">
                  <input onFocus={()=>setShowDropdown(true)} onChange={(e) => setSearchVal(e.target.value)} value={searchVal} id="search" placeholder="Search Products" autoComplete="off"
                    className="w-full rounded-full border-0 focus:border-gray-800 h-[35px] sm:h-[42px] sm:py-2.5 pl-5 pr-12 outline-none ease-in duration-200 text-sm" type="search" name="search"
                  />
                  <button type="submit" id="search-btn" aria-label="Search"
                    className="absolute flex items-center h-[42px] justify-center duration-200 ease-in -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      width={24}
                      height={24}
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                {showDropdown&& 
               <div className="absolute top-14 left-0 px-2 right-0 w-full max-w-[700px] mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
  {filteredProducts.length > 0 ? (
    <div className="max-h-80 overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Search Results ({filteredProducts.length})
          </h3>
          <span className="text-xs text-gray-500">Products</span>
        </div>
      </div>

      {/* Products List */}
      <div className="divide-y flex flex-col gap-1.5 divide-gray-100">
        {filteredProducts.map((item, index) => (
          <Link to={`/product-details/${item._id}`}
            key={item._id || index}
            className="  hover:bg-blue-50 transition-colors duration-200 cursor-pointer rounded-lg group"
          >
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 group-hover:border-blue-300 transition-colors"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=📷';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h4>
                
                {item.category && (
                  <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full mt-1">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Price */}
              {item.price && (
                <div className="flex-shrink-0 text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    Rs. {item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="block text-xs text-gray-400 line-through">
                      Rs. {item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}

              {/* Arrow Indicator */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-4 h-4 text-gray-400"
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
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
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
      <button
        onClick={() => {
          // Clear search or show all products
          console.log('View all products');
        }}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        View all products
        <svg
          className="w-4 h-4 ml-1"
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
      </button>
    </div>
  )}
</div>
}     
        </div>
        </div>

       

        {/* User Actions Section */}

          <div className="hidden sm:flex items-center gap-1 xl:gap-5 w-full @xsm:w-auto">
              {/* Account - Hidden on mobile, visible on xl and up */}
              {!userData?(
              <Link to="/login" className="items-center gap-2.5 hidden xl:flex hover:text-blue-600 transition-colors" >
                <div className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 rounded-full hover:border-blue-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M10.5186 10.0869C13.8936 10.087 16.6296 12.8232 16.6299 16.1982V16.5107C16.6297 16.9248 16.2939 17.2607 15.8799 17.2607C15.466 16.2605 15.13 16.9247 15.1299 16.5107V16.1982C15.1296 13.6516 13.0652 11.587 10.5186 11.5869H7.48047C4.93384 11.587 2.86939 13.6516 2.86914 16.1982V16.5107C2.86899 16.9248 2.5332 17.2607 2.11914 17.2607C1.70502 17.2607 1.36929 16.9248 1.36914 16.5107V16.1982C1.36939 12.8232 4.10541 10.087 7.48047 10.0869H10.5186ZM8.99902 0.740234C11.2345 0.740301 13.0469 2.55263 13.0469 4.78809C13.0465 7.02326 11.2343 8.83587 8.99902 8.83594C6.76376 8.83589 4.9515 7.02328 4.95117 4.78809C4.95117 2.55261 6.76356 0.740277 8.99902 0.740234ZM8.99902 2.24023C7.59199 2.24028 6.45117 3.38104 6.45117 4.78809C6.4515 6.19485 7.59219 7.33589 8.99902 7.33594C10.4058 7.33587 11.5465 6.19484 11.5469 4.78809C11.5469 3.38105 10.406 2.2403 8.99902 2.24023Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="group">
                  <span className="block uppercase font-medium text-xs text-gray-600">
                    account
                  </span>
                  <p className="font-medium text-sm text-gray-800 hover:text-blue-600">
                    Sign In / Register
                  </p>
                </div>
              </Link>):(
                <Link to="/profileLayout" className="items-center gap-2.5 flex hover:text-blue-600 transition-colors w-8 h-8 lg:w-auto lg:h-auto" >
                  <img src={userData?.image} className="rounded-full w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 flex-shrink-0 object-cover" />
                <div className="group hidden xl:inline-block">
                  <span className="block font-medium text-xs text-gray-600">
                    {userData?.name}
                  </span>
                  <p className="font-medium text-sm text-gray-800 hover:text-blue-600">
                    {userData?.email}
                  </p>
                </div>
              </Link>
              )}              
              {/* Cart */}
                <Link to="/cart" 
                  className="flex items-center gap-2.5 w-8 h-8 justify-center hover:text-blue-600 transition-colors"
                  title="Cart"
                >
                  <span className="relative inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M12 4V5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5V4M2.5 17H15.5C16.3284 17 17 16.3284 17 15.5V2.5C17 1.67157 16.3284 1 15.5 1H2.5C1.67157 1 1 1.67157 1 2.5V15.5C1 16.3284 1.67157 17 2.5 17Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="flex items-center justify-center font-medium text-xs absolute -right-2 -top-2 bg-red-600 w-4 h-4 rounded-full text-white">
                      {cartItems?.items?.length || 0}
                    </span>
                  </span>
                </Link>
            </div>

            <div className="relative mx-auto w-full inline-block sm:hidden" ref={containerRef}>
                <div className="relative min-w-[200px] max-w-[475px] w-full sm:min-w-[300px] lg:min-w-[370px] border border-gray-300 rounded-full focus-within:border-gray-900 focus-within:ring-1 transition-all">
                  <input onFocus={()=>setShowDropdown(true)} onChange={(e) => setSearchVal(e.target.value)} value={searchVal} id="search" placeholder="Search Products" autoComplete="off"
                    className="w-full rounded-full border-0 focus:border-gray-800 h-[35px] sm:h-[42px] sm:py-2.5 pl-5 pr-12 outline-none ease-in duration-200 text-sm" type="search" name="search"
                  />
                  <button type="submit" id="search-btn" aria-label="Search"
                    className="absolute flex items-center h-[42px] justify-center duration-200 ease-in -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      width={24}
                      height={24}
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                {showDropdown&& 
               <div className="absolute top-14 left-0 px-2 right-0 w-full max-w-[700px] mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
  {filteredProducts.length > 0 ? (
    <div className="max-h-80 overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Search Results ({filteredProducts.length})
          </h3>
          <span className="text-xs text-gray-500">Products</span>
        </div>
      </div>

      {/* Products List */}
      <div className="divide-y flex flex-col gap-1.5 divide-gray-100">
        {filteredProducts.map((item, index) => (
          <Link to={`/product-details/${item._id}`}
            key={item._id || index}
            className="  hover:bg-blue-50 transition-colors duration-200 cursor-pointer rounded-lg group"
          >
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 group-hover:border-blue-300 transition-colors"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=📷';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h4>
                
                {item.category && (
                  <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full mt-1">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Price */}
              {item.price && (
                <div className="flex-shrink-0 text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    Rs. {item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="block text-xs text-gray-400 line-through">
                      Rs. {item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}

              {/* Arrow Indicator */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-4 h-4 text-gray-400"
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
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
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
      <button
        onClick={() => {
          // Clear search or show all products
          console.log('View all products');
        }}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        View all products
        <svg
          className="w-4 h-4 ml-1"
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
      </button>
    </div>
  )}
</div>
}     
        </div>
      </div>
    </div>
  );
} 

export default Header;
