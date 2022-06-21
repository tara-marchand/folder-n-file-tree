import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

import NodeData from './NodeData.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {root: process.cwd()});

fastify.get('/', function (req, reply) {
  return reply.sendFile('index.html');
});

fastify.get('/data', function (_req, reply) {
  const nodeTreeData = getNodeTreeData();
  return reply.send(JSON.stringify(nodeTreeData));
});

fastify.listen({port: 3000}, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

function getNodeTreeData() {
  const file111 = new NodeData('file', 'file111', new Date(), '10 KB');
  const file112 = new NodeData('file', 'file112', new Date(), '15 KB');
  const folder11 = new NodeData('folder', 'folder11', new Date(), null, [
    file111,
    file112,
  ]);
  const file11 = new NodeData('file', 'file11', new Date(), '22 KB');
  const folder1 = new NodeData('folder', 'folder1', new Date(), null, [
    folder11,
    file11,
  ]);

  const file21 = new NodeData('file', 'file21', new Date(), '10 KB');
  const file22 = new NodeData('file', 'file22', new Date(), '105 KB');
  const folder2 = new NodeData('folder', 'folder2', new Date(), null, [
    file21,
    file22,
  ]);

  return [folder1, folder2];
}
