const ErrorHandler = require('../utils/errorHandle');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err};
        error.message = err.message;

        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }
        // hanling mongoo duplicate key errors
        if(err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400 )
        }
        // handling wrong jwt error
        if(err.name === 'JsonWebTokenError') {
            const message = `JSON Webtoken valid. Try again !!!`
            error = new ErrorHandler(message, 400)
        }
        // handling expired jwt error
        if(err.name === 'TokenExpiredError') {
            const message = `JSON Webtoken expired. Try again !!!`
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error.'
        })
    }
}