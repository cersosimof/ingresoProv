var express = require('express');
var router = express.Router();
var Proveedor = require('../models/modelProveedor').Proveedor;
var md5 = require('md5');
const nodemailer = require('nodemailer');
var DB = require('../db');

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

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: DB.mailUser,
             pass: DB.mailPass
         }
     });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Base Proveedores" <cersosimof88@gmail.com>', // sender address
        to: req.body.correo, // list of receivers
        bcc: 'cersosimo.facundo@gmail.com',
        subject: '¡Inscripción exitosa! ✔', // Subject line
        // text: 'Hello world?', // plain text body
        html: '<b>Bienvenido ' + req.body.nombre +'!</b><br><p>Gracias por inscribirse a la base de proveedores.</p><br>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
          res.render('alta' )
        }
      });
  }