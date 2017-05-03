// importa o modulo doflamework espress
var express = require('express');

// importa o modulo do consign
var consign = require('consign');

// importar o body-parser
var bodyParser = require('body-parser');

// importa o modole express-validator
var expressValidator = require('express-validator');

// iniciando o modole express

var app = express();

// setar as variavel view engine e views do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// configura o middleware express.static
  app.use(express.static('./app/public'));
// confgurar o middleware body-parser
  app.use(bodyParser.urlencoded({extended:true}))

// configurar o middleware express-validator
  app.use(expressValidator());

// configurar o middleware consign para fazer os auto loads
  consign().include('app/routes')
         .then('app/models')
         .then('app/controllers')
         .into(app);



// exporta o objeto app
module.exports = app
