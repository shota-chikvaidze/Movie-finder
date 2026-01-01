# 🎬 Movie Finder

A modern, full-stack web application that helps users discover movies based on their mood, preferences, and viewing history. Built with React, Node.js, Express, and MongoDB.

<div align="center">

![Movie Finder](https://img.shields.io/badge/Movie-Finder-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)

</div>

---

## 📖 About

**Movie Finder** is an intelligent movie discovery platform designed to help you find the perfect movie for any occasion. Whether you're looking for something based on your current mood, specific genres, release year, or country of origin, Movie Finder provides a seamless browsing experience with personalized recommendations.

### ✨ Key Features

- 🔍 **Smart Search** - Find movies by title with real-time search
- 🎭 **Mood-Based Discovery** - Get recommendations based on your current mood
- 🎬 **Advanced Filtering** - Filter by genre, year, country, and rating
- ⭐ **Rating System** - Rate movies and share your reviews
- ❤️ **Favorites** - Save your favorite movies for quick access
- 📝 **Watchlist** - Create a personalized watchlist for movies you want to watch
- 🔥 **Trending Movies** - Discover what's popular right now
- 🎯 **Personalized Recommendations** - AI-powered suggestions based on your preferences
- 🔐 **Secure Authentication** - Email/password and Google OAuth login
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 📄 **Pagination** - Efficient browsing through large movie collections

---

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Icon library
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for auth
- **bcrypt** - Password hashing
- **Swagger/OpenAPI** - API documentation

### External APIs
- **TMDB API** - Movie data and metadata

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v7.0 or higher) or MongoDB Atlas account
- **npm** or **yarn** package manager
- **Google OAuth Credentials** (for Google login)
- **TMDB API Key** (for movie data)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-finder.git
cd movie-finder
```

### 2. Backend Setup

```bash
cd back
npm install
```

Create a `.env` file in the `back` directory:

```env
PORT=5000
JWT=your_jwt_secret_key
MONGODB=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 📚 API Documentation

### Swagger UI

Once the backend is running, access the interactive API documentation at:

**🔗 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

The Swagger documentation provides:
- Complete API endpoint reference
- Request/response schemas
- Interactive testing interface
- Authentication requirements
- Example requests and responses

### API Endpoints Overview

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

#### Movies
- `GET /api/movie/get-movies` - Get all movies (with filters and pagination)
- `GET /api/movie/get-movies-id/:id` - Get movie by ID
- `POST /api/movie/add-movies` - Add new movie
- `GET /api/movie/recommendation` - Get personalized recommendations
- `GET /api/movie/trending` - Get trending movies

#### Favorites
- `POST /api/favorite/movie/favorite/:id` - Toggle favorite
- `GET /api/favorite/get-favorites` - Get user's favorites

#### Watchlist
- `POST /api/watchlist/movie/watchlist/:id` - Toggle watchlist
- `GET /api/watchlist/get-watchlist-movie` - Get user's watchlist

#### Ratings
- `POST /api/rating/add-rating` - Rate a movie

---

## 🎯 Features in Detail

### 1. **Movie Discovery**
Browse through a vast collection of movies with advanced filtering options:
- Search by title
- Filter by genre (Action, Comedy, Drama, etc.)
- Filter by release year
- Filter by country
- Filter by minimum rating

### 2. **Mood-Based Recommendations**
Find movies that match your current emotional state:
- Happy, Sad, Excited, Relaxed
- Adventurous, Romantic, Scary, Thoughtful

### 3. **User Authentication**
Secure login system with multiple options:
- Email and password registration
- Google OAuth integration
- JWT-based session management
- Protected routes and API endpoints

### 4. **Personalization**
Create your own movie collection:
- Add movies to favorites
- Build a watchlist
- Rate and review movies
- Get personalized recommendations based on your activity

### 5. **Responsive Design**
Beautiful, modern UI that adapts to any screen size:
- Mobile-friendly navigation
- Smooth animations and transitions
- Gradient backgrounds
- Hover effects and interactive elements

---

## 🗂️ Project Structure

```
movie-finder/
├── back/                      # Backend application
│   ├── config/               # Configuration files
│   │   └── passport.js       # Passport authentication config
│   ├── controllers/          # Route controllers
│   │   ├── favoriteController.js
│   │   ├── movieController.js
│   │   ├── ratingController.js
│   │   ├── recommendation.js
│   │   ├── userController.js
│   │   └── watchListController.js
│   ├── middleware/           # Custom middleware
│   │   └── protect.js        # Authentication middleware
│   ├── models/               # Mongoose models
│   │   ├── Movie.js
│   │   ├── Rating.js
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── favoriteRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── ratingRoutes.js
│   │   ├── userRoutes.js
│   │   └── watchlistRoutes.js
│   ├── scripts/              # Utility scripts
│   │   └── ImportMovies.js   # Movie data import script
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── Server.js             # Express server entry point
│
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/              # API integration
│   │   │   ├── axios.js      # Axios instance
│   │   │   └── endpoint/     # API endpoints
│   │   │       ├── auth.js
│   │   │       └── movie.js
│   │   ├── components/       # React components
│   │   │   └── authSuccess/
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── FetchUser.jsx
│   │   ├── layout/           # Layout components
│   │   │   └── Navbar.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── movies/
│   │   │   ├── recom/
│   │   │   └── series/
│   │   ├── store/            # State management
│   │   │   └── UserAuthStore.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── vite.config.js        # Vite configuration
│
└── README.md                  # Project documentation
```

---

## 🔒 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `JWT` | JWT secret key | `your_secret_key` |
| `MONGODB` | MongoDB connection string | `mongodb+srv://...` |
| `TMDB_API_KEY` | TMDB API key | `your_api_key` |
| `CLIENT_ID` | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `CLIENT_SECRET` | Google OAuth client secret | `GOCSPX-xxx` |
| `GOOGLE_CALLBACK_URL` | OAuth callback URL | `http://localhost:5000/api/auth/google/callback` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 🎨 Screenshots

### Home Page
A clean, modern landing page with quick navigation to Movies, Series, and Recommendations.

### Movies Discovery
Advanced filtering interface with real-time search and pagination.

### Movie Details
Detailed movie information including cast, rating, description, and user reviews.

### User Dashboard
Personalized space showing favorites, watchlist, and recommendations.

---

## 🛠️ Development

### Run Backend in Development Mode

```bash
cd back
npm run dev  # Using nodemon for auto-restart
```

### Run Frontend in Development Mode

```bash
cd client
npm run dev
```

### Import Movie Data

```bash
cd back
node scripts/ImportMovies.js
```

---

## 🧪 Testing

### API Testing
Use the Swagger UI at `http://localhost:5000/api-docs` to test all API endpoints interactively.

### Manual Testing
1. Register a new user account
2. Login and explore movies
3. Add movies to favorites and watchlist
4. Rate movies
5. Check personalized recommendations

---

## 🚀 Deployment

### Backend Deployment (Example: Render/Railway)

1. Set all environment variables in your hosting platform
2. Update `NODE_ENV` to `production`
3. Update `CLIENT_URL` to your frontend production URL
4. Deploy the `back` directory

### Frontend Deployment (Example: Vercel/Netlify)

1. Update `VITE_API_URL` to your backend production URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

---

## 📝 API Query Parameters

### GET /api/movie/get-movies

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search movies by title |
| `genre` | string | Filter by genre |
| `year` | number | Filter by release year |
| `country` | string | Filter by country |
| `minRating` | number | Minimum rating (0-10) |
| `maxRating` | number | Maximum rating (0-10) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |

**Example:**
```
GET /api/movie/get-movies?genre=Action&year=2023&minRating=7&page=1&limit=20
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Your Name** - *Initial work*

---

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing movie data
- [React](https://react.dev/) for the amazing UI library
- [Express](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database

---

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

<div align="center">

**Made with ❤️ and ☕**

⭐ Star this repository if you found it helpful!

</div>
