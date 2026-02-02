const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    client: {type: String, required: true}
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const ProductModels = mongoose.model('Products', productSchema);


module.exports = {productSchema, Product: ProductModels};
