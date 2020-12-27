## 简介

> 算法-广度优先和深度优先学习笔记。

## 二叉树最大深度

leetcode: https://leetcode.com/problems/maximum-depth-of-binary-tree

#### 深度优先

```js
class Solution {
    constructor() {
    }
    maxDepth(root) {
        if (!root) return 0;
        let max = this._dfs(root);
        return max;
    }
    // == 深度优先 o(n)
    _dfs(root) {
        if (!root) return 0;
        let left = this._dfs(root.left);
        let right = this._dfs(root.right);
        return Math.max(left + 1, right + 1);
    }
}
```

#### 广度优先

```js
class Solution {
    constructor(props) {
    }
    maxDepth(root) {
        if (!root) return 0;
        let result = this._bfs(root);
        return result;
    }
    // == 广度优先 o(n)
    _bfs(root) {
        let level = 0;
        let queue = [];
        queue.push(root);
        while(queue.length) {
            level++;
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const current = queue[i];
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
            }
            queue = queue.slice(levelSize)
        }
        return level;
    }
}
```

## 二叉树最小深度

leetcode: https://leetcode.com/problems/minimum-depth-of-binary-tree

#### 深度优先

```js

class Solution {
    constructor() {
    }
    maxDepth(root) {
        if (!root) return 0;
        let result = this._dfs(root);
        return result;
    }
    // == 深度优先 o(n)
    _dfs(root) {
        if (!root) return 0;
        let left = this._dfs(root.left);
        let right = this._dfs(root.right);
        if (!root.left) return right + 1;
        if (!root.right) return left + 1;
        return Math.min(left, right) + 1;
    }
}
```

#### 广度优先

```js
class Solution {
    constructor() {
    }
    maxDepth(root) {
        if (!root) return 0;
        let result = this._bfs(root);
        return result;
    }
    // == 广度优先 o(n)
    _bfs(root) {
        let level = 0;
        let queue = [];
        queue.push(root);
        while(queue.length) {
            level++;
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const current = queue[i];
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
                if (!current.right && !current.right) {
                    return level
                }
            }
            queue = queue.slice(levelSize)
        }
    }
}
```

## 二叉树按照level输出

leetcode: https://leetcode.com/problems/binary-tree-level-order-traversal

#### 深度优先

```js
class Solution {
    constructor() {
    }
    levelOrder(root) {
        if (!root) return [];
        let result = this._dfs(root, [], 0);
        return result;
    }
    // == 深度优先 o(n)
    _dfs(root, result = [], level = 0) {
        if (!root) return;
        if (!result[level]) result[level] = [];
        result[level].push(root.val);
        this._dfs(root.left, result, level + 1);
        this._dfs(root.right, result, level + 1);
        return result;
    }
}
```

#### 广度优先

```js
class Solution2 {
    constructor() {
    }
    levelOrder(root) {
        if (!root) return [];
        let result = this._bfs(root);
        return result;
    }
    // == 广度优先 o(n)
    _bfs(root) {
        let result = [];
        let queue = [];
        queue.push(root);
        while(queue.length) {
            let currentLevel = [];
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const current = queue[i];
                currentLevel.push(current.val);
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
            }
            result.push(currentLevel)
            queue = queue.slice(levelSize)
        }
        return result;
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
