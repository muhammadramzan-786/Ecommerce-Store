import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Input from "../components/Input";

function ContactUs() {
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

            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Full Name
                </label>
                <Input type="text" placeholder="Enter your name"/>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email Address
                </label>
                <Input type="email" placeholder="Enter your email" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Message
                </label>
                <textarea rows="5" placeholder="Write your message..."
                className={`peer w-full bg-transparent text-gray-950 font-sans font-medium outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:ring-1 text-sm px-3 py-3 rounded-md border-gray-300 focus:border-gray-900`}

                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#4B3EC4] text-white w-full py-2 rounded-md hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-indigo-600 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+92 300 1234567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-indigo-600 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">support@shopnestonline.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">
                    Shopnest Online, Lahore, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-8">
              <iframe
                title="map"
                className="rounded-lg w-full h-60"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13606.948927329112!2d74.311!3d31.5204!2m3!1f0!2f0!3f0!3m2!"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
