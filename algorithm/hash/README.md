## 简介

> 算法-哈希表学习笔记。

## 两数之和

- leetcode: https://leetcode.cn/problems/two-sum

```js
/*
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0, len = nums.length; i < len; i += 1) {
    const j = nums.indexOf(target - nums[i]);
    if (j > -1 && i !== j) return [i, j];
  }
};
```

## 三数之和为 0

- leetcode: https://leetcode.cn/problems/3sum

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  nums.sort();
  let results = [];
  for (let i = 0, len = nums.length; i < len - 2; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) continue;
    const thirdMap = {};
    for (let j = i + 1; j < len; j++) {
      const [m, n] = [nums[i], nums[j]];
      /** 记录第三个元素的值应该是多少 */
      if (!thirdMap[n]) {
        thirdMap[-m - n] = { add: false };
      } else if (!thirdMap[n].add) {
        thirdMap[n] = { add: true };
        results.push([m, -m - n, n]);
      }
    }
  }
  return results;
};
```

## 有效字母异同位

- leetcode: https://leetcode.cn/problems/valid-anagram

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  return s.split("").sort().join() === t.split("").sort().join();
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
