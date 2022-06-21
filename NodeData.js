function NodeData(type, name, modified, size, children) {
  this.type = type; // 'file' | 'folder'
  this.name = name; // string;
  this.modified = modified; // Date
  this.size = size; // number
  this.children = children; // ITreeNode[]

  this.getType = () => this.type;
  this.getName = () => this.name;
  this.getModified = () => this.modified;
  this.getSize = () => this.size;
  this.getChildren = () => this.children;

  this.setType = (type) => (this.type = type);
  this.setName = (name) => (this.name = name);
  this.setModified = (modified) => (this.modified = modified);
  this.setSize = (size) => (this.size = size);
  this.setChildren = (children) => (this.children = children);

  return this;
};

// ITreeNode
module.exports = {
  NodeData
}
