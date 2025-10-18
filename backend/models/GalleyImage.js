const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
