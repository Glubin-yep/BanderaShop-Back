const { Schema, model } = require('mongoose')

const accessorySchema  = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    fullDescription: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});


module.exports = model('Accessory', accessorySchema );