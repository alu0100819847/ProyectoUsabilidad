// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var Schema = mongoose.Schema({


  Usuario               : {
    Email               : String, //Identificador
    Nombre              : String,
    Password            : String,
  },
  Horario               : {
      Day               : Date,
      Email             : String,   //Identificador
      Asunto            : String
  }
/*
    local               : {
        email           : String,
        name            : String,
        password        : String,
        rol             : Number
    },
    social              : {
        name            : String,
        someID          : String
    },
    registo             : {
        name            : String,
        date            : Date
    },
    timeline            : {
        id              : String,
        titulo          : String,
        nombreDestino   : String,
        nombreEmisor    : String,
        fi              : Date,
        ff              : Date,
        fm              : Date,
        contenido       : String

    }
*/
});

// create the model for users and expose it to our app
module.exports =  Schema;
