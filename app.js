var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/*-----------------------*/

const mongoose = require('mongoose');
const session = require('express-session');
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true
}));

const { exec } = require('child_process'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  const success = req.query.success === 'true';
  res.render('index', { success });

 // res.render('index');
});


const { MongoClient } = require('mongodb');


// Configuración de la conexión a MongoDB
const uri = 'mongodb://mongo:PIWMwSqbh2bO4LFKaa65@containers-us-west-204.railway.app:7084';
//const uri = 'mongodb://mongo:PIWMwSqbh2bO4LFKaa65@containers-us-west-204.railway.app:7084';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
}

connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', async (req, res) => {
  const {
    nombre,
    acompanado,
    nombreA,
    plazaBus,
    cantidadPlazaBus,
    alergia,
    alergiaAlimento,
    Menu,
    tipoMenu
  } = req.body;

  console.log('-----------------------------')
  console.log(req.body)
  console.log('-----------------------------')


  const formularioData = {
    nombre,
    acompanado,
    nombreA,
    plazaBus,
    cantidadPlazaBus: parseInt(cantidadPlazaBus),
    alergia,
    alergiaAlimento,
    Menu,
    tipoMenu
  };

  try {
    const db = client.db('laurayjavi');
    const formularioCollection = db.collection('formulario');

    await formularioCollection.insertOne(formularioData);

    console.log(formularioData); // Antes de desestructurar los valores


    console.log('Registro insertado correctamente en MongoDB');
    res.redirect('/?success=true');
  } catch (error) {
    console.error('Error al guardar el registro en MongoDB:', error);
    res.status(500).send('Error al enviar el formulario');
  }
});




/*app.post('/submit', (req, res) => {
  const { nombre, acompanado, nombreAcompanado, plazaBus, cantidadPlazaBus, alergia, alergiaAlimento, Menu, tipoMenu } = req.body;

  const phpScript = `php public/php/insert.php "${nombre}" "${acompanado}" "${nombreAcompanado}" "${plazaBus}" "${cantidadPlazaBus}" "${alergia}" "${alergiaAlimento}" "${Menu}" "${tipoMenu}"`;

 // const phpScript = `"C:\\xampp\\\install\\php.exe" ${path.join(__dirname, 'public/php/insert.php')} "${nombre}" "${acompanado}" "${nombreA}" "${acompanadoNinos}" "${cantidadninos}" "${plazaBus}" "${cantidadPlazaBus}" "${alergia}" "${alergiaAlimento}" "${Menu}" "${tipoMenu}"`;
  exec(phpScript, (error, stdout, stderr) => {
    if (error) {
      console.error('Error al ejecutar el script PHP:', error);
      res.status(500).send('Error al enviar el formulario');
    } else {
      console.log('Registro insertado correctamente');
      res.redirect('/?success=true');
    }
  });
});*/



/*-----------------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
