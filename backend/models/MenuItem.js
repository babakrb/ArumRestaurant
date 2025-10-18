const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  cat: String
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
