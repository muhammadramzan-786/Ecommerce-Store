import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// App.jsx ya index.js me
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // agar navigation chahiye
import "swiper/css/pagination"; // agar dots chahiye
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ProductCard from "../../components/ProductCard";
// import { category } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import Button from "../../components/Button";
import { useAddCart } from "../../hooks/useCart";
import CategoryCard from "../../components/CategoryCard";
import { useProductsStore } from "../../stores/productsStore";
import { useCategoryStore } from "../../stores/categoryStore";
import ProductModal from "../../components/ProductModal ";
import LoginModal from "../../components/LoginModal";
import AppLink from "../../components/AppLink";

function Home() {
  const [isModal,setisModal]=useState(false)
  const [visibleCount, setVisibleCount] = useState(8);
  const [singleProduct,setSingleProduct]=useState(null)

  const {isLoading, error, products}=useProductsStore()
  const {loading,categories}=useCategoryStore()

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const addCart =useAddCart()
    const addToCart = (productId,quantity) => {
      if(token && userId){
        addCart.mutate({
          userId:userId,
          productId:productId,
          quantity:quantity
        })
      } 
  };
  
  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-0">
        <section className="w-full sm:px-4 mx-auto max-w-7xl xl:px-0 pb-5 border-gray-3 mt-5">
          <div className="swiper categories-carousel common-carousel">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-semibold xl:text-heading-5 text-dark mb-3">
                Popular Categories
              </h2>
              
            </div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              // slidesPerView={8}
              // pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full"
              breakpoints={{
    320: { slidesPerView: 2 },    // mobile
    480: { slidesPerView: 3 },    // small screens
    640: { slidesPerView: 4 },    // tablets
    768: { slidesPerView: 5 },    // medium screens
    1024: { slidesPerView: 6 },   // large tablets/laptops
    1280: { slidesPerView: 8 },   // desktops
  }}
            >
              {(categories?.map((category, i) => (
                <SwiperSlide>
                  <AppLink  key={i}
                    className="group flex flex-col items-center"
                    to={`/category/${category.name}`}
                  >
                    <CategoryCard name={category.name} image={category.image} loading={loading} />
                  </AppLink >
                </SwiperSlide>
              )))}
            </Swiper>
          </div>
        </section>
      </div>

      <section className="overflow-hidden pt-5 bg-[#FFFFFF]">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-0 ">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                New Arrivals
              </h2>
            </div>
            <AppLink 
              className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-full border-gray-300 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark "
              to="/shop"
            >
              View All
            </AppLink >
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-7.5 gap-y-9">
            {error? (<p>Error: {error.message || "Something went wrong"}</p>):
             Array.isArray(products) &&products?.length>0 ? (products?.slice(0,visibleCount).map((item,i)=>{
              const {name, price, discountPrice, _id}=item
              return <ProductCard image={item.images[0]} name={name} oldPrice={price} price={discountPrice} key={_id} productID={_id}
              onClick={()=>{setisModal(true);setSingleProduct(item); }} addToCart={(id, q) => {addToCart(id, q);}} loading={isLoading} />
            })):(<p>No products found</p>)}
            
          </div>
          <button className="bg-[#4B3EC4] text-white py-1.5 px-5 rounded-full flex items-center gap-1 mx-auto mt-8 "
          onClick={()=>setVisibleCount(prev=>prev+8)}>Load More <IoIosArrowDown className="mt-1" />
</button>
        </div>
      </section>

      <ProductModal isModal={isModal} image={singleProduct?.images[0]} name={singleProduct?.name} discountPrice={singleProduct?.discountPrice} price={singleProduct?.price}
      brand={singleProduct?.brand} category={singleProduct?.category} tags={singleProduct?.tags} inStock={singleProduct?.inStock} id={singleProduct?._id}
      description={singleProduct?.description} addToCart={(id, q)=>addToCart(id, q)} isPending={addCart?.isPending} closeModal={()=>{setisModal(false);setSingleProduct(null)}} />
    


    </>
  );
}

export default Home;
