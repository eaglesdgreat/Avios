const express = require('express')

const Product = require('../controllers/product.controller')

const router = express.Router()

router.route('/api/products')
  .get(Product.listProducts)
  .post(Product.createProduct)

router.route('/api/product/:prodId')
  .get(Product.getProduct)
  .put(Product.updateProduct)

router.route('/api/update/variety/:prodId')
  .put(Product.updateVariety)

router.route('/api/delete/variety/:prodId')
  .put(Product.deleteVariety)

router.param('prodId', Product.productById)

module.exports = router
