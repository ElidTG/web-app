const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tablaSchema = new Schema ({
    NumeroM : {type : String},
    CodigoM : {type : String},
    CodigoLote: {type : String},
    Tarifa: {type : String},
    Hilos: {type : String},
    Rpu : {type : String},
    Folio : {type : String},
    KhM: {type : String},
    RrM: {type : String},

})

module.exports = mongoose.model('tabla', tablaSchema);