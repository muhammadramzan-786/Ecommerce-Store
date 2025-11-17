import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link, NavLink, Outlet } from 'react-router-dom'

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
    {
        name:"My address",
        icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>),
                        link:"/orders",
                        exact: false
    },
    {
        name:"Change password",
        icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>),
                        link:"/orders",
                        exact: false
    },
]
function ProfileLayout() {
  return (
     <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Information</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-9 gap-8 relative">
            {/* Sidebar */}
          <div className="w-full md:col-span-3 lg:col-span-2 border border-gray-200 rounded-xl mx-auto overflow-x-hidden md:sticky top-18 self-start bg-white">
            <div className='px-4 pt-4'>
                <img src='https://res.cloudinary.com/dzqdp2i1t/image/upload/v1762948919/samples/ecommerce/ezcrmom4jmlbzuqh7zsb.webp' className='w-full object-contain aspect-square mx-auto rounded-xl' />
                <div className='mt-2'>
                    <h3 className='text-xl font-semibold'>Mark Cole</h3>
                    <p>swoo@gmail.com</p>
                </div>
            </div>
            <div className="bg-white shadow-sm p-4 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                {actions.map((item,i)=>(
                <NavLink key={i} to={item.link} end={item.exact} className={({isActive})=>`w-full flex items-center justify-between gap-3 p-3 text-left border border-[#4B3EC4]  
                rounded-lg transition-colors ${isActive?"bg-[#4B3EC4] text-white":" text-[#4B3EC4] bg-white hover:bg-blue-100"}`}>
                  {/* {item.icon} */}
                  <span className="text-sm font-medium">{item.name}</span>
                  <FaArrowRight />
                </NavLink>
                ))}

              </div>

              {/* Save Button */}
              <div className="mt-2 pt-4 border-t border-gray-200">
                <button className="w-full bg-[#4B3EC4] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#6352f3] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SAVE CHANGES
                </button>
              </div>
            </div>

           
          </div>
          {/* Main Content */}
          <div className=" md:col-span-6 lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mx-auto overflow-hidden">
              <Outlet />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout