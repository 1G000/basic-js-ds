const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode == null) {
      this.rootNode = new Node(data);
    } else {
      let current = this.rootNode;
      while (current) {
        if (current.data === data) {
          break;
        }
        if (current.data < data) {
          if (current.right == null) {
            current.right = new Node(data);
            break;
          }
          current = current.right;
        } else {
          if (current.left == null) {
            current.left = new Node(data);
            break;
          }
          current = current.left;
        }
      }
    }
  }

  has(data) {
    return this.find(data) != null;
  }

  find(data) {
    let current = this.rootNode;
    while (current) {
      if (current.data === data) {
        return current;
      }
      if (current.data < data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  remove(data, node = this.rootNode) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else if (node.data < data) {
      node.right = this.remove(data, node.right);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }

      let minRightSubtree = node.right;
      while (minRightSubtree.left) {
        minRightSubtree = minRightSubtree.left;
      }
      node.data = minRightSubtree.data;

      node.right = this.remove(minRightSubtree.data, node.right);
      return node;
    }
  }

  min() {
    let current = this.rootNode;
    while (current) {
      if (current.left == null) {
        return current.data;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  max() {
    let current = this.rootNode;
    while (current) {
      if (current.right == null) {
        return current.data;
      } else {
        current = current.right;
      }
    }
    return null;
  }
}

module.exports = {
  BinarySearchTree,
};
