const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors.middleware' );
const cookieParser = require('cookie-parser'); 

app.use(express.json());
app.use(cookieParser()); 

// Import all route
const products = require('./routes/product.route');

const auth = require('./routes/auth.route');

const order = require('./routes/order.route');

app.use('/api/v1', products); 
app.use('/api/v1', auth); 
app.use('/api/v1', order); 

app.use(errorMiddleware); 

module.exports = app