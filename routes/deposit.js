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
	DepositController.getAll(req.query.coX, req.query.coY)
	.then((deposits) => {
		res.json(deposits);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

module.exports = depositRouter;