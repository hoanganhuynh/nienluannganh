const morgan = require('morgan');
const app = require('./app');
const connectDatabase = require('./config/database');
const router = require('./routes/product');

require('dotenv').config(); 
    
app.use(morgan('dev'));
// Connect to Database
connectDatabase(); 
app.use('api/v1',router);

app.listen(process.env.PORT, () => {
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})