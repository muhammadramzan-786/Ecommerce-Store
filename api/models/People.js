import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export default mongoose.models.People || mongoose.model('People', PeopleSchema);
