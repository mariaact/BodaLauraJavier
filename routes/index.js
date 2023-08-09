var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Formulario' });
});

router.post('/submit', (req, res) => {

  const formData = req.body;

  exec(
    `php ${path.join(__dirname, 'save.php')} ${formData.nombre} ${formData.acompanamiento} ${formData.plazaBus}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error ejecutando PHP: ${error}`);
        res.status(500).send('Error del servidor');
        return;
      }
      res.send('Datos guardados correctamente');
    }
  );
});


module.exports = router;
