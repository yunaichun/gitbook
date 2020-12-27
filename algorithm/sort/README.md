## 简介

> 算法-基础排序学习笔记。

## 冒泡排序

```js
for (var i = 0; i < arr.length - 1; i++) {
    for(var j = i + 1; j < arr.length; j ++) {
        if (arr[i] > arr[j]) {
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}
```

## 选择排序

```js
for (var i = 0; i < arr.length -1; i++) {
    var min = i;
    for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
            min = j;  
        }
    }
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
```

## 插入排序

```js
for (var i = 1; i < arr.length; i++) {
    var min = arr[i];
    for (var j = i; arr[j -1] > min && j > 0; j--) {
        arr[j] = arr[j - 1];
    }
    arr[j] = min;
}
```

## 希尔排序

```js
arr4 = [6, 5, 2, 3, 1, 4, 7];
var g = [5, 3, 1];
for(var k = 0; k < g.length; k++){
    for(var i = g[k]; i < arr4.length; i++){
        var min = arr4[i];    
        for(var j = i; arr4[j - g[k]] > min && j >= g[k]; j = j - g[k]){
             arr4[j] = arr4[j - g[k]];
        }
        arr4[j] = min;
    }
}
console.log(arr4);
```

## 快速排序

```js
function qSort(list) {
    if (list.length <= 1) {
        return list;
    }
    var lesser = [];
    var greater = [];
    // == 基准值
    var pivot = list[0];
    for (var i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            lesser.push(list[i]);
        } else {
            greater.push(list[i]);
        }
    }
    return qSort(lesser).concat(pivot, qSort(greater));
}
var arr5 = [6, 5, 2, 3, 1, 4, 7];
console.log(qSort(arr5));
```

## 快排求数组最大前k个数

leetcode: https://leetcode.com/problems/kth-largest-element-in-a-stream

```js
function qSort(list, k) {
    if (list.length <= 1) return list;
    let p = list[0];
    let lesser = [];
    let greater = [];
    for (let i = 1, len = list.length; i < len; i++) {
        if (list[i] < p) {
            lesser.push(list[i]);
        } else {
            greater.push(list[i]);
        }
    }
    if (greater.length === k) {
        return greater;
    } else if (greater.length > k) {
        return qSort(greater, k);
    } else {
        return qSort(greater, k).concat(p, qSort(lesser, k));
    }
}
console.log(qSort([1,2,3,4,5,6,7], 3))
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
