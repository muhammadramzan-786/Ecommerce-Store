import React, { useState, useEffect } from 'react';
import { FaLock, FaUser, FaMapMarkerAlt, FaCreditCard, FaCheck, FaArrowLeft, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { useDeleteCartProduct, useGetCart } from '../../hooks/useCart';
import { useUser } from "../../hooks/useUser";
import Input from "../../components/Input";
import { useAddOrder } from '../../hooks/useOrders';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { useCartStore } from '../../stores/cartStore';

function Checkout() {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [saveShippingInfo, setSaveShippingInfo] = useState(true);
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
useEffect(() => {
  const id = localStorage.getItem("userId");
  if(id) setUserId(id);
}, []);

  // const {data:orderItems}=useGetCart(userId)
  const orderItems=useCartStore((state)=>state.cart)
  // const {data:userData}=useUser(userId)
  const userData=useUserStore((state)=>state.user)
// console.log(userData);

  const [shippingInfo, setShippingInfo] = useState({
    email: userData?.email,
    name: userData?.name,
    address: userData?.address,
    city: userData?.city,
    postalCode: userData?.postalCode,
    phone: userData?.phone
  });
  useEffect(() => {
  if(userData){
    setShippingInfo({
      email: userData.email || "",
      name: userData.name || "",
      address: userData.address || "",
      city: userData.city || "",
      postalCode: userData.postalCode || "",
      phone: userData.phone || ""
    });
  }
}, [userData]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const steps = [
    { id: 1, name: 'Shipping', icon: FaTruck },
    { id: 2, name: 'Payment', icon: FaCreditCard },
    { id: 3, name: 'Review', icon: FaCheck }
  ];

  const calculateSubtotal = () => {
    if(!orderItems?.items) return 0
    return orderItems?.items.reduce((total, item) => total + (item?.discountPrice * item?.quantity), 0);
  };

  const calculateShipping = () => {
    return 100; // Fixed shipping cost
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setActiveStep(3);
  };
console.log(orderItems?.items);

const deleteItem=useDeleteCartProduct()
  const addOrder=useAddOrder()

  const handlePlaceOrder = async () => {
    setLoading(true)
  const orderData = {
    userId,
    items: orderItems?.items.map(item => ({
      product: item._id,
      quantity: item.quantity,
      price: item.discountPrice,
    })),
    shippingAddress: {
      fullName: shippingInfo.name,
      address: shippingInfo.address,
      city: shippingInfo.city,
      postalCode: shippingInfo.postalCode,
      country: "Pakistan",
    },
    totalAmount: calculateTotal(),
    paymentMethod
  };
console.log("orderItems:", orderItems);
console.log("orderData:", orderData);
  try {
    const res = await addOrder.mutateAsync(orderData);
    toast.success("Order created!");
    orderItems?.items.forEach((item)=>{
      deleteItem.mutate({
      userId:userId,
      productId:item._id
    })
    })
    setLoading(false)
    navigate("/orders")
    console.log(res);
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Order failed");
    setLoading(false)
  }finally{
    setLoading(false)
  }
};


  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <FaArrowLeft className="text-sm" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 sticky top-15 z-40 bg-white py-2">
         <ol className="flex items-center w-full">
  {steps.map((step, index) => {
    const StepIcon = step.icon;
    const isCompleted = activeStep > step.id;
    const isActive = activeStep === step.id;
    const isPassed = activeStep >= step.id;

    return (
      <li
        key={step.id}
        className={`
          flex items-center 
          ${index < steps.length - 1 ? "w-full" : "w-auto"}   /* <-- FIX HERE */
          ${index < steps.length - 1
            ? `
              after:content-[''] after:w-full after:h-1 
              after:border-b after:border-4 after:inline-block 
              ${isCompleted ? "after:border-blue-600" : "after:border-gray-300"}
            `
            : ""
          }
        `}
      >
        <span
          className={`
            flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0
            ${isCompleted ? "bg-blue-600" : isActive?"border-2 border-blue-600": "bg-gray-200"}
          `}
        >
          <StepIcon
            className={`
              w-5 h-5 
              ${
                isCompleted
                  ? "text-blue-100"   // Completed icon
                  : isActive
                  ? "text-blue-600"  // Active icon
                  : "text-gray-500"   // Pending icon
              }
            `}
          />
        </span>
      </li>
    );
  })}
</ol>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            {activeStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Shipping Information
                  </h2>
                </div>
                <form onSubmit={handleShippingSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={shippingInfo.email || ""}
                        onChange={handleInputChange(setShippingInfo)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          name="firstName"
                          value={shippingInfo.name || ""}
                          onChange={handleInputChange(setShippingInfo)}
                          required
                        />
                      </div>
                      
                   
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <Input
                        type="text"
                        name="address"
                        value={shippingInfo.address || ""}
                        onChange={handleInputChange(setShippingInfo)}
                        required
                        placeholder="123 Main Street"
                      />
                      </div>
                    
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={shippingInfo.city || ""}
                        onChange={handleInputChange(setShippingInfo)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        postalCode *
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.postalCode || ""}
                        onChange={handleInputChange(setShippingInfo)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone || ""}
                        onChange={handleInputChange(setShippingInfo)}
                        required
                        placeholder="+91 1234567890"
                      />
                    </div>
                  </div>  

                  <div className="mt-6 flex items-center">
                    <input
                      type="checkbox"
                      id="saveShipping"
                      checked={saveShippingInfo}
                      onChange={(e) => setSaveShippingInfo(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="saveShipping" className="ml-2 text-sm text-gray-700">
                      Save this information for next time
                    </label>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Continue to Payment
                      <FaCreditCard className="text-sm" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Payment Method */}
            {activeStep === 2 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FaCreditCard className="text-blue-600" />
                    Payment Method
                  </h2>
                </div>
                <form onSubmit={handlePaymentSubmit} className="p-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4 mb-6">
                    {[
                      { id: 'paypal', name: 'PayPal', icon: FaUser },
                    ].map((method) => (
                      <div key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor={method.id} className="ml-3 flex items-center gap-2 text-sm font-medium text-gray-700">
                          <method.icon className="text-gray-400" />
                          {method.name}
                        </label>
                      </div>
                    ))}
                  </div>

                 

                  {/* Save Payment Info */}
                  <div className="mt-6 flex items-center">
                    <input
                      type="checkbox"
                      id="savePayment"
                      checked={savePaymentInfo}
                      onChange={(e) => setSavePaymentInfo(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="savePayment" className="ml-2 text-sm text-gray-700">
                      Save payment information for faster checkout
                    </label>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Review Order
                      <FaCheck className="text-sm" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Order Review */}
            {activeStep === 3 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FaCheck className="text-blue-600" />
                    Order Review
                  </h2>
                </div>
                <div className="p-6">
                  {/* Shipping Information Review */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p className="text-gray-600">{shippingInfo.address}</p>
                      <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p className="text-gray-600">{shippingInfo.phone}</p>
                      <p className="text-gray-600">{shippingInfo.email}</p>
                    </div>
                    <button
                      onClick={() => setActiveStep(1)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit shipping information
                    </button>
                  </div>

                  {/* Payment Information Review */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium capitalize">{paymentMethod.replace('-', ' ')}</p>
                      {paymentMethod === 'credit-card' && (
                        <p className="text-gray-600">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveStep(2)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit payment method
                    </button>
                  </div>

                  {/* Order Items Review */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-4">
                      {orderItems?.items.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.brand} • {item.color}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">Rs. {(item.discountPrice * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back to Payment
                    </button>
                    <button disabled={loading || orderItems?.items.length===0}
                      onClick={handlePlaceOrder}
                      className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors
                      ${orderItems?.items.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                    >
                      <FaLock className="text-sm" />
                      {loading?"Order Placing":"Place Order"} 
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-34">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6">
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems?.items?.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        Rs. {(item.discountPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">Rs. {calculateSubtotal().toLocaleString()}</span>
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

                {/* Security Badges */}
                <div className="mt-6 space-y-3">
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaShieldAlt className="text-blue-500" />
                    Buyer Protection
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUndo className="text-orange-500" />
                    30-Day Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;