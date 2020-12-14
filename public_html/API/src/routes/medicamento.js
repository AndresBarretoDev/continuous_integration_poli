const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/abuesoft/medicamento/', (req, res) => {
    const {id, nombre, laboratorio, vencimiento, registro, dosis} = req.body;
    const procedure_call = `CALL abuesoft.sp_AddEditMedicamento(?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, nombre, laboratorio, vencimiento, registro, dosis], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });
});

module.exports = router;