## 简介

> 算法学习笔记。

## js 实现字典树

- leetcode-208: https://leetcode.cn/problems/implement-trie-prefix-tree

```js
var Trie = function () {
  this.root = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let root = this.root;
  for (let i = 0, len = word.length; i < len; i += 1) {
    const cur = word[i];
    if (!root[cur]) root[cur] = {};
    root = root[cur];
  }
  root["#"] = "#";
};

/**
 * @param {string} word
 * @return {boolean}
 */
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

/**
 * @param {string} prefix
 * @return {boolean}
 */
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

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
