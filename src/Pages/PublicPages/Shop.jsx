import React, { useEffect, useState } from 'react'
import { useProductsStore } from '../../stores/productsStore'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import { FaTimes, FaFilter } from "react-icons/fa";
import { useAddCart } from '../../hooks/useCart';
import { useCategoryStore } from '../../stores/categoryStore';
import Input from '../../components/Input';
import ProductModal from '../../components/ProductModal ';


function Shop() {
  const [singleProduct,setSingleProduct]=useState(null)
  const [searchVal, setSearchVal] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isModal,setisModal]=useState(false)
  const [selectedBrands, setSelectedBrands] = useState([]);
const [selectedCategories, setSelectedCategories] = useState([]);

   const {isLoading, error, products}= useProductsStore()
   const {loading,categories}=useCategoryStore()
   const brands=products.map(item => item.brand).filter((brand,index,arr)=>arr.indexOf(brand)===index)
// console.log(brands);

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

     useEffect(()=>{
      console.log(selectedCategories);
      
     },[selectedCategories])

     const toggleBrand =(brand)=>{
      setSelectedBrands((prev)=>
      prev.includes(brand)? prev.filter(b=>b!==brand):[...prev,brand]
    )
     }

     const toggleCategory=(category)=>{
      setSelectedCategories((prev)=>prev.includes(category)? prev.filter(cat=>cat!==category) : [...prev,category]
      )
     }

     const filteredProducts=products.filter(product=>{
      const brandMatch=selectedBrands.length===0 || selectedBrands.includes(product.brand)
      const categoryMatch =selectedCategories.length===0 || selectedCategories.includes(product.category)
      const searchValMatch=product.name.toLowerCase().includes(searchVal.toLowerCase())

      return brandMatch && categoryMatch && searchValMatch
     })
     
     const clearFilter=()=>{
      setSearchVal("")
      setSelectedCategories([])
      setSelectedBrands([])
     }
     
  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8">
  <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
    {/* Page Header */}
    <div className="mb-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
              {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <Button icon={FaFilter} onClick={() => setShowFilter(!showFilter)} className="px-4 py-2 bg-[#4B3EC4] text-white rounded-lg" />
        </div>
      </div>
      <p className="text-gray-600 mt-2">Discover our amazing collection of products</p>
    </div>

    <div className="flex flex-col md:flex-row gap-5">
      {/* Filters Sidebar */}
      <div className="lg:w-64 flex-shrink-0 ">
        <div className={`bg-white max-h-screen md:rounded-xl border border-gray-300 shadow-2xl md:shadow-none px-4 sm:py-4 fixed z-10 md:sticky left-0 
        top-12 sm:top-15 md:top-18 transform transition-transform duration-300 ${showFilter ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}>
              <Button icon={FaTimes} onClick={() => setShowFilter(false)}
                className={`md:hidden p-1 rounded-full bg-red-600 text-white font-bold absolute top-2 ${showFilter ? "-right-2" : "right-0"}`} />
          <div className='overflow-y-auto max-h-screen pb-13 md:pb-0 pt-4 md:pt-0'>
            {/* Filters Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <Button text='Clear All' className="text-sm text-blue-600 hover:text-blue-700 font-medium" onClick={clearFilter} />
          </div>

          {/* Search Filter */}
          <div className="mb-4 px-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <Input onChange={(e)=>setSearchVal(e.target.value)}
              type="text"
              placeholder="Type to search..."
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
              {categories?.map((category) => (
                <label key={category._id} className="flex items-center cursor-pointer relative gap-3" >
  <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 
  checked:bg-gray-950 checked:border-gray-950" id="check" onChange={()=>toggleCategory(category.name)} checked={selectedCategories.includes(category.name)} />
  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-2.5 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    
  </span>
  {category.name}
</label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
            <div className="space-y-0.5 max-h-40 overflow-y-auto">
              {brands?.map((brand) => (

                <label key={brand} className="flex items-center cursor-pointer relative gap-3" >
  <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 
  checked:bg-gray-950 checked:border-gray-950" id="check" onChange={()=>toggleBrand(brand)} checked={selectedBrands.includes(brand)} />
  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-2.5 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    
  </span>
  {brand}
</label>
              ))}
            </div>
          </div>
         
          {/* Availability Filter */}
          {/* <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Out of Stock</span>
              </label>
            </div>
          </div> */}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        {/* Products Header */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">1-{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Rating</option>
                </select>
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button className="p-2 border-r border-gray-300 hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-7.5 gap-y-9">
          {/* Product Card 1 */}
          {filteredProducts?.map((product)=>{
            const {name, price, discountPrice, _id}=product
            return <ProductCard image={product.images[0]} name={name} oldPrice={price} price={discountPrice} key={_id} productID={_id}
                          onClick={()=>{setisModal(true);setSingleProduct(product);}} addToCart={(id, q) => addToCart(id, q)} loading={isLoading} />
          })}
          
          {/* Add more product cards as needed */}
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">3</button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">10</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
            Next
          </button>
        </div> */}
      </div>
    </div>
  </div>
</div>
      <ProductModal isModal={isModal} image={singleProduct?.images[0]} name={singleProduct?.name} discountPrice={singleProduct?.discountPrice} price={singleProduct?.price}
      brand={singleProduct?.brand} category={singleProduct?.category} tags={singleProduct?.tags} inStock={singleProduct?.inStock} id={singleProduct?._id}
      description={singleProduct?.description} addToCart={(id, q)=>addToCart(id, q)} isPending={addCart?.isPending} closeModal={()=>{setisModal(false);setSingleProduct(null)}} />

    </>
  )
}

export default Shop