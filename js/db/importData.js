const mongoose = require('mongoose');
const Product = require('./productModel');
const { products, featuredCollections } = require('../data');

mongoose.connect('mongodb://localhost:27017/Products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    mongoose.connection.close();
  }
};

importData();
