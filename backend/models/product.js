const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên sản phẩm'],
        trim: true,
        maxLength: [100, 'Tên sản phẩm không được quá 100 ký tự']
    },
    price: {
        type: Number,
        required: [true, 'Vui lòng nhập giá tiền sản phẩm'],
        maxlength: [10, 'Gía sản phẩm không được nhiều hơn 8 số'],
        default: 0.0
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'Điện tử',
                'Máy ảnh',
                'Laptop',
                'Điện thoại',
                'Thực phẩm',
                'Sách',
                'Trang phục/Áo',
                'Mỹ phẩm',
                'Thể thao',
                'Nội thất'
            ],
            messages: 'Vui long chọn danh mục cho sản phẩm.'
        }
    },
    seller: {
        type: String,
        required: [true, 'Vui lòng nhập người bán sản phẩm']
    },
    stock: {
        type: Number,
        required: [true, 'Vui lòng nhập kho sản phẩm.'],
        maxLength: [5, 'Không quá 5 ký tự.'],
        default: 0
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema);