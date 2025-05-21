const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PORT || 8080; // use porta do Render ou 8080 localmente

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Servidor WebSocket está rodando');
});

// Criar servidor WebSocket usando o HTTP
const wss = new WebSocket.Server({ server });

// Evento de conexão
wss.on('connection', (ws) => {
  console.log('🔌 Novo cliente conectado');

  ws.on('message', (message) => {
    console.log(`📨 Mensagem recebida: ${message}`);
    ws.send(`Você disse: ${message}`);
  });

  ws.on('close', () => {
    console.log('❌ Cliente desconectado');
  });
});

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`🟢 Servidor WebSocket iniciado na porta ${PORT}`);
});
