const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandle = require('../utils/errorHandle');
const sendToken = require('../utils/jwtToken');

// register user => /api/v1/register
exports.registerUser = catchAsyncErrors( async ( req, res, next ) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/derick-mckinney-eyFbjKWlR2g-unsplash_wmynoe',
            url: 'https://res.cloudinary.com/hha-nlnganh/image/upload/v1612106833/nlnganh/avatars/derick-mckinney-eyFbjKWlR2g-unsplash_wmynoe.jpg'
        }
    })

    sendToken(user, 200, res); 
}) 
// login => /api/v1/login
exports.loginUser = catchAsyncErrors ( async (req, res, next) => {
    const { email, password} = req.body;

    // check if email or pass is entered by user
    if(!email || !password) return next(new ErrorHandle('Please enter email & password', 400 ));
    
    // find user in database
    const user = await User.findOne({ email }).select('+password');
    if(!user) return next(new ErrorHandler('Invalid Email or Password', 401));
    
    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) return next(new ErrorHandler('Invalid Email or Password', 401));
    
    sendToken(user, 200, res); 
})

// logout => /api/v1/logout
exports.logoutUser = catchAsyncErrors (async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out !'
    })
})