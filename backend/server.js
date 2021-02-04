const morgan = require('morgan');
const app = require('./app');
const connectDatabase = require('./config/database');
const router = require('./routes/product');
const cors = require('cors');
var corsOptions = {
    origin: "http://localhost:4000"
  };
app.use(cors(corsOptions));

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

app.use('api/v1', router);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down server due to Unhandle Promiss Rejection`);
    server.close(() => {
        process.exit(1)
    })
})

