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

const main = document.querySelector('main');
const nav = main.querySelector('nav');
const pane = main.querySelector('section');
const nodeTreeData = getNodeTreeData();
const nodeTree = getNodeTree(nodeTreeData);

nav.addEventListener('click', handleNavClick);
pane.addEventListener('click', handlePaneClick);
nav.appendChild(nodeTree);

function handleNavClick(e) {
  e.preventDefault();
  const node = e.target.closest('li');

  setSelectedNode(node);

  if (getIsFolder(node)) {
    const currentPaneChildNodes = pane.querySelector('ul');
    const childNodes = node.querySelector('ul');
    let clonedChildNodes;

    // Update folder tree nodes
    toggleIsHidden(node);

    // Update pane nodes
    clonedChildNodes = childNodes.cloneNode(true);
    if (currentPaneChildNodes) {
      currentPaneChildNodes.replaceWith(clonedChildNodes);
    } else {
      pane.appendChild(clonedChildNodes);
    }
  }
}

function handlePaneClick(e) {
  e.preventDefault();
  const currentPaneChildNodes = pane.querySelector('ul');
  const node = e.target.closest('li');
  const childNodes = getClonedChildNodesFromFolderTree(node.dataset.name);

  setSelectedNode(node);

  if (getIsFolder(node)) {
    // Update pane nodes
    currentPaneChildNodes.replaceWith(childNodes);
  }
}

function getNode(nodeData) {
  const node = document.createElement('li');
  const icon = document.createElement('i');
  const name = document.createElement('span');
  const nameText = nodeData.name;
  let iconAndName;


  name.innerText = nameText;

  node.dataset.name = nameText;
  node.classList.add(nodeData.type);
  if (nodeData.type === 'folder') {
    icon.classList.add('gg-folder-add');
  } else {
    icon.classList.add('gg-file-document');
  }

  iconAndName = document.createElement('div');
  iconAndName.append(icon);
  iconAndName.appendChild(name);
  node.appendChild(iconAndName);

  if (nodeData.children && nodeData.children.length > 0) {
    const nodeChildren = document.createElement('ul');
    nodeChildren.classList.add('hidden');

    nodeData.children.map((childNode) => {
      const nodeChildEl = getNode(childNode);
      nodeChildren.appendChild(nodeChildEl);
    });

    node.appendChild(nodeChildren);
  }

  return node;
}

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

function getNodeTree(nodeTreeData) {
  const nodeTree = document.createElement('ul');
  nodeTreeData.map((node) => {
    nodeTree.appendChild(getNode(node));
  });
  return nodeTree;
}

function getClonedChildNodesFromFolderTree(folderName) {
  const folderTree = document.querySelector('nav');
  const folderTreeNode = folderTree.querySelector(
    `li[data-name="${folderName}"]`
  );
  const childNodes = folderTreeNode.querySelector('ul');
  return childNodes.cloneNode(true);
}

function getIsFolder(node) {
  return node.classList.contains('folder');
}

function toggleIsHidden(node) {
  const icon = node.querySelector('i');
  const childNodes = node.querySelector('ul');

  if (childNodes.classList.contains('hidden')) {
    icon.classList.remove('gg-folder-add');
    icon.classList.add('gg-folder-remove');
    childNodes.classList.remove('hidden');
  } else {
    icon.classList.remove('gg-folder-remove');
    icon.classList.add('gg-folder-add');
    childNodes.classList.add('hidden');
  }
}

function setSelectedNode(node) {
  main.querySelectorAll('li').forEach((_node) => {
    _node.classList.remove('selected');
    if (_node.dataset.name === node.dataset.name) {
      _node.classList.add('selected');
    }
  });
  node.classList.add('selected');
}
