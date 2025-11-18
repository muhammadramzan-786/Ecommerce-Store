import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTrash, FaHeart, FaShoppingBag, FaArrowLeft, FaLock, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { getCart } from '../../services/cart';
import { useDeleteCartProduct, useGetCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

function Cart() {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Wireless Bluetooth Headphones with Noise Cancellation",
  //     brand: "Sony",
  //     price: 12999,
  //     originalPrice: 15999,
  //     quantity: 1,
  //     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
  //     inStock: true,
  //     maxQuantity: 5
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Fitness Watch with Heart Rate Monitor",
  //     brand: "FitPro",
  //     price: 7999,
  //     originalPrice: 9999,
  //     quantity: 2,
  //     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
  //     inStock: true,
  //     maxQuantity: 3
  //   },
  //   {
  //     id: 3,
  //     name: "Wireless Fast Charger Pad",
  //     brand: "ChargeMax",
  //     price: 2499,
  //     originalPrice: 2999,
  //     quantity: 1,
  //     image: "https://images.unsplash.com/photo-1609588044232-14a6e3b2a5d8?w=300&h=300&fit=crop",
  //     inStock: false,
  //     maxQuantity: 10
  //   }
  // ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const userId = localStorage.getItem("userId");
  const cartItems=useCartStore((state)=>state.cart)
  
  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const deleteItem=useDeleteCartProduct()
  const removeItem = (id) => {
    // setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    deleteItem.mutate({
      userId:userId,
      productId:id
    })
  };

  const applyCoupon = () => {
    const coupons = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'SUMMER25': 25
    };

    if (coupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: coupons[couponCode.toUpperCase()]
      });
    } else {
      alert('Invalid coupon code');
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.items.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const originalTotal = cartItems?.items.reduce((total, item) => total + (item?.originalPrice * item?.quantity), 0);
    return originalTotal - calculateSubtotal();
  };

  const calculateCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    return (calculateSubtotal() * appliedCoupon.discount) / 100;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal() - calculateCouponDiscount();
    return subtotal > 999 ? 0 : 99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateCouponDiscount() + calculateShipping();
  };

  const getSavings = () => {
    return calculateDiscount() + calculateCouponDiscount();
  };

  const continueShopping = () => {
    console.log('Continuing shopping');
    // Navigate to products page
  };

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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={continueShopping}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaArrowLeft className="text-sm" />
                Continue Shopping
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Wishlist
              </button>
            </div>
            
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
                    {/* Total: {cartItems?.reduce((total, item) => total + item.quantity, 0)} items */}
                  </span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems?.items?.map((item) => (
                  <div key={item._id} className="p-6">
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
                            <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                              <Link to={`/product-details/${item._id}`}>{item.name}</Link>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                          </div>
                          <div className="text-right">
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
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="px-3 py-1 border-x border-gray-300 font-medium min-w-12 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={item.quantity >= item.maxQuantity}
                                className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove Item"
                            >
                              <FaTrash />
                            </button>
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
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={continueShopping}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <FaArrowLeft className="text-sm" />
                    Continue Shopping
                  </button>
                  <div className="text-sm text-gray-600">
                    Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
                  </div>
                </div>
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
                <FaShieldAlt className="text-blue-500 text-xl mx-auto mb-2" />
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    {/* <span className="text-gray-900">Rs. {calculateSubtotal().toLocaleString()}</span> */}
                    <span className="text-gray-900">Rs. {cartItems?.items.reduce((total, item) => total + (item?.discountPrice * item?.quantity), 0)}</span>
                  </div>

                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-Rs. {calculateDiscount().toLocaleString()}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coupon ({appliedCoupon.code})</span>
                      <span className="text-green-600">-Rs. {calculateCouponDiscount().toLocaleString()}</span>
                    </div>
                  )}

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

                {/* Savings */}
                {getSavings() > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between text-sm font-medium text-green-800">
                      <span>Total Savings</span>
                      <span>Rs. {getSavings().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Coupon Code */}
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 text-sm text-green-600">
                      Coupon {appliedCoupon.code} applied! {appliedCoupon.discount}% off
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaLock className="text-sm" />
                  Proceed to Checkout
                </Link>

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

            {/* Trust Badges */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-center">
                <div className="flex justify-center gap-6 mb-3">
                  <img src="/images/visa.svg" alt="Visa" className="h-8" />
                  <img src="/images/mastercard.svg" alt="Mastercard" className="h-8" />
                  <img src="/images/paypal.svg" alt="PayPal" className="h-8" />
                </div>
                <p className="text-xs text-gray-600">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;