import React, { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaShare, FaTruck, FaShieldAlt, FaUndo, FaCheck } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { FaTimes } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { useProducts, useSingleProduct } from '../../hooks/useProducts';
import { useAddCart } from '../../hooks/useCart';
import ProductCard from '../../components/ProductCard';
import Button from "../../components/Button";
import { useProductsStore } from '../../stores/productsStore';
import ProductModal from '../../components/ProductModal ';

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
  const [isModal,setisModal]=useState(false)
  const [singleProduct,setSingleProduct]=useState(null)
  
  const {id}=useParams()
  // const {data:product}=useSingleProduct(id)
  const {isLoading, error, products}=useProductsStore()

  const singleProducts=products.filter((product)=>product._id===id)
  const product=singleProducts[0]
  const userId = localStorage.getItem("userId");
  const addCart =useAddCart()

  const relatedProducts=products?.filter(item=>item?.category===product?.category && item.name!==product.name)

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const addToCart = (id,quantity) => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Add to cart logic here
    addCart.mutate({
      userId:userId,
      productId:id,
      quantity:quantity
    })
  };

  const buyNow = () => {
    console.log(`Buying ${quantity} ${product?.name}`);
    // Buy now logic here
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = Math.round(((product?.price - product?.discountPrice)));

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-[#4B3EC4]">Home</Link></li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <a href="/categories" className="hover:text-[#4B3EC4]">{product?.category}</a>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{product?.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 sm:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                <img
                  src={product?.images[selectedImage]}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-3">
                {product?.images.map((image, index) => (
                  <Button text={<img src={image} alt={`${product?.name} view ${index + 1}`} className="w-full h-full object-cover" />}
                    key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-[#4B3EC4]' : 'border-gray-200'}`} />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand and Name */}
              <div>
                <span className="text-sm font-medium text-[#4B3EC4] uppercase tracking-wide">
                  {product?.brand}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
                  {product?.name}
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
                          index < Math.floor(product?.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {/* {product.rating} */}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {/* ({product.reviewCount} reviews) */}
                </span>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <FaCheck className="text-xs" />
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  Rs. {product?.price.toLocaleString()}
                </span>
                {product?.discountPrice && (
                  <>
                    <span className="text-xl line-through text-gray-400">
                      Rs. {product?.discountPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              {/* <p className="text-gray-600 leading-relaxed">
                {product?.description}
              </p> */}

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button text='-' onClick={() => handleQuantityChange(-1)} className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors" />
                    <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                    <Button text='+' onClick={() => handleQuantityChange(1)} className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors" />
                  </div>
                </div>

                <div className="flex gap-3 flex-col xsm:flex-row">
                  <Button icon={IoCartOutline} text={addCart.isPending ? "Adding..." : "Add to Cart"} disabled={addCart.isPending} onClick={()=>addToCart(product?._id, quantity)} />
                  <Link to="/checkout" state={{ buyNow:true, productID:product?._id, quantity:quantity }}
                    onClick={buyNow}
                    className="flex-1 bg-gray-900 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Buy Now
                  </Link>
                  
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaTruck className="text-[#4B3EC4] text-lg" />
                  <div>
                    <div className="font-medium">Free Shipping</div>
                    <div>On orders over Rs. 999</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaUndo className="text-[#4B3EC4] text-lg" />
                  <div>
                    <div className="font-medium">30-Day Returns</div>
                    <div>No questions asked</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaShieldAlt className="text-[#4B3EC4] text-lg" />
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
                <Button text={tab} key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab ? 'text-[#4B3EC4] border-b-2 border-[#4B3EC4] rounded-none' : 'text-gray-500 hover:text-gray-700'
                  }`} />
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                  
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><strong>Brand:</strong> {product?.brand}</div>
                    <div><strong>Category:</strong> {product?.category}</div>
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
                          onClick={()=>{setisModal(true);setSingleProduct(item);}} addToCart={(id, q) => addToCart(id, q)} />
                        }):(<div>No related Products</div>)}
          </div>
        </div>
      </div>
    </div>
      <ProductModal isModal={isModal} image={singleProduct?.images[0]} name={singleProduct?.name} discountPrice={singleProduct?.discountPrice} price={singleProduct?.price}
      brand={singleProduct?.brand} category={singleProduct?.category} tags={singleProduct?.tags} inStock={singleProduct?.inStock} id={singleProduct?._id}
      description={singleProduct?.description} addToCart={(id, q)=>addToCart(id, q)} isPending={addCart?.isPending} closeModal={()=>{setisModal(false);setSingleProduct(null)}} />

    </>
  );
}

export default ProductDetails;