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

#### 岛屿个数

- https://leetcode.cn/problems/number-of-islands/

```js
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
  const rows = grid.length;
  const columns = grid[0].length;
  for (let i = 0; i < around.length; i += 1) {
    const x = row + around[i][0];
    const y = column + around[i][1];
    const xIsValid = 0 <= x && x < rows;
    const yIsValid = 0 <= y && y < columns;
    const hasVisited = visited.find(v => v.x === x && v.y === y);
    if (xIsValid && yIsValid && !hasVisited) {
      if (grid[x][y] === '1') {
        grid[x][y] = '0';
        _dfs(grid, x, y, visited.concat({ x, y }));
      }
    }
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
    if (i > start && nums[i] === nums[i - 1]) continue;
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
    if (i > start && candidates[i] === candidates[i - 1]) continue;
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
    if (Number(char) < 0 || Number(char) > 255) continue;
    if (char.length > 1 && char[0] === "0") continue;
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

#### 单词搜索

- https://leetcode.cn/problems/word-search
- https://leetcode.cn/problems/word-search-ii

```js
/** 上下左右 */
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

var findWords = function (board, words) {
  const results = [];
  for (let i = 0, len = words.length; i < len; i += 1) {
    const isExist = exist(board, words[i]);
    if (isExist) results.push(words[i]);
  }
  return results;
};

var exist = function (board, word) {
  if (!board.length) return false;
  /** 1、递归树 */
  /** A -> B */
  /** A -> S */
  const results = [];
  for (let i = 0, len1 = board.length; i < len1; i += 1) {
    for (let j = 0, len2 = board[i].length; j < len2; j += 1) {
      const char = board[i][j];
      if (word.indexOf(char) === 0) {
        _helper(board, word, i, j, [{ x: i, y: j }], [char], results);
      }
    }
  }
  return results.length;
};

var _helper = function (board, word, row, column, visited, path, results) {
  const m = board.length;
  const n = board[0].length;
  if (word.indexOf(path.join("")) !== 0) return;
  /** 2、保存结果: 结束条件 */
  if (path.join("") === word) {
    results.push(path.join(""));
    return;
  }
  /** 3、选择+递归+重置: 剪枝 */
  for (let i = 0; i < 4; i += 1) {
    const x = row + dx[i];
    const y = column + dy[i];
    const isValid = x >= 0 && x < m && y >= 0 && y < n;
    const isVisited = visited.find((i) => i.x === x && i.y === y);
    if (!isValid || isVisited) continue;
    const char = board[x][y];
    path.push(char);
    visited.push({ x, y });
    _helper(board, word, x, y, [...visited], [...path], results);
    path.pop();
    visited.pop();
  }
};
```

## N 皇后

- https://leetcode.cn/problems/n-queens/
- https://leetcode.cn/problems/n-queens-ii/

```js
var totalNQueens = function (n) {
  const results = [];
  /** 1、递归树 */
  _helper(n, [], [], results);
  return results.length;
};

var solveNQueens = function (n) {
  const results = [];
  /** 1、递归树 */
  _helper(n, [], [], results);
  return results;
};

var _helper = function (n, visited, path, results) {
  /** 2、保存结果: 终止条件 */
  if (path.length === n) {
    results.push(path);
    return;
  }

  for (let i = 0; i < n; i += 1) {
    /** 3、选择+递归+重置: 剪枝 */
    const row = path.length;
    const column = i;
    const char = _generate(n, i);
    const isValid = _isValid(visited, row, column);
    if (!isValid) continue;
    path.push(char);
    visited.push({ row, column });
    _helper(n, [...visited], [...path], results);
    path.pop();
    visited.pop();
  }
};

var _generate = function (n, pos) {
  let char = "";
  for (let i = 0; i < n; i += 1) {
    if (i === pos) char += "Q";
    else char += ".";
  }
  return char;
};

var _isValid = function (visited, row, column) {
  const exist = visited.find((i) => {
    /** 存在相同行 */
    if (i.row === row) return true;
    /** 存在相同列 */
    if (i.column === column) return true;
    /** 捺上存在 */
    if (i.row - i.column === row - column) return true;
    /** 撇上存在 */
    if (i.row + i.column === row + column) return true;
    return false;
  });
  if (exist) return false;
  return true;
};
```

## 数独

**不同于以上之处是会修改原始数据，再不断递归修改后的原始数据**

- https://leetcode.cn/problems/valid-sudoku
- https://leetcode.cn/problems/sudoku-solver

```js
var solveSudoku = function (board) {
  _helper(board);
  return board;
};

var isValidSudoku = function (board) {
  /** 1、递归树 */
  /** . -> 1 */
  /** . -> 2 */
  const results = _helper(board);
  return results;
};

var _helper = function (board) {
  for (let i = 0, len1 = board.length; i < len1; i += 1) {
    for (let j = 0, len2 = board[0].length; j < len2; j += 1) {
      /** 3、选择+递归+重置: 剪枝 */
      if (board[i][j] === ".") {
        for (let char = 1; char < 10; char += 1) {
          const isValidChar = _isValid(board, i, j, char.toString());
          if (isValidChar) {
            board[i][j] = char.toString();
            /** 再次递归寻找下一个 . 此步骤是关键 */
            if (_helper(board)) return true;
            else board[i][j] = ".";
          }
        }
        /** 能走到这里说明 1 - 9 所有数字都试了，不管用 */
        return false;
      }
    }
  }
  return true;
};

var _isValid = function (board, row, column, char) {
  for (let i = 0; i < 9; i += 1) {
    if (board[row][i] === char) return false;
    if (board[i][column] === char) return false;
  }
  const m = Math.floor(row / 3);
  const n = Math.floor(column / 3);
  for (let i = m * 3; i < m * 3 + 3; i += 1) {
    for (let j = n * 3; j < n * 3 + 3; j += 1) {
      if (board[i][j] === char) return false;
    }
  }
  return true;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
