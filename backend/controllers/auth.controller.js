const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const ErrorHandle = require('../utils/errorHandle');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');


// register user => /api/v1/register
exports.registerUser = catchAsyncErrors( async ( req, res, next ) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

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

// Forgot password
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return next(new ErrorHandle('User not found with this email', 404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({ validationBeforeSave: false});

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have
    requesred this email, then  ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'NLNganh - Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validationBeforeSave: false  })
        return next(new ErrorHandle(error.message, 500))
    }
})

// reset new password => /api/v1/password/reset:token
exports.resetPassword = catchAsyncErrors (async (req, res, next) => {
    // hash url token 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    // check
    if(!user) {
        return next(new ErrorHandle('Password reset token is valid or has been expired', 400))
    }
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandle('Password does not match', 400))
    }
    // setup new password
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined; 
    await user.save()
    sendToken(user, 200, res)
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

// get profile
exports.getUserProfile = catchAsyncErrors( async( req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// update / change password => api/v1/password/updade (PUT)
exports.updatePassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    // check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched) return next(new ErrorHandle('Old Password is incorrect !', 400));

    user.password = req.body.password;

    await user.save();
    
    sendToken(user, 200, res)
})

// update profile => api/vi/me/update
exports.updateProfile = catchAsyncErrors ( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // Update Avatar
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: `Profile Updated !`
    })
})
// get all user in db
exports.getAllUsers = catchAsyncErrors (async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})
// get user by id
exports.getUserById = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params

    try {
        const user = await User.findOne({ _id: id });
        if (!user) return next(new ErrorHandle('User not found', 404 ));
        return res.status(200).json({ user })
    } catch(error) {
        return next(new ErrorHandle('Product not found', 404 ));
    }
})

// update user => api/v1/admin/user/update
exports.updateUser = catchAsyncErrors ( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // Update Avatar
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: `User Profile Updated !`
    })
})

// delete user => api/v1/admin/user/id
exports.deleteUser = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params

    try {
        const user = await User.findOne({ _id: id }).exec();
        if (!user) return next(new ErrorHandle(`User ${req.params.id} not found`, 404 ));
        await user.remove();

        return res.status(200).json({
            success: true,
            messsage: 'User Deleted !',
        })
    } catch(error) {
        //return next(new ErrorHandle(`User ${req.params.id} not found`, 404 ));
    }
})