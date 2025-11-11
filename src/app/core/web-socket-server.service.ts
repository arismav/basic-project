// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let grid = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 40 }
];

// Function to broadcast data
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// When client connects, send initial state
wss.on('connection', ws => {
  ws.send(JSON.stringify({ type: 'GRID_UPDATE', payload: grid }));
});

// Random update every 2 seconds
setInterval(() => {
  const index = Math.floor(Math.random() * grid.length);
  grid[index].value = Math.floor(Math.random() * 100);

  broadcast({
    type: 'GRID_UPDATE',
    payload: [...grid]
  });

  console.log("Updated grid:", grid);
}, 2000);

console.log("WebSocket server running on ws://localhost:8080");
