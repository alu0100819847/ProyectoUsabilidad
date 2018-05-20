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

app.set('views', path.join(__dirname, 'cliente'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://user:pass@ds229690.mlab.com:29690/heroku_dtzjm7jz', function(error){
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
  console.log("Esta entrando: " +req.session.identificador);
  Usuarios.findOne({"Usuario.Email": req.session.identificador}, function (err, result) {
    console.log("Petición en la autenticacion"+result)
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      if (result != null) {
        if (req.session && req.session.identificador) {
          return next();
        } else {
          return res.redirect('/LogIn-Up')
        }
      } else {
        return res.redirect('/LogIn-Up')
      }
    }
  })
};


app.use(express.static(__dirname + '/cliente'));

app.get('/',function(req, res) {
    res.sendFile('cliente/index.html');
});

app.get('/LogIn-Up',function(req, res) {
    res.sendFile(path.join(__dirname, 'cliente/login.html'));
});

app.get('/Contacto',function(req, res) {
    res.sendFile(path.join(__dirname, 'cliente/contacto.html'));
});

app.get('/LogOut',function(req, res) {
    req.session.destroy();
    res.sendFile(path.join(__dirname, 'cliente/login.html'));
});

app.get('/content',auth,function(req, res) {
  Usuarios.find( {'Horario.Email': req.session.identificador }).sort({'Horario.Day': 1}).exec(function (err, result) {
    if (err) {
      console.log(err);
    } else {

      if (result != null) {
        var fecha = [];
        var asunto= [];
        for (var i = 0; i < result.length; i++){
          fecha[i] = ""+result[i].Horario.Day + "";
          asunto[i] = result[i].Horario.Asunto;
        }
        console.log("Buscando eventos: "+result)
        console.log("Esta es la fecha "+fecha)
        console.log("Este es el asunto "+ asunto)
        res.render('contenido', { Fechas: fecha, Asuntos: asunto })
        }
       else {
         res.render('contenido', { /*user: req.session.user, evento: result , Fechas: Fechas*/})
          console.log("No hay eventos.")
        }
      }
    })

    //res.sendFile(path.join(__dirname, 'cliente/contenido.html'));
});
app.post('/createEvent', auth, function(req, res){

if(req.session.identificador == "") res.redirect('/LogIn-Up');
  Usuarios.findOne({'Usuario.Email': req.session.identificador}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result == null) {
        console.log("Usuario inexistente");
        res.redirect('/LogOut');
        }
       else {
        console.log("Inserting event: "+req.body.form_asunto);
        console.log("the day: "+req.body.form_day);
        console.log("Email: "+ req.session.identificador);


        evento = new Usuarios({'Horario.Email': req.session.identificador,'Horario.Day': req.body.form_day, 'Horario.Asunto': req.body.form_asunto}, function (err, result) {
          if (err) return handleError(err);
        })

        evento.save (function (err) {
          if (err) console.log(err);;
        })

        res.send("OK!!!");
      }
    }
  })
  Usuarios.where('Usuario.Nombre', /.*/).exec( function(err, result){
    console.log("HOla: "+result);
  })
})

app.post('/LogIn', function(req, res) {
  console.log("Pintando:")
  bd.print();
  console.log("-----");
  console.log(req.body);
  if(!req.body.log_form_email || !req.body.log_form_pass){
    console.log("Campos vacios");
    res.sendFile(path.join(__dirname, 'cliente/login.html'));
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
            res.redirect('/LogIn-Up')
          }
          }
         else {
           console.log("Usuario Incorrecto")
           res.redirect('/LogIn-Up')
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
    res.sendFile(path.join(__dirname, 'cliente/login.html'));
  } else {
    bd.registrar(req.body.form_user, req.body.form_email, req.body.form_password)/*
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
            res.redirect('/LogIn-Up')
            }
          }
         else {
           res.redirect('/LogIn-Up')
        }
      }
    })*/
  }
  //bd.print();
  res.redirect('/LogIn-Up')

});


var server = app.listen( process.env.PORT || 8080, ()=> {
var host = server.address().address
var port = server.address().port
console.log("Fecha: "+new Date())
console.log('Conectado a: http://%s:%s', host, port);
})
