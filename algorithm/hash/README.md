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

## 比较版本号

- https://leetcode.cn/problems/compare-version-numbers/

```js
var compareVersion = function (version1, version2) {
  version1 = version1.split(".").map((i) => Number(`0.${i}`) * Math.pow(10, i.length));
  version2 = version2.split(".").map((i) => Number(`0.${i}`) * Math.pow(10, i.length));
  let [i, j] = [0, 0];
  while (i < version1.length || j < version2.length) {
    const a = version1[i] || 0;
    const b = version2[i] || 0;
    if (a > b) return 1;
    else if (a < b) return -1;
    [i, j] = [i + 1, j + 1];
  }
  return 0;
};
```

## 字符串相加

- https://leetcode.cn/problems/add-strings/

```js
var addStrings = function(num1, num2) {
  const results = [];
  let [i, j] = [num1.length - 1, num2.length - 1];
  let c = 0;
  while (i >=0 || j >= 0 || c) {
    const a = num1[i] ? num1[i] - 0 : 0;
    const b = num2[j] ? num2[j] - 0 : 0;
    if (a + b + c >= 10) c = 1;
    else c = 0;
    results.unshift((a + b + c) % 10);
    i -= 1;
    j -= 1;
  }
  return results.join('');
};
```

## 字符串相乘

- https://leetcode.cn/problems/multiply-strings/description/

```js
var multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';
  let results = '0';
  let zero = '';
  for (let i = num2.length - 1; i >=0; i -= 1) {
    if (num2[i] - 0) {
      const arr = Array.from({ length: num2[i] }, () => num1);
      let current = arr.reduce((a, b) => addStrings(a, b));
      current += zero;
      results = addStrings(results, current);
    }
    zero += '0';
  }
  return results;
};

var addStrings = function(num1, num2) {
  const results = [];
  let [i, j] = [num1.length - 1, num2.length - 1];
  let c = 0;
  while(i >=0 || j >= 0 || c) {
    const a = num1[i] ? num1[i] - 0 : 0;
    const b = num2[j] ? num2[j] - 0 : 0;
    results.unshift((a + b + c) % 10);
    if (a + b + c >= 10) c = 1;
    else c = 0;
    i -= 1;
    j -= 1; 
  }
  return results.join('');
}
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

## 计数质数

- https://leetcode.cn/problems/count-primes/

```js
var countPrimes = function(n) {
  let count = 0;
  for (let i = 2; i < n; i += 1) {
    if (isValid(i)) count += 1;
  }
  return count;
};

/** a * b = n 则 a 或 b 最小的数一定小于根号 n */
var isValid = function(n) {
  for (let i = 2; i * i <= n; i += 1) {
    if (n % i == 0) return false;
  }
  return true;
}
```

##  字符的最短距离

- https://leetcode.cn/problems/shortest-distance-to-a-character/

```js
var shortestToChar = function(s, c) {
  const results = [];

  /** s[i] 到其左侧最近的字符 c 的距离 */
  let index = -1;
  for (let i = 0; i < s.length; ++i) {
    if (s[i] === c) index = i;
    if (index === -1) results[i] = Infinity;
    else results[i] = i - index;
  }

  /** s[i] 到其右侧最近的字符 c 的距离 */
  index = -1;
  for (let i = s.length - 1; i >= 0; --i) {
    if (s[i] == c) index = i;
    if (index === -1) continue;
    else results[i] = Math.min(results[i], index - i);
  }
  return results;
};
```

## 具有给定数值的最小字符串

- https://leetcode.cn/problems/smallest-string-with-a-given-numeric-value/

```js
var getSmallestString = function(n, k) {
  const results = new Array(n).fill('z');
  for (let i = n - 1; i >= 0; i -= 1) {
    const max = getMax(i, k);
    results[i] = String.fromCharCode(max + 96);
    k = k - max;
  }
  return results.join('');
};

var getMax = function(i, sums) {
  let current = 26;
  while (i + current > sums) {
    current -= 1;
  }
  return current;
}
```

## 缺失的第一个正数

- https://leetcode.cn/problems/first-missing-positive/


```js
 var firstMissingPositive = function(nums) {
  /** 哈希表: a[i - 1] = i */
  /** 极端情况: [1, 2, ... N], 最小的正整数 为 N + 1 */

  const N = nums.length;
  for (let i = 0; i < N; i += 1) {
    /** 把当前元素放在对应的位置上面去: nums[i] 值应该放到 nums[i] -1 位置上面去 */
    while (nums[i] - 1 >= 0 && nums[i] - 1 < N && nums[i] !== nums[nums[i] - 1]) {
      const [a, b] = [nums[i], nums[nums[i] - 1]];
      nums[nums[i] - 1] = a;
      nums[i] = b;
    }
  }

  for (let i = 0; i < N; i += 1) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return N + 1;
};

// nums = [3,4,-1,1]
// [ -1, 4, 3, 1 ]
// [ -1, 1, 3, 4 ]
// [ 1, -1, 3, 4 ]
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
