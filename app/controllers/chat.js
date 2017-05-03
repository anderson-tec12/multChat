module.exports.chat = function(app, req, res){
  // pegando dados do formulario
  var dadosForm = req.body;

  // debugando
  console.log(dadosForm);

  // fazendo a validação dos dados
  req.assert('apelido','Digite um apelido para entra no chat').notEmpty();
  req.assert('apelido','No minimo 3 caracteres e no Maximo 15').len(3,15);

  // verificando se existe erros
  var erros = req.validationErrors();

  if(erros){
    res.render('index',{validacao:erros});
    return;
  }
// paraque esse emit funcione devemos passar a variavel io como global
  app.get('io').emit('msgParaCliente',{apelido:dadosForm.apelido, msg:' acabou de entrar no chat'});
  res.render('chat',{dadosForm : dadosForm});

}
