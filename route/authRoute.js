// rotas http

const express = require('express');

const { signup, login, deleteUser, updateUser, logout, getAllUsers, getUserById } = require('../controller/authController');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.delete('/delete/:id', deleteUser);

router.put('/update/:id', updateUser);

router.get('/users', getAllUsers);

router.get('/user/:id', getUserById);

module.exports = router;