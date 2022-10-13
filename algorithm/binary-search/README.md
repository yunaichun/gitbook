## 简介

> 算法-二分查找学习笔记。

## 二分查找

- leetcode: https://leetcode.cn/problems/sqrtx/

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let [min, max] = [0, x];
  while (true) {
    const mid = (min + max) / 2;
    const midPow = mid * mid;
    if (Math.floor(midPow) === x) return Math.floor(mid);
    else if (midPow > x) max = mid;
    else if (midPow < x) min = mid;
  }
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
