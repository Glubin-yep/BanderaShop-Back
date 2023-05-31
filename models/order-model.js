const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "Verification",
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postoffice: {
        type: String,
        required: true,
    },
    items: [{
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

    }],
});

module.exports = model('Order', orderSchema);
