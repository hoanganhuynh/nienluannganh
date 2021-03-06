const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors.middleware' );
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()); 
app.use(fileUpload());



// Import all route
const products = require('./routes/product.route');
const auth = require('./routes/auth.route');
const order = require('./routes/order.route');
const payment = require('./routes/payment.route');

app.use('/api/v1', products); 
app.use('/api/v1', auth); 
app.use('/api/v1', order); 
app.use('/api/v1', payment); 

app.use(errorMiddleware); 

module.exports = app