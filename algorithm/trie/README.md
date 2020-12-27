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

## 单词搜索

leetcode-79: https://leetcode.com/problems/word-search
leetcode-212: https://leetcode.com/problems/word-search-ii

```js
class Solution {
    constructor() {
        this.result = [];
        this.END_OF_WORD = '#';
        // == 横坐标：左、右、上、下
        this.dx = [-1, 1, 0, 0];
        // == 纵坐标：左、右、上、下
        this.dy = [0, 0, -1, 1];
    }
    exist(board, word) {
        let result = this.findWords(board, [word]);
        return result.length;
    }
    findWords(board, words) {
        if (!board.length || !board[0].length) return [];
        if (!words) return [];
        // == 构建 Trie 树
        let root = {};
        for (let i = 0, len = words.length; i < len; i++) {
            let node = root;
            for (let j = 0, len = words[i].length; j < len; j++) {
                if (!node[words[i][j]]) node[words[i][j]] = {}
                node = node[words[i][j]]
            }
            node[this.END_OF_WORD] = this.END_OF_WORD;
        }
        // == 深度递归
        for (let row = 0, len = board.length; row < len; row++) {
            for (let col = 0, len = board[row].length; col < len; col++) {
                if (board[row][col] in root) {
                    this._dfs(board, row, col, "", root);
                }
            }
        }
        return this.result;             
    }
    // == 深度优先 o(n)
    _dfs(board, row, col, cur_word, cur_dict) {
        cur_word += board[row][col];
        cur_dict = cur_dict[board[row][col]];
        if (this.END_OF_WORD in cur_dict) {
            this.result.push(cur_word);
        }
        let temp = board[row][col];
        // == 避免下一次再回来
        board[row][col] = '@';
        let m = board.length;
        let n = board[0].length;
        // == 横坐标与纵坐标进行左右上下变换
        for (let i = 0; i < 4; i++) {
            let x = row + this.dx[i];
            let y = col + this.dy[i];
            if (
                x >= 0 && x < m &&
                y >=0 && y < n &&
                board[x][y] !== '@' &&
                (board[x][y] in cur_dict)
            ) {
                this._dfs(board, x, y, cur_word, cur_dict); 
            }
        }
        // == 再复原
        board[row][col] = temp;
    }
}

let board = [
    ["o","a","a","n"],
    ["e","t","a","e"],
    ["i","h","k","r"],
    ["i","f","l","v"]
]
let words = ["oath","pea","eat","rain"]
let a = new Solution()
console.log(a.findWords(board, words));
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
