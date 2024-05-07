// logica de negocio

const signup = (req, res, next) => {
    res.json({
        status:'success',
        message:'signup esta funcionando'
    })
}

module.exports = { signup };