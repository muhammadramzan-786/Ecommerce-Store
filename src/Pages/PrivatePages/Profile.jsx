import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useUpdateUser } from '../../hooks/useUser';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from '../../validation/updateProfileSchema';

 const cloudinaryUploadUrl ="https://api.cloudinary.com/v1_1/dzqdp2i1t/image/upload";
 const uploadPreset = "ecommerce_products";
function Profile() {
  const [imageFile,setImageFile]=useState(null)

  const {register, reset,handleSubmit, formState:{errors}, trigger, watch, setValue} =useForm({
    resolver:yupResolver(updateProfileSchema),
    defaultValues:{
    fullName: '',
    email: '',
    phone: '',
    city: '',
    image:'',
    password:""
    },
    mode:"onChange",
    reValidateMode:"onChange"
  })
  // Zustand state
  const user = useUserStore((state) => state.user);

  useEffect(()=>{
    reset({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    image: user?.image || '',
    password: ''
  });
    
  },[user, reset])
const imagePreview = watch("image");

const uploadImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
  const maxSize = 500 * 1024; // 500KB

  if (!validTypes.includes(file.type)) {
    toast.error("Upload Valid Image Format");
    return;
  }
  if (file.size >= maxSize) {
    toast.error("Maximum 500KB size image allowed");
    return;
  }

  setImageFile(file); 
  setValue("image", URL.createObjectURL(file), { shouldValidate: true, shouldDirty: true }); 
  // Important: shouldValidate & shouldDirty → react-hook-form ko batata hai ki value change hui hai
};


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
  const handleFormSubmit=async(data)=>{
    let finalImageUrl =data.image
    if(imageFile){
      finalImageUrl =await uploadToCloudinary(imageFile)
    }

    const res=await updateUser.mutate({id:user._id,...data,image:finalImageUrl})
    console.log(res);
    
  }
  return (
    <div className=" bg-white p-4 md:p-6  w-full">

        
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Profile Information
        </h2>
        <div className='relative w-max mb-5'>
          <img src={imagePreview || user?.image} className='w-54 h-40 object-cover rounded-lg' />
          <label className='border border-gray-300 absolute -bottom-3 -right-3 cursor-pointer bg-white duration-300 hover:bg-[#4B3EC4] hover:text-white p-2 rounded-full'>
            <FaImage />
            <input type='file' className='hidden' onChange={uploadImage} accept="image/png, image/jpeg, image/webp" />
          </label>
        </div>
        <div className='sm:flex sm:gap-4 '>
          {/* Name */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <Input {...register("fullName")} error={errors.fullName} onBlur={()=>trigger("fullName")} placeholder="Enter your name" name="fullName" />
          <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.fullName ? "opacity-100" : "opacity-0"}`}>
            {errors.fullName?.message || " "}
          </p>
        </div>
        {/* Email */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <Input {...register("email")} error={errors.email} onBlur={()=>trigger("email")} placeholder="Enter your email" name="email" />
          <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.email ? "opacity-100" : "opacity-0"}`}>
            {errors.email?.message || " "}
          </p>
        </div>
        </div>

        <div className='sm:flex sm:gap-4 '>
          {/* Phone */}
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <Input type="number" {...register("phone")} error={errors.phone} onBlur={()=>trigger("phone")} placeholder="Enter phone number" name="phone" />
          <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.phone ? "opacity-100" : "opacity-0"}`}>
            {errors.phone?.message || " "}
          </p>
        </div>
        {/* City */}
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <Input {...register("city")} error={errors.city} onBlur={()=>trigger("city")} placeholder="Enter City" name="city" />
          <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.city ? "opacity-100" : "opacity-0"}`}>
            {errors.city?.message || " "}
          </p>
        </div>
        </div>

        {/* Passwod */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <Input {...register("password")} error={errors.password} onBlur={()=>trigger("password")} placeholder="Enter your password" name="password" />
          <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.password ? "opacity-100" : "opacity-0"}`}>
            {errors.password?.message || " "}
          </p>
        </div>
        {/* Save Button */}
        <Button text={"Save Changes"} loading={isPending} onClick={handleSubmit(handleFormSubmit)} className=" px-5 bg-[#4B3EC4] text-white py-3 rounded-lg font-medium hover:bg-[#6352f3] transition-colors" disabled={isPending} />

    </div>
  );
}

export default Profile;
