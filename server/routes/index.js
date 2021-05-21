const Router =  require('express');
const basketRouter = require('./basketRouter');
const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');
const statusRouter = require('./statusRouter');
const userRouter = require('./userRouter');
const router = new Router();

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)
router.use('/status', statusRouter)

module.exports = router;