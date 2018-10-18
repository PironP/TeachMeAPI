const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const fs = require('fs');

const DepositController = controllers.DepositController;

const depositRouter = express.Router();
depositRouter.use(bodyParser.json());

depositRouter.get('/', function(req,res){
	if(req.query.coX === undefined){
		console.log("No X sent");
		res.status(400).end();
    	return;
	}else if(req.query.coY === undefined){
		console.log("No Y sent");
		res.status(400).end();
    	return;
	}
	DepositController.getAll(parseFloat(req.query.coX), parseFloat(req.query.coY))
	.then((deposits) => {
		res.json(deposits);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

depositRouter.get('/byId', function(req,res){
	if(req.query.id === undefined){
		console.log("No id sent");
		res.status(400).end();
    	return;
	}
	DepositController.getById(req.query.id)
	.then((info) => {
		res.json(info);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

depositRouter.post('/add',  function(req, res){
	let name = req.body.name;
	let adresse = req.body.adresse;
	let coordX = req.body.coordX;
	let coordY = req.body.coordY;
	let tel = req.body.tel;
	let isAssos = req.body.isAssos;
	let admin = req.body.admin;
	if(name === undefined || adresse === undefined || coordX === undefined || coordY === undefined || tel === undefined || isAssos === undefined || admin === undefined){
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
	DepositController.add(name, adresse, coordX, coordY, tel, isAssos, admin)
	.then((product) =>{
		res.status(201).json(product);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

depositRouter.post('/update', function(req, res){
	if(req.body.id === undefined){
		res.status(400).end();
		return;
	}
	DepositController.update(req.body.name, req.body.adresse, req.body.coordX, req.body.coordY, req.body.tel, req.body.isAssos, req.body.admin)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});

/*
depositRouter.post('/delete', Admin.verifyToken, function(req, res){
	if(req.body.id === undefined){
		res.status(400).end();
		return;
	}
	ProductController.delete(req.body.id)
	res.status(204).end();
});*/

module.exports = depositRouter;