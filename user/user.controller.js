const express = require('express');
const router = express.Router();
const userServices = require('./user.service');

// create routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAllUser);
router.get('/current', getCurrentUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

function authenticate(req , res, next) {
    userServices.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({
            message: 'Username or password is incorrect' 
        }))
        .catch(err => next(err));
    
}
function register(req , res, next) {
        userServices.register(req.body)
            .then(()=> res.json({message: 'SUCCESS'}))
            .catch(err => next(err));
}
function getAllUser(req , res, next) {
    userServices.getAllUser()
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getCurrentUser(req , res, next) {
    userServices.getUserById(req.user.sub)
        .then(user => user ? res.json(user) : res.status(400))
        .catch(err => next(err));
}
function getUserById(req , res, next) {
    userServices.getUserById(req.params.id)
        .then(user => user ? res.json(user) : res.status(400))
        .catch(err => next(err));
}
function updateUser(req , res, next) {
    userServices.updateUser(req.params.id, req.body)
        .then(() => res.json({message: "UPDATE SUCCESS"}))
        .catch(err => next(err));
}
function deleteUser(req , res, next) {
    userServices.deleteUser(req.params.id)
        .then(() => res.json({message: "DELETE SUCCESS"}))
        .catch(err => next(err));

}