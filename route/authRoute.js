// rotas http

const express = require('express');

const { signup, login, deleteUser, updateUser, logout, getAllUsers, getUserById, changePassword, changeEmail, changeName } = require('../controller/authController');

const authenticateToken = require('../middleware/authenticateToken');


const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.delete('/delete/:id', deleteUser);

router.put('/update/:id', updateUser);

router.get('/users', getAllUsers);

router.get('/user/:id', getUserById);

router.post('/changePassword', authenticateToken, changePassword);

router.post('/changeEmail', authenticateToken, changeEmail);

router.post('/changeName', authenticateToken, changeName);

module.exports = router;