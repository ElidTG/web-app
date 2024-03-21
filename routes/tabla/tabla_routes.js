const express = require('express');
const app = express();
const registros = require('../../models/tabla');

app.get('/buscartabla/:ruta', async(req, res) => {
    const ruta = req.params.ruta;
    const reg = await registros.find({Ruta: ruta});
    return res.status(200).json({
        ok: true,
        registros:reg
    })
});

app.get('/gettabla/:NumeroM', async(req, res) => {
    const NumeroM = req.params.NumeroM;
    const reg = await registros.findOne({ NumeroM: NumeroM});

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
/*app.get('/1gettabla/:parametro', async (req, res) => {
    const parametro = req.params.parametro;
    let reg;

    // Check if the parametro is a valid Rpu
    if (/^\d+$/.test(parametro)) {
        reg = await registros.findOne({ NumeroM: parametro });
    } else {
        // If it's not an Rpu, assume it's a NumeroM and search by that
        reg = await registros.findOne({ Rpu: parametro });
    }

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
});*/

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
        Latitud: body.Latitud,
        Longitud: body.Longitud,
    })
    tabla.save().then ((user)=>{
        return res.status(200).json({
            ok: true,
            tabla:tabla
        })
    });
    
});

app.post('/actualizartabla/:NumeroM', async (req, res) => {
    try {
        const numeromBuscar = req.params.NumeroM;
        const body = req.body;
        console.log(numeromBuscar);
        console.log(body);
        // Encuentra el registro por Numero de Medidor y lo actualiza con los datos del cuerpo (body).
        const tablaModificar = await registros.findOneAndUpdate({ NumeroM: numeromBuscar }, body, { new: true });
        console.log(tablaModificar);
        if (tablaModificar) {
            console.log('MODIFICAR');
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

