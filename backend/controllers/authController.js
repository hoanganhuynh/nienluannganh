const User = require('../models/user')
const ErrorHandle = require('../utils/errorHandle')
const catchAsyncErrors = require('../middlewares/errors')

// register user => /api/v1/register
exports.registerUser = catchAsyncErrors( async ( req, res, next ) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '',
            url: ''
        }
    })
})