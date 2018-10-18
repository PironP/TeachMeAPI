const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const fs = require('fs');

const HoraireController = controllers.HoraireController;

const horaireRouter = express.Router();
horaireRouter.use(bodyParser.json());

horaireRouter.get('/byId', function(req,res){
	if(req.query.id === undefined){
		console.log("No id sent");
		res.status(400).end();
    	return;
	}
	HoraireController.getById(req.query.id)
	.then((info) => {
		res.json(info);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

horaireRouter.post('/add',  function(req, res){
	let Monday = req.body.Monday;
	let Tuesday = req.body.Tuesday;
	let Wednesday = req.body.Wednesday;
	let Thursday = req.body.Thursday;
	let Friday = req.body.Friday;
	let Saturday = req.body.Saturday;
	let Sunday = req.body.Sunday;
	let Id_deposit = req.body.Id_deposit;
	if(Monday === undefined || Tuesday === undefined || Wednesday === undefined || Thursday === undefined || Friday === undefined || Saturday === undefined || Sunday === undefined || Id_deposit === undefined){
		res.status(400).end();
		return;
	}
	if(isAssos != 1 && isAssos != 0){
		res.status(400).end();
		return;
	}
	if(admin != 1 && admin != 0){
		res.status(400).end();
		return;
	}
	HoraireController.add(Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Id_deposit)
	.then((product) =>{
		res.status(201).json(product);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

horaireRouter.post('/update', function(req, res){
	if(req.body.id === undefined){
		res.status(400).end();
		return;
	}
	HoraireController.update(req.body.id, req.body.Monday, req.body.Tuesday, req.body.Wednesday, req.body.Thursday, req.body.Friday, req.body.Saturday, req.body.Sunday, req.body.Id_deposit)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});

horaireRouter.post('/delete', function(req, res){
	if(req.body.id === undefined){
		res.status(400).end();
		return;
	}
	HoraireController.delete(req.body.id)
	res.status(204).end();
});

module.exports = horaireRouter;