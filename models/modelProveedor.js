var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proveedor_schema = new Schema({
    nombre : String,
    cuit : String,
    pass : String,
    correo : String,
    telefono : String,
    contacto : String,
    ramo : String,
    invitado : Number,
    cotizo : Number,
    prom : Number
})

var Proveedor = mongoose.model("Proveedor", proveedor_schema);

module.exports.Proveedor = Proveedor;