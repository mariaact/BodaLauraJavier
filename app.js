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

app.post('/submit', (req, res) => {
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
});



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
