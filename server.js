const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });
let clients = new Map();

console.log(`🟢 Servidor WebSocket iniciado em ws://localhost:${PORT}`);

wss.on('connection', function connection(ws) {
  const id = Date.now(); // ID simples
  clients.set(ws, id);
  console.log(`✅ Cliente conectado. ID: ${id}`);

  ws.on('message', function incoming(message) {
    console.log(`📨 Mensagem recebida de ${id}:`, message.toString());

    let data;
    try {
      data = JSON.parse(message);
    } catch (err) {
      console.error("❌ Erro ao fazer parse do JSON:", err);
      return;
    }

    data.id = id;

    // Enviar para todos os outros clientes
    for (let [client, clientId] of clients.entries()) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`🔌 Cliente desconectado. ID: ${id}`);
  });
});
