## 简介

> 算法-二分查找学习笔记。

## 二分查找

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

## 左右边界

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
      /** 找到一个备胎: 收缩右边界, 继续看看左侧有没有 */
      right = mid - 1;
    }
  }
  if (nums[left] != target) return -1;
  /** 如果 target 在 nums 中只有一个, 收缩结束 left 还会回到原来的位置 */
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
      /** 找到一个备胎: 收缩左边界, 继续看看右侧有没有 */
      left = mid + 1;
    }
  }
  if (nums[right] != target) return -1;
  /** 如果 target 在 nums 中只有一个, 收缩结束 right 还会回到原来的位置 */
  return right;
}
```

## 插入位置

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
      /** 找到了, 收缩右边界 */
      right = mid - 1;
    }
  }
  return left;
};
```

## 目标下标

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
      /** 找到一个备胎: 收缩右边界, 继续看看左侧有没有 */
      right = mid - 1;
    }
  }
  if (nums[left] !== target) return -1;
  return left;
}
```

## 平方根

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
      return mid;
    }
  }
  /** 此时的 left 平方已经超出了 x */
  return right;
};
```

## 排列硬币

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
      return mid;
    }
  }
  /** 此时的 left 平方已经超出了 x */
  return right;
};
```

## 猜数字大小

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

## 旋转排序数组搜索

- leetcode: https://leetcode.cn/problems/search-in-rotated-sorted-array/
- leetcode: https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/

```js
var search = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return true;
    /** nums[mid] 与 nums[left] 值相同, 有个替代品 mid, 舍弃掉 left */
    while (left < mid && nums[mid] === nums[left] ) {
      left += 1;
    }
    /** nums[mid] 与 nums[right] 值相同, 有个替代品 mid, 舍弃掉 right */
    while (right > mid && nums[mid] === nums[right] ) {
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

## 旋转排序数组最小值

- leetcode: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/
- leetcode: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/

```js
var findMin = function (nums) {
  let [left, right] = [0, nums.length - 1];
  while (left < right) {
    if (nums[left] < nums[right]) return nums[left];
    const mid = Math.floor((left + right) / 2);
    /** 最小的一定在右侧 */
    if (nums[mid] < nums[left]) {
      right = mid;
    } else if (nums[mid] > nums[left]) {
      left = mid + 1;
    } else {
      /** nums[mid] 与 nums[left] 值相同, 有个替代品 mid, 舍弃掉 left */
      left = left + 1;
    }
  }

  return nums[right];
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
