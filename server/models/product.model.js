const mongoose = require('mongoose')

const logo = require('./../static/sponge.jpg')

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: 'Product name is required',
    trim: true,
  },
  product_description: {
    type: String,
    trim: true
  },
  product_varieties: [{
    size: { type: String, trim: true },
    color: { type: String, trim: true },
    quantity: { type: String, trim: true },
    images: [
      {
        type: String,
        default: logo,
        trim: true,
      }
    ],
    price: { type: String, trim: true },
  }],
  date_uploaded: {
    type: Date,
    default: Date.now,
  },
  date_edited: Date,
})

module.exports = mongoose.model('Product', ProductSchema)
