## 简介

> 算法-哈希表学习笔记。

## 两数之和

- leetcode: https://leetcode.cn/problems/two-sum

```js
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
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  nums.sort();
  const results = [];
  for (let i = 0, len = nums.length; i < len - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let obj = {};
    /** 循环遍历第二个元素 */
    for (let j = i + 1; i < len; i += 1) {
      const one = nums[i];
      const two = nums[j];
      const three = 0 - one - two;
      /** 根据第二个元素确定第三个应该的元素 */
      if (!obj[two]) {
        obj[three] = { add: false };
      } else if (!obj[two].add) {
        obj[two] = { add: true };
        results.push([one, two, three]);
      }
    }
  }
  return results;
};
```

## 有效字母异同位

- leetcode: https://leetcode.cn/problems/valid-anagram

```js
var isAnagram = function (s, t) {
  return s.split("").sort().join() === t.split("").sort().join();
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
