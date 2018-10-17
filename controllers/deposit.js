const ModelIndex = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Deposit = ModelIndex.Deposit;
const Op = ModelIndex.Sequelize.Op;

const DepositController = function(){};

DepositController.getAll = function(X, Y) {
  return Deposit.find({
    where: {
      CoordX : { $gt: X+500, $lt: X-500 },
      CoordY : { $gt: X+500, $lt: X-500 }
    }
  })
  .then(adm => {
    return adm;
  })
};

module.exports = DepositController;