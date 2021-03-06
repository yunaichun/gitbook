## 简介

> 算法-动态规划学习笔记。

## 爬楼梯最短步数

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

## 零钱兑换最少数量

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
                        // == 相当于初始化，在下一步会被对比的
                        a[i] = a[i - coins[j]] + 1
                    }
                }
            }
        }
        return a[amount] > amount ? -1 : a[amount];
    }
}
```

## 和最大连续子序列值

leetcode: https://leetcode.com/problems/maximum-subarray

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i] 代表以第 i 个元素结尾且和最大的连续子数组
    // == 第二步：状态转移方程：a[i] = Math.max(a[i - 1] + nums[i], nums[i]);
    // == 初始状态：MAX = a[0] = nums[0]
    // == 求 MAX
    maxSubArray(nums) {
        let a = [];
        let MAX = a[0] = nums[0];
        for (let i = 1, len = nums.length; i < len; i++) {
            a[i] = Math.max(a[i - 1] + nums[i], nums[i]);
            MAX = Math.max(a[i], MAX);
        }
        return MAX;
    }
}
```

## 积最大连续子序列值

leetcode: https://leetcode.com/problems/maximum-product-subarray

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i][0] 代表以第 i 个元素结尾且乘积最大的连续子数组、
    // ==                a[i][1] 代表以第 i 个元素结尾且乘积最小的连续子数组
    // == 第二步：状态转移方程：if (nums[i] > 0) a[i][0] = a[i - 1][0] * nums[i]
    // ==                    else            a[i][1] = a[i - 1][1] * nums[i]
    // ==                    MAX = Math.max(a[i][0], a[i][1])
    // == 初始状态：MAX = a[0][0] = a[0][1] = nums[0]
    // == 求 MAX
    maxProduct(nums) {
        let a = [[nums[0], nums[0]]];
        let MAX = nums[0];
        for (let i = 1, len = nums.length; i < len; i++) {
            a[i] = [];
            if (nums[i] > 0) {
                a[i][0] = a[i - 1][0] * nums[i];
                a[i][1] = a[i - 1][1] * nums[i];
            } else {
                a[i][0] = a[i - 1][1] * nums[i];
                a[i][1] = a[i - 1][0] * nums[i];
            }
            MAX = Math.max(a[i][0], MAX);
        }
        return MAX;
    }
}
```

## 最长上升子序列长度

leetcode: https://leetcode.com/problems/longest-increasing-subsequence

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i] 代表以第 i 个元素结尾最长上升子序列的长度
    // == 第二步：状态转移方程：if (nums[j] < nums[i]) a[i] = Math.max(a[i], a[j] + 1)
    // == 初始状态：MAX = a[0] = 1
    // == 求 MAX
    lengthOfLIS(nums) {
        let a = [];
        let MAX = a[0] = 1;
        for (let i = 1, len = nums.length; i < len; i++) {
            // == 因为是不连续，所以要全部比较【类似零钱兑换】
            for (j = 0; j < i; j++) {
                if (a[i]) {
                    if (nums[j] < nums[i]) a[i] = Math.max(a[i], a[j] + 1);
                } else {
                    // == 相当于初始化，在下一步会被对比的
                    a[i] = a[j];
                }
            }
            MAX = Math.max(a[i], MAX);
        }
        return MAX;
    }
}
```

## 三角形从顶到低最小路径和

leetcode: https://leetcode.com/problems/triangle

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i][j] 代表走到第 i 层 第 j 列所需要的最短路径（从最底部走到最顶部）
    // == 第二步：状态转移方程：a[i][j] = Math.min(a[i -1][j], a[i - 1][j + 1]) + triangle[i][j] 
    // == 初始状态：a[m - 1] = triangle[triangle.length - 1]
    // == 求 a[0][0]
    minimumTotal(triangle) {
        let a = [];
        const level = triangle.length;
        // == 第 level 层
        a[level - 1] = triangle[level - 1];
        // == 根据第 level 层推导出第 level - 1 层
        for (let i = level - 2; i > -1; i--) {
            const currentLevel = triangle[i];
            if(!a[i]) a[i] = [];
            for (let j = 0, len = currentLevel.length; j < len; j++) {
                a[i][j] = Math.min(a[i + 1][j] , a[i + 1][j + 1]) + currentLevel[j];
            }
        }
        return a[0][0];
    }
}
```

## 最短编辑距离

leetcode: https://leetcode.com/problems/edit-distance

```js
class Solution {
    constructor() {
    }
    // == 第一步：定义状态：a[i][j] 代表 word1 前 i 个字符转换到 word2 前 j 个字符需要的最少操作步骤（insert、delete、replace）
    // == 第二步：状态转移方程：a[i][j] = Math.min(a[i -1][j], a[i][j - 1], a[i - 1][j - 1]) + 1
    // == 初始状态：a[i][0] = i, a[0][j] = j
    // == 求 a[m][n]
    minDistance(word1, word2) {
        let m = word1.length;
        let n = word2.length;
        let a = [];
        for (let i = 0; i < m + 1; i++) {
            a[i] = [];
            for (let j = 0; j < n + 1; j++) {
                if (i === 0) {
                    a[i][j] = j; 
                } else if (j === 0) {
                    a[i][j] = i; 
                } else {
                    if (word1[i - 1] === word2[j - 1]) {
                        a[i][j] = a[i - 1][j - 1];
                    } else {
                        a[i][j] = Math.min(a[i -1][j], a[i][j - 1], a[i - 1][j - 1]) + 1;
                    }
                }
            }
        }
        return a[m][n];
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
