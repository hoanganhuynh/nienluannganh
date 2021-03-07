const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors.middleware' );
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()); 

// Setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Import all route
const products = require('./routes/product.route');

const auth = require('./routes/auth.route');

const order = require('./routes/order.route');

app.use('/api/v1', products); 
app.use('/api/v1', auth); 
app.use('/api/v1', order); 

app.use(errorMiddleware); 

module.exports = app