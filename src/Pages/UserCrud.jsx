import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUser, FaImage, FaSave, FaPlus } from 'react-icons/fa';

const apiUrl = 'https://ecommerce-store-three-beta-84.vercel.app/api/users';
const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dzqdp2i1t/image/upload';
const uploadPreset = 'ecommerce_users';

function UserCrud() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(apiUrl);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return '';

    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', uploadPreset);
    data.append('folder', 'samples/ecommerce');

    try {
      const res = await fetch(cloudinaryUploadUrl, {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      return result.secure_url || '';
    } catch (error) {
      console.error('Upload error:', error);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
      } else if (editId) {
        const userBeingEdited = users.find((u) => u._id === editId);
        imageUrl = userBeingEdited?.image || '';
      }

      const userPayload = {
        ...form,
        image: imageUrl,
      };

      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${apiUrl}?id=${editId}` : apiUrl;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });

      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    });
    setImageFile(null);
    setImagePreview('');
    setEditId(null);
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
    });
    setImagePreview(user.image);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setIsLoading(true);
        await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (err) {
        console.error('Delete error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      {/* User Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editId ? 'Edit User' : 'Add New User'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 flex items-center">
                  <FaImage className="mr-2" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white flex items-center"
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  {editId ? (
                    <>
                      <FaSave className="mr-2" />
                      Update User
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" />
                      Add User
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">All Users</h2>
        
        {isLoading && !users.length ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCrud;