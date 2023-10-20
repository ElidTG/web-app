const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema ({
    Correo : {type : String},
    Password : {type : String},
    Ruta: {type : String},
})
module.exports = mongoose.model('usuarios', usuarioSchema);