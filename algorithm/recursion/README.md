## 简介

> 算法-递归回溯学习笔记。

## 递归

#### n 次幂

- https://leetcode.cn/problems/powx-n

```js
var myPow = function(x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return 1;
  if (n % 2 === 0) return myPow(x * x, n / 2);
  else return  myPow(x * x, (n - 1) / 2) * x;
};
```

#### 有效括号组合

- https://leetcode.cn/problems/generate-parentheses

```js
var generateParenthesis = function (n) {
  let results = [];
  _dfs(n, 0, 0, '', results);
  return results;
};

var _dfs = function(n, left, right, cur, results) {
  if (left === n && right === n) {
    results.push(cur);
    return;
  }
  if (left < n) {
    _dfs(n, left + 1, right, cur + '(', results);;
  }
  if (right < n && right < left) {
    _dfs(n, left, right + 1, cur + ')', results);;
  }
}
```

## 回溯

#### 子集

- https://leetcode.cn/problems/subsets/

```js
/** 下一个元素不回头 */
var subsets = function(nums) {
  const results = [];
  _dfs(nums, [], results, 0)
  return results;
};

var _dfs = function(nums, path, results, start) {
  results.push(path);
  for (let i = start; i < nums.length; i += 1) {
    path.push(nums[i]);
    _dfs(nums, [...path], results, i + 1);
    path.pop();
  }
}
```

#### 子集 II

- https://leetcode.cn/problems/subsets-ii/

```js
/** 下一个元素不回头 */
var subsetsWithDup = function(nums) {
  nums.sort();
  const results = [];                                                                       ` ` 
  _helper(nums, [], results, 0);
  return results;
};

var _helper = function(nums, path, results, start) {
  results.push(path);
  for (let i = start; i < nums.length; i += 1) {
    /** i > start: 代表同一轮循环中, 当前元素和前一个元素一样的话 */
    if (i > 0 && nums[i] === nums[i - 1] && i > start) continue;
    path.push(nums[i]);
    _helper(nums, [...path], results, i + 1);
    path.pop();
  }
};
```

#### 组合

- https://leetcode.cn/problems/combinations/

```js
/** 下一个元素不回头 */
var combine = function(n, k) {
  const results = [];
  _dfs(n, k, [], results, 1);
  return results;
};

var _dfs = function(n, k, path, results, start) {
  if (path.length === k) {
    results.push(path);
    return;
  }
  for (let i = start; i <= n; i += 1) {
    path.push(i);
    _dfs(n, k, [...path], results, i + 1);
    path.pop();
  }
};
```

#### 组合总和

- https://leetcode.cn/problems/combination-sum/

```js
/** 下一个元素可以回头 */
var combinationSum = function(candidates, target) {
  const results = [];
  _dfs(candidates, target, [], results);
  return results;
};

var _dfs = function (candidates, target, path, results) {
  if (target < 0) return;
  if (target === 0) {
    const exist = results.find((i) => i.sort().join() === path.sort().join());
    if (!exist) results.push(path);
    return;
  }

  for (let i = 0, len = candidates.length; i < len; i += 1) {
    path.push(candidates[i]);
    _dfs(candidates, target - candidates[i], [...path], results);
    path.pop();
  }
};
```

#### 组合总和 II

- https://leetcode.cn/problems/combination-sum-ii/

```js
/** 下一个元素不回头 */
var combinationSum2 = function(candidates, target) {
  candidates.sort();
  const results = [];
  _dfs(candidates, target, [], results, 0);
  return results;
};

var _dfs = function(candidates, target, path, results, start) {
  if (target <= 0) {
    const exist = results.find((i) => i.sort().join() === path.sort().join());
    if (target === 0 && !exist) results.push(path);
    return;
  }
  for (let i = start; i < candidates.length; i += 1) {
    /** i > start: 代表同一轮循环中, 当前元素和前一个元素一样的话 */
    if (i > 0 && candidates[i] === candidates[i - 1] && i > start) continue;
    path.push(candidates[i]);
    _dfs(candidates, target - candidates[i], [...path], results, i + 1);
    path.pop();
  }
}
```

#### 全排列

- https://leetcode.cn/problems/permutations/

```js
/** 当前元素每次循环均可被访问, 但是同次循环只能用一次 */
var permute = function(nums) {
  let results = [];
  _dfs(nums, [], results, []);
  return results;
};

var _dfs = function(nums, path, results, visited) {
  if (path.length === nums.length) {
    results.push(path);
    return;
  }
  for (let i = 0; i < nums.length; i += 1) {
    /** 当前元素被访问过了 */
    if (visited[i]) continue;
    path.push(nums[i]);
    visited[i] = true;
    _dfs(nums, [...path], results, [...visited]);
    path.pop();
    visited[i] = false;
  }
}
```

#### 全排列 II

- 全排列 II: https://leetcode.cn/problems/permutations-ii/
- 字符串全排列: https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/

```js
/** 当前元素每次循环均可被访问, 但是同次循环只能用一次 */
var permuteUnique = function(nums) {
  nums.sort();
  let results = [];
  _dfs(nums, [], results, []);
  return results;
};

var _dfs = function(nums, path, results, visited) {
  if (path.length === nums.length) {
    results.push(path);
    return;
  }
  for (let i = 0; i < nums.length; i += 1) {
    /** 当前元素被访问过了 */
    if (visited[i]) continue;
    /** !visited[i - 1]: 代表同一轮循环中, 当前元素首次进入 path 且前一个元素还没进入 path */
    if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue;
    path.push(nums[i]);
    visited[i] = true;
    _dfs(nums, [...path], results, [...visited]);
    path.pop();
    visited[i] = false;
  }
}
```

#### 字母大小写全排列

- https://leetcode.cn/problems/letter-case-permutation/

```js
var letterCasePermutation = function(s) {
  const results = [];
  _dfs(s, [], results, 0);
  return results;
};

var _dfs = function(s, path, results, start) {
  if (path.length === s.length) {
    results.push(path.join(''));
    return;
  }
  if (isNaN(Number(s[start]))) {
    path.push(s[start].toUpperCase());
    _dfs(s, [...path], results, start + 1);
    path.pop();
    path.push(s[start].toLowerCase());
    _dfs(s, [...path], results, start + 1);
    // path.pop();
  } else {
    path.push(s[start]);
    _dfs(s, [...path], results, start + 1);
    // path.pop();
  }
}
```

#### 复原 IP 地址

- https://leetcode.cn/problems/restore-ip-addresses/

```js
var restoreIpAddresses = function (s) {
  let results = [];
  _dfs(s, [], results, 0);
  return results;
};

var _dfs = function(s, path, results, start) {
  if (path.length === 4 && path.join('').length === s.length) {
    results.push(path.join('.'));
    return;
  }
  /** start 代表从 start 位置开始可以截取的元素 */
  for (let i = start; i < s.length; i += 1) {
    const char = s.slice(start, i + 1);
    if (isValidChar(char)) {
      path.push(char);
      _dfs(s, [...path], results, i + 1);
      path.pop();
    }
  }
}

var isValidChar = function(char) {
  if (Number(char) < 0 || Number(char) > 255) return false;
  if (char.length > 1 && char[0] === "0") return false;
  return true;
}
```

#### 分割回文字符串

- https://leetcode.cn/problems/palindrome-partitioning/

```js
var partition = function(s) {
  const results = [];
  _dfs(s, [], results, 0);
  return results;
};

var _dfs = function(s, path, results, start) {
  if (path.join('').length === s.length) {
    results.push(path);
    return;
  }
  for (let i = start; i < s.length; i += 1) {
    const char = s.slice(start, i + 1);
    if (isValidChar(char)) {
      path.push(char);
      _dfs(s, [...path], results, i + 1);
      path.pop();
    }
  }
}

var isValidChar = function(char) {
  for (let i = 0; i < Math.floor(char.length / 2); i += 1) {
    if (char[i] !== char[char.length - 1 - i]) return false;
  }
  return true;
}
```

#### 岛屿个数

- https://leetcode.cn/problems/number-of-islands/

```js
/** 会修改原始数据 */
var numIslands = function (grid) {
  let sum = 0;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === '1') {
        _dfs(grid, i, j, [{ x: i, y: j }]);
        sum += 1;
      }
    }
  }
  return sum;
};

const around = [[-1, 0], [0, 1], [1, 0], [0, -1]];
var _dfs = function(grid, row, column, visited) {
  for (let i = 0; i < around.length; i += 1) {
    const x = row + around[i][0];
    const y = column + around[i][1];
    if (isValid(grid, x, y, visited)) {
      if (grid[x][y] === '1') {
        grid[x][y] = '0';
        visited.push({ x, y });
        _dfs(grid, x, y, [...visited]);
        visited.pop();
      }
    }
  }
}

var isValid = function(grid, row, column, visited) {
  const rows = grid.length;
  const columns = grid[0].length;
  if (row < 0 || row >= rows) return false;
  if (column < 0 || column >= columns) return false;
  if (visited.find(v => v.x === row && v.y === column)) return false;
  return true;
}
```

#### 单词搜索

- https://leetcode.cn/problems/word-search
- https://leetcode.cn/problems/word-search-ii

```js
var exist = function (board, word) {
  const results = [];
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === word[0]) _dfs(board, i, j, word, [board[i][j]], results, [{ x: i, y: j }], 1)
    }
  }
  return results.length;
}

const around = [[-1, 0], [0, 1], [1, 0], [0, -1]];
var _dfs = function(board, row, column, word, path, results, visited, start) {
  if (path.length === word.length) {
    results.push(path);
    return;
  }
  for (let i = 0; i < around.length; i += 1) {
    const x = row + around[i][0];
    const y = column + around[i][1];
    if (isValid(board, x, y, word, visited, start)) {
      path.push(board[x][y]);
      visited.push({ x, y });
      _dfs(board, x, y, word, [...path], results, [...visited], start + 1);
      path.pop();
      visited.pop();
    }
  }
}

var isValid = function(board, row, column, word, visited, start) {
  const rows = board.length;
  const columns = board[0].length;
  if (row < 0 || row >= rows) return false;
  if (column < 0 || column >= columns) return false;
  if (visited.find(v => v.x === row && v.y === column)) return false;
  if (board[row][column] !== word[start]) return false;
  return true;
}
```

## 数独

- https://leetcode.cn/problems/valid-sudoku
- https://leetcode.cn/problems/sudoku-solver

```js
var solveSudoku = function(board) {
  _dfs(board);
  return board;
};

var _dfs = function(board) {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === '.') {
        for (let char = 1; char < 10; char += 1) {
          if (isValid(board, i, j, char.toString())) {
            board[i][j] = char.toString();
            /** 继续遍历后面所有的, 都 ok, 就是正确的数独 */
            if (_dfs(board)) return true;
          }
        }
        /** 寻找 9 个数据均无解, 则不是有效数独, 回归到原来位置 */
        board[i][j] = '.';
        return false;
      }
    } 
  }
  return true;
}

var isValid = function(board, row, column, char) {
  for (i = 0; i < 9; i += 1) {
    if (board[i][column] === char) return false;
    if (board[row][i] === char) return false;
  }
  const m = Math.floor(row / 3);
  const n = Math.floor(column / 3);
  for (let i = m * 3; i < (m + 1) * 3; i += 1) {
    for (let j = n * 3; j < (n + 1) * 3; j += 1) {
      if (board[i][j] === char) return false;
    }
  }
  return true;
}
```

## N 皇后

- https://leetcode.cn/problems/n-queens/
- https://leetcode.cn/problems/n-queens-ii/

```js
var totalNQueens = function(n) {
  const results = [];
  _helper(n, [], results, []);
  return results.length;
};

var solveNQueens = function(n) {
  const results = [];
  _dfs(n, [], results, []);
  return results;
};

var _dfs = function(n, path, results, visited) {
  if (path.length === n) {
    results.push(path);
    return;
  }
  for (let i = 0; i < n; i += 1) {
    const [row, column] = [path.length, i];
    if (isValid(row, column, visited)) {
      let char = Array.from({ length: n }, () => '.').join('');
      char = char.slice(0, column) + 'Q' + char.slice(column + 1);
      path.push(char);
      visited.push({ x: row, y: column });
      _dfs(n, [...path], results, [...visited]);
      path.pop();
      visited.pop();
    }
  }
}

var isValid = function(row, column, visited) {
  for (let i = 0; i < visited.length; i += 1) {
    const { x, y } = visited[i];
    if (x === row) return false;
    if (y === column) return false;
    if (y - x === column - row) return false;
    if (y - x === column - row) return false;
    if (y + x === column + row) return false;
  }
  return true;
}
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
