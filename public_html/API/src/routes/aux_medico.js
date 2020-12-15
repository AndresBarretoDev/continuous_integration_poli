const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/abuesoft/aux_medico/', (req, res) => {
    const { id, nombre, apellido, tipo_doc, doc, tel, direccion, correo } = req.body;
    const procedure_call = `CALL abuesoft.sp_add_edit_aux_medico(?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, nombre, apellido, tipo_doc, doc, tel, direccion, correo], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        } else{
            res.json({status: false});
            console.log(err);
        }
    });
});

router.put('/abuesoft/aux_medico/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, tipo_doc, doc, tel, direccion, correo } = req.body;
    const procedure_call = `CALL abuesoft.sp_add_edit_aux_medico(?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(procedure_call, [id, nombre, apellido, tipo_doc, doc, tel, direccion, correo], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
            console.log(err);
        }
    });
});

router.get('/abuesoft/aux_medico', (req, res) => {
    const query = `SELECT  a.idusuario, a.nombre, a.apellido, a.tipo_doc, a.documento, a.telefono, a.direccion, a.correo, a.idrol, b.nombre rol, b.descripcion
        FROM usuario a
        JOIN rol b
		    ON a.idrol = b.idrol
        WHERE b.nombre = "auxiliar_medico";`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            res.json(err);
            console.log(err);
        }
    });
});

router.delete('/abuesoft/aux_medico/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM abuesoft.usuario WHERE idusuario = ?`;
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
        }else{
            res.json({status: false});
            console.log(err);
        }
    });
});

module.exports = router;
