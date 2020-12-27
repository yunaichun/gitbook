## 简介

> 算法学习笔记。

## js实现字典树

leetcode-208: https://leetcode.com/problems/implement-trie-prefix-tree

```js
class Trie {
    constructor() {
        this.root = {};
        this.end_of_word = '#';
    }
    insert(word) {
        let node = this.root;
        for (let i in word) {
            if (!node[word[i]]) node[word[i]] = {};
            node = node[word[i]];
        }
        node[this.end_of_word] = this.end_of_word;
    }
    // == 完整匹配
    search(word) {
        let node = this.root;
        for (let i in word) {
            if (!node[word[i]]) return false;
            node = node[word[i]];
        }
        return this.end_of_word in node;
    }
    // == 起点匹配
    startsWith(prefix) {
        let node = this.root;
        for (let i in prefix) {
            if (!node[prefix[i]]) return false;
            node = node[prefix[i]];
        }
        return true;
    }
}

let trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'));  // returns true
console.log(trie.search('app'));     // returns false
console.log(trie.startsWith('app')); // returns true
trie.insert('app');
console.log(trie.search('app'));     // returns true
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
