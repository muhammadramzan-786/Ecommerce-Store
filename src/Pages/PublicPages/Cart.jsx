import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowLeft, FaLock, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { useDeleteCartProduct, useUpdateCart } from '../../hooks/useCart';
import { useCartStore } from '../../stores/cartStore';
import Button from '../../components/Button';
import { useAuthStore } from '../../hooks/useAuthStore';
import LoginModal from '../../components/LoginModal';
import AppLink from '../../components/AppLink';

function Cart() {
  const token=useAuthStore(state=>state.token)
  const userId=useAuthStore(state=>state.userId)
  const cartItems=useCartStore((state)=>state.cart)
  
  const updateCart=useUpdateCart()
  // Destructure states
const { isPending, isError, error, isSuccess } = updateCart;
  const updateProductQuantity = (productId, quantity) => {
    updateCart.mutate({
      productId,
      quantity,
      userId
    })          
  };

  const deleteItem=useDeleteCartProduct()
  const removeItem = (id) => {
    deleteItem.mutate({
      userId:userId,
      productId:id
    })
  };

  const calculateSubtotal = () => {
    return cartItems?.items?.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal() 
    return subtotal > 999 ? 0 : 99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

      const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Modal close ka function
  const closeModal = () => setIsLoginModalOpen(false);

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <IoCartOutline className="text-4xl text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <AppLink to="/" onClick={continueShopping}
                className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </AppLink>
            {/* Popular Categories */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'].map((category) => (
                  <div key={category} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <FaShoppingBag className="text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
                          {deleteItem.isPending && (
                                <div className="flex items-center justify-center bg-[#0000006b] w-full h-full fixed z-30">
                                  <div className="w-15 h-15 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                  <span className="text-sm text-gray-500">
                    Total: {cartItems?.items.reduce((total, item) => total + item.quantity, 0)} items
                  </span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200 relative">

                {cartItems?.items?.map((item) => (
                  <div key={item._id} className="p-6 ">
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 hover:text-[#4B3EC4] transition-colors">
                              <AppLink  to={`/product-details/${item._id}`}>{item.name}</AppLink >
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                          </div>
                          <div className="text-right text-nowrap">
                            <span className="text-lg font-bold text-gray-900">
                              Rs. {(item.discountPrice * item.quantity).toLocaleString()}
                            </span>
                            {item.originalPrice > item.discountPrice && (
                              <span className="text-sm line-through text-gray-400 block">
                                Rs. {(item.originalPrice * item.quantity).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-2">
                          {item.inStock ? (
                            <span className="text-sm text-green-600 font-medium">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-sm text-red-600 font-medium">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className='relative overflow-hidden rounded-lg'>
                              {isPending && (
                                <div className="flex items-center justify-center bg-[#0000006b] w-full h-full absolute">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <Button icon={FaMinus}
                                onClick={() => updateProductQuantity(item._id,item.quantity-1)}
                                disabled={item.quantity <= 1 || isPending}
                                className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              />
                              <span className="px-3 py-1 border-x border-gray-300 font-medium min-w-12 text-center">
                                {item.quantity}
                              </span>
                              <Button icon={FaPlus}
                                onClick={() => {
                                  // updateQuantity(item._id, item.quantity+1);
                                  updateProductQuantity(item._id, item.quantity+1)}}
                                disabled={item.quantity >= item.maxQuantity || isPending}
                                className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              />
                              </div>
                            </div>
                            {isError && <p className="text-red-500">{error?.message}</p>}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Button icon={FaTrash}
                              onClick={() => removeItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove Item"
                            />

                          </div>
                        </div>

                        {/* Savings */}
                        {item.originalPrice > item.discountPrice && (
                          <div className="mt-2">
                            <span className="text-sm text-green-600 font-medium">
                              You save Rs. {((item.originalPrice - item.discountPrice) * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
            <AppLink to="/"
                className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </AppLink>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <FaLock className="text-green-500 text-xl mx-auto mb-2" />
                <div className="font-medium text-gray-900">Secure Payment</div>
                <div className="text-sm text-gray-600">256-bit SSL encryption</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <FaShieldAlt className="text-[#4B3EC4] text-xl mx-auto mb-2" />
                <div className="font-medium text-gray-900">Buyer Protection</div>
                <div className="text-sm text-gray-600">Full refund policy</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <FaTruck className="text-orange-500 text-xl mx-auto mb-2" />
                <div className="font-medium text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders over Rs. 999</div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-22">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    {/* <span className="text-gray-900">Rs. {calculateSubtotal().toLocaleString()}</span> */}
                    <span className="text-gray-900">Rs. {cartItems?.items?.reduce((total, item) => total + (item?.discountPrice * item?.quantity), 0)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {calculateShipping() === 0 ? 'Free' : `Rs. ${calculateShipping()}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>Rs. {calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              
                {/* Checkout Button */}
                <AppLink  to={token && userId ? "/checkout" : "#"} state={{ buyNow:false, productID:"", quantity:"" }} className="w-full bg-[#4B3EC4] text-white py-3 
                px-6 rounded-lg font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2" onClick={(e) => {
    if (!token || !userId) {
      e.preventDefault();
      // open login modal
      setIsLoginModalOpen(true);
    }
  }}>
                  <FaLock className="text-sm" />
                  Proceed to Checkout
                </AppLink >

                {/* Additional Info */}
                <div className="text-center text-sm text-gray-600">
                  <p>Free delivery on orders over Rs. 999</p>
                  <p className="mt-1 flex items-center justify-center gap-1">
                    <FaUndo className="text-xs" />
                    30-day easy returns
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

                  <LoginModal
        isModal={isLoginModalOpen}
        closeModal={closeModal}
      />
    </div>
    </>
  );
}

export default Cart;