## 简介

> 算法-二分查找学习笔记。

- 精确匹配
  - 循环体内满足条件直接返回
- 收缩逼近
  - 循环体内满足条件不直接返回, 如果满足条件收缩 right, 则循环结束后返回 left (会往前嗅探查找更左的, 如果没有嗅探到循环结束 left 也会在第一次查找的位置)
  - 循环体内满足条件不直接返回, 如果满足条件收缩 left, 则循环结束后返回 right (会往后嗅探查找更右的, 如果没有嗅探到循环结束 right 也会在第一次查找的位置)
- 终止条件不含等于(即 left < right)
  - 满足条件: 循环体内如果每次收缩可取边界的情况(即 left = mid 或 right = mid)

## 二分查找 (精确匹配)

- leetcode: https://leetcode.cn/problems/binary-search/

```js
var search = function (nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    } 
  }
  return -1;
};
```

## 完全平方数 (精确匹配)

- https://leetcode.cn/problems/valid-perfect-square/

```js
var isPerfectSquare = function(num) {
  let [left, right] = [0, num];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const res = mid * mid;
    if (res < num) {
      left = mid + 1;
    } else if (res > num) {
      right = mid - 1;
    } else {
      return true;
    }
  }
  return false;
};
```

## 猜数字大小 (精确匹配)

- leetcode: https://leetcode.cn/problems/guess-number-higher-or-lower/

```js
var guessNumber = function(n) {
  let [left, right] = [1, n];
  while (left <= right) {
    const mid = Math.floor((right + left) / 2);
    if (guess(mid) === -1) {
      right = mid - 1;
    } else if (guess(mid) === 1) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
};
```

## 第一个错误版本 (收缩逼近)

- https://leetcode.cn/problems/first-bad-version/

```js
var solution = function(isBadVersion) {
  return function(n) {
    let [left, right] = [0, n];
    while(left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (isBadVersion(mid)) {
        /** 满足条件: 继续收缩 right, 看看左边是否还有错误的版本 */
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    /** 循环结束: left 比 right 大 1 */
    return left;
  };
};
```

## 寻找比目标字母大的最小字母 (收缩逼近)

- https://leetcode.cn/problems/find-smallest-letter-greater-than-target/

```js
var nextGreatestLetter = function(letters, target) {
  let [left, right] = [0, letters.length - 1];
  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (letters[mid].charCodeAt() < target.charCodeAt()) {
      left = mid + 1;
    } else if (letters[mid].charCodeAt() > target.charCodeAt()) {
      right = mid - 1;
    } else {
      /** 相等: 继续收缩 left, 看看右边是否比它大 */
      left = mid + 1
    }
  }
  if (!letters[left]) return letters[0];
  /** 循环结束: left 比 right 大 1 */
  return letters[left];
};
```

## 查找元素第一个和最后一个位置 (收缩逼近)

- leetcode: https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/

```js
var searchRange = function(nums, target) {
  const left = searchLeft(nums, target);
  const right = searchRight(nums, target);
  return [left, right];
};

var searchLeft = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      /** 满足条件: 继续收缩 right, 看看左边是否还有 */
      right = mid - 1;
    }
  }
  if (nums[left] != target) return -1;
  /** 循环结束: left 比 right 大 1 */
  return left;
}

var searchRight = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      /** 满足条件: 继续收缩 left, 看看右边是否还有 */
      left = mid + 1;
    }
  }
  if (nums[right] != target) return -1;
  /** 循环结束: left 比 right 大 1 */
  return right;
}
```

## 搜索插入位置 (收缩逼近)

- leetcode: https://leetcode.cn/problems/search-insert-position/

```js
var searchInsert = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      /** 满足条件: 继续收缩 right, 看看左边是否还有 */
      right = mid - 1;
    }
  }
  /** 循环结束: left 比 right 大 1 */
  return left;
};
```

## 找出数组排序后的目标下标 (收缩逼近)

- leetcode: https://leetcode.cn/problems/find-target-indices-after-sorting-array/

```js
var targetIndices = function(nums, target) {
  nums = nums.sort((a, b)=> a - b);
  const index = searchLeft(nums, target);
  if (index === -1) return [];
  const results = [];
  for (let i = index; ;i += 1) {
    if (nums[i] !== target) break;
    results.push(i);
  }
  return results;
};

var searchLeft = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      /** 满足条件: 继续收缩 right, 看看左边是否还有 */
      right = mid - 1;
    }
  }
  if (nums[left] !== target) return -1;
  /** 循环结束: left 比 right 大 1 */
  return left;
}
```



## 找到 K 个最接近的元素 (收缩逼近)

- https://leetcode.cn/problems/find-k-closest-elements/

```js
var findClosestElements = function (arr, k, x) {
  let [left, right] = [0, arr.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  [left, right] = [right, left];

  const results = [];
  while (k) {
    let isLeft = true;
    if (0 <= left && right < arr.length) {
      isLeft = x - arr[left] <= arr[right] - x;
    } else if (right < arr.length) {
      isLeft = false;
    }

    if (isLeft) {
      results.unshift(arr[left]);
      left -= 1;
    } else {
      results.push(arr[right]);
      right += 1;
    }
    k -= 1;
  }
  return results;
};
```

## 平方根 (精确匹配 + 收缩逼近)

- leetcode: https://leetcode.cn/problems/sqrtx/

```js
var mySqrt = function (x) {
  let [left, right] = [0, x];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const sqrt = mid * mid;
    if (sqrt < x) {
      left = mid + 1;
    } else if (sqrt > x) {
      right = mid - 1;
    } else {
      /** 满足条件直接返回 */
      return mid;
    }
  }
  /** 循环结束: left 比 right 大 1 */
  return right;
};
```

## 排列硬币 (精确匹配 + 收缩逼近)

- leetcode: https://leetcode.cn/problems/arranging-coins/

```js
var arrangeCoins = function(n) {
  let [left, right] = [0, n];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const max = (1 + mid) * mid / 2;
    if (max < n) {
      left = mid + 1;
    } else if (max > n) {
      right = mid - 1;
    } else {
      /** 满足条件直接返回 */
      return mid;
    }
  }
  /** 循环结束: left 比 right 大 1 */
  return right;
};
```

## 旋转排序数组搜索 (精确匹配 + 收缩逼近)

- leetcode: https://leetcode.cn/problems/search-in-rotated-sorted-array/
- leetcode: https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/

```js
var search = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return true;
    /** nums[mid] 与 nums[left] 值相同, 有个替代品 mid, 舍弃掉 left */
    while (left < mid && nums[mid] === nums[left]) {
      left += 1;
    }
    /** nums[mid] 与 nums[right] 值相同, 有个替代品 mid, 舍弃掉 right */
    while (right > mid && nums[mid] === nums[right]) {
      right -= 1;
    }
    if (nums[mid] < nums[left]) {
      /** 假如 mid 小于 left, 则 mid 一定在右边有序或无序部分, 即 [mid, end] 部分有序 */
      if (nums[mid] < target && target <= nums[right]) {
        /** 一定在右侧有序部分 */
        left = mid + 1;
      } else {
        /** 排除在右侧有序部分, 则右侧收缩 */
        right = mid - 1;
      }
    } else {
      /** 假如 mid 大于 left, 则 mid 一定在左边有序或无序部分, 即 [start, mid] 部分有序 */
      if (nums[left] <= target && target < nums[mid]) {
        /** 一定在左侧有序部分 */
        right = mid - 1;
      } else {
        /** 排除在左侧有序部分, 则左侧收缩 */
        left = mid + 1;
      }
    }
  }
  return false;
};
```

## 旋转排序数组最小值 (精确匹配 + 收缩逼近 + 终止条件不含等于)

- leetcode: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/
- leetcode: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/

```js
var findMin = function (nums) {
  let [left, right] = [0, nums.length - 1];
  while (left < right) {
    if (nums[left] < nums[right]) return nums[left];
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[left]) {
      /** 满足条件: 一定在左边; 继续收缩 right, 看看左边是否还有 */
      right = mid;
    } else if (nums[mid] > nums[left]) {
      /** 一定不在左边 */
      left = mid + 1;
    } else {
      /** nums[mid] 与 nums[left] 值相同, 有个替代品 mid, 舍弃掉 left */
      left = left + 1;
    }
  }

  return nums[left];
};
```

## 寻找重复数 (收缩逼近 + 终止条件不含等于)

- https://leetcode.cn/problems/find-the-duplicate-number/

```js
var findDuplicate = function (nums) {
  /** left 和 right 代表 nums 每一项数据值的范围; 完全不重复极端情况: [1, 2, ..., N + 1] */
  let [left, right] = [1, nums.length];
  while (left < right) {
    const mid = Math.floor((right + left) / 2);
    let count = 0;
    for (let i = 0; i < nums.length; i += 1) {
      if (nums[i] <= mid) count += 1;
    }
    if (count <= mid) {
      /** 一定不在左边 */
      left = mid + 1;
    } else if (count > mid) {
      /** 满足条件: 一定在左边, 继续收缩 right, 看看左边是否还有 */
      right = mid;
    }
  }

  return left;
};
```

## 分割数组的最大值 (收缩逼近 + 终止条件不含等于)

- https://leetcode.cn/problems/split-array-largest-sum/

```js
var splitArray = function(nums, k) {
  /** left 和 right 代表 nums 子数组和的范围 */
  let [left, right] = [Math.max(...nums), nums.reduce((a, b) => a + b)];
  while(left < right) {
    const mid = Math.floor((left + right) / 2);
    let subNums = 0;
    let count = 0;
    for (let i = 0; i < nums.length; i += 1) {
      subNums += nums[i];
      if (subNums > mid) {
        count += 1;
        subNums = nums[i];
      }
    }
    count += 1;
    if (count < k) {
      /** 分割还不到 k 次和就可以达到 mid, 如果分割 k 次, mid 可以更小 */
      right = mid - 1;
    } else if (count > k) {
      /** 分割超过 k 次和才能达到 mid, 如果分割 k 次, mid 需要更大 */
      left = mid + 1;
    } else {
      /** 满足条件: 分割 k 次刚好为 mid, 向左继续嗅探寻找更小的值 */
      right = mid;
    }
  }
  return left;
};
```


## 寻找峰值 (收缩逼近 + 终止条件不含等于)

- https://leetcode.cn/problems/find-peak-element/


```js
var findPeakElement = function (nums) {
  let [left, right] = [0, nums.length - 1];
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) {
      /** 右边一定有峰值: 极端情况可能是 mid + 1 或 right */
      left = mid + 1;
    } else if (nums[mid] > nums[mid + 1]) {
      /** 左边一定有峰值: 极端情况可能是 mid 或 left */
      right = mid;
    } else {
      /** 或 right = right - 1 */
      left = left + 1;
    }
  }
  /** 或 left */
  return right;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
