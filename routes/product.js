const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const fs = require('fs');

const ProductController = controllers.ProductController;

const productRouter = express.Router();
productRouter.use(bodyParser.json());

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
module.exports = productRouter;