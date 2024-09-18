const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

// app.use(cors());
// Allow requests from specific frontend domain
app.use(cors({
    origin: ['', 'https://rad-pithivier-11ed02.netlify.app'],  // Allow requests from this frontend
    methods: ['GET', 'POST'],  // Include the methods you allow
    credentials: true  // If you’re using cookies or auth tokens
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

