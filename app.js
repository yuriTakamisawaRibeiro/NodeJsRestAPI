const express = require('express');

const authRouter = require('./route/authRoute');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'servidor conectado.'
    })
})

// todas as rotas estarão aqui
app.use('/api/v1/auth', authRouter);

app.listen(3000, () => {
    console.log('Servidor rodando')
})