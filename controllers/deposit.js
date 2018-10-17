const ModelIndex = require('../models');
const fs = require('fs');
const Deposit = ModelIndex.Deposit;
const Op = ModelIndex.Sequelize.Op;

const DepositController = function(){};

DepositController.getAll = function(X, Y) {
  const where = {};
  const options = {};
  where.CoordX = {
    [Op.like]: `${name}%`
  }
  return Deposit.find({
    where: {
      CoordX : { $gt: X+500, $lt: X-500 },
      CoordY : { $gt: Y+500, $lt: Y-500 }
    }
  })
  .then(deposit => {
    return deposit;
  })
};

module.exports = DepositController;