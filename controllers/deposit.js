const ModelIndex = require('../models');
const func = require('../func.js');
const fs = require('fs');
const Deposit = ModelIndex.deposit;
const Product = ModelIndex.product;
const Op = ModelIndex.Sequelize.Op;

const DepositController = function(){};

DepositController.getAll = function(X, Y) {
  const options = {};

  //tests
  //console.log(func.toRadian(X));
  //console.log(func.getDist(X, Y,));
  //var distance = func.getDist(X, Y, where.CoorX, where.CoordY, "K");
  return Deposit.findAll().then(function(res){
    var len = res.length;
    var i=0;
    var distance=0;
    var finalRes = [];

    for(i; i<len; i++){
        distance = func.getDist(X, Y, res[i].CoordX, res[i].CoordY);
        console.log(distance+"KM");
        if (distance<0.5){
          console.log("OK");
          finalRes.push(res[i]);
        }
    }
    return finalRes;
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
      result = {};
      result.Id_deposit = deposit[0].Id_deposit;
      result.Name = deposit[0].Name;
      result.Adresse = deposit[0].Adresse;
      result.CoordX = deposit[0].CoordX;
      result.CoordY = deposit[0].CoordY;
      result.Tel = deposit[0].Tel;
      result.IsAssos = deposit[0].IsAssos;
      result.admin = deposit[0].admin;
      result.product = product;
      return result;
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
    Product.destroy({where: {Id_Stockage: id}});
  });
}

module.exports = DepositController;
