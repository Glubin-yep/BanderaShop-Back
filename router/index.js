const Router = require("express").Router;
const userController = require('../controllers/user-controller');
const itemController = require('../controllers/items-controller');
const orderController = require('../controllers/order-controller'); 
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

// User routes
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 64 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/sendEmail', authMiddleware, userController.sendStatusTransactionOnEmail);

// Item routes
router.get('/getAll', itemController.getAllProducts);
router.get('/get/:productType/:productId', itemController.getProductById);
router.get('/category/:category', itemController.getProductsByCategory);
router.post('/addProduct', itemController.addProduct);
router.post('/updateProduct', itemController.updateProduct);
router.post('/deleteProduct', itemController.deleteProductById);

// Order routes
router.get('/getAllOrders', orderController.getAllOrders);
router.get('/getOrder/:orderId', orderController.getOrderById); 
router.post('/addOrder', authMiddleware, orderController.createOrder);
router.put('/updateOrder/:orderId', orderController.updateOrder);
router.delete('/deleteOrder/:orderId', orderController.deleteOrder); 

module.exports = router;
