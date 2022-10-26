## 简介

> 算法-递归分治学习笔记。

## 有效括号组合

- leetcode: https://leetcode.cn/problems/generate-parentheses

```js
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

var numIslands = function (grid) {
  let sum = 0;
  for (let i = 0, len1 = grid.length; i < len1; i += 1) {
    for (let j = 0, len2 = grid[i].length; j < len2; j += 1) {
      if (grid[i][j] === "1") {
        _helper(grid, i, j, [{ x: i, y: j }]);
        sum += 1;
      }
    }
  }
  return sum;
};

var _helper = function (grid, row, column, visited) {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < 4; i += 1) {
    const x = dx[i] + row;
    const y = dy[i] + column;
    const inGrid = x >= 0 && x < m && y >= 0 && y < n;
    const inVisited = visited.find((i) => i.x === x && i.y === y);
    if (inGrid && !inVisited) {
      if (grid[x][y] === "1") {
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

function findWords(board, words) {
  const results = [];
  for (let i = 0, len = words.length; i < len; i += 1) {
    const isExist = exist(board, words[i]);
    if (isExist) results.push(words[i]);
  }
  return results;
}

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

## 数独

- leetcode-36: https://leetcode.cn/problems/valid-sudoku
- leetcode-37: https://leetcode.cn/problems/sudoku-solver

```js
var isValidSudoku = function (board) {
  let res = _helper(board);
  return res;
};

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  _helper(board);
  return board;
};

var _helper = function (board) {
  for (let i = 0, row = board.length; i < row; i += 1) {
    for (let j = 0, column = board[i].length; j < column; j += 1) {
      if (board[i][j] === ".") {
        for (let char = 1; char < 10; char += 1) {
          const isValid = _isVaild(board, i, j, char.toString());
          if (isValid) {
            board[i][j] = char.toString();
            if (_helper(board)) {
              return true;
            } else {
              board[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

var _isVaild = function (board, row, column, char) {
  // /** 行列正确 */
  for (let i = 0; i < 9; i += 1) {
    if (char === board[row][i]) return false;
    if (char === board[i][column]) return false;
  }
  /** 3*3宫格正确 */
  let m = Math.floor(row / 3);
  let n = Math.floor(column / 3);
  for (let i = m * 3; i < m * 3 + 3; i++) {
    for (let j = n * 3; j < n * 3 + 3; j++) {
      if (char === board[i][j]) return false;
    }
  }
  return true;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
