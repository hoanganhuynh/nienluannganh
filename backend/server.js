const morgan = require('morgan');
const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary')

const router = require('./routes/product.route');


// const db = require('./models/role');
// const Role = db.role;


require('dotenv').config();
app.use(morgan('dev'));

// Handle Caught Exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})

//console.log(a);

// Connect to Database
connectDatabase();

// Setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('api/v1', router);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.stack}`)
    console.log(`Shutting down server due to Unhandle Promiss Rejection`);
    server.close(() => {
        process.exit(1)
    })
})

