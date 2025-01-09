const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDatabase = require('./config/connectDataBase');



// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });


const bodyParser = require('body-parser'); // Ensure this is added
// Initialize the app
const app = express();

// Connect to the database
connectDatabase();



// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded requests

// Import routes
const authRoutes = require('./routes/auth');
const products = require('./routes/product');
const orders = require('./routes/order');



// Routes
app.use('/user_Api/auth', authRoutes);
app.use('/api/apiData/Explore/DataStructure/', products);
app.use('/api/apiData/Explore/DataStructure/orderData/order/', orders);


// Start the server
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});












