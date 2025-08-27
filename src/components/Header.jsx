import React from 'react'

function Header() {
  return (
  <header className="bg-white">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
      <div className="flex items-center justify-between h-16 lg:h-[72px]">
        <div className="flex items-center flex-shrink-0">
          <a href="" className="inline-flex">
            <span className="sr-only"> logo </span>
            <span className="font-bold text-xl">Logo</span>
          </a>
        </div>
        <div className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14">
          <a href="#"  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"> All Artworks </a>
          <a href="#"  className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"> All Artists </a>
          <a href="#"  className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"> Sell Your Artwork </a>
        </div>
        <div className="flex items-center justify-end">
          <div className="hidden lg:flex lg:items-center gap-3 mr-6">
            <img src="" alt="" srcSet="" className='w-10 h-10 bg-[#EBEEF6] rounded-full ' />
            <div>
              <p className='text-sm '>Welcome</p>
              <a href="#"  className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">log in / Register</a>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-5">
            <button type="button" className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button type="button" className="relative p-2 -m-2 text-gray-900 transition-all duration-200 hover:text-gray-700">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full"> 3 </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header