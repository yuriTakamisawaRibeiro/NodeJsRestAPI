const user = require('../db/models/user');
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const signup = async (req, res, next) => { // Adicionando async para lidar com a promessa
    const body = req.body;

    if (!['1', '2'].includes(body.userType)) {
        return res.status(400).json({
            status: 'fail',
            message: 'User Type inválido'
        });
    }

    try {
        // Criando o novo usuário e esperando a promessa ser resolvida
        const newUser = await user.create({
            userType: body.userType,
            name: body.name,
            email: body.email,
            cpf: body.cpf,
            password: body.password,
            confirmPassword: body.confirmPassword
        });

        // Convertendo o modelo criado em JSON
        const result = newUser.toJSON();

        delete result.password;
        delete result.deletedAt;

        result.token = generateToken({
            id: result.id
        });

        return res.status(201).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Erro ao criar usuário.'
        });
    }
};

module.exports = { signup };