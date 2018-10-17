const ModelIndex = require('../models');
const fs = require('fs');
const Deposit = ModelIndex.deposit;
const Product = ModelIndex.product;
const Op = ModelIndex.Sequelize.Op;

const DepositController = function(){};

DepositController.getAll = function(X, Y) {
  const where = {};
  const options = {};
  where.CoordX = {
    [Op.lt]: X+500,
    [Op.gt]: X-500,
  }
  where.CoordY = {
    [Op.lt]: Y+500,
    [Op.gt]: Y-500,
  }
  options.where = where;
  return Deposit.findAll(options);
};

DepositController.getById = function(id) {
  const where = {};
  const options = {};
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
    deposit[0].products = Product.findAll(options);
    return deposit;
  });
};

module.exports = DepositController;