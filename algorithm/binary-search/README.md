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
  return right;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
