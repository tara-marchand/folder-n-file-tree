function handleNavClick(e) {
  e.preventDefault();
  const node = e.target.closest('li');

  setSelectedNode(node);

  if (getIsFolder(node)) {
    const pane = document.querySelector('section');
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
  const currentPaneChildNodes = pane.querySelectorAll('.children').item(0);
  const node = e.target.closest('li');
  const childNodes = getClonedChildNodesFromFolderTree(node.dataset.name);

  setSelectedNode(node);

  if (childNodes && getIsFolder(node)) {
    // Update pane nodes
    currentPaneChildNodes.replaceWith(childNodes);
  }
}

function getNode(nodeData) {
  const node = document.createElement('li');

  const colContainer = document.createElement('div');
  colContainer.classList.add('columns');

  // Icon and name column
  const nameCol = document.createElement('div')
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

  colContainer.appendChild(nameCol);

  // Date column
  const dateCol = document.createElement('div');
  dateCol.classList.add('column-date');
  
  const date = new Date(nodeData.modified);
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  dateCol.innerHTML = `${month}/${day}/${year}`;

  colContainer.appendChild(dateCol);

  // File size column
  const sizeCol = document.createElement('div');
  sizeCol.classList.add('column-size');
  if (nodeData.size !== null) {
    sizeCol.innerHTML = nodeData.size;
  }

  colContainer.appendChild(sizeCol);
  node.append(colContainer);

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
  const folderTree = document.querySelector('nav');
  const folderTreeNode = folderTree.querySelector(
    `li[data-name="${folderName}"]`
  );
  const childNodes = folderTreeNode.querySelector('ul');

  if (childNodes) {
    return childNodes.cloneNode(true);
  }
  return null;
}

function getIsFolder(node) {
  return !!(node.classList && node.classList.contains('folder'));
}

function toggleIsHidden(node) {
  const icon = node.querySelector('i');
  const childNodes = node.querySelector('ul');

  if (!childNodes) {
    return;
  }

  if (childNodes.classList.contains('hidden')) {
    if (icon) {
      icon.classList.remove('gg-folder-add');
      icon.classList.add('gg-folder-remove');
    }
    childNodes.classList.remove('hidden');
  } else {
    if (icon) {
      icon.classList.remove('gg-folder-remove');
      icon.classList.add('gg-folder-add');
    }
    childNodes.classList.add('hidden');
  }
}

function setSelectedNode(node) {
  document
    .querySelector('main')
    .querySelectorAll('li')
    .forEach((_node) => {
      _node.classList.remove('selected');
      if (_node.dataset.name === node.dataset.name) {
        _node.classList.add('selected');
      }
    });
  node.classList.add('selected');
}

export {
  fetchNodeTreeData,
  getIsFolder,
  getNode,
  getNodeTree,
  handleNavClick,
  handlePaneClick,
  toggleIsHidden
};
