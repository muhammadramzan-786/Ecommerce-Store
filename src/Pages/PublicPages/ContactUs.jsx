import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Input from "../../components/Input";
import { useCreateContact, useGetContact } from "../../hooks/useContact";
import { useUserStore } from "../../stores/userStore";
import {  FaUser, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";


function ContactUs() {
  const user = useUserStore((state) => state.user);
  const [form,setForm]=useState({
    userId:user?._id,
    fullName:user?.name,
    email:user?.email,
    message:""
  })
  const handleChange=(e)=>{
    const {name, value}=e.target
    setForm(prev=>({...prev,[name]:value}))
  }

  const { isPending, mutate, isError, error }=useCreateContact()
  
  const {isLoading, data:contacts=[]}=useGetContact()
  const filterContacts=contacts.filter(contact=>contact.userId===user?._id)
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(form.fullName === '' || form.email === '' || form.message === ''){
        toast.warning('Fill all fields.')
        return
      }
    mutate(form)
    setForm({
    message:""
  })
  toast.error(error?.response.data.message);
  
  }
    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Contact Us
        </h1>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Full Name
                </label>
                <Input type="text" name="fullName" placeholder="Enter your name" value={form.fullName} onChange={handleChange} />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email Address
                </label>
                <Input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Message
                </label>
                <textarea rows="5" placeholder="Write your message..." name="message" value={form.message} onChange={handleChange}
                className={`peer w-full bg-transparent text-gray-950 font-sans font-medium outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:ring-1 text-sm px-3 py-3 rounded-md border-gray-300 focus:border-gray-900`}

                ></textarea>
              </div>

              <button type="submit" disabled={isPending} className={`${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-[#4B3EC4] hover:opacity-90"} flex items-center justify-center text-white w-full py-2 rounded-md transition`} >
                {isPending && (
                     <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>)} Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            <div className="space-y-6">
              {/* Phone */}
              

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-indigo-600 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">dev.mramzan@gmail.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">
                    Gulgasht, Multan, Pakistan
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : filterContacts.length === 0 ? (
                <div className="text-center py-8">
                  <FaEnvelope className="text-gray-300 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filterContacts.map((contact) => (
                    <div 
                      key={contact._id} 
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-white"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <FaUser className="text-indigo-600 text-sm" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{contact.fullName}</h3>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                          </div>
                        </div>
                        
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {contact.message}
                      </p>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FaCalendarAlt className="text-xs" />
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
      </div>
    </div>
  );
}

export default ContactUs;
