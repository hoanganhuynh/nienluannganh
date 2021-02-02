const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandle')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

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

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
}) 