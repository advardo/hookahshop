const ApiError = require('../error/ApiError');
const {Product} = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class ProductController {
    async getAll(req, res, next) {
        const products = await Product.findAll();
        return res.json(products);
    }

    async create(req, res, next) {
        try {
            const {name, price, quantity, info} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + '.   jpg';
            img.mv(path.resolve(__dirname, '..', 'static', filename));
            const product = await Product.create({name, price, img: filename, quantity, info});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
        
    }

    async getOne(req, res, next) {
        
    }
}

module.exports = new ProductController();
