const ApiError = require('../error/ApiError');
const {Product} = require('../models/models')

class ProductController {
    async getAll(req, res, next) {
        const products = await Product.findAll();
        return res.json(products);
    }

    async create(req, res, next) {
        const {name, price, img, quantity, info} = req.body;
        if (name && price && img && quantity && info) {
            const product = await Product.create({name, price, img, quantity, info});
            return res.json(product);
        } else {
            return res.json({message: 'Не все поля'})
        }
    }

    async getOne(req, res, next) {
        
    }
}

module.exports = new ProductController();
