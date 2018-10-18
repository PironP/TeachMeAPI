const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const fs = require('fs');

const ProductController = controllers.ProductController;

const productRouter = express.Router();
productRouter.use(bodyParser.json());


productRouter.get('/', function(req,res){
	ProductController.getAll(req.query.search)
	.then((products) => {
		res.json(products);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

productRouter.get('/byId', function(req,res){
	if(req.query.id === undefined){
		console.log("No id_product sent");
		res.status(400).end();
    	return;
	}
	ProductController.getById(req.query.id)
	.then((products) => {
		res.json(products);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

productRouter.get('/byIdCategory', function(req,res){
	if(req.query.id === undefined){
		console.log("No id_Category sent");
		res.status(400).end();
    	return;
	}
	ProductController.getByIdCategory(req.query.id)
	.then((products) => {
		res.json(products);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

productRouter.get('/byIdDeposit', function(req,res){
	if(req.query.id === undefined){
		console.log("No id_Deposit sent");
		res.status(400).end();
    	return;
	}
	ProductController.getByIdDeposit(req.query.id)
	.then((products) => {
		res.json(products);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});


productRouter.post('/', function(req, res){
	if( req.body.Id_Categorie === undefined || req.body.Id_Stockage === undefined || req.body.Description === undefined || req.body.Name === undefined){
		console.log("Need description and id_Categorie and id_Stockage to be add");
		res.status(400).end();
		return;
	}
	ProductController.add(req.body.Name,req.body.Photo,req.body.Description, req.body.Id_Categorie, req.body.Id_Stockage)
	.then((products) =>{
		res.status(201).json(products);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

productRouter.post('/delete', function(req, res){
	if(req.body.Id_Product === undefined){
		res.status(400).end();
		return;
	}
	ProductController.delete(req.body.Id_Product);
	res.status(204).end();
});

productRouter.post('/deleteByDeposit', function(req, res){
	if(req.body.Id_Stockage === undefined){
		res.status(400).end();
		return;
	}
	ProductController.delete(req.body.Id_Stockage);
	res.status(204).end();
});

productRouter.post('/update', function(req, res){
	if(req.body.Id_Product === undefined){
		res.status(400).end();
		return;
	}
	ProductController.update(req.body.Name, req.body.Id_Product, req.body.Photo, req.body.Description)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});




module.exports = productRouter;