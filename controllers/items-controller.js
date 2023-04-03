const productService = require('../service/product-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async getAllProducts(req, res, next) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        }
        catch (e) {
            next(e);
        }
    }

    async getProductByName(req, res, next) {
        try {
            const { productType, productName } = req.params;
            const product = await productService.getProductByName(productName, productType);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        }
        catch (e) {
            next(e);
        }
    }

    async getProductsByCategory(req, res, next) {
        try {
            const { category } = req.params;
            const products = await productService.getProductsByCategory(category);
            res.json(products);
        }
        catch (e) {
            next(e);
        }
    }

    async addProduct(req, res, next) {
        try {
            const { category, name, shortDescription, fullDescription, price, availableSizes, photo } = req.body;            
            await productService.addProductToCategory(category, name, shortDescription, fullDescription, price, availableSizes, photo);
            res.status(200).json({ message: 'Product added successfully' });
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req, res, next) {
        try {
          const { category, name, shortDescription, fullDescription, price, availableSizes, photo } = req.body.name;
          console.log(req.body)
          const product = await productService.updateProduct(category, name, shortDescription, fullDescription, price, availableSizes, photo);
          res.status(200).json({ message: 'Product changed successfully', product });
        } catch (e) {
          next(e);
        }
      }

      async deleteProductById(req, res, next) {
        try {
          const { category, id} = req.body.category;
          console.log(req.body)
          const product = await productService.deleteProductById(category, id);
          res.status(200).json({ message: 'Product deleted successfully', product });
        } catch (e) {
          next(e);
        }
      }
}

module.exports = new UserController();