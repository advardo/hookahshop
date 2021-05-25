const Router =  require('express');
const productController = require('../controllers/productController');
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')
const router = new Router();



router.post('/', checkAdminMiddleware, productController.create);

router.get('/', productController.getAll);

router.get('/:id', productController.getOne);

module.exports = router;