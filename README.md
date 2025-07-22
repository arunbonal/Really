# Product Information & Safety Platform

A comprehensive web application that helps users make informed decisions about products by providing detailed information, safety analysis, and ingredient evaluation for food, beauty, and pharmaceutical products.

## 🚀 Features

### Core Functionality
- **Barcode Scanning**: Real-time barcode scanning for food and beauty products using device camera
- **Computer Vision**: Text extraction from medicine images using OCR technology
- **Product Information**: Comprehensive product details from Open Food Facts API
- **Safety Analysis**: Beauty product ingredient toxicity evaluation with A-E safety ratings
- **User Authentication**: Secure Google OAuth2 integration with session management
- **Scan History**: Track and manage user's product scanning history

### Product Categories
- **Food Products**: Nutritional information, ingredients, allergens
- **Beauty Products**: Ingredient safety analysis, toxicity ratings
- **Medicines**: Text extraction from medicine packaging for information retrieval

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **ZXing Library** - Barcode scanning capabilities

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Google OAuth2** - User authentication

### Computer Vision
- **Python Flask** - CV server
- **OpenCV** - Computer vision library
- **EasyOCR** - Optical character recognition

### APIs & Services
- **Open Food Facts API** - Product database
- **Google OAuth2** - Authentication service

## 📁 Project Structure

```
Website/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   │   ├── Food/       # Food product pages
│   │   │   ├── Beauty/     # Beauty product pages
│   │   │   └── Meds/       # Medicine pages
│   │   ├── contexts/       # React contexts
│   │   └── assets/         # Static assets
│   └── package.json
├── backend/                 # Node.js backend server
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   ├── init/              # Data initialization
│   ├── cvServer.py        # Computer vision server
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB
- Google OAuth2 credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Website
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Computer Vision Server Setup**
   ```bash
   cd ../backend
   pip install flask flask-cors opencv-python easyocr numpy
   ```

5. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   SESSION_SECRET=your_session_secret
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Computer Vision Server**
   ```bash
   cd backend
   python cvServer.py
   ```

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080
   - CV Server: http://localhost:3000

## 🔧 API Endpoints

### Authentication
- `GET /auth/google` - Google OAuth login
- `GET /auth/user` - Get current user
- `POST /auth/logout` - User logout

### Product APIs
- `GET /product/food` - Get all food products
- `GET /product/food/search/:barcode` - Search food by barcode
- `GET /product/beauty` - Get beauty products
- `GET /product/meds` - Get medicine products

### Computer Vision
- `POST /upload` - Upload image for text extraction

## 🎯 Key Features Explained

### Barcode Scanning
- Uses ZXing library for real-time barcode detection
- Supports multiple barcode formats
- Automatic product lookup from Open Food Facts database
- User authentication required for scanning

### Computer Vision for Medicines
- Flask server with OpenCV and EasyOCR
- Extracts text from medicine packaging images
- Enables information retrieval without barcodes
- Supports multiple image formats

### Beauty Product Safety Analysis
- Comprehensive ingredient toxicity database
- A-E safety rating system
- Weighted scoring algorithm
- Covers harmful chemicals and compounds

### User Management
- Google OAuth2 integration
- Session-based authentication
- Scan history tracking
- User profile management

## 🔮 Future Enhancements

- **AI Summary Generation**: Automated product summaries using AI
- **Real-time Chatbot**: Amazon Rufus-like chatbot for product queries
- **Mobile App**: Native mobile application
- **Advanced Analytics**: User behavior and product trend analysis
- **Social Features**: User reviews and ratings
- **Offline Support**: PWA capabilities for offline usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Project**: Capstone Project
- **Institution**: [Your Institution]

## 📞 Support

For support and questions, please contact [your-email@example.com]

---

**Note**: This application is designed to help users make informed decisions about products but should not replace professional medical or nutritional advice. 