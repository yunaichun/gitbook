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

## 搜索旋转排序数组

- leetcode: https://leetcode.cn/problems/search-in-rotated-sorted-array/
- leetcode: https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/

```js
var search = function(nums, target) {
  let [left, right] = [0, nums.length - 1];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return true;
    /** 如果存在重复数字, 就可能会发生 nums[mid] === nums[start] 了, 如 nums = [1,0,1,1,1] target = 0, 则会进入到错误的判断里导致一直查不到 */
    /** 这个时候可以选择舍弃 start, 也就是 start 右移一位 */
    while (left < mid && nums[mid] === nums[left] ) {
      left += 1;
    }
    /** 假如 mid 小于 left, 则 mid 一定在右边有序或无序部分, 即 [mid, end] 部分有序 */
    /** 假如 mid 大于 left, 则 mid 一定在左边有序或无序部分, 即 [start, mid] 部分有序 */
    if (nums[mid] < nums[left]) {
      if (nums[mid] < target && target <= nums[right]) {
        /** 比较 target 和有序部分的边界关系: 在有序部分 */
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (nums[left] <= target && target < nums[mid] ) {
        /** 比较 target 和有序部分的边界关系: 在有序部分 */
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return false;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
