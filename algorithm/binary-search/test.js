/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const len = nums.length;
  let [min, max] = [0, len - 1];
  while (true) {
    if (max === min && nums[min] !== target) return -1;
    const mid = Math.floor((min + max) / 2);
    if (target === nums[mid]) return mid;
    else if (target < nums[mid]) max = mid;
    else if (target > nums[mid]) min = mid + 1;
  }
};

(nums = [1, 3]), (target = 3); // => min = mid + 1; => 1
(nums = [1, 3]), (target = 1); // => max = mid; => 0
console.log(search(nums, target));
// min=4, max=6, mid=5 => target > nums[min] min = mid + 1
