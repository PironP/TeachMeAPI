const ModelIndex = require('../models');
const func = require('../func');
const fs = require('fs');
const Deposit = ModelIndex.deposit;
const Product = ModelIndex.product;
const Horaire = ModelIndex.horaire;
const Op = ModelIndex.Sequelize.Op;

const DepositController = function(){};

DepositController.getAll = function(X, Y) {
  const where = {};
  const options = {};
  var all;

  //tests
  //console.log(func.toRadian(30));
  //var distance = func.getDist(X, Y);

  //console.log(distance);
  where.CoordX = {
    [Op.lt]: X+500,
    [Op.gt]: X-500,
  }
  where.CoordY = {
    [Op.lt]: Y+500,
    [Op.gt]: Y-500,
  }
  options.where = where;
  return Deposit.findAll(options)
  .then((result) => {
    return Horaire.findAll()
    .then((horaire) => {
      all = [];
      for(i = 0; i < result.length; i++){
        all[i] = {};
        all[i].Id_deposit = result[i].Id_deposit;
        all[i].Name = result[i].Name;
        all[i].Adresse = result[i].Adresse;
        all[i].CoordX = result[i].CoordX;
        all[i].Coordy = result[i].Coordy;
        all[i].Tel = result[i].Tel;
        all[i].IsAssos = result[i].IsAssos;
        all[i].admin = result[i].admin;
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
        .then((total) => {
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
          result.horaire = total;
          return result;
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
    Product.destroy({where: {Id_Stockage: id}});
  });
}

module.exports = DepositController;
