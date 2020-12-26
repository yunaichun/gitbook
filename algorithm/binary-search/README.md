## 简介

> 算法-二分查找学习笔记。

## 二分查找

leetcode: https://leetcode.com/problems/sqrtx/

```js
class Solution {
    constructor() {
    }
    // == o(log(2, x))
    mySqrt(x) {
        let [min, max] = [0, x];
        while (true) {
            let mid = Math.ceil((min + max)/2);
            const midPow2 = mid * mid;
            if (midPow2 === x) {
                return mid;
            } else if (min + 1 === max) {
                return min;
            } else if (midPow2 < x) {
                min = mid;
            } else if (midPow2 > x) {
                max = mid;
            }
        }
    }
}
var a = new Solution()
console.log(a.mySqrt(1))
console.log(a.mySqrt(8))
console.log(a.mySqrt(9))
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
