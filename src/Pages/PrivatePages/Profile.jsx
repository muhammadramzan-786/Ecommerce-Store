import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useUpdateUser, useUser } from '../../hooks/useUser';
import Input from '../../components/Input';

function Profile() {
    const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password:""
  });
  
  // Zustand state
  const user = useUserStore((state) => state.user);

  useEffect(()=>{
    // console.log(user);
    setForm({
      name:user?.name,
      email: user?.email,
      phone: user?.phone,
      city: user?.city,
    })
    
  },[user])

  const handleChange=(e)=>{
    const {name, value}=e.target
    // console.log("name", name);
    // console.log("value", value);
    
    setForm({...form,[name]:value})
  }

  const updateUser=useUpdateUser()
  const { isPending, isError, error, isSuccess } = updateUser;
  const handleSubmit=(e)=>{
    e.preventDefault()

    updateUser.mutate({id:user._id,...form})
        console.log(form);
  }
  return (
    <div className=" bg-white p-4 md:p-6  w-full">

        
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Profile Information
        </h2>

        <div className='sm:flex sm:gap-4 '>
          {/* Name */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <Input type="text" value={form?.name || ""} onChange={handleChange} placeholder="Enter your name" name="name" />
        </div>
        {/* Email */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <Input type="email" value={form?.email || ""} onChange={handleChange} placeholder="Enter your email" name="email" />
        </div>
        </div>

        <div className='sm:flex sm:gap-4 '>
          {/* Phone */}
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <Input type="number" value={form?.phone || ""} onChange={handleChange} placeholder="Enter phone number" name="phone" />
        </div>
        {/* City */}
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <Input type="text" value={form?.city || ""} onChange={handleChange} placeholder="Enter City" name="city" />
        </div>
        </div>

        {/* Passwod */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <Input type="password" value={form?.password || ""} onChange={handleChange} placeholder="Enter your password" name="password" />
        </div>
        {/* Save Button */}
        <button onClick={handleSubmit} className=" px-5 bg-[#4B3EC4] text-white py-3 rounded-lg font-medium hover:bg-[#6352f3] transition-colors" disabled={isPending}>
          {isPending?"Saving":"Save Changes"}
        </button>

    </div>
  );
}

export default Profile;
