const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    percent: {
        type: Number,
        required: true,
        maxlength: 2
    },
    numOfDate: {
        type: Number,
        required: true,
        default: 1
    },
    discountExpire: Date,
    isActive: { 
        type: Boolean, 
        require: true, 
        default: true 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Discount', discountSchema);


