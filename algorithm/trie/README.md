## 简介

> 算法学习笔记。

## js 实现字典树

- leetcode-208: https://leetcode.cn/problems/implement-trie-prefix-tree

```js
var Trie = function () {
  this.root = {};
};

Trie.prototype.insert = function (word) {
  let root = this.root;
  for (let i = 0, len = word.length; i < len; i += 1) {
    const cur = word[i];
    /** 如果没有开辟新的节点, 否则从旧节点后添加 */
    if (!root[cur]) root[cur] = {};
    root = root[cur];
  }
  root["#"] = "#";
};

Trie.prototype.search = function (word) {
  let root = this.root;
  for (let i = 0, len = word.length; i < len; i += 1) {
    const cur = word[i];
    if (!root[cur]) return false;
    root = root[cur];
  }
  if (root["#"] === "#") return true;
  return false;
};

Trie.prototype.startsWith = function (prefix) {
  let root = this.root;
  for (let i = 0, len = prefix.length; i < len; i += 1) {
    const cur = prefix[i];
    if (!root[cur]) return false;
    root = root[cur];
  }
  return true;
};
```

## 单词搜索 II

- https://leetcode.cn/problems/word-search-ii/submissions/

```js
const findWords = function(board, words) {
  const trie = new Trie()
  for (let str of words) trie.insert(str);

  const results = new Set();
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (trie.root[board[i][j]]) _dfs(board, i, j, [board[i][j]], results, [{ x: i, y: j }], trie.root[board[i][j]]);
    }
  }
  return Array.from(results);
}

const around = [[-1, 0], [1, 0], [0, -1], [0, 1]];
var _dfs = function(board, row, col, path, results, visited, trie) {
  if (trie['#'] === '#') results.add(path.join(''));
  for (let i = 0; i < around.length; i += 1) {
    const x = row + around[i][0];
    const y = col +around[i][1];
    if (isValid(board, x, y, visited, trie)) {
      path.push(board[x][y]);
      visited.push({ x, y });
      _dfs(board, x, y, [...path], results, [...visited], trie[board[x][y]]);
      path.pop();
      visited.pop();
    }
  }
}

var isValid = function(board, row, column, visited, trie) {
  const rows = board.length;
  const columns = board[0].length;
  if (row < 0 || row >= rows) return false;
  if (column < 0 || column >= columns) return false;
  if (visited.find(v => v.x === row && v.y === column)) return false;
  if (!trie[board[row][column]]) return false;
  return true;
}

class Trie {
  constructor() {
    this.root = {};
    this.isEnd = false;
  }

  insert(word) {
    let root = this.root;
    for (let i = 0; i < word.length; i += 1) {
      if (!root[word[i]]) root[word[i]] = {};
      root = root[word[i]];
    }
    root["#"] = "#";
  }
}
```
## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
