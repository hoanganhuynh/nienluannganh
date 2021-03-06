const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên của bạn'],
        maxlength: [30, 'Tên không được dài quá 30 kí tự']
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email của bạn'],
        unique: true,
        validate: [validator.isEmail, 'Vui lòng nhập đúng định dạng enmail']
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        minlength: [6, 'Mật khẩu tối thiếu 6 ký tự'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// Compare User
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); 
}

// return JWT
userSchema.methods.getJwtToken = function () { // ko dc su dung arrow function khi viet methods object
    return jwt.sign( { id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// generate-password-reset-token
userSchema.methods.getResetPasswordToken =  function () {
    //generate token
    const resetToken =  crypto.randomBytes(20).toString('hex');
    // hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // set token expiretime
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
};
// eccrypting password before saving user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
module.exports = mongoose.model('User', userSchema);