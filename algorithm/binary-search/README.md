## 简介

> 算法-二分查找学习笔记。

## 平方根

- leetcode: https://leetcode.cn/problems/sqrtx/

```js
var mySqrt = function (x) {
  if (x === 1) return 1;
  let [min, max] = [0, x];
  while (true) {
    if (max - min === 1) return min;
    const mid = Math.floor((min + max) / 2);
    const midPow = mid * mid;
    if (midPow === x) return mid;
    else if (midPow < x) min = mid;
    else if (midPow > x) max = mid;
  }
};
```

## 二分查找

- leetcode: https://leetcode.cn/problems/binary-search/

```js
var search = function (nums, target) {
  let [min, max] = [0, nums.length];
  while (true) {
    if (max - min === 1 && nums[min] !== target && nums[max] !== target)
      return -1;
    const mid = Math.floor((min + max) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) min = mid;
    else if (nums[mid] > target) max = mid;
  }
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
