var express = require('express');
var router = express.Router();
var Proveedor = require('../models/modelProveedor').Proveedor;
var md5 = require('md5');

exports.mostrarForm = function(req, res, next) {
  res.render('alta');
}

exports.recibirForm = function(req, res, next) {

    var user = new Proveedor({  
        'nombre' : req.body.nombre,
        'cuit' : req.body.cuit,
        'pass' : md5(req.body.pass),
        'correo' : req.body.correo,
        'telefono' : req.body.telefono,
        'contacto' : req.body.contacto,
        'ramo' : req.body.ramo.toLowerCase(),
        'invitado' : 0,
        'cotizo' : 0,
        'prom' : 0
   })
  
      user.save(function(err, doc){
        if(err) {
           res.send('Ocurrio un error al intentar guardar proveedor en base de datos, intente nuevamente mas tarde');
        } else { 
          res.render('alta' )
        }
      });
  }