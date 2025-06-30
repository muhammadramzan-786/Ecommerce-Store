const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.models.People || mongoose.model('People', PeopleSchema);
