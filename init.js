import {
  fetchNodeTreeData,
  getNodeTree,
  handleNavClick,
  handlePaneClick,
} from './browser.js';

fetchNodeTreeData().then((nodeTreeData) => {
  const nodeTree = getNodeTree(nodeTreeData);
  const nav = document.querySelector('nav');
  const pane = document.querySelector('section');

  nav.addEventListener('click', handleNavClick);
  pane.addEventListener('click', handlePaneClick);
  nav.appendChild(nodeTree);
});
