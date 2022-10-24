## 简介

> 算法-链表学习笔记。

## js 实现链表

```js
function Node(data = null, next = null) {
  this.data = data;
  this.next = next;
}

function ListNode() {
  this.head = new Node();
}
ListNode.prototype.insert = function (sourceNode, targetNode) {
  const first = this.head;
  if (first.data === null && first.next === null) {
    this.head = sourceNode;
  } else {
    sourceNode.next = targetNode.next;
    targetNode.next = sourceNode;
  }
  return first;
};
ListNode.prototype.removeNode = function (node) {
  const first = this.head;
  /** 找到 node 节点的父节点 */
  while (first.next) {
    if (first.next === node) {
      first.next = first.next.next;
      break;
    }
    first = first.next;
  }
  return first;
};

let a = new Node(1);
let b = new Node(2);
let c = new Node(3);
let list = new ListNode(a);
list.insertAfter(a);
list.insertAfter(b, a);
list.insertAfter(c, b);
list.removeNode(b);
console.log(list);
```

## 反转链表

- leetcode: https://leetcode.cn/problems/reverse-linked-list

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 1 -> 2 -> 3 -> 4
  // 1、1(prev) -> null
  // 2、2(prev) -> 1
  // 3、3(prev) -> 2 -> 1
  // 4、4(prev) -> 3 -> 2 -> 1
  /** 存储的是循环中上一个节点 */
  let prev = null;
  let cur = head;
  while (cur) {
    /** 控制循环: 下一个节点 */
    const temp = cur.next;

    cur.next = prev;
    prev = cur;

    /** 控制循环: 下一个节点 */
    cur = temp;
  }

  return prev;
};
```

## 链表是否存在环

- leetcode: https://leetcode.cn/problems/linked-list-cycle

```js
var hasCycle = function (head) {
  const set = new Set();
  while (head) {
    if (set.has(head)) return true;
    set.add(head);
    head = head.next;
  }
  return false;
};
```

## 链表交换相邻节点

- leetcode: https://leetcode.cn/problems/swap-nodes-in-pairs/

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  const dynamicHead = new ListNode(0);
  dynamicHead.next = head;

  let headPre = dynamicHead;
  while (head) {
    let tail = headPre;
    /** 1、判断是否包含 2 个元素 */
    for (let i = 0; i < 2; i += 1) {
      tail = tail.next;
      if (!tail) return dynamicHead.next;
    }

    /** 2、交换 2 个节点 */
    const temp = tail.next;
    [head, tail] = reverse(head, tail);

    /** 3、拼接 */
    headPre.next = head;
    tail.next = temp;

    /** 下一个循环 */
    headPre = tail;
    head = temp;
  }

  return dynamicHead.next;
};

var reverse = function (head, tail) {
  let prev = null;
  let cur = head;
  while (cur && prev !== tail) {
    const temp = cur.next;

    cur.next = prev;
    prev = cur;

    cur = temp;
  }
  return [tail, head];
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
