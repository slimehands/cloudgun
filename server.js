import { Hono } from 'hono';
import { serve } from 'bun';
import Gun from 'gun';

// Create a Hono app
const app = new Hono();

// Optional: a root route
app.get('/', (c) => c.text('GUN server is running.'));

// Start HTTP server manually with Bun
const server = serve({
  port: parseInt(process.env.PORT || '8765'),
  fetch: app.fetch,
});

// Attach GUN to Bun's server
Gun({ web: server, file: 'data' });
console.log('GUN server running at http://localhost:8765');
