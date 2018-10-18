const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.userController;
const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post('/login', function(req,res){
    if(req.body.email === undefined || req.body.password === undefined){
        return res.status(400).end();
    }
    UserController.authotificate(req.body.email, req.body.password )
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});

userRouter.post('/signIn', function(req,res){
    console.log(req);
    if(req.body.email === undefined || req.body.password === undefined || req.body.lastName === undefined || req.body.firstName === undefined || req.body.tel === undefined){
        return res.status(400).json({ message: 'All fields are required' }).end();
    }
    UserController.signIn(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email already exits' }))
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});
module.exports = userRouter;