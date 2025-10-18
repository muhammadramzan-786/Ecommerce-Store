import React from "react";
import Header from "../components/Header";
// App.jsx ya index.js me
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // agar navigation chahiye
import "swiper/css/pagination"; // agar dots chahiye

const categories=[
  {
    name:'Laptop & PC',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1751800791/l05vmonumi6t1sahszg4.jpg'
  },
  {
    name:'Watches',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1752935052/apc9cm7wsh9ws3qcgbvu.png'
  },
  {
    name:'Mobile & Tablets',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1752935050/df9sg2pv8b4wsqhqmeak.png'
  },
  {
    name:'Health & Sports',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1752934950/b6s12rufrydc35xazxo2.png'
  },
  {
    name:'Home Appliances',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1751392100/samples/ecommerce/f46oxavinsya0xyhwl06.jpg'
  },
  {
    name:'Games & Videos',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1751392500/samples/ecommerce/pdeky2lugvw7telb8it2.jpg'
  },
  {
    name:'Televisions',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1744464988/cld-sample-5.jpg'
  },
  {
    name:'Bags',
    img:'https://res.cloudinary.com/dzqdp2i1t/image/upload/v1744464988/cld-sample-4.jpg'
  },
]

const products=[
{
  name:'Apple AirPods Max',
  price:'450',
  oldPrice:''
}
]

function Home() {
  return (
    <>
      <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-0">
        <div class="flex flex-col xl:flex-row gap-5">
          <div className="xl:w-2/3 w-full  relative z-1 rounded-[10px] bg-white overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              // navigation
              pagination={{ clickable: true }}
              // autoplay={{ delay: 3000 }}
              // loop={true}
              class=" h-full"
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
                      className="inline-flex font-medium text-white text-custom-sm rounded-full bg-[#3c50e0] py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-6 sm:mt-10"
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
                      className="inline-flex font-medium text-white text-custom-sm rounded-full bg-[#3c50e0] py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-6 sm:mt-10"
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
                      className="inline-flex font-medium text-white text-custom-sm rounded-full bg-[#3c50e0] py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-6 sm:mt-10"
                      href="/products/iphone-16-pro-max"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="xl:w-1/3 w-full flex flex-col justify-between sm:flex-row xl:flex-col gap-5">
            <div className="w-full relative rounded-[10px] px-6 py-4 sm:py-5 sm:px-7  bg-[#D7EBF2]">
              <div className="flex  justify-between gap-4">
                <div className="max-w-[153px] flex flex-col justify-between w-full">
                  <h2 className="max-w-[153px] font-semibold text-dark text-[22px]   hover:text-blue">
                    <a href="/products/apple-ipad-air-5th-gen---64gb">
                      Smart Security Home Camera{" "}
                    </a>
                  </h2>
                  <div>
                    <span className="flex items-center  gap-1 text-lg">
                      <span className="font-medium text-dark text-custom-sm ">
                        Save up to
                      </span>
                      <span className="font-semibold text-lg text-blue">
                        $450
                      </span>
                    </span>
                  </div>
                </div>
                <div className="max-w-[180px] w-full">
                  <img
                    alt="mobile image"
                    loading="lazy"
                    width={180}
                    height={210}
                    decoding="async"
                    data-nimg={1}
                    src="https://res.cloudinary.com/dzqdp2i1t/image/upload/v1758698883/8e4cb1084e433d3220697458461de41a51c91818-176x212_di9joj.webp"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full relative rounded-[10px] px-6 py-4 sm:py-5 sm:px-7  bg-[#EAE7DE]">
              <div className="flex  justify-between gap-4">
                <div className="max-w-[153px] flex flex-col justify-between w-full">
                  <h2 className="max-w-[153px] font-semibold text-dark text-[22px]   hover:text-blue">
                    <a href="/products/iphone-14-plus--6128gb">
                      Galaxy S24 Ultra 5G{" "}
                    </a>
                  </h2>
                  <div>
                    <span className="flex items-center  gap-1 text-lg">
                      <span className="font-medium text-dark text-custom-sm ">
                        Save up to
                      </span>
                      <span className="font-semibold text-lg text-blue">
                        $600
                      </span>
                    </span>
                  </div>
                </div>
                <div className="max-w-[180px] w-full">
                  <img
                    alt="mobile image"
                    loading="lazy"
                    width={180}
                    height={210}
                    decoding="async"
                    data-nimg={1}
                    src="https://res.cloudinary.com/dzqdp2i1t/image/upload/v1758698883/0d5daaaaa7554a8765e5feff240a4370eb50a9c5-176x212_azrxxh.webp"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
          </div>
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

      <section className="overflow-hidden ">
        <div className="w-full px-4 mx-auto border-b max-w-7xl sm:px-6 xl:px-0 pb-15 border-gray-3">
          <div className="swiper categories-carousel common-carousel">
            <div>
              <h2 className="text-xl font-semibold xl:text-heading-5 text-dark">
                Browse by Category
              </h2>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={6}
              // pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full"
            >
              {/* Slide 1 */}
              {categories.map((category) => (
                <SwiperSlide>
                  <a
                    className="group flex flex-col items-center"
                    href="/categories/televisions"
                  >
                    <div className="w-full bg-[#F2F3F8] rounded-full flex items-center justify-center mb-4 p-1">
                      <img src={category.img} alt="Category" loading="lazy" width={100} height={100} decoding="async" data-nimg={1} style={{ color: "transparent" }} 
                      className="rounded-full aspect-square object-cover bg-gray-400"/>
                    </div>
                    <div className="flex justify-center">
                      <h3 className="inline-block font-medium text-center text-dark bg-linear-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                        {category.name}
                      </h3>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="overflow-hidden pt-15 bg-[#FFFFFF]">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 xl:px-0 ">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                New Arrivals
              </h2>
            </div>
            <a
              className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-full border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
              href="/shop-with-sidebar"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
            <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">

              <div className="relative overflow-hidden flex items-center justify-center bg-[#F6F7FB]">
                <a href="/products/portable-electric-grinder-maker" className="block bg-[#F6F7FB]">
    <div className="aspect-square overflow-hidden">
      <img
        src="https://res.cloudinary.com/dzqdp2i1t/image/upload/v1757934595/samples/ecommerce/uqme5gdt1p7uf1tw7dbb.jpg"
        alt="Portable Electric Grinder Maker"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  </a>
                <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
                  <button
                    aria-label="button for quick view"
                    className="flex items-center justify-center w-9 h-9 rounded-full shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                  >
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0234 7.625C9.60719 7.625 7.64844 9.58375 7.64844 12C7.64844 14.4162 9.60719 16.375 12.0234 16.375C14.4397 16.375 16.3984 14.4162 16.3984 12C16.3984 9.58375 14.4397 7.625 12.0234 7.625ZM9.14844 12C9.14844 10.4122 10.4356 9.125 12.0234 9.125C13.6113 9.125 14.8984 10.4122 14.8984 12C14.8984 13.5878 13.6113 14.875 12.0234 14.875C10.4356 14.875 9.14844 13.5878 9.14844 12Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0234 4.5C7.71145 4.5 3.99772 7.05632 2.30101 10.7351C1.93091 11.5375 1.93091 12.4627 2.30101 13.2652C3.99772 16.9439 7.71145 19.5002 12.0234 19.5002C16.3353 19.5002 20.049 16.9439 21.7458 13.2652C22.1159 12.4627 22.1159 11.5375 21.7458 10.7351C20.049 7.05633 16.3353 4.5 12.0234 4.5ZM3.66311 11.3633C5.12472 8.19429 8.32017 6 12.0234 6C15.7266 6 18.922 8.19429 20.3836 11.3633C20.5699 11.7671 20.5699 12.2331 20.3836 12.6369C18.922 15.8059 15.7266 18.0002 12.0234 18.0002C8.32017 18.0002 5.12472 15.8059 3.66311 12.6369C3.47688 12.2331 3.47688 11.7671 3.66311 11.3633Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <button className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-full bg-[#3c50e0] text-white ease-out duration-200 hover:bg-blue-dark">
                    Add to cart
                  </button>
                  <button
                    aria-label="button for favorite select"
                    className="flex items-center justify-center w-9 h-9 rounded-full shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                  >
                    <svg
                      className="w-5 h-5"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.8227 4.77124L12 4.94862L12.1773 4.77135C14.4244 2.52427 18.0676 2.52427 20.3147 4.77134C22.5618 7.01842 22.5618 10.6616 20.3147 12.9087L13.591 19.6324C12.7123 20.5111 11.2877 20.5111 10.409 19.6324L3.6853 12.9086C1.43823 10.6615 1.43823 7.01831 3.6853 4.77124C5.93237 2.52417 9.5756 2.52417 11.8227 4.77124ZM10.762 5.8319C9.10073 4.17062 6.40725 4.17062 4.74596 5.8319C3.08468 7.49319 3.08468 10.1867 4.74596 11.848L11.4697 18.5718C11.7625 18.8647 12.2374 18.8647 12.5303 18.5718L19.254 11.8481C20.9153 10.1868 20.9153 7.49329 19.254 5.83201C17.5927 4.17072 14.8993 4.17072 13.238 5.83201L12.5304 6.53961C12.3897 6.68026 12.199 6.75928 12 6.75928C11.8011 6.75928 11.6104 6.68026 11.4697 6.53961L10.762 5.8319Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
    <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate">
      <a href="/products/portable-electric-grinder-maker">
        Portable Electric Grinder Maker
      </a>
    </h3>
    <div className="flex items-center gap-2 mt-1">
      <span className="text-lg font-bold text-gray-900">$777</span>
      <span className="text-sm line-through text-gray-400">$888</span>
    </div>
  </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
