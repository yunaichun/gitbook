## 简介

> 算法-递归分治学习笔记。

## 验证是否是 BST

- leetcode: https://leetcode.cn/problems/validate-binary-search-tree

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  return _helper(root, -Infinity, Infinity);
};

function _helper(root, lower, higher) {
  if (!root) return true;
  if (root.val >= higher || root.val <= lower) return false;
  return (
    _helper(root.left, lower, root.val) && _helper(root.right, root.val, higher)
  );
}
```

## 有效括号组合

- leetcode: https://leetcode.cn/problems/generate-parentheses

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  return _helper(0, 0, n, "", []);
};

function _helper(leftUsed, rightUsed, n, current, result) {
  if (leftUsed === n && rightUsed === n) {
    result.push(current);
    return;
  }
  if (leftUsed < n) {
    _helper(leftUsed + 1, rightUsed, n, current + "(", result);
  }
  if (rightUsed < n && rightUsed < leftUsed) {
    _helper(leftUsed, rightUsed + 1, n, current + ")", result);
  }
  return result;
}
```

## n 次幂

- leetcode: https://leetcode.cn/problems/powx-n

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n % 2) return myPow(x * x, (n - 1) / 2) * x;
  return myPow(x * x, n / 2);
};
```

## 岛屿个数

- leetcode: https://leetcode.cn/problems/number-of-islands/

```js
/** 上下左右 */
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let sum = 0;
  for (let i = 0, row = grid.length; i < row; i += 1) {
    for (let j = 0, column = grid[i].length; j < column; j += 1) {
      if (Number(grid[i][j]) === 1) {
        _helper(grid, i, j, [{ x: i, y: j }]);
        sum++;
      }
    }
  }
  return sum;
};

var _helper = function (grid, row, column, visited) {
  let m = grid.length;
  let n = grid[0].length;
  for (let i = 0; i < 4; i++) {
    let x = row + dx[i];
    let y = column + dy[i];
    const inGrid = x >= 0 && x < m && y >= 0 && y < n;
    const isVisited = visited.find((d) => d.x === x && d.y === y);
    if (inGrid && !isVisited) {
      if (Number(grid[x][y]) === 1) {
        grid[x][y] = 0;
        _helper(grid, x, y, visited.concat({ x, y }));
      }
    }
  }
};
```

## 单词搜索

- leetcode: https://leetcode.cn/problems/word-search
- leetcode: https://leetcode.cn/problems/word-search-ii

```js
/** 上下左右 */
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
  const results = [];
  for (let i = 0, len = words.length; i < len; i += 1) {
    const isExist = exist(board, words[i]);
    if (isExist) results.push(words[i]);
  }
  return results;
}
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const results = [];
  for (let i = 0, row = board.length; i < row; i += 1) {
    for (let j = 0, column = board[i].length; j < column; j += 1) {
      _helper(board, word, i, j, board[i][j], results, [{ x: i, y: j }]);
    }
  }
  return results.length;
};

var _helper = function (board, word, row, column, cur, results, visited) {
  if (word.indexOf(cur) !== 0) return;
  if (cur === word) {
    results.push(cur);
    return;
  }

  let m = board.length;
  let n = board[0].length;

  for (let i = 0; i < 4; i += 1) {
    let x = row + dx[i];
    let y = column + dy[i];
    const isVisited = visited.find((d) => d.x === x && d.y === y);
    const inBoard = x >= 0 && x < m && y >= 0 && y < n;
    if (inBoard && !isVisited) {
      _helper(
        board,
        word,
        x,
        y,
        cur + board[x][y],
        results,
        visited.concat({ x, y })
      );
    }
  }
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
