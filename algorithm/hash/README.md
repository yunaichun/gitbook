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

## 众数

- https://leetcode.com/problems/majority-element

```js
var majorityElement = function (nums) {
  const map = new Map();
  let [maxCount, maxNum] = [0, null];
  for (let i = 0, len = nums.length; i < len; i++) {
    if (map.has(nums[i])) map.set(nums[i], map.get(nums[i]) + 1);
    else map.set(nums[i], 1);
    const currentCount = map.get(nums[i]);
    if (currentCount > maxCount) {
      maxCount = currentCount;
      maxNum = nums[i];
    }
  }
  return maxNum;
};
```

## 缺失的第一个正数

- leetcode: https://leetcode.cn/problems/first-missing-positive/

```js
var firstMissingPositive = function (nums) {
  /** 哈希表: a[i - 1] = i */
  /** 极端情况: [1, 2, ... N], 最小的正整数 为 N + 1 */

  const N = nums.length;
  for (let i = 0; i < N; i += 1) {
    /** 把当前元素放在对应的位置上面去: nums[i] 应该放到 nums[nums[i] -1] 位置上面去 */
    while (nums[i] >= 1 && nums[i] <= N && nums[i] !== nums[nums[i] - 1]) {
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  for (let i = 0; i < N; i += 1) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return N + 1;
};
```

## 滑动窗口

- 最小覆盖子串: https://leetcode.cn/problems/minimum-window-substring/
- https://leetcode.cn/problems/M1oyTv/
- 最短超串: https://leetcode.cn/problems/shortest-supersequence-lcci/
- 变位词判断: https://leetcode.cn/problems/permutation-in-string/
- https://leetcode.cn/problems/MPnaiL/
- 变位词索引: https://leetcode.cn/problems/find-all-anagrams-in-a-string/
- https://leetcode.cn/problems/VabMRr/

```js
var minWindow = function (s, t) {
  if (t.length > s.length) return "";

  const elements = new Map();
  for (let char of t) {
    if (elements.has(char)) elements.set(char, elements.get(char) + 1);
    else elements.set(char, 1);
  }
  let totalElemets = elements.size;

  let min = "";
  let [left, right] = [0, 0];
  /** 1、不断增加 right 使滑动窗口增大，直到窗口包含了 t 的所有元素 */
  for (; right < s.length; right += 1) {
    let char = s[right];
    if (elements.has(char)) {
      elements.set(char, elements.get(char) - 1);
      if (elements.get(char) === 0) totalElemets -= 1;
    }

    for (; totalElemets === 0; left += 1) {
      /** 2、包含所有元素之后记录结果 */
      const newMin = s.slice(left, right + 1);
      if (!min || newMin.length < min.length) min = newMin;

      /** 3、不断增加 left 使滑动窗口缩小，直到窗口包含了 t - 1 个元素 */
      const char = s[left];
      if (elements.has(char)) {
        elements.set(char, elements.get(char) + 1);
        if (elements.get(char) === 1) totalElemets += 1;
      }
    }
  }

  return min;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
