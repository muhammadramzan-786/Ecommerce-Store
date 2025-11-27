import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { NavLink, Outlet } from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
import Button from '../../components/Button';
import { useUserStore } from '../../stores/userStore';

const actions=[
    {
        name:"Account info",
        icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>),
            link:"/profileLayout",
            exact: true
    },
    {
        name:"My order",
        icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>),
                        link:"/profileLayout/orders",
                        exact: false
    },
]
function ProfileLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useUserStore((state) => state.user);
  return (
     <div className="min-h-screen bg-gray-50 py-8 max-w-[1920px] w-full mx-auto ">
      <div className=" px-4 sm:px-6 lg:px-8 flex flex-col max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-5 2xl:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Information</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
        </div>

        {/* Mobile Toggle Button */}
          <div className="md:hidden mb-4">
            <Button text='Open Menu' onClick={() => setShowSidebar(true)} className="px-4 py-2 bg-[#4B3EC4] text-white rounded-lg" />
          </div>
        <div className="flex  gap-5 lg:gap-8 relative ">  
            {/* Sidebar */}
<div className={`max-w-54 lg:max-w-64 shadow-2xl md:shadow-none overflow-hidden border border-gray-200 md:rounded-xl mx-auto md:mx-0 h-full md:h-auto fixed top-12 sm:top-15 left-0 md:sticky md:top-18 self-start 
  bg-white transform transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
    {/* Close Button for Mobile */}
  <Button icon={FaTimes} onClick={() => setShowSidebar(false)}
    className={`md:hidden p-1 rounded-full bg-red-600 text-white font-bold absolute  ${showSidebar ? "-right-2" : "right-0"}`} />

            <div className='px-4 pt-4'>
                <img src={user?.image} className='w-full h-full object-cover aspect-square mx-auto rounded-xl border border-gray-300' />
                <div className='mt-2'>
                    <h3 className='text-xl font-semibold'>Mark Cole</h3>
                    <p>swoo@gmail.com</p>
                </div>
            </div>
            <div className="bg-white px-4 pb-4 pt-2 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              
              <div className="space-y-2">
                {actions.map((item,i)=>(
                <NavLink key={i} to={item.link} end={item.exact} className={({isActive})=>`w-full flex items-center justify-between gap-3 p-3 text-left border border-[#4B3EC4]  
                rounded-lg transition-colors ${isActive?"bg-[#4B3EC4] text-white":" text-[#4B3EC4] bg-white hover:bg-blue-100"}`}>
                  {/* {item.icon} */}
                  <span className="text-sm font-medium">{item.name}</span>
                  <FaArrowRight />
                </NavLink>
                ))}

              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-full md:ml-0">
            <div className="bg-white rounded-xl border border-gray-200 mx-auto overflow-hidden">
              <Outlet />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout