import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';

// ITreeNode
class NodeData {
  constructor(type, name, modified, size, children) {
    this.type = type; // 'file' | 'folder'
    this.name = name; // string;
    this.modified = modified; // Date
    this.size = size; // number
    this.children = children; // ITreeNode[]
  }

  getType = () => this.type;
  getName = () => this.name;
  getModified = () => this.modified;
  getSize = () => this.size;
  getChildren = () => this.children;

  setType = (type) => (this.type = type);
  setName = (name) => (this.name = name);
  setModified = (modified) => (this.modified = modified);
  setSize = (size) => (this.size = size);
  setChildren = (children) => (this.children = children);
}

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, { root: process.cwd()});

fastify.get('/', function (req, reply) {
  return reply.sendFile('index.html');
});

fastify.get('/data', function (req, reply) {
  return reply.code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(getNodeTreeData());
});

fastify.listen({port: 3000}, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});


function getNodeTreeData() {
  const file111 = new NodeData('file', 'file111', new Date());
  const file112 = new NodeData('file', 'file112', new Date());
  const folder11 = new NodeData('folder', 'folder11', new Date(), 0, [
    file111,
    file112,
  ]);
  const file11 = new NodeData('file', 'file11', new Date());
  const folder1 = new NodeData('folder', 'folder1', new Date(), 3, [
    folder11,
    file11,
  ]);

  const file21 = new NodeData('file', 'file21', new Date());
  const file22 = new NodeData('file', 'file22', new Date());
  const folder2 = new NodeData('folder', 'folder2', new Date(), 2, [
    file21,
    file22,
  ]);

  return [folder1, folder2];
}
