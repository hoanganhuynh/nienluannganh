const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandle = require('../utils/errorHandle');
const jwt = require('jsonwebtoken');

// check if user is authenticated or not
exports.isAuthenticateUser = catchAsyncErrors ( async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHandle('Login first to access this resource', 401 ));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.user = await User.findById(decoded.id);
    next()
}) 
