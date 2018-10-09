var express = require('express');
var router = express.Router();

exports.logout = function(req, res) {          
    req.session.destroy(function(err){
        if(err){
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
}

