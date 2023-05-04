## 简介

> 算法-二叉树学习笔记。

## js 实现二叉树

```js
function Node(val = null, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
  this.toString = function () {
    return this.val;
  };
}
class BST {
  constructor() {
    this.head = new Node();
  }
  insert(node) {
    if (!this.head.val && !this.head.left && !this.head.right) {
      this.head = node;
    } else {
      let head = this.head;
      while (head) {
        if (node.val > head.val) {
          /** 右节点 */
          if (head.right) {
            head = head.right;
          } else {
            head.right = node;
            break;
          }
        } else {
          /** 左节点 */
          if (head.left) {
            head = head.left;
          } else  {
            head.left = node;
            break;
          }
        }
      }
    }
  }
  /** 前序: 根 -> 左 -> 右 */
  preOrder(node) {
    if (!node) return;
    console.log(node.toString());
    this.preOrder(node.left);
    this.preOrder(node.right);
  }
  /** 后序: 左 -> 右 -> 根 */
  postOrder(node) {
    if (!node) return;
    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.toString());
  }
  /** 中序: 左 -> 根 -> 右 */
  inOrder (node) {
    if (!node) return;
    this.preOrder(node.left);
    console.log(node.toString());
    this.preOrder(node.right);
  }
  /** 最大 */
  getMax() {
    let head = this.head;
    while(head) {
      if (head.right) head = head.right;
      else break;
    }
    return head.val;
  }
  /** 最小 */
  getMin() {
    let head = this.head;
    while(head) {
      if (head.left) head = head.left;
      else break;
    }
    return head.val;
  }
}

var a = new Node(2);
var b = new Node(1);
var c = new Node(3);
var list = new BST();
list.insert(a);
list.insert(b);

list.insert(c);
console.log(list);
console.log(list.preOrder(list.head)); /** 2 -> 1 -> 3 */
console.log(list.postOrder(list.head)); /** 1 -> 3 -> 2 */
console.log(list.inOrder(list.head)); /** 1 -> 2 -> 3 */
```

## 验证是否是 BST

- leetcode: https://leetcode.cn/problems/validate-binary-search-tree

```js
var isValidBST = function(root) {
  if (!root) return true;    
  /** 右边全部大于中间的; 左边的全部小于中间的 */
  if (!leftIsValid(root.val, root.left) || !rightIsValid(root.val, root.right)) return false;
  if (!isValidBST(root.left) || !isValidBST(root.right)) return false;
  return true;
};
var leftIsValid = (val, node) => {
  if (!node) return true;
  if (val <= node.val) return false;
  if (!leftIsValid(val, node.left) || !leftIsValid(val, node.right)) return false;
  return true;
}
var rightIsValid = (val, node) => {
  if (!node) return true;
  if (val >= node.val) return false;
  if (!rightIsValid(val, node.left) || !rightIsValid(val, node.right)) return false;
  return true;
}
```

## 最近公共祖先

- leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree

```js
var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null;
  if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
  if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
  return root;
};
```

## 最近公共祖先 II

- leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree

```js
var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null;
  if (root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  /** 左侧均没 p 和 q, 则在右边 */
  if (!left) return right;
  /** 右侧均没 p 和 q, 则在左边 */
  if (!right) return left;
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
var _bfs = function(root) {
  if (!root) return 0;
  const queue = [root];
  let level = 0;
  while (queue.length) {
    level += 1;
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    queue.splice(0, length);
  }
  return level;
}

/** 深度优先 */
var _dfs = function(root) {
  if (!root) return 0;
  let left = _dfs(root.left);
  let right = _dfs(root.right);
  return Math.max(left, right) + 1;
}
```

## 最小深度

- leetcode: https://leetcode.cn/problems/minimum-depth-of-binary-tree

```js
var minDepth = function(root) {
  return _bfs(root);
};

/** 广度优先 */
var _bfs = function(root) {
  if (!root) return 0;
  const queue = [root];
  let level = 0;
  while(queue.length) {
    level += 1;
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (!node.left && !node.right) return level;
    }
    queue.splice(0, length);
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
var widthOfBinaryTree = function(root) {
  if (!root) return 0;
  let maxWidth = 1;
  const queue = [[root, 1]];
  while(queue.length) {
    const current = [];
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const [node, index] = queue[i];
      if (node.left) queue.push([node.left, (index * 2) % Number.MAX_SAFE_INTEGER]);
      if (node.right) queue.push([node.right, (index * 2 + 1) % Number.MAX_SAFE_INTEGER]);
      current.push(index);
    }
    maxWidth = Math.max(current[current.length - 1] - current[0] + 1, maxWidth);
    queue.splice(0, length)
  }
  return maxWidth;
};
```

## 最大直径

- leetcode: https://leetcode.cn/problems/diameter-of-binary-tree/

```js
var diameterOfBinaryTree = function(root) {
  var height = 0;
  var _dfs = function(node) {
    if (!node) return 0;
    let left = _dfs(node.left);
    let right = _dfs(node.right);
    /** 左右子树和最大为当前节点的路径长度 */
    height = Math.max(left + right, height);
    return Math.max(left, right) + 1;
  };
  _dfs(root);
  return height;
};
```

## 遍历-层序

- leetcode: https://leetcode.cn/problems/binary-tree-level-order-traversal
- leetcode: https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/

```js
var levelOrder = function(root) {
  if (!root) return [];
  return _bfs(root);
};

/** 广度优先 */
var _bfs = function(root) {
  const results = [];
  const queue = [root];
  while(queue.length) {
    const current = [];
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      current.push(node.val);
    }
    results.push(current);
    queue.splice(0, length);
  }
  return results;
}

/** 深度优先 */
var _dfs = function(root, result = [], level = 0) {
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
var zigzagLevelOrder = function(root) {
  if (!root) return [];
  return _bfs(root);
};

/** 广度优先 */
var _bfs = function(root) {
  let order = true;
  const results = [];
  const queue = [root];
  while(queue.length) {
    const current = [];
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const node = queue[i];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      current.push(node.val);
    }
    results.push(order ? current : current.reverse());
    queue.splice(0, length);
    order = !order;
  }
  return results;
}
```

## 遍历-前序

- leetcode: https://leetcode.cn/problems/binary-tree-preorder-traversal/

```js
var preorderTraversal = function(root) {
  const results = [];
  _dfs(root, results);
  return results;
};

var _dfs = function(node, results) {
  if (!node) return;
  results.push(node.val);
  _dfs(node.left, results);
  _dfs(node.right, results);
}
```

## 遍历-中序

- leetcode: https://leetcode.cn/problems/binary-tree-inorder-traversal/
- leetcode: https://leetcode.cn/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/

```js
var inorderTraversal = function(root) {
  const results = [];
  _dfs(root, results);
  return results;
};

var _dfs = function(node, results) {
  if (!node) return;
  _dfs(node.left, results);
  results.push(node.val);
  _dfs(node.right, results);
};
```

## 遍历-后序

- leetcode: https://leetcode.cn/problems/binary-tree-postorder-traversal/

```js
var postorderTraversal = function(root) {
  let results = [];
  _dfs(root, results);
  return results;
};

var _dfs = function(node, results) {
  if (!node) return;
  _dfs(node.left, results);
  _dfs(node.right, results);
  results.push(node.val);
};
```

## 前序链表

- leetcode: https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/

```js
var flatten = function(root) {
  if (!root) return null;
  let results = [];
  _dfs(root, results);
  for (let i = 0; i < results.length - 1; i += 1) {
      results[i].left = null;
      results[i].right = results[i + 1];
  }
  return results[0];
};

var _dfs = function(root, results) {
  if (!root) return;
  results.push(root);
  _dfs(root.left, results);
  _dfs(root.right, results);
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
  const leftPreorder = preorder.slice(1, midIndex + 1);
  const rightPreorder = preorder.slice(midIndex + 1);
  const leftInorder = inorder.slice(0, midIndex);
  const rightInorder = inorder.slice(midIndex + 1);
  root.left = buildTree(leftPreorder, leftInorder);
  root.right = buildTree(rightPreorder, rightInorder);
  return root;
};
```

## 翻转二叉树

- leetcode: https://leetcode.cn/problems/invert-binary-tree/
- leetcode: https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof/

```js
var invertTree = function (root) {
  return swap(root);
};

var swap = function(node) {
  if (!node) return null;
  const temp = node.left;
  node.left = node.right;
  node.right = temp;
  swap(node.left);
  swap(node.right);
  return node;
}
```

## 平衡二叉树

- leetcode: https://leetcode.cn/problems/balanced-binary-tree/

```js
var isBalanced = function (root) {
  if (!root) return true;
  const left = _dfs(root.left);
  const right = _dfs(root.right);
  const isValid = Math.abs(left - right) <= 1;
  if (!isValid) return false;
  if (!isBalanced(root.left) || !isBalanced(root.right)) return false;
  return true;
};

var _dfs = function(node) {
  if (!node) return 0;
  const left = _dfs(node.left);
  const right = _dfs(node.right);
  return Math.max(left, right) + 1;
}
```

## 对称二叉树

- leetcode: https://leetcode.cn/problems/symmetric-tree/

```js
var isSymmetric = function(root) {
  if (!root) return false
  const queue = [root];
  while (queue.find((i) => i)) {
    const len = queue.length;
    let current = [];
    for (let i = 0; i < len; i += 1) {
      const node = queue[i];
      if (node && node.left) queue.push(node.left);
      else queue.push(null);
      if (node && node.right) queue.push(node.right);
      else queue.push(null);
      current.push(node ? node.val : null);
    }
    const valid = isSymmetricArr(current);
    if (!valid) return false;
    queue.splice(0, len);
  }
  return true;
};

var isSymmetricArr = function(arr) {
  const length = arr.length;
  const midLength = Math.floor(length / 2);
  for (let i = 0; i < midLength; i += 1) {
    const first = arr[i];
    const last = arr[length - i - 1];
    if (first !== last) return false;
  }
  return true;
}
```

## 完全二叉树

- leetcode: https://leetcode.cn/problems/check-completeness-of-a-binary-tree/
- leetcode: https://leetcode.cn/problems/count-complete-tree-nodes/submissions/

```js
var isCompleteTree = function (root) {
  if (!root) return false
  let results = [];
  const queue = [[root, 1]];
  while (queue.length) {
    const current = [];
    const length = queue.length;
    for (let i = 0; i < length; i += 1) {
      const [node, index] = queue[i];
      if (node.left) queue.push([node.left, 2 * index]);
      if (node.right) queue.push([node.right, 2 * index + 1]);
      current.push(index);
    }
    results = results.concat(current);
    queue.splice(0, length);
  }
  return results.length === results[results.length - 1];
};
```

## 路径为 K

- leetcode: https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/
- leetcode: https://leetcode.cn/problems/sum-root-to-leaf-numbers/
- leetcode: https://leetcode.cn/problems/path-sum/
- leetcode: https://leetcode.cn/problems/path-sum-ii/

```js
var pathSum = function (root, target) {
  return _bfs(root, target);
};

var _bfs = function (root, target) {
  const results = [];
  const queue = [];
  if (root) queue.push([root, [root.val]]);
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i += 1) {
      const [node, path] = queue[i];
      if (node.left) queue.push([node.left, path.concat(node.left.val)]);
      if (node.right) queue.push([node.right, path.concat(node.right.val)]);
      if (!node.left && !node.right) {
        const sum = path.reduce((a, b) => a + b);
        if (sum === target) results.push(path);
      }
    }
    queue.splice(0, len);
  }
  return results;
};
```

## 路径最大

- leetcode: https://leetcode.cn/problems/binary-tree-maximum-path-sum/

```js
var maxPathSum = function (root) {
  let maxSum = -Infinity;
  var maxGain = function (node) {
    if (!node) return 0;
    /** 递归计算左右子节点的最大贡献值: 只有在最大贡献值大于 0 时，才会选取对应子节点 */
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    /** 节点的最大路径和 = 该节点的值 + 左子节点最大贡献值 + 右子节点最大贡献值 */
    const priceNewpath = node.val + leftGain + rightGain;
    /** 更新答案 */
    maxSum = Math.max(maxSum, priceNewpath);
    /** 节点最大贡献值 = 该节点的值 + 左右贡献最大值 */
    return node.val + Math.max(leftGain, rightGain);
  };
  maxGain(root);
  return maxSum;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
