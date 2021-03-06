const Product = require('../models/product.model');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/product.json');
const { connect } = require('mongoose');
dotenv.config();
connectDatabase();
const seedProducts = async () => {
    try {
        // await Product.deleteMany();
        // console.log('Products are deleted !');

        await Product.insertMany(products);
        console.log('All product are added !');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}
seedProducts();