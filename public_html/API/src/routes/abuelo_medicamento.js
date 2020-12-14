const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/abuesoft/abuelo_medicamento/', (req, res) => {
    const query_sentence = `SELECT d.idusuario, d.nombre, d.apellido, d.documento, c.idabuelo, 
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

module.exports = router;