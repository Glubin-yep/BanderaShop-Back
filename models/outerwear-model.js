const {Schema, model} = require('mongoose')

const outerwearSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  availableSizes: {
    type: [String],
    required: true
  },
  photo: {
    type: String, 
    required: true
  }
});

module.exports = model('Outerwear', outerwearSchema);
