const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Servidor WebSocket está rodando no Render!');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado');

  ws.on('message', function incoming(message) {
    console.log('Mensagem recebida:', message);
    ws.send(`Eco: ${message}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`🟢 Servidor WebSocket escutando na porta ${PORT}`);
});
