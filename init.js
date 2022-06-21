const {
  fetchNodeTreeData,
  getNodeTree,
  handleNavClick,
  handlePaneClick,
} = require('./browser');

fetchNodeTreeData().then((nodeTreeData) => {
  const nodeTree = getNodeTree(nodeTreeData);
  const nav = document.querySelector('nav');
  const pane = document.querySelector('section');

  nav.addEventListener('click', handleNavClick);
  pane.addEventListener('click', handlePaneClick);
  nav.appendChild(nodeTree);
});
