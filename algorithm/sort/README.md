## 简介

> 算法-基础排序学习笔记。

## 冒泡排序

```js
function bubbleSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i += 1) {
    for (let j = i + 1; j < len; j += 1) {
      if (arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
```

## 选择排序

```js
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < arr[min]) min = j;
    }
    const temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}
```

## 插入排序

```js
function insertSort(arr) {
  for (let i = 1, len = arr.length; i < len; i += 1) {
    const min = arr[i];
    /** 确保从 i 位置开始往后移 */
    let j = i;
    for (; j - 1 >= 0 && arr[j - 1] > min; j -= 1) {
      arr[j] = arr[j - 1];
    }
    arr[j] = min;
  }
  return arr;
}
```

## 希尔排序

```js
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);
  for (; gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap, len = arr.length; i < len; i += 1) {
      const min = arr[i];
      /** 确保从 i 位置开始往后移 */
      let j = i;
      for (; j - gap >= 0 && arr[j - gap] > min; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = min;
    }
  }
  return arr;
}
```

## 快速排序

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const basic = arr[0];
  const lesser = [];
  const greater = [];
  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (arr[i] < basic) lesser.push(arr[i]);
    else if (arr[i] > basic) greater.push(arr[i]);
  }
  return qSort(lesser).concat(basic, qSort(greater));
}
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
