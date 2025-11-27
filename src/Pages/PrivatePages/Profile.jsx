import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useUpdateUser, useUser } from '../../hooks/useUser';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';

 const cloudinaryUploadUrl ="https://api.cloudinary.com/v1_1/dzqdp2i1t/image/upload";
 const uploadPreset = "ecommerce_products";
function Profile() {
    const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    image:'',
    password:""
  });
  const [imageFile,setImageFile]=useState(null)
  // Zustand state
  const user = useUserStore((state) => state.user);

  useEffect(()=>{
    setForm({
      name:user?.name,
      email: user?.email,
      phone: user?.phone,
      city: user?.city,
      image: user?.image,
    })
    
  },[user])

  const uploadImage=(e)=>{
    const file=e.target.files[0]
    setImageFile(file)
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    const maxSize = 500 * 1024; // 500KB

    if(!validTypes.includes(file.type)){
      toast.error("Upload Valid Image Formate");
      e.target.value=""
      return
    }
    if(file.size >= maxSize){
      toast.error(`Maximum 500KB size image allowed`);
      e.target.value=""
      return
    }
    setForm(prev=>(
      {
        ...prev,
      image:URL.createObjectURL(file)
    }
    ))
    e.target.value=""
  }

  const handleChange=(e)=>{
    const {name, value}=e.target
    setForm({...form,[name]:value})
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", 'samples/ecommerce');

    try{
    const res = await fetch(cloudinaryUploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
    }catch(err){
        return err
    }
  };

  const updateUser=useUpdateUser()
  const { isPending, isError, error, isSuccess } = updateUser;
  const handleSubmit=async(e)=>{
    e.preventDefault()
    let finalImageUrl =form.image
    if(imageFile){
      finalImageUrl =await uploadToCloudinary(imageFile)
    }

    updateUser.mutate({id:user._id,...form,image:finalImageUrl})
  }
  return (
    <div className=" bg-white p-4 md:p-6  w-full">

        
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Profile Information
        </h2>
        <div className='relative w-max mb-5'>
          <img src={form.image} className='w-54 h-40 object-cover rounded-lg' />
          <label className='border border-gray-300 absolute -bottom-3 -right-3 cursor-pointer bg-white duration-300 hover:bg-[#4B3EC4] hover:text-white p-2 rounded-full'>
            <FaImage />
            <input type='file' className='hidden' onChange={uploadImage} accept="image/png, image/jpeg, image/webp" />
          </label>
        </div>
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
        <Button text={"Save Changes"} loading={isPending} onClick={handleSubmit} className=" px-5 bg-[#4B3EC4] text-white py-3 rounded-lg font-medium hover:bg-[#6352f3] transition-colors" disabled={isPending} />

    </div>
  );
}

export default Profile;
