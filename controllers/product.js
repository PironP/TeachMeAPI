const ModelIndex = require('../models');
const fs = require('fs');
const Product = ModelIndex.product;
const Category = ModelIndex.category;
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

productController.getAll = function(search) {
  const where = {};
  const options = {};
  var result;
  if(search !== undefined){
    where.name =  {
    [Op.like]: "%"+search+"%", 
    } 
  }
  options.where = where;
  return Product.findAll(options)
  .then((pro) => {
        return Category.findAll()
        .then((cat) => {
          result = [];
          for(i = 0; i < pro.length; i++){
            result[i] = {};
            result[i].Id_Product = pro[i].Id_Product;
            result[i].Name = pro[i].Name;
            result[i].Photo = pro[i].Photo;
            result[i].Description = pro[i].Description;
            result[i].Id_Categorie = pro[i].Id_Categorie;
            result[i].Id_Stockage = pro[i].Id_Stockage;
            for(j = 0; j < cat.length; j++){
              if(result[i].Id_Categorie === cat[j].Id_category){
                result[i].categorie = "";
                result[i].categorie = cat[j].nom;
              }              
            }
          }
          return result;
        })
      })
};

productController.add = function(name,photo,description,Id_Categorie,Id_Stockage){
  return Product.create({
    Name: name,
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

productController.update = function(Name,Id_Product, Photo, Description){
  const options = {}
  if(Photo !== undefined){
    options.Photo = Photo;
  }
  if(Description !== undefined){
    options.Description = Description;
  }
  if(Name !== undefined){
    options.Name = Name;
  }
  return Product.update(options, {returning: true, where: {Id_Product: Id_Product}});
}

module.exports = productController;