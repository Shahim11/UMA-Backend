const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

app.use(cors());
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

