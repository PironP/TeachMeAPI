const ModelIndex = require('../models');
const func = require('../func.js');
const fs = require('fs');
const Horaire = ModelIndex.horaire;
const Op = ModelIndex.Sequelize.Op;

const HoraireController = function(){};


HoraireController.getById = function(id) {
  const where = {};
  const options = {};
  var result;
  where.Id_deposit = {
    [Op.eq]: id,
  }
  options.where = where;
  return Horaire.findAll(options);
};

HoraireController.add = function(Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Id_deposit){
  return Horaire.create({
    Monday: Monday,
    Tuesday: Tuesday,
    Wednesday: Wednesday,
    Thursday: Thursday,
    Friday: Friday,
    Saturday: Saturday,
    Sunday: Sunday,
    Id_deposit: Id_deposit
  });
};

HoraireController.update = function(id, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Id_deposit){
  const options = {}
  if(Monday !== undefined){
    options.Monday = Monday;
  }
  if(Tuesday !== undefined){
    options.Tuesday = Tuesday;
  }
  if(Wednesday !== undefined){
    options.Wednesday = Wednesday;
  }
  if(Thursday !== undefined){
    options.Thursday = Thursday;
  }
  if(Friday !== undefined){
    options.Friday = Friday;
  }
  if(Saturday !== undefined){
    options.Saturday = Saturday;
  }
  if(Sunday !== undefined){
    options.Sunday = Sunday;
  }
  if(Id_deposit !== undefined){
    options.Id_deposit = Id_deposit;
  }
  return Horaire.update(options, {returning: true, where: {Id_horaire: id}});
}

HoraireController.delete = function(id){
  return Horaire.destroy({where: {Id_horaire: id}});
}

module.exports = HoraireController;
