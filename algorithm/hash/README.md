## 简介

> 算法-哈希表学习笔记。

## 两数之和

leetcode: https://leetcode.cn/problems/two-sum

```js
class Solution {
    constructor() {
    }
    // o(n)
    twoSum(nums, target) {
        for (let i = 0, len = nums.length; i < len; i++) {
            let index = nums.indexOf(target - nums[i]);
            if (index > -1) {
                return [i, index]
            }
        }
    }
}
```

## 三数之和为0

leetcode: https://leetcode.cn/problems/three-sum

```js
class Solution {
    constructor() {
    }
    // o(n2)
    threeSum(nums) {
        if (nums.length < 3) return [];
        // == 排序是关键: [-1, -1, -4, 0, 1, 2]
        nums.sort();
        let res = [];
        for (let i = 0, len = nums.length; i < len - 2; i++) {
            // == 避免重复
            if (i >= 1 && nums[i] == nums[i -1]) continue;
            // == 主要目的是记录匹配的第三个元素
            let d = {};
            for (let j = i + 1; j < len; j++) {
                let [m, n] = [nums[i], nums[j]];
                // == 确定出第三个值应该是什么
                if (!d[n]) {
                    d[-m-n] = 1;
                } else {
                    res.push([m, -m-n, n]);
                }
            }
        }
        return res;
    }
}

let nums = [-1, 0, 1, 2, -1, -4]
test = new Solution()
test.threeSum(nums)
```

## 有效字母异同位

leetcode: https://leetcode.cn/problems/valid-anagram

```js
class Solution2 {
    constructor() {
    }
    // o(nlogn)
    isAnagram(s, t) {
        s.split('').sort().join('') === t.split('').sort().join('')
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
