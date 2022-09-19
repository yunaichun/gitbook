## 简介

> 算法-二叉树学习笔记。

## js实现二叉树

```js
function Node(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = function() {
        return this.data
    };
}

// == 二叉搜索树默认是中序排序：左 -> 根 -> 右
class BST {
    constructor() {
        this.head = new Node();
    }
    // == 插入
    insert(sourceNode) {
        let first = this.head;
        if (first.data === null && first.left === null && first.right === null) {
            this.head = sourceNode;
        } else {
            while (true) {
                if (sourceNode.data < first.data) {
                    if (first.left === null) {
                        first.left = sourceNode;
                        break;
                    } else {
                        first = first.left;
                    }
                } else {
                    if (first.right === null) {
                        first.right = sourceNode;
                        break;
                    } else {
                        first = first.right;
                    }
                }
            }
        }
    }
    // == 前序：根 -> 左 -> 右
    preOrder(node) {
        if (node) {
            console.log(node.show() + '');
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    // == 中序：左 -> 根 -> 右
    inOrder(node) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.show() + '');
            this.inOrder(node.right);
        }
    }
    // == 后序：左 -> 右 -> 根
    postOrder(node) {
        if (node) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.show() + '');
        }
    }
    getMin() {
        let first = this.head;
        while (first.left) {
            first = first.left
        }
        return first;
    }
    getMax() {
        let first = this.head;
        while (first.right) {
            first = first.right
        }
        return first;
    }
}

let a = new Node(1)
let b = new Node(2)
let c = new Node(3)
let list = new BST()
list.insert(a)
list.insert(b)
list.insert(c)
console.log(list)
console.log(list.preOrder(list.head))
```

## 验证是否是BST

leetcode: https://leetcode.cn/problems/validate-binary-search-tree

```js
class Solution {
    constructor() {
    }
    // == root 为 BST 实例
    // == 方法一：左 < 根 < 右
    isValidBST(root) {
        if (root.left) {
            if (root.val > root.left.val) { 
                return this.isValidBST(root.left);
            } else {
                return false;
            }
        }
        if (root.right) {
            if (root.val < root.right.val) { 
                return this.isValidBST(root.right);
            } else {
                return false;
            }
        }
        return true;
    }
}
```

## BST最近公共祖先

leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree

```js
class Solution {
    constructor() {
    }
    lowestBSTAncestor(root, p, q) {
        if (root === null) {
            return null;
        } else {
            if (root.val > p.val && root.val > q.val) {
                return this.lowestBSTAncestor(root.left, p, q);
            }
            if (root.val < p.val && root.val < q.val) {
                return this.lowestBSTAncestor(root.right, p, q);
            }
            return root;
        }
    }
}
```

## 普通树最近公共祖先

leetcode: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree

```js
class Solution {
    constructor() {
    }
    lowestCommonAncestor(root, p, q) {
        if (root === null) {
            return null;
        } else {
            // == root 为 q 或为 p，代表找到了
            if(root === p || root === q) return root;
            // == root 即不为 q 也不为 p
            let left = lowestCommonAncestor(root.left, p, q);
            let right = lowestCommonAncestor(root.right, p, q);
            if (left === null) return right;
            if (right === null) return left;
            // == left 和 right 均不为 null，则 left 和 right 是 root 左右子树
            return root;
        }
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
