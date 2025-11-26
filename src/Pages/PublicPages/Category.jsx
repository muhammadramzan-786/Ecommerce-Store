import React, { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaShoppingBag, FaFilter, FaChevronDown } from 'react-icons/fa';
import { useProductsStore } from '../../stores/productsStore';
import { useAddCart } from '../../hooks/useCart';
import { useCategoryStore } from '../../stores/categoryStore';
import ProductModal from '../../components/ProductModal ';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // agar navigation chahiye
import "swiper/css/pagination"; // agar dots chahiye
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import Input from '../../components/Input';

function Category() {
  const {name}=useParams()
  const [isModal,setisModal]=useState(false)
  const [singleProduct,setSingleProduct]=useState(null)
  const [searchVal, setSearchVal] = useState('');

  const {isLoading, error, products}=useProductsStore()
  const filterProducts=products?.filter(item=>{
    const matchCategory=item.category.includes(name)
    const matchSearch=item.name.toLowerCase().includes(searchVal.toLowerCase())
    return matchCategory && matchSearch
  })
  console.log(products);
  const {loading,categories}=useCategoryStore()

    const userId = localStorage.getItem("userId");
    const addCart =useAddCart()
      const addToCart = (productId,quantity) => {        
      // Add to cart logic here
      addCart.mutate({
        userId:userId,
        productId:productId,
        quantity:quantity
      })
    };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10">
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
                  <Link key={i}
                    className="group flex flex-col items-center"
                    to={`/category/${category.name}`}
                  >
                    <CategoryCard name={category.name} image={category.image} loading={loading} />
                  </Link>
                </SwiperSlide>
              )))}
            </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          

          {/* Main Content */}
          <div className="flex-1">
              <div className='max-w-[400px]'>
                <Input onChange={(e)=>setSearchVal(e.target.value)} type="text" placeholder="Type to search..." />
              </div>

            {/* Products Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-7.5 gap-y-9 mt-8`}>
              {filterProducts?.map((item,i)=>{
                            const {name, price, discountPrice, _id}=item
                            return <ProductCard image={item.images[0]} name={name} oldPrice={price} price={discountPrice} key={_id} productID={_id}
                            onClick={()=>{setisModal(true);setSingleProduct(item);}} addToCart={(id, q) => addToCart(id, q)} loading={isLoading} />
                          })}
            </div>

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

export default Category;