var express = require('express');
var router = express.Router();
var Proveedor = require('../models/modelProveedor').Proveedor;
var md5 = require('md5');


exports.login = function(req, res, next) {
  res.render('login');
}

exports.iniciarSesion = function(req, res) {
  var cuit = req.body.cuit;
  var pass = md5(req.body.pass);

  console.log(pass)

  Proveedor.find({ 'cuit' : cuit, 'pass' : pass }, function(err, results){
    if(results.length == 0 ) {
      if(err) throw err;
      res.render('errorlog')
    } else {
      req.session.cuit = req.body.cuit;
      req.session.pass = req.body.pass;
      res.redirect("/modif")
    }
  });

  console.log('llego')
}
