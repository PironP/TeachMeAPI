const ModelIndex = require('../models');
const func = require('../func.js');
const fs = require('fs');
const Deposit = ModelIndex.deposit;
const Product = ModelIndex.product;
const Horaire = ModelIndex.horaire;
const Category = ModelIndex.category;
const Op = ModelIndex.Sequelize.Op;

const DepositController = function(){};

DepositController.getAll = function(X, Y) {
  const where = {};
  const options = {};
  var all;
  var distance;
  var finalRes = [];
  
  return Deposit.findAll().then(function(res){
    var len = res.length;
    for(var i=0; i<len; i++){
        distance = func.getDist(X, Y, res[i].CoordX, res[i].CoordY);
        if (distance<0.5){
          finalRes.push(res[i]);
        }
    }
    return Horaire.findAll()
    .then((horaire) => {
      all = [];
      for(i = 0; i < finalRes.length; i++){
        all[i] = {};
        all[i].Id_deposit = finalRes[i].Id_deposit;
        all[i].Name = finalRes[i].Name;
        all[i].Adresse = finalRes[i].Adresse;
        all[i].CoordX = finalRes[i].CoordX;
        all[i].Coordy = finalRes[i].Coordy;
        all[i].Tel = finalRes[i].Tel;
        all[i].IsAssos = finalRes[i].IsAssos;
        all[i].admin = finalRes[i].admin;
        for(j = 0; j < horaire.length; j++){        
          if(all[i].Id_deposit === horaire[j].Id_deposit){
            all[i].horaire = [];
            all[i].horaire = horaire[j];
            break;
          }
        }
      }
      return all;
    });
  });
};

DepositController.getById = function(id) {
  const where = {};
  const options = {};
  var result;
  where.Id_deposit = {
    [Op.eq]: id,
  }
  options.where = where;
  return Deposit.findAll(options)
  .then((deposit) => {
    if(!(deposit && deposit.length)){
      return [];
    }
    const where = {};
    const options = {};
    where.Id_Stockage = {
      [Op.eq]: deposit[0].Id_deposit
    }
    options.where = where;
    return Product.findAll(options)
    .then((product) => {
      const where = {};
      const options = {};
      where.Id_deposit = {
        [Op.eq]: deposit[0].Id_deposit
      }
      options.where = where;
      return Horaire.findAll(options)
      .then((hor) => {
        return Category.findAll()
        .then((cat) => {
          result = {};
          result.Id_deposit = deposit[0].Id_deposit;
          result.Name = deposit[0].Name;
          result.Adresse = deposit[0].Adresse;
          result.CoordX = deposit[0].CoordX;
          result.CoordY = deposit[0].CoordY;
          result.Tel = deposit[0].Tel;
          result.IsAssos = deposit[0].IsAssos;
          result.admin = deposit[0].admin;
          result.product = [];
          for(i = 0; i < product.length; i++){
            result.product[i] = {};
            result.product[i].Id_Product = product[i].Id_Product;
            result.product[i].Name = product[i].Name;
            result.product[i].Photo = product[i].Photo;
            result.product[i].Description = product[i].Description;
            result.product[i].Id_Categorie = product[i].Id_Categorie;
            result.product[i].Id_Stockage = product[i].Id_Stockage;
            for(j = 0; j < cat.length; j++){
              if(result.product[i].Id_Categorie === cat[j].Id_category){
                result.product[i].categorie = "";
                result.product[i].categorie = cat[j].nom;
              }              
            }
          }
          result.horaire = hor;
          return result;
        })          
      })
    })
  });
};

DepositController.add = function(Name, Adresse, CoordX, CoordY, Tel, IsAssos, admin){
  return Deposit.create({
    Name: Name,
    Adresse: Adresse,
    CoordX: CoordX,
    CoordY: CoordY,
    Tel: Tel,
    IsAssos: IsAssos,
    admin: admin
  });
};

DepositController.update = function(id, Name, Adresse, CoordX, CoordY, Tel, IsAssos, admin){
  const options = {}
  if(Name !== undefined){
    options.Name = Name;
  }
  if(Adresse !== undefined){
    options.Adresse = Adresse;
  }
  if(CoordX !== undefined){
    options.CoordX = CoordX;
  }
  if(CoordY !== undefined){
    options.CoordY = CoordY;
  }
  if(Tel !== undefined){
    options.Tel = Tel;
  }
  if(IsAssos !== undefined){
    options.IsAssos = IsAssos;
  }
  if(admin !== undefined){
    options.admin = admin;
  }
  return Deposit.update(options, {returning: true, where: {Id_deposit: id}});
}

DepositController.delete = function(id){
  return Deposit.destroy({where: {Id_deposit: id}})
  .then(function(product){
    Product.destroy({where: {Id_Stockage: id}})
    .then(function(product){
      Horaire.destroy({where: {Id_deposit: id}});
    })
  });
}

module.exports = DepositController;
