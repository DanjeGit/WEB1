const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  desc: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
