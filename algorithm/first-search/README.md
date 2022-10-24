## 简介

> 算法-广度优先和深度优先学习笔记。

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
