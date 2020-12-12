const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/abuesoft/user', (req, res) => {
    const query = `SELECT b.nombre nombre_abuelo,
        b.apellido apellido_abuelo,
        b.tipo_doc tipo_doc_abuelo,
        b.documento doc_abuelo,
        a.habitacion,
        a.edad,
        a.EPS,
        c.nombre nombre_repstn,
        c.apellido apellido_repstn,
        c.tipo_doc tipo_doc_repstn,
        c.documento doc_repstn,
        c.telefono tel_repstn, 
        c.direccion direccion_repstn,
        c.correo correo_repstn
        FROM abuelo a 
        INNER JOIN usuario b 
        ON a.idusuario = b.idusuario 
        INNER JOIN usuario c
        ON a.idrepresentante = c.idusuario;`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err){
            res.json(rows);
        } else {
            console.log(err);
            res.json(err);
        }
    });
});

router.post('/abuesoft/user/', (req, res) => {
    const { nombre_rep, apellido_rep, tipo_doc_rep, doc_rep, tel_rep, direccion, correo } = req.body.representante;
    const { nombre_nono, apellido_nono, tipo_doc_nono, doc_nono, habitacion, edad, eps } = req.body.abuelo;
    const procedure_call = `CALL abuesoft.add_abuelo_repsnt(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    mysqlConnection.query(procedure_call, [nombre_nono, apellido_nono, tipo_doc_nono, doc_nono, habitacion, edad, eps, nombre_rep, apellido_rep, tipo_doc_rep, doc_rep, tel_rep, direccion, correo ], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        } else {
            console.log(err);
            res.json({status: false})
            res.json(err);
        }
    });
});

router.put('/abuesoft/user/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, tipo_doc, doc, habitacion, edad, eps } = req.body;
    const procedure_call = `CALL abuesoft.sp_edit_abuelo(?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, nombre, apellido, tipo_doc, doc, habitacion, edad, eps], (err, rows, field) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });
});

module.exports = router;
