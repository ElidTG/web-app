const mongoose = require('mongoose');

const conexion = async() => {
    try {
        await mongoose.connect(process.env.BD,
        {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log('Base de datos\n');

    } catch (error) {
        console.log(error);
        throw new Error ('No se ha establecido conexion con mongodb');
    }
}

module.exports = {conexion};