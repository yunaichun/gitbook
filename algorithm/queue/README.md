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

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
