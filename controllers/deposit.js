const ModelIndex = require('../models');
const fs = require('fs');
const Deposit = ModelIndex.deposit;
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

module.exports = DepositController;