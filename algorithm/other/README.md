## 简介

> 算法-综合题型笔记。

## 计数质数 (折中满足)

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

##  字符的最短距离 (双向遍历)

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

## 具有给定数值的最小字符串 (贪心)

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

## 缺失的第一个正数 (极端假设)

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
```

## 球队比赛 (递归回溯)

- https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/selected/byte-dance-algo-ex

```js
var answer = function(d1, d2, n, k) {
  const results = [];
  _dfs(d1, d2, n - k, [], results);
  return results.length;
}

var _dfs = function(d1, d2, remain, winners, results) {
  if (remain === 0) {
    if (isValid(d1, d2, winners)) results.push(true);
    return;
  }

  winners.push(1);
  _dfs(d1, d2, remain - 1, [...winners], results)
  winners.pop();

  winners.push(2);
  _dfs(d1, d2, remain - 1, [...winners], results)
  winners.pop();

  winners.push(3);
  _dfs(d1, d2, remain - 1, [...winners], results)
  winners.pop();
}

var isValid = function(d1, d2, winners) {
  const a = winners.filter(i => i === 1).length;
  const b = winners.filter(i => i === 2).length;
  const c = winners.filter(i => i === 3).length;
  /** a - b = d1; b - c = d2 */
  if (b - a === d1 && c - b === d2) return true;
  /** a - b = d1; c - b = d2 */
  if (b - a === d1 && b - c === d2) return true;
  /** b - a = d1; b - c = d2  */
  if (a - b === d1 && c - b === d2) return true;
  /** b - a = d1; c - b = d2  */
  if (a - b === d1 && b - c === d2) return true;
  return false;
}
```

## 转换字符串 (滑动窗口)

- https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/selected/byte-dance-algo-ex


```js
var answer = function(str) {
  return Math.max(longestChar(str, 'a'), longestChar(str, 'b'));
}

var longestChar = function(str, convertChar) {
  /** 滑动窗口结果 */
  let max = 0;
  /** 滑动窗口条件 */
  let total = 0;
  /** 滑动窗口边界 */
  let [left, right] = [0, 0];

  for (; right < str.length; right += 1) {
    if (str[i] === convertChar) total += 1;

    while (total > 1) {
      if (str[left] === convertChar) total -= 1;
      left += 1;
    }

    max = Math.max(max, right - left + 1);
  }
  return max;
}
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
- [系列博客](https://leetcode-solution-leetcode-pp.gitbook.io)
