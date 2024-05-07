const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'servidor conectado.'
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando')
})