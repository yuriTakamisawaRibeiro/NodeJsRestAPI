// logica de negocio

const signup = (req, res, next) => {
   const body = req.body;

   if(!['1', '2'].includes(body.userType)) {
    return res.status(400).json({
        status: 'fail',
        message: 'User Type inválido'
    })
   }
}

module.exports = { signup };