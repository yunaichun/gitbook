## 简介

> 算法-哈希表学习笔记。

## 两数之和

- leetcode: https://leetcode.cn/problems/two-sum

```js
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    const j = nums.indexOf(target - nums[i]);
    if (j > -1 && j !== i) return [i, j];
  }
};
```

## 三数之和为 0

- leetcode: https://leetcode.cn/problems/3sum

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
      /** 第二个元素被当作第三个元素来使用 */
      if (!thirdMap[second]) {
        thirdMap[0 - first - second] = { useed: false };
      } else if (!thirdMap[second].useed) {
        thirdMap[second] = { useed: true };
        results.push([first, second, 0 - first - second]);
      }
    }
  }
  return results;
};
```

## 字符串相加

- leetcode: https://leetcode.cn/classic/problems/add-strings/description/

```js
```

## 字符串相乘

- leetcode: https://leetcode.cn/classic/problems/multiply-strings/description/

```js
```

## 缺失的第一个正数

- leetcode: https://leetcode.cn/problems/first-missing-positive/

```js
 var firstMissingPositive = function(nums) {
  /** 哈希表: a[i - 1] = i */
  /** 极端情况: [1, 2, ... N], 最小的正整数 为 N + 1 */

  const N = nums.length;
  for (let i = 0; i < N; i += 1) {
    /** 把当前元素放在对应的位置上面去: nums[i] 应该放到 nums[nums[i] -1] 位置上面去 */
    while (nums[i] >= 1 && nums[i] <= N && nums[i] !== nums[nums[i] - 1]) {
      const [a, b] = [nums[nums[i] - 1], nums[i]];
      nums[nums[i] - 1] = b;
      nums[i] = a;
    }
  }

  for (let i = 0; i < N; i += 1) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return N + 1;
};
```

## 多数元素

- https://leetcode.com/problems/majority-element

```js
var majorityElement = function(nums) {
  const elements = new Map();
  let max = 1;
  let num = null;
  for (let i = 0; i < nums.length; i += 1) {
    if (!elements.has(nums[i])) elements.set(nums[i], 1);
    else elements.set(nums[i], elements.get(nums[i]) + 1);
    max = Math.max(elements.get(nums[i]), max);
    if (elements.get(nums[i]) >= max) {
      max = elements.get(nums[i]);
      num = nums[i];
    }
  }
  return num;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
