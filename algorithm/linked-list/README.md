## 简介

> 算法-链表学习笔记。

## JS 实现链表

```js
class Node {
  constructor (val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor () {
    this.head = new Node();
  }
  insert(sourceNode, targetNode) {
    if (!this.head.val && !this.head.next) {
      this.head = sourceNode;
    } else {
      sourceNode.next = targetNode.next;
      targetNode.next = sourceNode;
    }
  }
  remove(node) {
    let head = this.head;
    while (head) {
      if (head.next === node) {
        head.next = node.next;
        break;
      }
      head = head.next;
    }
  }
}
var a = new Node(1);
var b = new Node(2);
var c = new Node(3);
var linkedList = new LinkedList();
linkedList.insert(a);
linkedList.insert(b, a);
linkedList.insert(c, b);
linkedList.remove(b);
console.log(linkedList); /** 1 -> 3 -> null */
```

## 环形链表

- leetcode: https://leetcode.cn/problems/linked-list-cycle

```js
var hasCycle = function(head) {
  const set = new Set();
  while (head) {
    if (set.has(head)) return true;
    set.add(head);
    head = head.next;
  }
  return false;
};
```

## 环形链表 II

- https://leetcode.cn/problems/intersection-of-two-linked-lists/

```js
var getIntersectionNode = function(headA, headB) {
  const set = new Set();
  while(headA) {
    set.add(headA);
    headA = headA.next;
  }
  while(headB) {
    if (set.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
};
```

## 反转链表

- leetcode: https://leetcode.cn/problems/reverse-linked-list

```js
var reverseList = function(head) {
  const list = [];
  while (head) {
    list.unshift(head);
    head = head.next;
  }
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 反转链表 II

- https://leetcode.cn/problems/reverse-linked-list-ii/

```js
var reverseBetween = function(head, left, right) {
  const list = [];
  while(head) {
    if (list.length < left || list.length >= right) {
      list.push(head);
    } else {
      list.splice(left - 1, 0, head);
    }
    head = head.next;
  }
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## K 个一组翻转链表

- https://leetcode.cn/problems/reverse-nodes-in-k-group/

```js
var reverseKGroup = function(head, k) {
  let count = 1;
  let list = [];
  while (head) {
    list.push(head);
    if (list.length === count * k) {
      const a = list.slice(0, (count - 1) * k);
      const b = list.slice((count - 1) * k);
      list = [...a, ...b.reverse()];
      count += 1;
    }
    head = head.next;
  }
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 交换相邻节点

- leetcode: https://leetcode.cn/problems/swap-nodes-in-pairs/

```js
var swapPairs = function(head) {
  const list = [];
  let isPush = true;
  while(head) {
    if (isPush) list.push(head);
    else list.splice(list.length - 1, 0, head);
    isPush = !isPush;
    head = head.next;
  }
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 交换对称节点

- https://leetcode.cn/problems/reorder-list/

```js
var reorderList = function(head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  for (let i = 0; i < Math.floor(list.length / 2); i += 1) {
    const right = list.length - i - 1;
    list[i].next = list[right];
    list[right].next = list[i + 1];
    list[i + 1].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 合并链表

- https://leetcode.cn/problems/merge-two-sorted-lists/

```js
var mergeTwoLists = function(list1, list2) {
  let list = [];
  while(list1) {
    list.push(list1);
    list1 = list1.next;
  }
  while(list2) {
    list.push(list2);
    list2 = list2.next;
  }
  list = list.sort((a, b) => a.val - b.val);
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 合并 K 个升序链表

- https://leetcode.cn/problems/merge-k-sorted-lists/

```js
var mergeKLists = function(lists) {
  let list = [];
  for (let i = 0; i < lists.length; i += 1) {
    let head = lists[i];
    while(head) {
      list.push(head);
      head = head.next;
    }
  }
  list = list.sort((a, b) => a.val - b.val);
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 排序链表

- https://leetcode.cn/problems/sort-list/

```js
var sortList = function(head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  list = list.sort((a, b) => a.val - b.val);
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 删除重复节点

- https://leetcode.cn/problems/remove-duplicates-from-sorted-list/

```js
var deleteDuplicates = function(head) {
  const list = [];
  while (head) {
    const find = list.find((i) => i.val === head.val);
    if (!find) list.push(head);
    head = head.next;
  }
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  if (list.length === 1) list[0].next = null;
  return list.length ? list[0] : null;
};
```

## 删除重复节点 II

- https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/

```js
var deleteDuplicates = function(head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  list = list.filter((i) => {
    const count = list.filter((j) => j.val === i.val);
    if (count.length > 1) return false;
    return true;
  });
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  if (list.length === 1) list[0].next = null;
  return list.length ? list[0] : null;
};
```

## 倒数 K 节点删除

- https://leetcode.cn/problems/remove-nth-node-from-end-of-list/

```js
var removeNthFromEnd = function(head, n) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  if (list.length - n >= 0) {
    const prev = list[list.length - n - 1];
    const current = list[list.length - n];
    if (prev) prev.next = current.next;
    else return list[0].next;
  }
  return list.length ? list[0] : null;
};
```

## 倒数 K 节点返回

- https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

```js
var getKthFromEnd = function(head, k) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  return list[list.length - k];
};
```

## 回文链表

- https://leetcode.cn/problems/palindrome-linked-list/

```js
var isPalindrome = function(head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  for (let i = 0; i < Math.floor(list.length / 2); i += 1) {
    const right = list.length - i - 1;
    if (list[i].val !== list[right].val) return false;
  }
  return true;
};
```

## 两数相加

- https://leetcode.cn/problems/add-two-numbers/

```js
var addTwoNumbers = function (l1, l2) {
  const list1 = [];
  while (l1) {
    list1.push(l1);
    l1 = l1.next;
  }
  const list2 = [];
  while (l2) {
    list2.push(l2);
    l2 = l2.next;
  }
  const list = list1.length > list2.length ? list1 : list2;
  let [i, j] = [0, 0];
  let c = 0;
  while (i < list1.length || j < list2.length || c !== 0) {
    const a = list1[i] ? list1[i].val : 0;
    const b = list2[j] ? list2[j].val : 0;
    const val = (a + b + c) % 10;
    if (list[i]) list[i].val = val;
    else list[i] = new ListNode(val);
    if (a + b + c >= 10) c = 1;
    else c = 0;
    i += 1;
    j += 1;
  }
  for (let i = 1; i < list.length; i += 1) {
    list[i - 1].next = list[i];
    list[i].next = null;
  }
  return list.length ? list[0] : null;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
- [系列博客](https://leetcode-solution-leetcode-pp.gitbook.io)
