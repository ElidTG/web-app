const express = require('express');
const app = express();

app.use(require('../routes/tabla/tabla_routes'));
app.use(require('../routes/usuarios/usuario_rotes'));

module.exports = app;