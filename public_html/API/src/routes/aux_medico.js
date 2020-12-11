const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/abuesoft/aux_medico/', (req, res) => {
    const { nombre, apellido, tipo_doc, doc, tel, direccion, correo } = req.body;
    const procedure_call = `CALL abuesoft.add_nurse(?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [nombre, apellido, tipo_doc, doc, tel, direccion, correo], (err, rows, fields) => {
        if(!err){
            res.json({status: "true"});
        } else{
            res.json({status: "false"});
            console.log(err);
        }
    });
});

module.exports = router;