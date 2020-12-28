## 简介

> 算法-动态规划学习笔记。

## 爬楼梯

leetcode: https://leetcode.com/problems/climbing-stairs

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i] 代表爬到 i 层楼梯的走法的总数
    // == 第二步：状态转移方程：a[i] = a[i -1 ] + a[i - 2]
    // == 初始状态：a[0] = 1, a[1] = 2
    // == 求 a[n-1]
    climbStairs(n) {
        let a = [];
        a[0] = 1;
        a[1] = 2;
        for (let i = 2; i < n; i++) {
            a[i] = a[i - 1] + a[i - 2]
        }
        return a[n - 1];
    }
}
```

## 零钱兑换

leetcode: https://leetcode.com/problems/coin-change

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i] 代表组成 i 数量的钱所需的最少硬币的数量
    // == 第二步：状态转移方程：a[i] = Math.min(a[i], a[i - coins[j] + 1])
    // == 初始状态：a[0] = 0
    // == 求 a[i]
    coinChange(coins, amount) {
        let a = [];
        a[0] = 0;
        for (let i = 1; i < amount + 1; i++) {
            for (let j = 0; j < coins.length; j++) {
                if (i - coins[j] > -1) {
                    if (a[i]) {
                        a[i] = Math.min(a[i],  a[i - coins[j]] + 1);
                    } else {
                        a[i] = a[i - coins[j]] + 1
                    }
                }
            }
        }
        return a[amount] > amount ? -1 : a[amount];
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
