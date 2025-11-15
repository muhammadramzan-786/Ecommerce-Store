import React, { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaShare, FaTruck, FaShieldAlt, FaUndo, FaCheck } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useProducts, useSingleProduct } from '../../hooks/useProducts';
import { useAddCart } from '../../hooks/useCart';
import ProductCard from '../../components/ProductCard';

  // const relatedProducts = [
  //   {
  //     id: 2,
  //     name: "Wireless Earbuds",
  //     price: 7999,
  //     image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e0?w=300&h=300&fit=crop",
  //     rating: 4.3
  //   },
  //   {
  //     id: 3,
  //     name: "Gaming Headset",
  //     price: 5999,
  //     image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop",
  //     rating: 4.7
  //   },
  //   {
  //     id: 4,
  //     name: "Portable Speaker",
  //     price: 8999,
  //     image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
  //     rating: 4.4
  //   }
  // ];

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent sound quality and very comfortable for long sessions. Battery life is amazing!",
      verified: true
    },
    {
      id: 2,
      user: "Sarah Smith",
      rating: 4,
      date: "2024-01-10",
      comment: "Great headphones, but a bit expensive. Noise cancellation works perfectly.",
      verified: true
    }
  ];

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const {id}=useParams()
  const {data:singleProduct}=useSingleProduct(id)

  const userId = localStorage.getItem("userId");
  const addCart =useAddCart()

  const {loading:productLoading ,data:products}=useProducts()
  const relatedProducts=products?.filter(item=>item?.category===singleProduct?.category && item.name!==singleProduct.name)

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Add to cart logic here
    addCart.mutate({
      userId:userId,
      productId:id,
      quantity:quantity
    })
  };

  const buyNow = () => {
    console.log(`Buying ${quantity} ${singleProduct?.name}`);
    // Buy now logic here
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = Math.round(((singleProduct?.price - singleProduct?.discountPrice)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <a href="/categories" className="hover:text-blue-600">{singleProduct?.category}</a>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{singleProduct?.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                <img
                  src={singleProduct?.images[selectedImage]}
                  alt={singleProduct?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {singleProduct?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${singleProduct?.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand and Name */}
              <div>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {singleProduct?.brand}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
                  {singleProduct?.name}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-lg ${
                          index < Math.floor(singleProduct?.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {/* {singleProduct.rating} */}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {/* ({singleProduct.reviewCount} reviews) */}
                </span>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <FaCheck className="text-xs" />
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  Rs. {singleProduct?.price.toLocaleString()}
                </span>
                {singleProduct?.discountPrice && (
                  <>
                    <span className="text-xl line-through text-gray-400">
                      Rs. {singleProduct?.discountPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {singleProduct?.description}
              </p>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                  disabled={addCart.isPending}
                    onClick={addToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <IoCartOutline className="text-lg" />
                    {addCart.isPending ? "Adding..." : "Add to Cart"}
                  </button>
                  <button
                    onClick={buyNow}
                    className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={toggleWishlist}
                    className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-lg" />
                    )}
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <FaShare className="text-gray-600 text-lg" />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaTruck className="text-blue-600 text-lg" />
                  <div>
                    <div className="font-medium">Free Shipping</div>
                    <div>On orders over Rs. 999</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaUndo className="text-blue-600 text-lg" />
                  <div>
                    <div className="font-medium">30-Day Returns</div>
                    <div>No questions asked</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaShieldAlt className="text-blue-600 text-lg" />
                  <div>
                    <div className="font-medium">2-Year Warranty</div>
                    <div>Manufacturer warranty</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {singleProduct?.description}
                  </p>
                  <div className="mt-6 grid gap-4">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><strong>Brand:</strong> {singleProduct?.brand}</div>
                    <div><strong>SKU:</strong> {singleProduct?.sku}</div>
                    <div><strong>Category:</strong> {singleProduct?.category}</div>
                    <div><strong>Battery Life:</strong> Up to 30 hours</div>
                    <div><strong>Connectivity:</strong> Bluetooth 5.0</div>
                    <div><strong>Noise Cancellation:</strong> Active</div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-medium">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={`text-sm ${
                                    index < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                            {review.verified && (
                              <span className="text-green-600 flex items-center gap-1">
                                <FaCheck className="text-xs" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedProducts?.length>0? relatedProducts.map((item,i)=>{
                          const {name, price, discountPrice, _id}=item
                          return <ProductCard image={item.images[0]} name={name} oldPrice={price} price={discountPrice} key={_id} productID={_id}
                           addToCart={(id, q) => addToCart(id, q)} />
                        }):(<div>No related Products</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;