const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

setInterval(() => {
  const notif = {
    type: "NOTIFICATION",
    payload: {
      id: Date.now(),
      title: "New Event",
      message: "A new item was processed",
      timestamp: new Date().toISOString()
    }
  };

  broadcast(notif);
  console.log("Sent:", notif);

}, 3000);

console.log("WebSocket server running on ws://localhost:8080");
