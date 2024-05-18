// rotas http

const express = require('express');
const { signup, login, deleteUser, updateUser, logout } = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/deleteUser').delete(deleteUser);

router.route('/updateUser').put(updateUser);

router.route('/logout').post(logout);

module.exports = router;