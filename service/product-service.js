const Outerwears = require('../models/outerwear-model');
const Underwear = require('../models/underwear-model');
const Footwear = require('../models/shoes-model');
const Accessory = require('../models/accessory-model');
const ApiError = require('../exceptions/api-error');

class ProductService {
  async getAllProducts() {
    const outerwears = await Outerwears.find({}).lean().exec();
    const underwear = await Underwear.find({}).lean().exec();
    const footwear = await Footwear.find({}).lean().exec();
    const accessories = await Accessory.find({}).lean().exec();

    const allProducts = [
      ...outerwears.map(product => ({ ...product, category: 'outerwears' })),
      ...underwear.map(product => ({ ...product, category: 'underwear' })),
      ...footwear.map(product => ({ ...product, category: 'footwear' })),
      ...accessories.map(product => ({ ...product, category: 'accessory' })),
    ];

    return allProducts;
  }


  async getProductById(productId, productType) {
    let product;
    switch (productType) {
      case 'outerwears':
        product = await Outerwears.findOne({ _id: productId });
        break;
      case 'underwear':
        product = await Underwear.findOne({ _id: productId });
        break;
      case 'footwear':
        product = await Footwear.findOne({ _id: productId });
        break;
      case 'accessory':
        product = await Accessory.findOne({ _id: productId });
        break;
      default:
        throw ApiError.BadRequest(`Продуктів за такою category ${productType} не найдено `);
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
        throw ApiError.BadRequest(`Продуктів за такою category ${productType} не найдено `);
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
        throw ApiError.BadRequest(`Продуктів за такою category ${productType} не найдено `);
    }
    await product.save();

    return product;
  }

  async updateProduct(category, name, shortDescription, fullDescription, price, availableSizes, photo) {
    let product;
    console.log(category)
    switch (category) {
      case 'outerwears':
        product = await Outerwears.findOneAndUpdate({ name }, { shortDescription, fullDescription, price, availableSizes, photo }, { new: true });
        break;
      case 'underwear':
        product = await Underwear.findOneAndUpdate({ name }, { shortDescription, fullDescription, price, availableSizes, photo }, { new: true });
        break;
      case 'footwear':
        product = await Footwear.findOneAndUpdate({ name }, { shortDescription, fullDescription, price, availableSizes, photo }, { new: true });
        break;
      case 'accessory':
        product = await Accessory.findOneAndUpdate({ name }, { shortDescription, fullDescription, price, photo }, { new: true });
        break;
      default:
        throw ApiError.BadRequest(`Продуктів за такою category ${productType} не найдено `);
    }

    return product;
  }

  async deleteProductById(category, productId) {
    let product;

    console.log(productId)
    switch (category) {
      case 'outerwears':
        product = await Outerwears.findByIdAndDelete(productId);
        break;
      case 'underwear':
        product = await Underwear.findByIdAndDelete(productId);
        break;
      case 'footwear':
        product = await Footwear.findByIdAndDelete(productId);
        break;
      case 'accessory':
        product = await Accessory.findByIdAndDelete(productId);
        break;
      default:
        throw ApiError.BadRequest(`Продуктів за такою category ${productType} не найдено `);
    }

    return product;
  }
}

module.exports = new ProductService();
