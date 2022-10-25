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
  return _helper(root, -Infinity, Infinity);
};

var _helper = function (root, lower, higher) {
  if (!root) return true;
  if (root.val <= lower || root.val >= higher) return false;
  return (
    _helper(root.left, lower, root.val) && _helper(root.right, root.val, higher)
  );
};
```

## 最近公共祖先

- leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree

```js
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  return root;
};
```

## 最近公共祖先 II

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

## 最大深度

- leetcode: https://leetcode.cn/problems/maximum-depth-of-binary-tree

```js
var maxDepth = function (root) {
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  let level = 0;
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

/** 深度优先 */
function _dfs(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  return Math.max(left, right) + 1;
}
```

## 最小深度

- leetcode: https://leetcode.cn/problems/minimum-depth-of-binary-tree

```js
var minDepth = function (root) {
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  let level = 0;
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
```

## 最大宽度

- leetcode: https://leetcode.cn/problems/maximum-width-of-binary-tree/

```js
var widthOfBinaryTree = function (root) {
  const queue = [];
  if (root) queue.push([root, 1]);
  let max = -Infinity;
  /** 包含 index 的遍历 */
  while (queue.length) {
    const len = queue.length;
    let current = [];
    for (let i = 0; i < len; i += 1) {
      const [node, index] = queue[i];
      current.push(index);
      /** 在JS中最大安全整数是2的53次方减1. */
      if (node.left)
        queue.push([node.left, (index * 2) % Number.MAX_SAFE_INTEGER]);
      if (node.right)
        queue.push([node.right, (index * 2 + 1) % Number.MAX_SAFE_INTEGER]);
    }
    max = Math.max(current[current.length - 1] - current[0] + 1, max);
    queue.splice(0, len);
  }
  return max;
};
```

## 最大直径

- leetcode: https://leetcode.cn/problems/diameter-of-binary-tree/

```js
var diameterOfBinaryTree = function (root) {
  var _helper = function (node) {
    if (!node) return 0;
    let left = _helper(node.left);
    let right = _helper(node.right);
    /** 左右子树和最大为当前节点的路径长度 */
    height = Math.max(left + right, height);
    return Math.max(left, right) + 1;
  };
  let height = 0;
  _helper(root);
  return height;
};
```

## 遍历-层序

- leetcode: https://leetcode.cn/problems/binary-tree-level-order-traversal
- leetcode: https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/

```js
var levelOrder = function (root) {
  if (!root) return [];
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  const results = [];
  while (queue.length) {
    const current = [];
    const len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    results.push(current);
    queue.splice(0, len);
  }
  return results;
}

/** 深度优先 */
function _dfs(root, result = [], level = 0) {
  if (!root) return;
  if (!result[level]) result[level] = [];
  result[level].push(root.val);
  _dfs(root.left, result, level + 1);
  _dfs(root.right, result, level + 1);
  return result;
}
```

## 遍历-锯齿

- leetcode: https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/

```js
var zigzagLevelOrder = function (root) {
  if (!root) return [];
  return _bfs(root);
};

/** 广度优先 */
function _bfs(root) {
  const queue = [];
  if (root) queue.push(root);
  const results = [];
  let isLeftToRight = true;
  while (queue.length) {
    const len = queue.length;
    const current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    results.push(isLeftToRight ? current : current.reverse());
    isLeftToRight = !isLeftToRight;
    queue.splice(0, len);
  }
  return results;
}
```

## 遍历-前序

- leetcode: https://leetcode.cn/problems/binary-tree-preorder-traversal/

```js
var preorderTraversal = function (root) {
  let results = [];
  _helper(root, results);
  return results;
};

var _helper = function (root, results) {
  if (!root) return;
  results.push(root.val);
  _helper(root.left, results);
  _helper(root.right, results);
};
```

## 遍历-中序

- leetcode: https://leetcode.cn/problems/binary-tree-inorder-traversal/

```js
var inorderTraversal = function (root) {
  const results = [];
  _helper(root, results);
  return results;
};

var _helper = function (root, results) {
  if (!root) return;
  _helper(root.left, results);
  results.push(root.val);
  _helper(root.right, results);
};
```

## 遍历-后序

- leetcode: https://leetcode.cn/problems/binary-tree-postorder-traversal/

```js
var postorderTraversal = function (root) {
  let results = [];
  _helper(root, results);
  return results;
};

var _helper = function (root, results) {
  if (!root) return;
  _helper(root.left, results);
  _helper(root.right, results);
  results.push(root.val);
};
```

## 前序 + 中序 => BST

- leetcode: https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
- leetcode: https://leetcode.cn/problems/zhong-jian-er-cha-shu-lcof/

```js
var buildTree = function (preorder, inorder) {
  if (!preorder.length && !inorder.length) return null;
  const root = new TreeNode(preorder[0]);
  const midIndex = inorder.indexOf(preorder[0]);
  root.left = buildTree(
    preorder.slice(1, midIndex + 1),
    inorder.slice(0, midIndex)
  );
  root.right = buildTree(
    preorder.slice(midIndex + 1),
    inorder.slice(midIndex + 1)
  );
  return root;
};
```

## 平衡二叉树

- leetcode: https://leetcode.cn/problems/balanced-binary-tree/

```js
var isBalanced = function (root) {
  if (!root) return true;
  const currentIsRight =
    Math.abs(_helper(root.left) - _helper(root.right)) <= 1;
  const childIsRight = isBalanced(root.left) && isBalanced(right);
  return currentIsRight && childIsRight;
};

var _helper = function (root) {
  if (!root) return 0;
  const left = _helper(root.left);
  const right = _helper(root.right);
  return Math.max(left, right) + 1;
};
```

## 对称二叉树

- leetcode: https://leetcode.cn/problems/symmetric-tree/

```js
var isSymmetric = function (root) {
  const queue = [];
  if (root) queue.push(root);
  /** 包含 null 的遍历 */
  while (queue.find((i) => i)) {
    const len = queue.length;
    let current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      current.push(node?.val);
      if (node === null) {
        queue.push(null);
        queue.push(null);
      } else {
        if (node.left) queue.push(node.left);
        else queue.push(null);
        if (node.right) queue.push(node.right);
        else queue.push(null);
      }
    }
    const n = Math.floor(current.length / 2);
    for (let i = 0; i < n; i += 1) {
      const a = current[i];
      const b = current[2 * n - i - 1];
      if (a !== b) return false;
    }
    queue.splice(0, len);
  }
  return true;
};
```

## 完全二叉树

- leetcode: https://leetcode.cn/problems/check-completeness-of-a-binary-tree/
- leetcode: https://leetcode.cn/problems/count-complete-tree-nodes/submissions/

```js
var isCompleteTree = function (root) {
  const queue = [];
  if (root) queue.push([root, 1]);
  let results = [];
  /** 包含 index 的遍历 */
  while (queue.length) {
    const current = [];
    let len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const [node, index] = queue[i];
      current.push(index);
      if (node.left)
        queue.push([node.left, (2 * index) % Number.MAX_SAFE_INTEGER]);
      if (node.right)
        queue.push([node.right, (2 * index + 1) % Number.MAX_SAFE_INTEGER]);
    }
    results = results.concat(current);
    queue.splice(0, len);
  }
  return results.length === results[results.length - 1];
};
```

## 翻转二叉树

- leetcode: https://leetcode.cn/problems/invert-binary-tree/
- leetcode: https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/

```js
var invertTree = function (root) {
  return swap(root);
};

var swap = function (root) {
  if (!root) return null;
  var { left, right } = root;
  root.left = right;
  root.right = left;
  swap(root.left);
  swap(root.right);
  return root;
};
```

## 二叉树改为链表

- leetcode: https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/

```js
var flatten = function (root) {
  let results = [];
  _helper(root, results);
  if (!results.length) return null;
  for (let i = 0, len = results.length; i < len - 1; i += 1) {
    const current = results[i];
    current.left = null;
    current.right = results[i + 1];
  }
  return results[0];
};

var _helper = function (root, results) {
  if (!root) return;
  results.push(root);
  _helper(root.left, results);
  _helper(root.right, results);
};
```

## 第 K 大元素

- leetcode: https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/

```js
var kthLargest = function (root, k) {
  let results = [];
  _helper(root, results);
  return results[results.length - k];
};

var _helper = function (root, results) {
  if (!root) return;
  _helper(root.left, results);
  results.push(root.val);
  _helper(root.right, results);
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
