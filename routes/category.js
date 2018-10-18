const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const fs = require('fs');

const categoryController = controllers.categoryController;

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.get('/', function(req,res){

	categoryController.getAll()
	.then((category) => {
		res.json(category);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});


categoryRouter.get('/byId', function(req,res){
	if(req.query.id === undefined){
		console.log("No id sent");
		res.status(400).end();
    	return;
	}
	categoryController.getById(req.query.id)
	.then((category) => {
		res.json(category);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

module.exports = categoryRouter;