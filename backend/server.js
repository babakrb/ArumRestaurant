const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Prepare allowed origins list
const allowedOrigins = process.env.CORS_ORIGIN.split(",").map(o => o.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true
  })
);

app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Multer setup for temporary local upload
const upload = multer({ dest: 'uploads/' });

// ✅ MenuItem schema
const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: String,
  priceMedium: String,
  priceLarge: String,
  image: String,       // Cloudinary URL
  public_id: String,   // Cloudinary public ID
  cat: String,
});
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);


// ✅ GalleryImage schema
const GalleryImageSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String
});
const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema);


// ✅ GET all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu', error: err.message });
  }
});

// ✅ POST new menu item (Upload to Cloudinary)
app.post('/api/menu', upload.single('image'), async (req, res) => {
  const { name, price, priceMedium, priceLarge, cat } = req.body;

  try {
    let uploadResult = null;
    if (req.file) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'arum/menu', // Folder name in Cloudinary
      });
      fs.unlinkSync(req.file.path); // Remove local temp file
    }

    const newItem = new MenuItem({
      name,
      price,
      priceMedium,
      priceLarge,
      cat,
      image: uploadResult ? uploadResult.secure_url : '',
      public_id: uploadResult ? uploadResult.public_id : '',
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});

// ✅ PUT update existing item (replace image if provided)
app.put('/api/menu/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, price, priceMedium, priceLarge, cat } = req.body;

  try {
    const existingItem = await MenuItem.findById(id);
    if (!existingItem) return res.status(404).json({ message: 'Item not found' });

    let updateData = { name, price, priceMedium, priceLarge, cat };

    if (req.file) {
      // Delete old image from Cloudinary
      if (existingItem.public_id) {
        await cloudinary.uploader.destroy(existingItem.public_id);
      }

      // Upload new image
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'arum/menu',
      });
      fs.unlinkSync(req.file.path);

      updateData.image = uploadResult.secure_url;
      updateData.public_id = uploadResult.public_id;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ message: 'Error updating item', error: err.message });
  }
});

// ✅ DELETE item (remove from MongoDB + Cloudinary)
app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await MenuItem.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Delete image from Cloudinary if exists
    if (item.public_id) {
      await cloudinary.uploader.destroy(item.public_id);
    }

    await MenuItem.findByIdAndDelete(id);
    res.json({ message: 'Item and image deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
});

// ✅ GET gallery images
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gallery', error: err.message });
  }
});

app.get('/api/test', (req, res) => {
  res.send('hello');
});

// ✅ Auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
