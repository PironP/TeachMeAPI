const ModelIndex = require('../models');
const fs = require('fs');
const Product = ModelIndex.product;
const Op = ModelIndex.Sequelize.Op;

const productController = function(){};

productController.getById = function(id) {
  const where = {};
  const options = {};
  where.Id_Product =  {
  [Op.eq] : id, 
  }  
  options.where = where;
  return Product.findAll(options);
};

module.exports = productController;