// logica de negocio

const user = require('../db/models/user')

const signup = (req, res, next) => {
   const body = req.body;

   if(!['1', '2'].includes(body.userType)) {
    return res.status(400).json({
        status: 'fail',
        message: 'User Type inválido'
    });
   }

   const newUser = user.create({
    userType: body.userType,
    name: body.name,
    email: body.email,
    cpf: body.cpf,
    password: body.password
   });

   if(!newUser) {
    return res.status(400).json({
        status: 'fail',
        message: 'Erro ao criar usuario.'
    });
    }

    
    return res.status(201).json({
        status: 'success',
        message: 'Usuario criado com sucesso.'
    })
}

module.exports = { signup };