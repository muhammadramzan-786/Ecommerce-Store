import React, { useState, useEffect } from 'react';

const apiUrl = 'https://ecommerce-store-three-beta-84.vercel.app/api/users';

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
    image: '',
  });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${apiUrl}?id=${editId}` : apiUrl;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        image: '',
      });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            style={{ margin: '5px', display: 'block' }}
            required={['name', 'email', 'password'].includes(field)}
          />
        ))}
        <button type="submit">{editId ? 'Update User' : 'Add User'}</button>
      </form>

      <h3>All Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <img src={user.image} alt="" width="50" height="50" style={{ objectFit: 'cover' }} />
            <div>{user.name} - {user.email}</div>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCrud;
