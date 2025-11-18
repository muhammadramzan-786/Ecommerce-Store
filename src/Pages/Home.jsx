import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// App.jsx ya index.js me
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // agar navigation chahiye
import "swiper/css/pagination"; // agar dots chahiye
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "../components/ProductCard";
// import { category } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import Button from "../components/Button";
import { useAddCart } from "../hooks/useCart";
import CategoryCard from "../components/CategoryCard";
import { useProductsStore } from "../stores/productsStore";

function Home() {
  const [isModal,setisModal]=useState(false)
  const [visibleCount, setVisibleCount] = useState(8);
  const [singleProduct,setSingleProduct]=useState(null)

  const {loading,data:categories}=useCategories()
  // const {loading:productLoading ,data:products}=useProducts()
  // const products=useProductsStore((state)=>state.products)
  const {isLoading, error, products}=useProductsStore()
// console.log(products);

  const userId = localStorage.getItem("userId");
  const addCart =useAddCart()
    const addToCart = (productId,quantity) => {
      console.log(productId ,quantity);
      
    // Add to cart logic here
    addCart.mutate({
      userId:userId,
      productId:productId,
      quantity:quantity
    })
  };
  
  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-0">
              <section className="overflow-hidden mt-5">
        <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 xl:px-0 pb-15 border-gray-3">
          <div className="swiper categories-carousel common-carousel">
<h2 className="text-xl font-semibold xl:text-heading-5 text-dark mb-3">
                Popular Categories
              </h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={8}
              // pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full"
            >
              {(categories?.map((category, i) => (
                <SwiperSlide>
                  <a key={i}
                    className="group flex flex-col items-center"
                    href="/categories/televisions"
                  >
                    <CategoryCard name={category.name} image={category.image} loading={loading} />
                  </a>
                </SwiperSlide>
              )))}
            </Swiper>
          </div>
        </div>
      </section>

          <div className="w-full h-[400px] relative z-1 rounded-[10px] bg-white overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              // navigation
              pagination={{ clickable: true }}
              // autoplay={{ delay: 3000 }}
              // loop={true}
              className=" h-full"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="w-full h-full bg-[url('https://res.cloudinary.com/dzqdp2i1t/image/upload/v1758698359/3af96421a4b69c287b8ffef379a11ab170d7449d-758x521_s8idca.webp')] bg-cover bg-center flex flex-col items-center justify-center text-white">
                  <div className="max-w-[366px] absolute left-8 lg:left-20 top-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="block font-medium text-lg uppercase text-white">
                        Premium design
                      </span>
                    </div>
                    <h1 className="font-semibold text-white text-xl sm:text-[40px] mb-3">
                      <a href="/products/apple-watch-ultra">
                        Apple Watch Ultra
                      </a>
                    </h1>
                    <p className="text-sm text-white/80">
                      Advanced imaging performance with a 200MP AI camera with
                      Enhanced image quality.
                    </p>
                    <a
                      className="inline-flex font-medium text-white text-custom-sm rounded-full bg-[#4B3EC4] py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-6 sm:mt-10"
                      href="/products/apple-watch-ultra"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="w-full h-full bg-[url('https://res.cloudinary.com/dzqdp2i1t/image/upload/v1758698359/e917b32218e3bd2e9c5b7f6a00d376440a11ae92-758x521_ji0czw.webp')] bg-cover bg-center flex flex-col items-center justify-center text-white">
                  <div className="max-w-[366px] absolute left-8 lg:left-20 top-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="block font-medium text-lg uppercase text-white">
                        SPECIAL EDITION
                      </span>
                    </div>
                    <h1 className="font-semibold text-white text-xl sm:text-[40px] mb-3">
                      <a href="/products/apple-ipad-air-5th-gen---64gb">
                        Apple AirPods Max
                      </a>
                    </h1>
                    <p className="text-sm text-white/80">
                      Transparency mode, and spatial audio, it delivers a
                      premium listening experience.&nbsp;
                    </p>
                    <a
                      className="inline-flex font-medium text-white text-custom-sm rounded-full bg-[#4B3EC4] py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-6 sm:mt-10"
                      href="/products/apple-ipad-air-5th-gen---64gb"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 3 */}
              <SwiperSlide>
                <div className="w-full h-full bg-[url('https://res.cloudinary.com/dzqdp2i1t/image/upload/v1758698359/288e9226a28e5cf95406292cbedd8c4bef1b8554-758x521_rfgtl2.webp')] bg-cover bg-center flex flex-col items-center justify-center text-white">
                  <div className="max-w-[366px] absolute left-8 lg:left-20 top-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="block font-medium text-lg uppercase text-white">
                        LIMITED EDITION
                      </span>
                    </div>
                    <h1 className="font-semibold text-white text-xl sm:text-[40px] mb-3">
                      <a href="/products/iphone-16-pro-max">
                        iPhone 16 Pro Max
                      </a>
                    </h1>
                    <p className="text-sm text-white/80">
                      Featuring A18 Chip, Liquid Glass, and AI-Powered
                      Innovation
                    </p>
                    <a
                      className="inline-flex font-medium text-white text-custom-sm rounded-full bg-[#4B3EC4] py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-6 sm:mt-10"
                      href="/products/iphone-16-pro-max"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
      </div>

      <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
          <div className="flex items-center gap-4">
            <img
              alt="icons"
              loading="lazy"
              width={40}
              height={41}
              decoding="async"
              data-nimg={1}
              src="/images/icons/icon-01.svg"
              style={{ color: "transparent" }}
            />
            <div>
              <h3 className="font-medium text-lg text-dark">Free Shipping</h3>
              <p className="text-sm text-gray-600">For all orders $200</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              alt="icons"
              loading="lazy"
              width={40}
              height={41}
              decoding="async"
              data-nimg={1}
              src="/images/icons/icon-02.svg"
              style={{ color: "transparent" }}
            />
            <div>
              <h3 className="font-medium text-lg text-dark">
                1 &amp; 1 Returns
              </h3>
              <p className="text-sm text-gray-600">Cancellation after 1 day</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              alt="icons"
              loading="lazy"
              width={40}
              height={41}
              decoding="async"
              data-nimg={1}
              src="/images/icons/icon-03.svg"
              style={{ color: "transparent" }}
            />
            <div>
              <h3 className="font-medium text-lg text-dark">
                100% Secure Payments
              </h3>
              <p className="text-sm text-gray-600">Gurantee secure payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              alt="icons"
              loading="lazy"
              width={40}
              height={41}
              decoding="async"
              data-nimg={1}
              src="/images/icons/icon-04.svg"
              style={{ color: "transparent" }}
            />
            <div>
              <h3 className="font-medium text-lg text-dark">
                24/7 Dedicated Support
              </h3>
              <p className="text-sm text-gray-600">Anywhere &amp; anytime</p>
            </div>
          </div>
        </div>
      </div>



      <section className="overflow-hidden pt-15 bg-[#FFFFFF]">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-0 ">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                New Arrivals
              </h2>
            </div>
            <a
              className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-full border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark "
              href="/shop-with-sidebar"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-7.5 gap-y-9">
            {error? (<p>Error: {error.message || "Something went wrong"}</p>):
             Array.isArray(products) &&products?.length>0 ? (products?.slice(0,visibleCount).map((item,i)=>{
              const {name, price, discountPrice, _id}=item
              return <ProductCard image={item.images[0]} name={name} oldPrice={price} price={discountPrice} key={_id} productID={_id}
              onClick={()=>{setisModal(true);setSingleProduct(item);}} addToCart={(id, q) => addToCart(id, q)} loading={isLoading} />
            })):(<p>No products found</p>)}
            
          </div>
          <button className="bg-[#4B3EC4] text-white py-1.5 px-5 rounded-full flex items-center gap-1 mx-auto mt-8 "
          onClick={()=>setVisibleCount(prev=>prev+8)}>Load More <IoIosArrowDown className="mt-1" />
</button>
        </div>
      </section>


    <div
      className={`fixed inset-0 bg-[#0000005e] flex items-center justify-center p-4 z-50 transition-all duration-300 ${
        isModal ? "opacity-100 visible translate-0" : "opacity-0 invisible translate-y-64"
      }`}
    >
      <div className={` bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar relative `}>
        {/* Header */}
        <Button icon={FaTimes}
            onClick={()=>{setisModal(false);setSingleProduct(null)}}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors absolute right-2 top-2 z-100"
          />

        {/* Modal Body */}
        <div className="relative z-80 flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <img
                  // alt={singleProduct._id}
                  src={singleProduct?.images[0]}
                  className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 sm:pr-12 leading-tight">{singleProduct?.name}</h2>
                  <section >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>
                    <div className="flex items-baseline gap-3 mt-3">
    <p className="text-xl md:text-2xl font-bold text-indigo-600">Rs. {singleProduct?.discountPrice}</p>
    {singleProduct?.discountPrice && (
      <p className="text-lg text-gray-400 line-through">Rs. {singleProduct?.price}</p>
    )}
  </div>
                    <p className="text-gray-500 text-sm mt-1">
    Brand: <span className="font-medium">{singleProduct?.brand || "No Brand"}</span> | 
    Category: <span className="font-medium">{singleProduct?.category}</span>
  </p>
                    {/* Tags */}
  <div className="flex flex-wrap gap-2 mt-3">
    {singleProduct?.tags?.map((tag, i) => (
      <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
        #{tag}
      </span>
    ))}
  </div>
                    <p className={`mt-2 text-sm ${singleProduct?.inStock ? "text-green-600" : "text-red-600"}`}>
    {singleProduct?.inStock ? "In Stock" : "Out of Stock"}
  </p>
                    {/* Description */}
  <div className="mt-4 max-h-40 overflow-y-auto border-t pt-3 text-gray-700 text-sm">
    {singleProduct?.description}
  </div>

  {/* Actions */}
  <div className="mt-6 flex gap-3">
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition" onClick={()=>addToCart(singleProduct._id,1)}>
      {addCart.isPending ? "Adding..." : "Add to Cart"}
    </button>
  </div>
                  </section>
                </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
