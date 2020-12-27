## 简介

> 算法-递归分治学习笔记。

## n次幂

leetcode: https://leetcode.com/problems/powx-n

```js
class Solution {
    // == 递归: o(log(2, n))
    myPow(x, n) {
        if (n === 0) return 1;
        if (n < 0) return 1 / this.myPow(x, -n);
        if (n % 2 === 0) {
            return this.myPow(x*x, n/2);
        } else {
            return x * this.myPow(x, n - 1);
        }
    }
}

class Solution2 {
    // == 动态规划: o(log(n))
    myPow(x, n) {
        let arr = [1]
        for (let i = 1; i < n + 1; i++) {
            arr[i] = arr[i - 1] * x
        }
        return arr[n];
    }
}
```

## 众数

leetcode: https://leetcode.com/problems/majority-element

```js
// == 递归实现参考: https://github.com/yunaichun/javascript-note/blob/master/数据结构与算法/极客时间/递归/众数/javascript.js
class Solution2 {
    constructor() {
    }
    // == 摩尔投票法 o(n)
    majorityElement(nums) {
        let candidate = nums[0];
        let iTimes = 1;
        for (let i = 1, len = nums.length; i < len; i++) {
            if (iTimes === 0) {
                candidate = nums[i];
                iTimes = 1;
            } else {
                // == 相同则加1，不同则抵消掉1个
                if (nums[i] === candidate) {
                    iTimes++;
                } else {
                    iTimes--;
                }
            }
            
        }
        return candidate;
    }
}
```

## 有效括号组合

leetcode: https://leetcode.com/problems/generate-parentheses

```js
class Solution {
    constructor() {
    }
    generateParenthesis(n) {
        let result = this._helper(0, 0, n, "", []);
        return result;
    }
    _helper(leftUsed, rightUsed, n, current = "", result = []) {
        if (leftUsed === n && rightUsed === n) {
            result.push(current);
            return;
        }
        if (leftUsed < n) {
            this._helper(leftUsed + 1, rightUsed, n, current + '(', result);
        }
        if (rightUsed < n && rightUsed < leftUsed) {
            this._helper(leftUsed, rightUsed + 1, n, current + ')', result)
        }
        return result;
    }
}
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

## 岛屿个数

- leetcode: https://leetcode.com/problems/number-of-islands/
- leetcode: https://leetcode.com/problems/friend-circles/

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
