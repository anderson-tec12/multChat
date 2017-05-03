// importa as configurações do servidor
var app = require('./config/server');

// parametrizar a porta de esculta
var server = app.listen(3000, function(){
  console.log('Servidor Online');
})

var io = require('socket.io').listen(server);

// criando uma variavel global
  app.set('io',io);

// criar a conexao por websocket

// informar ao websocker que estamos escutando tentativas de conexao
  /* é um evento padrão que esculta a instancia do lado do cliente*/
io.on('connection', function(conexao){
  console.log('usuario conectou');

  conexao.on('disconnect', function(){
    console.log('usuario saiu');
  })

  conexao.on('msgParaServidor',function(dados){
  // exibe so para nos
    conexao.emit('msgParaCliente',
      {
        apelido: dados.apelido,
        msg:dados.mensagem
      });

  // exibe para todos conectados menos para nos
    conexao.broadcast.emit('msgParaCliente',
      {
        apelido: dados.apelido,
        msg:dados.mensagem
    });

    if(parseInt(dados.apelido_atualizado_nos_clientes) == 0 ){
        conexao.emit('participantesParaClientes',{apelido:dados.apelido});

        conexao.broadcast.emit('participantesParaClientes',{apelido:dados.apelido});
      }
  })
})
