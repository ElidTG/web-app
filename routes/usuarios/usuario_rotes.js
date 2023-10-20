const express = require('express');
const app = express();
const modelo_usuario = require('../../models/user');

// Add this route to fetch data from the MongoDB database
app.post('/iniciosesion', async (req, res) => {
    try{
    const {
        Correo,
        Password
    }= req.body;
    const usuario = await modelo_usuario.findOne({Correo})
    if(!usuario){
        return res.status(404).json({
            ok:false,
            message: 'No existe una cuenta con este RPE'})
    }
    if (Password === usuario.Password){
        return res.status(200).json({
            ok: true,
            message:'Inicio de Sesion',
            Ruta: usuario.Ruta
        })
    }else{
        return res.status(500).json({
            ok:false,
            message: 'Datos incorrectos'
        })
    }
}catch(err){
    return res.status(500).json({
        ok:false,
        message: err.message
    })
}
});
app.post('/crearcuenta', async(req, res) => {
try{
    const {
        Correo,
        Password,
        Ruta,
    }= req.body;
    
    const newUser = new modelo_usuario({
        Correo, 
        Password,
        Ruta,
    })
    await newUser.save();
    
    
    return res.status(200).json({
        ok: true,
        data: newUser
    });
}catch(err){
    return res.status(500).json({
        ok:false,
        message: err.message
    })
}
});
module.exports = app;

