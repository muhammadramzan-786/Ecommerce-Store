import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const apiUrl = 'https://ecommerce-store-three-beta-84.vercel.app/api/people';  // ✅ Replace with your actual Vercel API URL

  // GET Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
useEffect(() => {
  fetch('https://ecommerce-store-three-beta-84.vercel.app/api/people')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error fetching users:', err));
}, []);

  // POST User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: Number(age) }),
      });

      if (response.ok) {
        console.log('User added successfully!');
        setName('');
        setAge('');
        fetchUsers(); // ✅ Refresh user list after POST
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error during POST:', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + MongoDB</h1>

      {/* ✅ Form to Add New User */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* ✅ Users List */}
      <div className="card">
        <h2>Users List:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.name} - Age: {user.age}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
