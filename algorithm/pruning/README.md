## 简介

> 算法-剪枝学习笔记。

## 数独

- leetcode-36: https://leetcode.cn/problems/valid-sudoku
- leetcode-37: https://leetcode.cn/problems/sudoku-solver

```js
class Solution {
    constructor() {
    }
    isValidSudoku(board) {
        let res = this._dfs(board);
        console.log(board);
        return res;
    }
    solveSudoku(board) {
        this._dfs(board);
        return board;
    }
    // == 深度优先 o(n)
    _dfs(board) {
        for(let i = 0, len = board.length; i < len; i++) {
            for(let j = 0, len = board[i].length; j < len; j++) {
                if (board[i][j] === '.') {
                    for (let char = 1; char < 10; char++) {
                        if (this.isValidChar(board, i, j, char.toString())) {
                            board[i][j] = char.toString();
                            if (this._dfs(board)) {
                                // == i, j 位置放上 char 之后，下一步符合条件
                                return true;
                            } else {
                                // == i, j 位置放上 char 之后，下一步不符合条件的话要重置
                                board[i][j] = '.';
                            }
                        }
                    }
                    // == i, j 位置放上 char 所有可能之后都不返回 true 的话，是不合法的数独
                    return false;
                }
            }
        }
        // == i, j 所有位置都遍历完之后不抛出 false，代表是合法的数独
        return true;
    }
    isValidChar(board, row, col, char) {
        for (let i = 0; i < 9; i++) {
            // == 同一列不能一样
            if (board[i][col] === char) return false;
            // == 同一行不能一样
            if (board[row][i] === char) return false;
        }
        // == 3*3不能一样
        let m = Math.floor(row / 3);
        let n = Math.floor(col / 3);
        for (let i = m * 3; i < m * 3 + 3; i++) {
            for (let j = n * 3; j < n * 3 + 3; j++) {
                if (board[i][j] === char) return false;
            }
        }
        return true;
    }
}

let board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];
var a = new Solution();
console.log(a.isValidSudoku(board))
```

## N皇后

- leetcode-51: https://leetcode.cn/problems/n-queens
- leetcode-52: https://leetcode.cn/problems/n-queens-ii

```js
class Solution {
    constructor() {
        this.lie = [];
        this.pie = [];
        this.na = [];
        this.result = [];
    }
    totalNQueens(n) {
        this.result = [];
        this._dfs(n, 0, []);
        console.log(this.result);
        return this.result.length;
    }
    solveNQueens(n) {
        this.result = [];
        this._dfs(n, 0, []);
        let res = this._generate_result(this.result, n);
        return res;
    }
    // == 深度优先 o(n)
    _dfs(n, row, cur_solve) {
        if (row === n) {
            // == cur_solve 是数组，要注意数组的引用传递
            this.result.push(JSON.parse(JSON.stringify(cur_solve)));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (
                this.lie.indexOf(col) > -1 ||
                this.pie.indexOf(row + col) > -1 ||
                this.na.indexOf(row - col) > -1
            ) {
                continue;
            }
            cur_solve.push({row, col})
            // == 添加剪枝：当前行列被选择后下一行受影响的正方格
            this.lie.push(col);
            this.pie.push(row + col);
            this.na.push(row - col);
            // == 下一行
            this._dfs(n, row + 1, cur_solve);
            // == 下一行全部列走完之后，回归到当前行的下一列的时候，要将当前行列存储的信息清空
            this.lie.pop();
            this.pie.pop();
            this.na.pop();
            cur_solve.pop();
        }
    }
    _generate_result(data, n) {
        let res = data.map(item => {
            return item.map(item => {
                let str = '';
                for (let i = 0; i < n; i++) {
                    if (i === item.col) str += 'Q';
                    else str += '.';
                }
                return str;
            })
        });
        return res;
    }
}

var a = new Solution();
console.log(a.totalNQueens(4));
console.log(a.solveNQueens(4));
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
