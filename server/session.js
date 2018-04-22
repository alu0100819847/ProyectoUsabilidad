var mongoose = require('mongoose');
var Schema = require('./schema.js')
var Usuarios = mongoose.model('UyA2018', Schema);
var bcrypt   = require('bcrypt-nodejs');
var bd = []

bd.registrar = function(user, email, pass){

  Usuarios.findOne({'Usuario.Email': email}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result != null) {
        console.log("El email "+ email + " ya está registrado.");
        }
       else {
        console.log("Inserting user: "+user);
        console.log("With pass: "+pass);
        console.log("Email: "+ email);
        usuario = new Usuarios({'Usuario.Nombre': user, 'Usuario.Password': bcrypt.hashSync(pass), 'Usuario.Email': email}, function (err, result) {
          if (err) return handleError(err);
        })

        usuario.save (function (err) {
          if (err) console.log(err);;
        })
      }
    }
  })
}

bd.print = function(){
  Usuarios.where('Usuario.Nombre', /.*/).exec( function(err, result){
    console.log("HOla: "+result);
  })
}

bd.remove= function(nombre){
  console.log("Borrar: "+nombre)
    Usuarios.remove({ 'Usuario.Nombre': nombre}).exec();
}
module.exports = bd;
