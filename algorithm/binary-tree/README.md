## 简介

> 算法-二叉树学习笔记。

## js 实现二叉树

```js
function Node(data = null, left = null, right = null) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.toString = function () {
    return this.data;
  };
}

function BST() {
  this.head = new Node();
}

BST.prototype.insert = function (sourceNode) {
  let first = this.head;
  if (first.data === null && first.left === null && first.right === null) {
    this.head = sourceNode;
  } else {
    while (true) {
      console.log(123, sourceNode.data, first.data);
      if (sourceNode.data > first.data) {
        /** 右节点 */
        if (first.right) {
          first = first.right;
        } else {
          first.right = sourceNode;
          break;
        }
      } else {
        /** 左节点 */
        if (first.left) {
          first = first.left;
        } else {
          first.left = sourceNode;
          break;
        }
      }
    }
  }
};

/** 前序: 根 -> 左 -> 右 */
BST.prototype.preOrder = function (node) {
  if (node) {
    console.log(node.toString());
    this.preOrder(node.left);
    this.preOrder(node.right);
  }
};

/** 中序: 左 -> 根 -> 右 */
BST.prototype.inOrder = function () {
  if (node) {
    this.inOrder(node.left);
    console.log(node.toString());
    this.inOrder(node.right);
  }
};

/** 后序: 左 -> 右 -> 根 */
BST.prototype.postOrder = function () {
  if (node) {
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.toString());
  }
};

/** 最大 */
BST.prototype.getMax = function () {
  let first = this.head;
  while (true) {
    if (first.right) {
      first = first.right;
    } else {
      return first.data;
    }
  }
};

/** 最小 */
BST.prototype.getMin = function () {
  let first = this.head;
  while (true) {
    if (first.left) {
      first = first.left;
    } else {
      return first.data;
    }
  }
};

var a = new Node(1);
var b = new Node(2);
var c = new Node(3);
var list = new BST();
list.insert(a);
list.insert(b);
list.insert(c);
console.log(list);
console.log(list.preOrder(list.head));
```

## 验证是否是 BST

- leetcode: https://leetcode.cn/problems/validate-binary-search-tree

```js
var isValidBST = function (root) {
  const stack = [];
  const inOrder = -Infinity;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.val <= inOrder) return false;
    inOrder = root.val;
    root = root.right;
  }
  return true;
};
```

## BST 最近公共祖先

- leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree

```js
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  if (p.val > root.val && q.val > root.val)
    return lowestCommonAncestor(root.right, p, q);
  if (p.val < root.val && q.val < root.val)
    return lowestCommonAncestor(root.left, p, q);
  return root;
};
```

## 普通树最近公共祖先

- leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree

```js
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  /** root 为 q 或为 p，代表找到了 */
  if (root === p || root === q) return root;
  /** root 即不为 q 也不为 p */
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (!left) return right;
  if (!right) return left;
  /** left 和 right 均不为 null，则 left 和 right 是 root 左右子树 */
  return root;
};
```

## 二叉树最大深度

- leetcode: https://leetcode.cn/problems/maximum-depth-of-binary-tree

```js
var maxDepth = function (root) {
  return _dfs(root);
};

/** 深度优先 */
function _dfs(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  return Math.max(left, right) + 1;
}

/** 广度优先 */
function _bfs(root) {
  let level = 0;
  const queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    level++;
    const len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    queue.splice(0, len);
  }
  return level;
}
```

## 二叉树最小深度

- leetcode: https://leetcode.cn/problems/minimum-depth-of-binary-tree

```js
var minDepth = function (root) {
  return _bfs(root);
};
/** 深度优先 */
function _dfs(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  /** 左节点没有，但是右节点还有，树还没断 */
  if (!root.left) return right + 1;
  /** 右节点没有，但是左节点还有，树还没断 */
  if (!root.right) return left + 1;
  return Math.min(left, right) + 1;
}
/** 广度优先 */
function _bfs(root) {
  let level = 0;
  const queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    level++;
    const len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (!node.left && !node.right) return level;
    }
    queue.splice(0, len);
  }
  return level;
}
```

## 二叉树按照 level 输出

- leetcode: https://leetcode.cn/problems/binary-tree-level-order-traversal

```js
var levelOrder = function (root) {
  if (!root) return [];
  const result = _dfs(root, [], 0);
  return result;
};
function _dfs(root, result = [], level = 0) {
  if (!root) return;
  if (!result[level]) result[level] = [];
  result[level].push(root.val);
  _dfs(root.left, result, level + 1);
  _dfs(root.right, result, level + 1);
  return result;
}

function _bfs(root) {
  let levelRes = [];
  const queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    const len = queue.length;
    const current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    queue.splice(0, len);
    levelRes.push(current);
  }
  return levelRes;
}
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
