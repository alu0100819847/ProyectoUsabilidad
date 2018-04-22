var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bd = require('./server/session.js')
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/UyA2018', function(error){
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});


app.use(express.static(__dirname + '/cliente'));

app.get('/',function(req, res) {
    res.sendFile('cliente/index.html');
});

app.get('/LogIn-Out',function(req, res) {
    res.sendFile(path.join(__dirname, 'cliente/Form.html'));
});

app.post('/Registrar', function(req, res) {
  console.log("Nombre: "+req.body.form_user);
  console.log("Nombre: "+req.body.form_email);
  console.log("Nombre: "+req.body.form_password);

  bd.registrar(req.body.form_user, req.body.form_email, req.body.form_password)

  bd.remove("adios");
  bd.print();
    res.sendFile(path.join(__dirname, 'cliente/Form.html'));
});


var server = app.listen( process.env.PORT || 8080, ()=> {
var host = server.address().address
var port = server.address().port
console.log('Conectado a: http://%s:%s', host, port);
})
