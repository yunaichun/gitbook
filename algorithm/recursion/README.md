## 简介

> 算法-递归分治学习笔记。

## 验证是否是BST

- leetcode: https://leetcode.cn/problems/validate-binary-search-tree

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  return _helper(root, -Infinity, Infinity);
};

function _helper(root, lower, higher) {
  if (!root) return true;
  if (root.val >= higher || root.val <= lower) return false;
  return _helper(root.left, lower, root.val) && _helper(root.right, root.val, higher);
}
```

## 有效括号组合

- leetcode: https://leetcode.cn/problems/generate-parentheses

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  return _helper(0, 0, n, '', []);
};

function _helper(leftUsed, rightUsed, n, current, result) {
  if (leftUsed === n && rightUsed === n) {
    result.push(current);
    return;
  }
  if (leftUsed < n) {
    _helper(leftUsed + 1, rightUsed, n, current + '(', result);
  }
  if (rightUsed < n && rightUsed < leftUsed) {
    _helper(leftUsed, rightUsed + 1, n, current + ')', result);
  }
  return result;
}
```

## n次幂

- leetcode: https://leetcode.cn/problems/powx-n

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return  1;
  if (n === 1) return x;
  const a = Math.floor(n / 2);
  const b = n % 2;
  if (b === 0) {
    return myPow(x*x, a);
  } else {
    return myPow(x*x, a) * x;
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
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const results = findWords(board, [word]);
  return results.length;
};

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
  const results = [];

  if (!board.length || !board[0].length) return [];
  const maxLength = board.length * board[0].length;
  words = words.filter(word => word.length <= maxLength);
  if (!words.length) return [];

  for (let i = 0, len = board.length; i < len; i += 1) {
    for (let j = 0, len2 = board[i].length; j < len2; j += 1) {
      _helper(board, words, i, j, [{ x: i, y : j }], '', results);
    }
  }

  return results;
}

function _helper(board, words, row, column, usedGrids, current, results) {
  current += board[row][column];

  const more = words.filter(word => word.indexOf(current) >= 0);
  if (more.length === 0) return;
  if (words.indexOf(current) >= 0 && results.indexOf(current) < 0) {
    results.push(current);
    if (more.length === 1) return;
  }

  let m = board.length;
  let n = board[0].length;
  for (let i = 0; i < 4; i += 1) {
    let x = row + dx[i];
    let y = column + dy[i];
    const inUsedGrids = usedGrids.find(i => i.x === x && i.y === y);
    if (inUsedGrids) continue;
    const inBoard = x >= 0 && x < m && y >= 0 && y < n;
    if (inBoard) _helper(board, words, x, y, usedGrids.concat({ x, y }), current, results); 
  }
}
```

## 岛屿个数

- leetcode: https://leetcode.cn/problems/number-of-islands/
- leetcode: https://leetcode.cn/problems/friend-circles/

```js
class Solution {
    constructor() {
        this.queue = [];
        this.visited = new Set();
        // == 横坐标：左、右、上、下
        this.dx = [-1, 1, 0, 0];
        // == 纵坐标：左、右、上、下
        this.dy = [0, 0, -1, 1];
    }
    numIslands(grid) {
        for (let i = 0, row = grid.length; i < row; i++) {
            for (let j = 0, column = grid[i].length; j < column; j++) {
                this._dfs(grid, i, j);
            }
        }
        console.log(111111, grid);
        let sum = this._get_result(grid);
        return sum;
    }
    // == 深度优先 o(n)  -  染色
    _dfs(grid, row, column) {
        if (!this._is_valid(grid, row, column)) return;
        this.visited.add({row, column});
        for (let i = 0; i < 4; i++) {
            let newRow = row + this.dx[i];
            let newColumn = column + this.dy[i];
            if (this._is_valid(grid, newRow, newColumn)) {
                grid[row][column] = 0;
                this._dfs(grid, newRow, newColumn);
            }
        }
    }
    // == 广度优先 o(n)  -  染色
    _bfs(grid, row, column) { n
        if (!this._is_valid(grid, row, column)) return;
        this.visited.add({row, column});
        this.queue.push({row, column});
        while(this.queue.length) {
            let {row, column} = this.queue.pop();
            for (let j = 0; j < 4; j++) {
                let newRow = row + this.dx[j];
                let newColumn = column + this.dy[j];
                if (this._is_valid(grid, newRow, newColumn)) {
                    grid[row][column] = 0;
                    this.queue.push({row: newRow, column: newColumn});
                }
            }
        }
    }
    _is_valid(grid, row, column) {
        if (
            row < 0 || row >= grid.length ||
            column < 0 || column >= grid[0].length
        ) {
            return false;
        }
        for (let i of this.visited) {
            if (
                Number(grid[row][column]) === 0 ||
                (i.row === row && i.column === column)
            ) {
                return false;
            }
        }
        return true
    }
    _get_result(grid) {
        let sum = 0;
        for (let i = 0, row = grid.length; i < row; i++) {
            for (let j = 0, column = grid[i].length; j < column; j++) {
                sum += Number(grid[i][j]);
            }
        }
        return sum;
    }
}

var grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","1"]
];
// var grid = [[1,1,0],
// [1,1,0],
// [0,0,1]]
var a = new Solution();
console.log(a.numIslands(grid))
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
