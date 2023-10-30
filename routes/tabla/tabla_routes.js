const express = require('express');
const app = express();
const registros = require('../../models/tabla');

// Add this route to fetch data from the MongoDB database
app.get('/buscartabla/:ruta', async(req, res) => {
    const ruta = req.params.ruta;
    const reg = await registros.find({Ruta: ruta});
    return res.status(200).json({
        ok: true,
        registros:reg
    })
});
app.get('/gettabla/:rpu', async(req, res) => {
    const rpu = req.params.rpu;
    const reg = await registros.findOne({ Rpu: rpu });

    if (reg) {
        return res.status(200).json({
            ok: true,
            registro: reg
        });
    } else {
        return res.status(404).json({
            ok: false,
            message: 'Registro no encontrado'
        });
    }
});
app.post('/patabla', (req, res) => {
    let body = req.body;
    let tabla = new registros({ 
        NumeroM : body.NumeroM,
        CodigoM : body.CodigoM,
        CodigoLote : body.CodigoLote,
        Tarifa: body.Tarifa,
        Hilos: body.Hilos,
        Rpu :     body.Rpu,
        Folio :   body.Folio,
        KhM: body.KhM,
        RrM: body.RrM,
        Ruta: body.Ruta,
    })
    tabla.save().then ((user)=>{
        return res.status(200).json({
            ok: true,
            tabla:tabla
        })
    });
    
});

app.post('/actualizartabla/:rpu', async (req, res) => {
    try {
        const rpuBuscar = req.params.rpu;
        const body = req.body;
        console.log(rpuBuscar);
        console.log(body);
        // Encuentra el registro por RPU y actualízalo con los datos del cuerpo (body).
        const tablaModificar = await registros.findOneAndUpdate({ Rpu: rpuBuscar }, body, { new: true });
        console.log(tablaModificar);
        if (tablaModificar) {
            console.log('Modifica algo?');
            return res.status(200).json({
                ok: true,
                tabla: tablaModificar
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: 'Registro no encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al modificar el registro'
        });
    }
});
module.exports = app;

