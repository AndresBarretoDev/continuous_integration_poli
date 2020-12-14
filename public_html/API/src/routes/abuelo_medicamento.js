const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/abuesoft/abuelo_medicamento/', (req, res) => {
    const query_sentence = `SELECT d.idusuario, d.nombre nombre_usuario, d.apellido apellido_usuario, d.documento, c.idabuelo, 
            c.habitacion, c.edad, c.EPS, a.idmedicamento, a.nombre, a.laboratorio,
	        a.dosis, b.idabuelo_medicamento, b.cantidad_medicamento
        FROM medicamento a
        JOIN abuelo_medicamento b
            ON a.idmedicamento = b.idmedicamento
        JOIN abuelo c 
            ON b.idabuelo = c.idabuelo
        JOIN usuario d
            ON c.idusuario = d.idusuario`;
    mysqlConnection.query(query_sentence, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            res.json(err);
            console.log(err);
        }
    })
});

router.post('/abuesoft/abuelo_medicamento/', (req, res) => {
    const {id, id_abuelo, id_medicamento, cantidad} = req.body;
    const procedure_call = `CALL sp_add_edit_medicamento_abuelo(?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, id_abuelo, id_medicamento, cantidad], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
            console.log(err);
        }
    });
});

router.put('/abuesoft/abuelo_medicamento/:id', (req, res) => {
    const {id} = req.params;
    const {id_abuelo, id_medicamento, cantidad} = req.body;
    const procedure_call = `CALL sp_add_edit_medicamento_abuelo(?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, id_abuelo, id_medicamento, cantidad], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });
});

router.delete('/abuesoft/abuelo_medicamento/:id', (req, res) => {
    const {id} = req.params;
    const delete_statement = `DELETE FROM abuelo_medicamento WHERE idabuelo_medicamento = ?`;
    mysqlConnection.query(delete_statement, [id], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });
});

module.exports = router;