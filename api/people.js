const connectMongo = require('../../mongodb');
const People = require('../../models/People');

module.exports = async (req, res) => {
  // ✅ Step 1: CORS Headers Add karo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Step 2: Handle Preflight OPTIONS Request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ Step 3: MongoDB Connect
  await connectMongo();

  // ✅ Step 4: GET Request - Fetch All People
  if (req.method === 'GET') {
    try {
      const people = await People.find();
      return res.status(200).json(people);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch people' });
    }
  }

  // ✅ Step 5: POST Request - Add New Person
  if (req.method === 'POST') {
    try {
      const person = new People(req.body);
      await person.save();
      return res.status(201).json(person);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add person' });
    }
  }

  // ✅ Step 6: If Method Not Allowed
  res.status(405).end(); // Method Not Allowed
};
