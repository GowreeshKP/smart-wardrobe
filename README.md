# Smart Wardrobe - AI-Powered Styling Assistant

A modern web application that helps you manage your wardrobe and get AI-powered styling advice.

## Features

### 🎯 User Profile Management
- **Personal Style Profile**: Save your body measurements, skin tone, height, weight, and style preferences
- **Persistent Storage**: All profile data is stored in MongoDB for personalized recommendations
- **Easy Updates**: Edit your profile anytime to keep it current

### 👕 Digital Wardrobe
- **Upload Clothing Items**: Add photos of your clothing with detailed information
- **Categorization**: Organize items by category (shirts, pants, dresses, shoes, accessories)
- **Detailed Metadata**: Track color, fit, brand, size, and subcategory for each item
- **Visual Gallery**: Browse your wardrobe with a beautiful card-based interface
- **Search & Filter**: Find items quickly by category, color, brand, or other attributes
- **Delete Items**: Remove items from your wardrobe when needed

### 🤖 AI Styling Assistant
- **Chat Interface**: Get personalized styling advice through an AI chat interface
- **Context-Aware**: The AI considers your profile and wardrobe when making recommendations
- **Real-time Responses**: Instant styling suggestions and outfit recommendations

### 📱 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful Interface**: Modern, clean design with smooth animations
- **Intuitive Navigation**: Easy-to-use navigation between different sections
- **Loading States**: Proper loading indicators for better user experience

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose for data persistence
- **Multer** for file uploads
- **OpenAI API** for AI chat functionality
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-wardrobe
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (from backend directory)
   npm start
   
   # Start frontend server (from root directory)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Usage

### 1. Create Your Profile
- Navigate to the Profile page
- Fill in your body measurements and style preferences
- Save your profile to get personalized recommendations

### 2. Build Your Wardrobe
- Go to the Upload page to add clothing items
- Upload photos and add details like category, color, fit, etc.
- View all your items in the Wardrobe page

### 3. Get AI Advice
- Use the Chat interface to get styling advice
- Ask about outfit combinations, style tips, or specific questions
- The AI will consider your profile and wardrobe when responding

### 4. Manage Your Items
- Browse your wardrobe with search and filter options
- Delete items you no longer own
- View detailed information about each piece

## API Endpoints

### Profile Management
- `POST /api/profile` - Save or update user profile
- `GET /api/profile/:userId` - Get user profile

### Wardrobe Management
- `POST /api/wardrobe` - Upload new wardrobe item
- `GET /api/wardrobe/:userId` - Get all wardrobe items for user
- `DELETE /api/wardrobe/:itemId` - Delete wardrobe item

### AI Chat
- `POST /api/chat` - Send messages to AI assistant

## Database Schema

### User Profile
```javascript
{
  userId: String (required, unique),
  skinTone: String,
  height: String,
  weight: String,
  chest: String,
  waist: String,
  shoulders: String,
  stylePreference: String,
  favoriteColors: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Wardrobe Item
```javascript
{
  userId: String (required),
  imageUrl: String (required),
  category: String (required),
  subcategory: String,
  color: String,
  fit: String,
  brand: String,
  size: String,
  createdAt: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
