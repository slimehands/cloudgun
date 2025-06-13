import { Hono } from 'hono';
import { createServer } from 'http';
import Gun from 'gun';

// Create a Hono app
const app = new Hono();

app.get('/', (c) => c.text('Hono + GUN server is running.'));

// Create a fetch handler from Hono
const fetchHandler = app.fetch;

// Adapter: convert fetch requests into Node-style
const server = createServer(async (req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req : null,
  });

  const response = await fetchHandler(request);
  res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  res.end(await response.text());
});

// Attach GUN
Gun({ web: server, file: 'data' });

const PORT = process.env.PORT || 8765;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
