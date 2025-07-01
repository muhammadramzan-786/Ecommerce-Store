import connectMongo from '../../mongodb';
import People from '../../models/People';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectMongo();

    if (req.method === 'GET') {
      const people = await People.find();
      return res.status(200).json(people);
    }

    if (req.method === 'POST') {
      const { name, age } = req.body;
      const newPerson = new People({ name, age });
      await newPerson.save();
      return res.status(201).json(newPerson);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
