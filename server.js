const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './admin.html'; // página padrão

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  if (extname === '.js') contentType = 'text/javascript';
  if (extname === '.css') contentType = 'text/css';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Página não encontrada');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado');

ws.on('message', function incoming(message) {
  console.log('Mensagem recebida:', message);

  // Reenvia para todos os outros clientes conectados
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});


  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`🟢 Servidor WebSocket escutando na porta ${PORT}`);
});
