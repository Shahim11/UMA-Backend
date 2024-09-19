const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

// app.use(cors());
const corsOptions = {
    origin: ['https://uma-frontend.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};
app.use(cors(corsOptions));


app.use(bodyParser.json());

// Group all routes under /api
const apiRouter = express.Router();  // Create a router for all /api routes

// Use the routes with the global /api prefix
apiRouter.use('/auth', authRoutes);  // /api/auth
apiRouter.use('/users', userRoutes);  // /api/users

app.use('/api', apiRouter);  // All routes under /api prefix

app.get('/', (req, res) => {
    res.send('Welcome to the Backend!');
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});