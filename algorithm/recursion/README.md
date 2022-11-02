## 简介

> 算法-递归回溯学习笔记。

## 递归

- DFS 是一个劲的往某一个方向搜索
- 而回溯算法建立在 DFS 基础之上的，但不同的是在搜索过程中，达到结束条件后，恢复状态，回溯上一层，再次搜索。因此回溯算法与 DFS 的区别就是有无状态重置

#### n 次幂

- https://leetcode.cn/problems/powx-n

```js
var myPow = function (x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n % 2) return myPow(x * x, (n - 1) / 2) * x;
  return myPow(x * x, n / 2);
};
```

#### 有效括号组合

- https://leetcode.cn/problems/generate-parentheses

```js
var generateParenthesis = function (n) {
  let results = [];
  _helper(n, 0, 0, "", results);
  return results;
};

var _helper = function (n, leftUsed, rightUsed, cur, results) {
  if (leftUsed === n && rightUsed === n) {
    results.push(cur);
    return;
  }
  if (leftUsed < n) {
    _helper(n, leftUsed + 1, rightUsed, cur + "(", results);
  }
  if (rightUsed < n && rightUsed < leftUsed) {
    _helper(n, leftUsed, rightUsed + 1, cur + ")", results);
  }
};
```

#### 岛屿个数

- https://leetcode.cn/problems/number-of-islands/

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

#### 单词搜索

- https://leetcode.cn/problems/word-search
- https://leetcode.cn/problems/word-search-ii

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

## 回溯

- 当问题需要 "回头"，以此来查找出所有的解的时候，使用回溯算法
- 即满足结束条件或者发现不是正确路径的时候(走不通)，要撤销选择，回退到上一个状态，继续尝试，直到找出所有解为止

#### 子集

- https://leetcode.cn/problems/subsets/
- https://leetcode.cn/problems/subsets-ii/

```js
var subsetsWithDup = function (nums) {
  nums.sort();
  const results = [];
  /** 1、递归树 */
  /** [] */
  /** [1] => [1, 2] [1, 2](需跳过) => [1, 2, 2]*/
  /** [2] => [2, 2] */
  /** [2](需跳过) */
  _helper(nums, 0, [], results);
  return results;
};

var _helper = function (nums, start, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  results.push(path);
  for (let i = start; i < nums.length; i += 1) {
    /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
    if (i > start && nums[i] === nums[i - 1]) continue;
    path.push(nums[i]);
    _helper(nums, i + 1, [...path], results);
    path.pop();
  }
};
```

#### 全排列

- https://leetcode.cn/problems/permutations/
- https://leetcode.cn/problems/permutations-ii/
- https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/

```js
var permuteUnique = function (nums) {
  nums.sort();
  const results = [];
  /** 1、递归树 */
  /** [1](重置) => [1, 1] [1, 2] => [1, 1, 2] [1, 2, 1] */
  /** [2](重置) => [2, 1] [2, 1](跳过) => [2, 1, 1] */
  /** [2](跳过) => [1, 1] [1, 2] => [1, 1, 2] [1, 2, 1] */
  _helper(nums, [], [], results);
  return results;
};

var _helper = function (nums, visited, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (path.length === nums.length) {
    results.push(path);
    return;
  }
  for (let i = 0; i < nums.length; i += 1) {
    /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
    if (visited[i]) continue;
    if (i > 0 && nums[i] === nums[i - 1] && visited[i - 1]) break;
    path.push(nums[i]);
    visited[i] = true;
    _helper(nums, visited, [...path], results);
    visited[i] = false;
    path.pop();
  }
};
```

#### 组合

- https://leetcode.cn/problems/combinations/
- https://leetcode.cn/problems/combination-sum/
- https://leetcode.cn/problems/combination-sum-ii/

```js
var combine = function (n, k) {
  const results = [];
  /** 1、递归树 */
  /** 1 => [1, 2] [1, 3] [1, 4] */
  /** 2 => [2, 3] [2, 4] */
  /** 3 => [3, 4] */
  _helper(n, k, 1, [], results);
  return results;
};

var _helper = function (n, k, start, path, results) {
  /** 2、把每一条路径加入结果集: 判断是否有结束条件 */
  if (path.length === k) {
    results.push(path);
    return;
  }
  /** 3、做出选择 + 递归下一层 + 撤销选择: 剪枝去重 */
  for (let i = start; i <= n; i += 1) {
    path.push(i);
    _helper(n, k, i + 1, [...path], results);
    path.pop();
  }
};
```

#### 复原 IP 地址

- https://leetcode.cn/problems/restore-ip-addresses/

```js
var restoreIpAddresses = function (s) {
  /** 1、递归树 */
  /** 2 */
  /** 25 */
  /** 255 */
  let results = [];
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, start, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.length === 4 && path.join("").length === s.length) {
    results.push(path.join("."));
    return;
  }
  for (let i = start; i < s.length; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const char = s.slice(start, i + 1);
    if (!char || Number(char) < 0 || Number(char) > 255) break;
    if (char.length > 1 && char[0] === "0") break;
    path.push(char);
    _helper(s, start + char.length, [...path], results);
    path.pop();
  }
};
```

#### 分割回文字符串

- https://leetcode.cn/problems/palindrome-partitioning/

```js
var partition = function (s) {
  const results = [];
  /** 1、递归树 */
  /** a -> ab(删除) b -> c*/
  /** aa -> b */
  _helper(s, 0, [], results);
  return results;
};

var _helper = function (s, start, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.join("").length === s.length) {
    results.push(path);
    return;
  }
  for (let i = start; i < s.length; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const char = s.slice(start, i + 1);
    if (!char) break;
    if (!_isValidChar(char)) continue;
    path.push(char);
    _helper(s, start + char.length, [...path], results);
    path.pop();
  }
};

var _isValidChar = function (char) {
  const n = Math.floor(char.length / 2);
  for (let i = 0; i < n; i += 1) {
    if (char[i] !== char[char.length - i - 1]) return false;
  }
  return true;
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
