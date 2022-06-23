const selectedNodeNameStr = 'selected-node-name';
const selectedNodeDataAttribute = `data-${selectedNodeNameStr}`;

function getMain() {
  return document.querySelector('main');
}

function getNav() {
  return document.querySelector('nav');
}

function getPane() {
  return document.querySelector('section');
}

function getPaneContent() {
  return getPane().querySelector('.content');
}

function getNodeFromClickEvent(e) {
  return e.target.closest('li');
}

function handleNavClick(e) {
  e.preventDefault();
  const paneContent = getPaneContent();
  const node = getNodeFromClickEvent(e);
  const childNodes = node.querySelector('ul');
  let clonedChildNodes;

  if (childNodes) {
    clonedChildNodes = childNodes.cloneNode(true);
    clonedChildNodes.classList.remove('hidden');

    if (childNodes.classList.contains('hidden')) {
      showChildNodes(childNodes, node.querySelector('i'));
    } else {
      hideChildNodes(childNodes, node.querySelector('i'));
    }

    paneContent.replaceChildren(clonedChildNodes);
  } else {
    if (getIsFolder(node)) {
      paneContent.replaceChildren(getFolderDetails());
    } else if (getIsFile(node)) {
      paneContent.replaceChildren(getFileDetails());
    }
  }
  setSelectedNode(node);
}

function handlePaneClick(e) {
  e.preventDefault();
  const paneContent = getPaneContent();
  const node = getNodeFromClickEvent(e);
  const isNodeAlreadySelected = getSelectedNodeName() === node.dataset.name;

  if (getIsFolder(node)) {
    if (!isNodeAlreadySelected) {
      setSelectedNode(node);
    }

    const clonedChildNodes = getClonedChildNodesFromFolderTree(
      node.dataset.name
    );
    if (clonedChildNodes) {
      clonedChildNodes.classList.remove('hidden');
      paneContent.replaceChildren(clonedChildNodes);
    } else {
      paneContent.replaceChildren(getFolderDetails());
    }
  }
}

function getFolderDetails(node) {
  const folderDetails = document.createElement('div');

  folderDetails.classList.add('folder-details');
  folderDetails.innerText = 'Folder details!';
  return folderDetails;
}

function getFileDetails(node) {
  const fileDetails = document.createElement('div');

  fileDetails.classList.add('file-details');
  fileDetails.innerText = 'File details!';
  return fileDetails;
}

function getNode(nodeData) {
  const node = document.createElement('li');
  const {node: _node, columns} = getPaneColumns(nodeData, node);
  node.append(columns);

  if (nodeData.children && nodeData.children.length > 0) {
    const nodeChildren = document.createElement('ul');
    nodeChildren.classList.add('children');
    nodeChildren.classList.add('hidden');

    nodeData.children.map((childNode) => {
      const nodeChildEl = getNode(childNode);
      nodeChildren.appendChild(nodeChildEl);
    });

    node.appendChild(nodeChildren);
  }

  return node;
}

function getPaneColumns(nodeData, node) {
  const columns = document.createElement('div');
  columns.classList.add('columns');

  // Icon and name column
  const nameCol = document.createElement('div');
  nameCol.classList.add('column-name');
  const icon = document.createElement('i');
  const name = document.createElement('span');
  const nameText = nodeData.name;

  name.innerText = nameText;
  node.dataset.name = nameText;
  node.classList.add(nodeData.type);

  if (nodeData.type === 'folder') {
    icon.classList.add('gg-folder-add');
  } else {
    icon.classList.add('gg-file-document');
  }

  nameCol.append(icon);
  nameCol.appendChild(name);

  columns.appendChild(nameCol);

  // Date column
  const dateCol = document.createElement('div');
  dateCol.classList.add('column-date');

  const date = new Date(nodeData.modified);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  dateCol.innerHTML = `${month}/${day}/${year}`;

  columns.appendChild(dateCol);

  // File size column
  const sizeCol = document.createElement('div');
  sizeCol.classList.add('column-size');
  if (nodeData.size !== null) {
    sizeCol.innerHTML = nodeData.size;
  }

  columns.appendChild(sizeCol);
  return {columns, node};
}

async function fetchNodeTreeData() {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
}

function getNodeTree(nodeTreeData) {
  const nodeTree = document.createElement('ul');

  nodeTreeData.map((node) => {
    nodeTree.appendChild(getNode(node));
  });

  return nodeTree;
}

function getClonedChildNodesFromFolderTree(folderName) {
  const nav = getNav();
  const navNode = nav.querySelector(`li[data-name="${folderName}"]`);
  const childNodes = navNode.querySelector('ul');

  if (childNodes) {
    return childNodes.cloneNode(true);
  }
  return null;
}

function getIsFolder(node) {
  return !!(node.classList && node.classList.contains('folder'));
}

function getIsFile(node) {
  return !!(node.classList && node.classList.contains('file'));
}

function showChildNodes(childNodes, icon) {
  if (icon) {
    icon.classList.remove('gg-folder-add');
    icon.classList.add('gg-folder-remove');
  }
  childNodes.classList.remove('hidden');
}

function hideChildNodes(childNodes, icon) {
  if (icon) {
    icon.classList.remove('gg-folder-remove');
    icon.classList.add('gg-folder-add');
  }
  childNodes.classList.add('hidden');
}

function setSelectedNode(node) {
  const main = getMain();

  // Store selected node name
  main.setAttribute(selectedNodeDataAttribute, node.dataset.name);

  // Set selected styles
  main.querySelectorAll('li').forEach((_node) => {
    if (_node.dataset.name !== node.dataset.name) {
      _node.classList.remove('selected');
    } else {
      _node.classList.add('selected');
    }
  });
}

function getSelectedNodeName() {
  return getMain().dataset.selectedNodeName;
}

export {
  fetchNodeTreeData,
  getIsFolder,
  getNode,
  getNodeTree,
  handleNavClick,
  handlePaneClick,
};
