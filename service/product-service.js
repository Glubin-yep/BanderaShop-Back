const Outerwears = require('../models/outerwear-model');
const Underwear = require('../models/underwear-model');
const Footwear = require('../models/shoes-model');
const Accessory = require('../models/accessory-model');

class ProductService {
  async getAllProducts() {
    const outerwears = await Outerwears.find({});
    const underwear = await Underwear.find({});
    const footwear = await Footwear.find({});
    const accessories = await Accessory.find({});

    const allProducts = [...outerwears, ...underwear, ...footwear, ...accessories];
    return allProducts;
  }

  async getProductByName(productName, productType) {
    let product;

    switch (productType) {
      case 'outerwears':
        product = await Outerwears.findOne({ name: productName });
        break;
      case 'underwear':
        product = await Underwear.findOne({ name: productName });
        break;
      case 'footwear':
        product = await Footwear.findOne({ name: productName });
        break;
      case 'accessory':
        product = await Accessory.findOne({ name: productName });
        break;
      default:
        throw new Error('Invalid product type');
    }

    return product;
  }

  async getProductsByCategory(category) {
    let products;
    console.log(category)
    switch (category) {
      case 'outerwears':
        products = await Outerwears.find({});
        break;
      case 'underwear':
        products = await Underwear.find({});
        break;
      case 'footwear':
        products = await Footwear.find({});
        break;
      case 'accessory':
        products = await Accessory.find({});
        break;
      default:
        throw new Error('Invalid category');
    }

    return products;
  }

  async addProductToCategory(category, name, shortDescription, fullDescription, price, availableSizes, photo) {
    let product;
    switch (category) {
      case 'outerwears':
        product = new Outerwears({
          name: name,
          shortDescription: shortDescription,
          fullDescription: fullDescription,
          price: price,
          availableSizes: availableSizes,
          photo: photo,
        });
        break;
      case 'underwear':
        product = new Underwear({
          name: name,
          shortDescription: shortDescription,
          fullDescription: fullDescription,
          price: price,
          availableSizes: availableSizes,
          photo: photo,
        });
        break;
      case 'footwear':
        product = new Footwear({
          name: name,
          shortDescription: shortDescription,
          fullDescription: fullDescription,
          price: price,
          availableSizes: availableSizes,
          photo: photo,
        });
        break;
      case 'accessory':
        product = new Accessory({
          name: name,
          shortDescription: shortDescription,
          fullDescription: fullDescription,
          price: price,
          photo: photo,
        });
        break;
      default:
        throw new Error('Invalid category');
    }
    await product.save();
    
  return product;
  }
}

module.exports = new ProductService();
