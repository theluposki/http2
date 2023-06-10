import { createSecureServer } from 'node:http2';
import { readFileSync  } from 'node:fs';
import { routes } from './routes.js'

const server = createSecureServer({
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt')
});

await routes(server)

server.listen(3000, () => {
  console.log('Server listening on port https://localhost:3000');
});
