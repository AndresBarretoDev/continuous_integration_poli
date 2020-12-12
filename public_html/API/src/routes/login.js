const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/abuesoft/login/:usuario&:contrasena', (req, res) => {
    const {usuario, contrasena} = req.params;
    mysqlConnection.query('SELECT abuesoft.loginValidate(?,?) as valor', [usuario,contrasena],(err, rows, fields) => {
        if(!err){
            res.json(rows);
            console.log(rows)
        } else {
            console.log(err);
            res.json(err);
        }
    });
});

router.post('/abuesoft/login/', (req, res) => {
    const { usuario, contrasena, correo, documento } = req.body;
    const query = `CALL abuesoft.sign_up(?, ?, ?, ?);`;
    mysqlConnection.query(query, [usuario, contrasena, correo, documento], (err, rows, fields) => {
        if(!err){
            res.json({status: true});
            res.json(rows);
        } else {
            res.json({status: false});
            res.json(err);
        }
    });
});

module.exports = router;