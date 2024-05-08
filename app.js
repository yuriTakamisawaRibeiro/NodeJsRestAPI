// rodar projeto -> npm run start:dev

require('dotenv').config({path: `${process.cwd()}/.env`})

const express = require('express');

const authRouter = require('./route/authRoute');
const { status } = require('express/lib/response');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'servidor conectado.'
    })
})

// todas as rotas estarão aqui
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route não encontrada'
    })
})

const PORT = process.env.APP_PORT || 4000;

app.listen(process.env.APP_PORT, () => {
    console.log('Servidor rodando', PORT)
})