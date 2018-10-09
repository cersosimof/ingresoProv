var express = require('express');
var router = express.Router();
var Proveedor = require('../models/modelProveedor').Proveedor;


exports.mostrar = function(req, res, next) {
    if (req.session.cuit) {
        Proveedor.find({ 'cuit' : req.session.cuit }, (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.redirect('errorlog');
            } else {
                console.log(results)
            res.render('modif', {'resultado' : results, 'usuario' : req.session.cuit})
            } 
        });
    } else {
        res.render('index');  
    }
}

exports.modificar = function(req, res) {
    if (req.session.cuit) {
        Proveedor.update({ 'cuit' : req.session.cuit }, { 'nombre' : req.body.nombre, 'correo' : req.body.correo, 'telefono' : req.body.telefono, 'contacto' : req.body.contacto, 'ramo' : req.body.ramo }, (err, results) => {
            if(err) throw err;
            if (results.length == 0){
            res.render('errorlog');
            } else {
            res.redirect('/')
            } 
        });
    } else {
        res.redirect('/');  
    }
}
