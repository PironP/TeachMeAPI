const ModelIndex = require('../models');
const fs = require('fs');
const Product = ModelIndex.product;
const category = ModelIndex.category
const Op = ModelIndex.Sequelize.Op;

const categoryController = function(){};


categoryController.getAll = function() {
    return category.findAll();
  };
  
categoryController.getById = function(id) {
    const where = {};
    const options = {};
    var result;
    where.Id_category = {
      [Op.eq]: id,
    }
    options.where = where;
    return category.findAll(options)
    .then((category) => {
      if(!(category && category.length)){
        return [];
      }
      result={}
      result.Id_category = category.Id_category
      result.nom = category.nom
        return result;
    });
  };
  
  module.exports = categoryController;