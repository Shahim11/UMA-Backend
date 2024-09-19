const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const userRoutes = require('./routes/userRoutes');  // Import user routes

const app = express();

app.use(cors());
// const corsOptions = {
//     origin: ['https://uma-frontend.vercel.app', 'http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// };
// app.use(cors(corsOptions));


// Set middleware of CORS 
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://uma-frontend.onrender.com"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });


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