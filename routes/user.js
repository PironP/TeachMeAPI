const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const verifyToken = require('../controllers/verifyToken')
const UserController = controllers.userController;
const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.post('/login', function(req,res){
    if(req.body.email === undefined || req.body.password === undefined){
        return res.status(400).end();
    }
    UserController.authontificate(req.body.email, req.body.password )
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});
userRouter.post('/signIn', function(req,res){
    if(req.body.email === undefined || req.body.password === undefined || req.body.lastName === undefined || req.body.firstName === undefined || req.body.tel === undefined){
        return res.status(400).json({ message: 'All fields are required' }).end();
    }
    UserController.signIn(req, res)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email already exits' }))
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});

userRouter.post('/update', function(req,res){
    var authorisation = req.headers['authorisation ']
    var userId = verifyToken.getUserId(authorisation)
    console.log('userid= '+userId);
    if(!userId){
        return res.status(400).json({message: 'Token is absent or invalid'}).end();
    }
    if(req.body.email === undefined || req.body.password === undefined || req.body.lastName === undefined || req.body.firstName === undefined || req.body.tel === undefined){
        return res.status(400).json({ message: 'All fields are required' }).end();
    }
    UserController.update(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Error!' }))
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});
userRouter.get('/delete', function(req,res){
    var authorisation = req.headers['authorisation']
    var userId = verifyToken.getUserId(authorisation)
    if(userId === -1){
        return res.status(400).json({message: 'Token is absent or invalid'}).end();
    }else {
        if (req.query.userId === undefined) {
            return res.status(400).json({message: 'user id is required'}).end();
        }
        UserController.delete(userId)
            .then(result => result ? res.json(result) : res.status(400).json({message: 'Error, id user not exist'}))
            .catch(err => {
                console.log(err);
                res.status(400).end();
            });
    }
});
module.exports = userRouter;