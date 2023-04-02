const {Schema, model} = require('mongoose')

const shoesSchema = new Schema({
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
    availableSizes: {
      type: [String],
      required: true,
    },
    photo: {
      type: Buffer,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  });

module.exports = model('Shoes', shoesSchema);