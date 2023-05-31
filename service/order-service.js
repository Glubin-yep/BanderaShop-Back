const Order = require('../models/order-model');

class OrderService {
    async getAllOrders() {
        return Order.find();
    }

    async getOrderById(orderId) {
        return Order.findById(orderId);
    }

    async createOrder(email, name, phone, region, city, postoffice, items) {
        const order = new Order({
            email,
            name,
            phone,
            region,
            city,
            postoffice,
            items,
        });
        return order.save();
    }

    async updateOrder(orderId, name, phoneNumber, region, city, office, items) {
        return Order.findByIdAndUpdate(
            orderId,
            { name, phoneNumber, region, city, office, items },
            { new: true }
        );
    }

    async deleteOrder(orderId) {
        return Order.findByIdAndDelete(orderId);
    }
}

module.exports = new OrderService();
