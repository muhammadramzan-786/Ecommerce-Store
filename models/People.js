import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
  name: String,
  age: Number, // ✅ Age field add karlo, warna POST fail karega
});

export default mongoose.models.People || mongoose.model('People', PeopleSchema);
