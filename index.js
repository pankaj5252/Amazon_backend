const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
const registerRoutes = require('./routes/register');
const loginUser = require('./routes/login');
// const otpRoutes = require('./routes/otpserver');

app.use('/register', registerRoutes);
app.use('/login',loginUser)
// app.use('/otp', otpRoutes); // Corrected route setup for otpRoutes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
