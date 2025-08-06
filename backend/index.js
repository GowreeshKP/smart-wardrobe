// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Mongoose Schemas
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  skinTone: String, 
  height: String, 
  weight: String,
  chest: String, 
  waist: String, 
  shoulders: String,
  stylePreference: String, 
  favoriteColors: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const WardrobeItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: String,
  color: String,
  fit: String,
  brand: String,
  size: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const WardrobeItem = mongoose.model('WardrobeItem', WardrobeItemSchema);

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// --- API Endpoints ---

// Save or update user profile
app.post('/api/profile', async (req, res) => {
  try {
    console.log('Profile POST body:', req.body);
    const { userId, ...profile } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await User.findOneAndUpdate(
      { userId }, 
      { ...profile, updatedAt: Date.now() }, 
      { new: true, upsert: true }
    );
    
    res.json(user);
  } catch (error) {
    console.error('Profile save error:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

// Get user profile
app.get('/api/profile/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile get error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Upload wardrobe item
app.post('/api/wardrobe', upload.single('image'), async (req, res) => {
  try {
    console.log('Wardrobe POST body:', req.body);
    const { userId, category, subcategory, color, fit, brand, size } = req.body;
    
    if (!userId || !category || !req.file) {
      return res.status(400).json({ error: 'userId, category, and image are required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const item = new WardrobeItem({ 
      userId, 
      imageUrl, 
      category, 
      subcategory, 
      color, 
      fit, 
      brand, 
      size 
    });
    
    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Wardrobe upload error:', error);
    res.status(500).json({ error: 'Failed to upload wardrobe item' });
  }
});

// List wardrobe items for a user
app.get('/api/wardrobe/:userId', async (req, res) => {
  try {
    const items = await WardrobeItem.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // Most recent first
    res.json(items);
  } catch (error) {
    console.error('Wardrobe get error:', error);
    res.status(500).json({ error: 'Failed to get wardrobe items' });
  }
});

// Delete wardrobe item
app.delete('/api/wardrobe/:itemId', async (req, res) => {
  try {
    const item = await WardrobeItem.findByIdAndDelete(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Delete the image file
    if (item.imageUrl) {
      const imagePath = path.join(__dirname, item.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Wardrobe delete error:', error);
    res.status(500).json({ error: 'Failed to delete wardrobe item' });
  }
});

// Proxy OpenAI chat
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });
    res.json(completion.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));