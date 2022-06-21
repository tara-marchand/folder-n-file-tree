const { getIsFolder, getNode } = require('./browser.js');

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
});
