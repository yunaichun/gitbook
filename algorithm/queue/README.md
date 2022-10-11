## 简介

> 算法-队列学习笔记。

## js实现队列

```js
/**
 * 先进先出
 */
function Queue() {
  this.queue = [];
}
Queue.prototype.enqueue = function (item) {
  this.queue.push(item);
}
Queue.prototype.dequeue = function () {
  return this.queue.shift();
}
Queue.prototype.front = function (item) {
  return this.queue[0];
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
