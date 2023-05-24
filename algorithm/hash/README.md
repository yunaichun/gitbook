## 简介

> 算法-哈希表学习笔记。

## 两数之和

- https://leetcode.cn/problems/two-sum

```js
var twoSum = function(nums, target) {
  const secondMap = {};
  for (let i = 0; i < nums.length; i += 1) {
    const first = nums[i];
    /** 第 1 个元素被当作第 2 个元素来使用 */
    if (!secondMap[first]) {
      /** 剩余元素待寻找的第 2 个元素*/
      secondMap[target - first] = { index: i };
    } else  {
      /** 第 2 个元素已找到 */
      return [i, secondMap[first].index];
    }
  }
  return [];
};
```

## 三数之和为 0

- https://leetcode.cn/problems/3sum

```js
var threeSum = function(nums) {
  nums = nums.sort();
  const results = [];
  for (let i = 0; i < nums.length - 2; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    const first = nums[i];
    const thirdMap = {};
    for (let j = i + 1; j < nums.length; j += 1) {
      const second = nums[j];
      /** 第 2 个元素被当作第 3 个元素来使用 */
      if (!thirdMap[second]) {
        /** 剩余元素待寻找的第 3 个元素*/
        thirdMap[0 - first - second] = { foundAndUsed: false };
      } else if (!thirdMap[second].foundAndUsed) {
        /** 第 3 个元素已找到, 后续还有一样的第 3 个元素忽略 */
        thirdMap[second] = { foundAndUsed: true };
        results.push([first, second, 0 - first - second]);
      }
    }
  }
  return results;
};
```

## 两个数组交集

- https://leetcode.cn/problems/intersection-of-two-arrays/
- https://leetcode.cn/problems/intersection-of-two-arrays-ii/

```js
var intersect = function(nums1, nums2) {
  const elements = new Map();
  for (let item of nums1) {
    if (!elements.has(item)) elements.set(item, 1);
    else elements.set(item, elements.get(item) + 1);
  }
  const results = [];
  for (let item of nums2) {
    if (elements.has(item)) {
      results.push(item);
      elements.set(item, elements.get(item) - 1);
      if (elements.get(item) === 0) elements.delete(item);
    }
  }
  return results;
};
```

## 多数元素

- https://leetcode.cn/problems/majority-element

```js
var majorityElement = function(nums) {
  const elements = new Map();
  let max = 1;
  let num = null;
  for (let i = 0; i < nums.length; i += 1) {
    if (!elements.has(nums[i])) elements.set(nums[i], 1);
    else elements.set(nums[i], elements.get(nums[i]) + 1);
    max = Math.max(elements.get(nums[i]), max);
    if (elements.get(nums[i]) >= max) num = nums[i];
  }
  return num;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
- [系列博客](https://leetcode-solution-leetcode-pp.gitbook.io)
