const { getIsFolder } = require('./browser.js');

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

test('getIsFolder', () => {
  const folderNode = new NodeData('folder', 'folder!', new Date(), 2, []);
  expect(getIsFolder(folderNode)).toBe(true);

  const fileNode = new NodeData('file', 'file!', new Date());
  expect(getIsFolder(folderNode)).toBe(false);
});
