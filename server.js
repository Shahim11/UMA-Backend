const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

// app.use(cors());
// Allow requests from specific frontend domain
app.use(cors({
    origin: 'https://rad-pithivier-11ed02.netlify.app', // Allow your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true, // If cookies or authentication headers are required
}));

app.use(bodyParser.json());

// Use the routes
app.use('/api/auth', authRoutes);  // Prefix auth routes with /api/auth
app.use('/api/users', userRoutes);  // Prefix user routes with /api/users

app.get('/',(req,res)=>{
    res.send('Welcome to the Backend!');
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

