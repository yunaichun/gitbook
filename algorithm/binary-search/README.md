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

- https://leetcode.cn/problems/binary-search/submissions/

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const len = nums.length;
  let [min, max] = [0, len - 1];
  while (true) {
    if (max === min && nums[min] !== target) return -1;
    const mid = Math.floor((min + max) / 2);
    if (target === nums[mid]) return mid;
    else if (target < nums[mid]) max = mid;
    else if (target > nums[mid]) min = mid + 1;
  }
};
// nums = [1, 3] target = 3 => min = mid + 1; => min = max = 1
// nums = [1, 3] target = 1 => max = mid; => min = max = 0
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
