var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var bd = require('./server/session.js');
var schema = require('./server/schema.js');
var bcrypt   = require('bcrypt-nodejs');

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/UyA2018', function(error){
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});

app.use(session({
    secret: 'example',
    resave: true,
    saveUninitialized: true
}));

var Usuarios = mongoose.model('UyA2018', schema);

var auth = function(req, res, next) {
  console.log("autentificando")
  Usuarios.findOne({"Usuario.Email": req.session.identificador}, function (err, result) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      if (result != null) {
        if (req.session) {
          return next();
        } else {
          return res.sendStatus(401);
        }
      } else {
        return res.sendStatus(401);
      }
    }
  })
};


app.use(express.static(__dirname + '/cliente'));

app.get('/',function(req, res) {
    res.sendFile('cliente/index.html');
});

app.get('/LogIn-Out',function(req, res) {
    res.sendFile(path.join(__dirname, 'cliente/Form.html'));
});

app.get('/content',auth,function(req, res) {
    res.sendFile(path.join(__dirname, 'cliente/Content.html'));
});

app.post('/LogIn', function(req, res) {
  console.log("Pintando:")
  bd.print();
  console.log("-----");
  console.log(req.body);
  if(!req.body.log_form_email || !req.body.log_form_pass){
    console.log("Campos vacios");
    res.sendFile(path.join(__dirname, 'cliente/Form.html'));
  } else {
    console.log("pio")
    Usuarios.findOne({'Usuario.Email': req.body.log_form_email}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result != null) {
          console.log("El result: "+result);
          console.log("Entrada: "+bcrypt.hashSync(req.body.log_form_pass) + " BD: "+ result.Usuario.Password)
          if (result.Usuario.Email == req.body.log_form_email && bcrypt.compareSync(req.body.log_form_pass, result.Usuario.Password)) {
            console.log("El result: "+result);
            req.session.user = result.Usuario.Nombre;
            req.session.identificador = result.Usuario.Email;
            req.session.admin = true;

            console.log("Usuario correcto");
            res.redirect('/content')
          } else {
            console.log("Contraseña incorrecta");
          }
          }
         else {
           console.log("Usuario Incorrecto")
        }
      }
    })
  }

})


app.post('/Registrar', function(req, res) {
  console.log("Nombre: "+req.body.form_user);
  console.log("Nombre: "+req.body.form_email);
  console.log("Nombre: "+req.body.form_password);

  if(!req.body.form_email || !req.body.form_password){
    console.log("Campos vacios");
    res.sendFile(path.join(__dirname, 'cliente/Form.html'));
  } else {
    bd.registrar(req.body.form_user, req.body.form_email, req.body.form_password)

    Usuarios.findOne({'Usuario.Email': req.body.form_email}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result != null) {
          if (result.Usuario.Email == req.body.form_email && bcrypt.compareSync(req.body.form_pass, result.Usuario.Password)) {
            req.session.user = result.Usuario.Nombre;
            req.session.identificador = result.Usuario.Email;
            req.session.admin = true;

            console.log("Usuario correcto");
            res.redirect('/content')
            }
          }
         else {
           res.redirect('/LogIn-Out')
           console.log("Usuario Incorrecto")
        }
      }
    })
  }
  bd.print();


});


var server = app.listen( process.env.PORT || 8080, ()=> {
var host = server.address().address
var port = server.address().port
console.log('Conectado a: http://%s:%s', host, port);
})
