import { getIsFolder, getNode, toggleIsHidden } from './browser';

describe('browser', () => {
  describe('getIsFolder', () => {
    test('node type is `folder`', () => {
      const folderNode = getNode({
        type: 'folder',
        name: 'folder1',
        modified: '2022-06-21T18:28:12.345Z',
        size: 3,
        children: [],
      });
      expect(getIsFolder(folderNode)).toBe(true);
    })

    test('node type is `file`', () => {
      const fileNode = getNode({
        type: 'file',
        name: 'file1',
        modified: '2022-06-21T18:28:12.345Z',
      });
      expect(getIsFolder(fileNode)).toBe(false);
    });
  });

  describe('toggleIsHidden', () => {
    test('node is already hidden', () => {
      const folderNode = getNode({
        type: 'folder',
        name: 'folder',
        modified: '2022-06-21T18:28:12.345Z',
        size: 1,
        children: [
          {
            type: 'file',
            name: 'file',
            modified: '2022-06-21T18:28:12.345Z',
          },
        ],
      });

      const childNodes = folderNode.querySelector('ul');
      childNodes.classList.add('hidden');
      toggleIsHidden(folderNode)

      expect(childNodes.classList.contains('hidden')).not.toBe(true);
    })

    test('node is not hidden', () => {
      const folderNode = getNode({
        type: 'folder',
        name: 'folder',
        modified: '2022-06-21T18:28:12.345Z',
        size: 1,
        children: [
          {
            type: 'file',
            name: 'file',
            modified: '2022-06-21T18:28:12.345Z',
          },
        ],
      });

      const childNodes = folderNode.querySelector('ul');
      childNodes.classList.remove('hidden');
      toggleIsHidden(folderNode);

      expect(folderNode.querySelector('ul').classList.contains('hidden')).toBe(true);
    });
  })
});
