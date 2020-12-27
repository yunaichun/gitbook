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

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
