import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, { root: process.cwd()});

fastify.get('/', function (req, reply) {
  return reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.listen({port: 3000}, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
