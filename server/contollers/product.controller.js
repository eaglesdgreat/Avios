const _ = require('lodash')

const Product = require('./../models/product.model')

// Uploading new product to database
function createProduct(req, res) {
  const product = new Product(req.body)
  const upper = product.product_name === product.product_name.toUpperCase()
  if (!upper) {
    product.product_name = product.product_name.toUpperCase()
  }
  product.save((err, result) => {
    if (err) {
      return res.status(401).json({ error: `${err} Uploading fails`})
    }
    return  res.status(200).json({
      message: `New product ${result.product_name} was created`
    })
  })
}

// Displaying list of all products
function listProducts(req, res) {
  Product.find((err, products) => {
    if (err) {
      return res.status(401).json({ error: `${err} data missing`})
    }
    return res.status(200).json(products)
  })
}

// Finding a product with a specific prodId
function productById(req, res, next, id) {
  Product.findOne({ _id: id })
    .exec((err, product) => {
      if (err || !product) {
        return res.status(401).json({ error: err})
      }
      req.produce = product
      next()
      return req.produce
    })
}

// Display specific product with ID
function getProduct(req, res) {
 const product = req.produce
 return res.status(200).json(product)
}

// Update a product
function updateProduct(req, res) {
  let product = req.produce
  product = _.extend(product, req.body)
  product.date_edited = Date.now()
  product.save((err, result) => {
    if (err) {
      return res.status(401).json({ error: `${err} Update failed try again`})
    }
    return res.status(200).json(result)
  })
}

// Update product variety by Id 
function updateVariety(req, res) {
  const variety = req.body.varId
  let match = req.produce.product_varieties.find(o => o._id === variety)
  match = _.extend(match, req.body.variety)
  Product.findByIdAndUpdate(
    req.body.prodId,
    { product_varieties: { _id: variety } },
    { $set: { 'product_varieties.$': match } }
  )
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: `${err} update failed` })
      }
      return res.status(200).json(result)
    })
}

// Delete product varieties
function deleteVariety(req, res) {
  const variety = req.body.varId
  Product.findByIdAndUpdate({ _id: req.body.prodId }, { $pull: { product_varieties: variety } }, { new: true })
    .exec((err, result) => {
      if(err) {
          return res.status(400).json({error: 'Error. Try again'})
      }
      return res.status(200).json({
        message: 'Variey Deleted',
      })
    })
}

module.exports = {
  createProduct,
  listProducts,
  productById,
  getProduct,
  updateProduct,
  updateVariety,
  deleteVariety,
}