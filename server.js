const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

// CORS options for specific origins
const corsOptions = {
    origin: ['https://rad-pithivier-11ed02.netlify.app', 'http://localhost:3000'],  // Allowed frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    credentials: true  // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));  // Apply CORS middleware with options

app.use(bodyParser.json());

// Handle preflight requests explicitly for OPTIONS
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Group all routes under /api
const apiRouter = express.Router();  // Create a router for all /api routes

// Use the routes with the global /api prefix
apiRouter.use('/auth', authRoutes);  // /api/auth
apiRouter.use('/users', userRoutes);  // /api/users

app.use('/api', apiRouter);  // All routes under /api prefix

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend!');
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
