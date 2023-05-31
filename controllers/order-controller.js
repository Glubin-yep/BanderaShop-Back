const orderService = require('../service/order-service');
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

class OrderController {
    async getAllOrders(req, res, next) {
        try {
            const orders = await orderService.getAllOrders();
            res.json(orders);
        } catch (e) {
            next(e);
        }
    }

    async getOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await orderService.getOrderById(orderId);

            if (!order) {
                return next(ApiError.BadRequest(`Order with ID ${orderId} not found`));
            }

            res.json(order);
        } catch (e) {
            next(e);
        }
    }

    async createOrder(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userDate = tokenService.validateRefreshToken(refreshToken);

            const { name, phone, region, city, postoffice, items } = req.body;

            const order = await orderService.createOrder(userDate.email, name, phone, region, city, postoffice, items);

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const { name, phoneNumber, region, city, office, items } = req.body;

            const updatedOrder = await orderService.updateOrder(orderId, name, phoneNumber, region, city, office, items);

            res.json(updatedOrder);
        } catch (e) {
            next(e);
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            await orderService.deleteOrder(orderId);

            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new OrderController();
