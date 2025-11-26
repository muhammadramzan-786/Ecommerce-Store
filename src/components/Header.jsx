import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useGetCart } from "../hooks/useCart";
import { useUserStore } from "../stores/userStore";
import { useCartStore } from "../stores/cartStore";
import { useProductsStore } from "../stores/productsStore";
import Button from "./Button";
import SearchDropdown from "./SearchDropdown";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useAuthStore } from "../hooks/useAuthStore";

function Header() {
  const [searchVal, setSearchVal] = useState('');
  const userData=useUserStore((state)=>state.user)
  const [showDropdown, setShowDropdown]=useState(false)
  const [searchDropdown, setSearchDropdown]=useState(false)
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

    const clearAuth=useAuthStore(state=>state.clearAuth)
    const logOut=()=>{
      clearAuth()
      useUserStore.getState().setUser(null);
      useCartStore.getState().setCart({items:[]});
      window.dispatchEvent(new Event("authChange"));
    }
    const logOutBtn=(<button onClick={logOut} className="bg-red-600 text-white p-1.5 rounded-sm">
                  <FaArrowRightFromBracket />
                </button>)

  return (
    <div className="w-full px-4 sm:px-6 xl:px-0 sticky top-0 z-50 bg-white shadow-lg @container">
      <div className="flex mx-auto max-w-7xl flex-col @xsm:flex-row gap-2 lg:gap-5 md:items-end lg:items-center xl:justify-between ease-out duration-200 py-2 2xl:py-5">
        {/* Logo and Search Section */}
        <div className="flex w-full gap-3 lg:gap-5 flex-row justify-between sm:items-center sm:gap-6">
          <Link className="shrink-0 text-xl sm:text-2xl font-bold text-[#4B3EC4]  transition-colors" to="/">
            SHOPNEST
          </Link>

          <div className="sm:hidden flex items-center justify-end gap-1 xl:gap-5 w-full @xsm:w-auto">
                  <Button type="submit" onClick={()=>setSearchDropdown(!searchDropdown)} id="search-btn" aria-label="Search" className="border border-gray-300 p-1.5 rounded-full"
                    text={searchDropdown ? (
                      // Close Icon
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          d="M6 6L18 18M6 18L18 6" />
                      </svg>
                    ) : (
                      // Search Icon
                      <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 25" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z"
                          fill="currentColor"
                        />
                      </svg>
                    )} />

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
                <Link to="/profileLayout" className="items-center gap-2.5 flex hover:text-[#4B3EC4] transition-colors w-8 h-8 lg:w-auto lg:h-auto" >
                  <img src={userData?.image} className="rounded-full w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 flex-shrink-0 object-cover" />
                <div className="group hidden xl:inline-block">
                  <span className="block font-medium text-xs text-gray-600">
                    {userData?.name}
                  </span>
                  <p className="font-medium text-sm text-gray-800 ">
                    {userData?.email}
                  </p>
                </div>
              </Link>
              )}              
              {/* Cart */}
                <Link to="/cart" className="flex items-center gap-2.5 w-8 h-8 justify-center hover:text-[#4B3EC4] transition-colors" title="Cart">
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
                {logOutBtn}
            </div>

           <div className="relative mx-auto hidden sm:inline-block" ref={containerRef}>
                <div className="relative min-w-[200px] max-w-[475px] w-full sm:min-w-[300px] lg:min-w-[370px] border border-gray-300 rounded-full focus-within:border-gray-900 focus-within:ring-1 transition-all">
                  <input onFocus={()=>setShowDropdown(true)} onChange={(e) => setSearchVal(e.target.value)} value={searchVal} id="search" placeholder="Search Products" autoComplete="off"
                    className="w-full rounded-full border-0 focus:border-gray-800 h-[35px] sm:h-[42px] sm:py-2.5 pl-5 pr-12 outline-none ease-in duration-200 text-sm" type="search" name="search"
                  />
                  <Button type="submit" id="search-btn" aria-label="Search"
                    className="absolute flex items-center h-[42px] justify-center duration-200 ease-in -translate-y-1/2 right-3 top-1/2 hover:text-blue-600"
                  text={<svg
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
                    </svg>} />
                </div>
              <SearchDropdown showDropdown={showDropdown} filteredProducts={filteredProducts} />
        </div>
        </div>

       

        {/* User Actions Section */}

          <div className="hidden sm:flex items-center gap-1 xl:gap-5 w-full @xsm:w-auto">
              {/* Account - Hidden on mobile, visible on xl and up */}

              <Link to={!userData? "/login" :"/profileLayout"} className="items-center gap-2.5 hidden xl:flex hover:text-[#4B3EC4] transition-colors" >
                {!userData? (
                  <>
                  <div className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 rounded-full transition-colors">
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
                <div className="group text-nowrap">
                  <span className="block uppercase font-medium text-xs text-gray-600">
                    account
                  </span>
                  <p className="font-medium text-sm text-gray-800 hover:text-[#4B3EC4]">
                    Sign In / Register
                  </p>
                </div>
                  </>
                ):(
                  <>
                  <img src={userData?.image} className="rounded-full w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 flex-shrink-0 object-cover" />
                <div className="group hidden xl:inline-block group">
                  <span className="block font-medium text-xs text-gray-600 group-hover:text-[#4B3EC4]">
                    {userData?.name}
                  </span>
                  <p className="font-medium text-sm text-gray-800 group-hover:text-[#4B3EC4]">
                    {userData?.email}
                  </p>
                </div>
                  </>
                )}
                
              </Link>     
              {/* Cart */}
                <Link to="/cart" 
                  className="flex items-center gap-2.5 w-8 h-8 justify-center hover:text-[#4B3EC4] transition-colors"
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
                {logOutBtn}
            </div>
            <div className={`absolute top-12 left-0 p-1 bg-white mx-auto w-full transform transition-transform duration-300 ${searchDropdown?"translate-x-0":" -translate-x-full md:translate-x-0"} sm:hidden`} ref={containerRef}>
                <div className="relative min-w-[200px] mx-auto max-w-[475px] w-full sm:min-w-[300px] lg:min-w-[370px] border border-gray-300 rounded-full focus-within:border-gray-900 focus-within:ring-1 transition-all">
                  <input onFocus={()=>setShowDropdown(true)} onChange={(e) => setSearchVal(e.target.value)} value={searchVal} id="search" placeholder="Search Products" autoComplete="off"
                    className="w-full rounded-full border-0 focus:border-gray-800 h-[35px] sm:h-[42px] sm:py-2.5 pl-5 pr-12 outline-none ease-in duration-200 text-sm" type="search" name="search"
                  />
                  <Button type="submit" id="search-btn" aria-label="Search"
                    className="absolute flex items-center h-[42px] justify-center duration-200 ease-in -translate-y-1/2 right-3 top-1/2 hover:text-[#4B3EC4]"
                  text={<svg className="w-5 h-5 text-gray-600" width={24} height={24}
                      viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z"
                        fill="currentColor"/>
                    </svg>} />
                    
                </div>
                <SearchDropdown showDropdown={showDropdown} filteredProducts={filteredProducts} />
               
           </div>
      </div>
    </div>
  );
} 

export default Header;
