## 简介

> 算法-队列学习笔记。

## js实现队列

```js
class Queue {
    constructor(val = null) {
        this.val = []
    }
    // == 入队   
    enqueue(item){
        this.val.push(item);
    }
    // == 出队
    dequeue(){
        return this.val.shift();
    }
    // == 队首元素
    front(){
        return this.val[0];
    }
}
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
