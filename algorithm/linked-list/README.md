## 简介

> 算法-链表学习笔记。

## js实现链表

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
}
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
}

let a = new Node(1)
let b = new Node(2)
let c = new Node(3)
let list = new ListNode(a)
list.insertAfter(a)
list.insertAfter(b, a)
list.insertAfter(c, b)
list.removeNode(b)
console.log(list)
```

## 反转链表

leetcode: https://leetcode.cn/problems/reverse-linked-list

```js
class Solution {
    constructor() {
    }
    reverseList(head) {
        // == prev 是记录位置使用，是新 List 第一个节点
        let [prev, current] = [null, head]
        while(current) {
            const temp = current.next;
            // == 从后往前调整指向
            current.next = prev;
            prev = current;
            current = temp;
            // [current.next, prev, current] = [prev, current, current.next]
        }
        // ==  prev 始终为头节点
        return prev;
    }
}
```

## 链表是否存在环

leetcode: https://leetcode.cn/problems/linked-list-cycle

```js
class Solution {
    constructor() {
    }
    swapPairs(head) {
        let slow = fast = head
        while (slow && fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }   
        }
        return false;
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
