import connectMongo from './mongodb.js';
import User from '../models/People.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectMongo();

    const { id } = req.query;

    if (req.method === 'GET') {
      const users = await User.find();
      return res.status(200).json(users);
    }

    if (req.method === 'POST') {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json(user);
    }

    if (req.method === 'PUT') {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updatedUser);
    }

    if (req.method === 'DELETE') {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
