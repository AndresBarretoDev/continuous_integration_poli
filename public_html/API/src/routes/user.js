const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/abuesoft/user', (req, res) => {
    const query = `SELECT b.*, a.*, c.*
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
        }
    });
});

router.post('/abuesoft/user/', (req, res) => {
    const { nombre_rep, apellido_rep, tipo_doc_rep, doc_rep, tel_rep } = req.body.representante;
    const { nombre_nono, apellido_nono, tipo_doc_nono, doc_nono, tel_nono, habitacion, edad } = req.body.abuelo;
    const procedure_call = `CALL abuesoft.add_abuelo_repsnt(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    mysqlConnection.query(procedure_call, [nombre_nono, apellido_nono, tipo_doc_nono, doc_nono, tel_nono, habitacion, edad, nombre_rep, apellido_rep, tipo_doc_rep, doc_rep, tel_rep ], (err, rows, fields) => {
        if(!err){
            res.json("Successful registration");
        } else {
            console.log(err);
        }
    });
});

module.exports = router;