## 简介

> 算法-基础排序学习笔记。

## 冒泡排序

```js
var bubbleSort = function(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      let [a, b] = [arr[i], arr[j]];
      if (a > b) {
        arr[i] = b;
        arr[j] = a;
      }
    }
  }
  return arr;
}
```

## 选择排序

```js
var selectionSort = function(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] < arr[min]) min = j;
    }
    const [a, b] = [arr[i], arr[min]];
    arr[i] = b;
    arr[min] = a;
  }
  return arr;
}
```

## 插入排序

```js
var insertSort = function(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    const min = arr[i];
    let j = i;
    while (j - 1 >= 0 && arr[j - 1] > min) {
      arr[j] = arr[j - 1];
      j -= 1;
    }
    arr[j] = min;
  }
  return arr;
}
```

## 希尔排序

```js
var shellSort = function(arr) {
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap -= 1) {
    for (let i = gap; i < arr.length; i += 1) {
      const min = arr[i];
      let j = i;
      while (j - gap >= 0 && arr[j - gap] > min) {
        arr[j] = arr[j - gap];
        j -= gap
      }
      arr[j] = min;
    }
  }
  return arr;
}
```

## 快速排序

```js
var quickSort = function(arr) {
  if (arr.length <= 1) return arr;  
  const basic = arr[0];
  const lesser = [];
  const greater = [];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < basic) lesser.push(arr[i]);
    else greater.push(arr[i]);
  }

  return quickSort(lesser).concat(basic, quickSort(greater));
}
```

## 快排最小k个数

- https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/

```js
var quickSort = function(arr, k) {
  if (arr.length <= 1) return arr;  
  const basic = arr[0];
  const lesser = [];
  const greater = [];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < basic) lesser.push(arr[i]);
    else greater.push(arr[i]);
  }

	if (lesser.length + 1 === k) {
		return lesser.concat(basic);
	} else if (lesser.length + 1 > k) {
		return quickSort(lesser, k);
	} else {
		return lesser.concat(basic, quickSort(greater, k - lesser.length - 1));
    // 前 k 小的数据排序输出
    // return quickSort(lesser, lesser.length).concat(basic, quickSort(greater, k - lesser.length - 1));
	}
}
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
- [系列博客](https://leetcode-solution-leetcode-pp.gitbook.io)
