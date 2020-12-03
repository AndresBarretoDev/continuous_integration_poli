const { Router } = require('express');
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/abuesoft/login/:usuario&:contrasena', (req, res) => {
    const {usuario, contrasena} = req.params;
    mysqlConnection.query('SELECT abuesoft.loginValidte(?,?) AS valor', [usuario,contrasena],(err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;