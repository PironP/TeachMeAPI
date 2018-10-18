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

productController.getByIdCategory = function(id) {
  const where = {};
  const options = {};
  where.Id_Categorie =  {
  [Op.eq] : id, 
  }  
  options.where = where;
  return Product.findAll(options);
};

productController.getByIdDeposit = function(id) {
  const where = {};
  const options = {};
  where.Id_Stockage =  {
  [Op.eq] : id, 
  }  
  options.where = where;
  return Product.findAll(options);
};

productController.getAll = function() {
  const where = {};
  const options = {};
  options.where = where;
  return Product.findAll(options);
};

productController.add = function(photo,description,Id_Categorie,Id_Stockage){
  return Product.create({
    Photo: photo,
    Description: description,
    Id_Categorie: Id_Categorie,
    Id_Stockage : Id_Stockage
  })
}

productController.delete = function(Id_Product){
  return Product.destroy({where: {Id_Product: Id_Product}})
}

productController.deleteByDeposit = function(Id_Stockage){
  return Product.destroy({where: {Id_Stockage: Id_Stockage}})
}

productController.update = function(Id_Product, Photo, Description){
  const options = {}
  if(Photo !== undefined){
    options.Photo = Photo;
  }
  if(Description !== undefined){
    options.Description = Description;
  }
  return Product.update(options, {returning: true, where: {Id_Product: Id_Product}});
}

module.exports = productController;