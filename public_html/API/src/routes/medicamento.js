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

router.put('/abuesoft/medicamento/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, laboratorio, vencimiento, registro, dosis} = req.body;
    const procedure_call = `CALL abuesoft.sp_AddEditMedicamento(?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, nombre, laboratorio, vencimiento, registro, dosis], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });
});

router.get('/abuesoft/medicamento/', (req, res) => {
    const query = `SELECT idmedicamento, 
        nombre, 
        laboratorio, 
        fechaVencimiento, 
        fechaRegistro, 
        dosis 
        FROM medicamento;`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            res.json(err);
            console.log(err);
        }
    });
});

router.delete('/abuesoft/medicamento/:id', (req, res) => {
    const {id} = req.params;
    const delete_statement = `DELETE FROM medicamento WHERE idmedicamento = ?`;
    mysqlConnection.query(delete_statement, [id], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });
});

module.exports = router;