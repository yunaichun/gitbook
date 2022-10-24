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

## 环形链表

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

## 环形链表 II

- https://leetcode.cn/problems/intersection-of-two-linked-lists/

```js
var getIntersectionNode = function (headA, headB) {
  const set = new Set();
  while (headA) {
    set.add(headA);
    headA = headA.next;
  }
  while (headB) {
    if (set.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
};
```

## 反转链表

- leetcode: https://leetcode.cn/problems/reverse-linked-list

```js
var reverseList = function (head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  const dynamicHead = new ListNode();
  const n = list.length;
  let prev = dynamicHead;
  for (let i = n - 1; i >= 0; i -= 1) {
    const node = list[i];
    if (i === n - 1) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
```

## 反转链表 II

- https://leetcode.cn/problems/reverse-linked-list-ii/

```js
var reverseBetween = function (head, left, right) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  /** 中间从 dynamicHead.next 开始 */
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = right - 1; i >= left - 1; i -= 1) {
    if (i === right - 1) dynamicHead.next = list[i];
    const node = list[i];
    prev.next = node;
    node.next = null;
    prev = node;
  }

  /** [list[0], list[left - 2]] [dynamicHead.next, prev] [list[right], list[len - 1]] */
  if (left >= 2) list[left - 2].next = dynamicHead.next;
  else list[0] = dynamicHead.next;
  if (list.length > right) prev.next = list[right];

  return list[0];
};
```

## 交换相邻节点

- leetcode: https://leetcode.cn/problems/swap-nodes-in-pairs/

```js
var swapPairs = function (head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  const n = list.length;
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0; i < n && i + 1 < n; i += 2) {
    const node1 = list[i];
    const node2 = list[i + 1];
    if (i === 0) dynamicHead.next = node2;

    prev.next = node2;
    node2.next = node1;
    node1.next = null;

    prev = node1;
  }
  if (n % 2 === 1) prev.next = list[n - 1];

  return dynamicHead.next;
};
```

## 交换相邻节点 II

- https://leetcode.cn/problems/reverse-nodes-in-k-group/

```js
var reverseKGroup = function (head, k) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }

  const n = Math.floor(list.length / k);
  if (n === 0) return head;

  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0; i < n; i += 1) {
    if (i === 0) dynamicHead.next = list[0];
    prev.next = list[i];

    /** 一组 k 个翻转: [i * k, (i + 1) * k - 1] */
    for (let j = (i + 1) * k - 1; j >= i * k; j -= 1) {
      const node = list[j];
      prev.next = node;
      node.next = null;
      prev = node;
    }
  }

  if (list.length > n * k) prev.next = list[n * k];

  return dynamicHead.next;
};
```

## 交换对称节点

- https://leetcode.cn/problems/reorder-list/

```js
var reorderList = function (head) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  const n = list.length;
  for (let i = 0; i < Math.floor(n / 2); i += 1) {
    const node1 = list[i];
    const node2 = list[n - 1 - i];

    if (i === 0) dynamicHead.next = node1;
    prev.next = node1;
    node1.next = node2;
    node2.next = null;

    prev = node2;
  }
  if ((n + 1) % 2 === 0) {
    prev.next = list[(n - 1) / 2];
    prev.next.next = null;
  }
  return dynamicHead.next;
};
```

## 合并链表

- https://leetcode.cn/problems/merge-two-sorted-lists/

```js
var mergeTwoLists = function (list1, list2) {
  let list = [];
  while (list1) {
    list.push(list1);
    list1 = list1.next;
  }
  while (list2) {
    list.push(list2);
    list2 = list2.next;
  }
  list = list.sort((a, b) => a.val - b.val);
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0, len = list.length; i < len; i += 1) {
    const node = list[i];
    if (i === 0) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
```

## 合并链表 II

```js
var mergeKLists = function (lists) {
  let list = [];
  for (let i = 0, len = lists.length; i < len; i += 1) {
    let current = lists[i];
    while (current) {
      list.push(current);
      current = current.next;
    }
  }
  list = list.sort((a, b) => a.val - b.val);
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0, len = list.length; i < len; i += 1) {
    const node = list[i];
    if (i === 0) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
```

## 删除重复节点

- https://leetcode.cn/problems/remove-duplicates-from-sorted-list/

```js
var deleteDuplicates = function (head) {
  const list = [];
  while (head) {
    const find = list.find((i) => i.val === head.val);
    if (!find) list.push(head);
    head = head.next;
  }

  const dynamicHead = new ListNode(0);
  let prev = dynamicHead;
  for (let i = 0, len = list.length; i < len; i += 1) {
    const node = list[i];
    if (i === 0) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
```

## 删除重复节点 II

- https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/

```js
var deleteDuplicates = function (head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }

  list = list.filter((i) => {
    const iCount = list.filter((j) => j.val === i.val);
    if (iCount.length > 1) return false;
    return true;
  });

  const dynamicHead = new ListNode(0);
  let prev = dynamicHead;
  for (let i = 0, len = list.length; i < len; i += 1) {
    const node = list[i];
    if (i === 0) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
```

## 倒数 K 节点删除

- https://leetcode.cn/problems/remove-nth-node-from-end-of-list/

```js
var removeNthFromEnd = function (head, n) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  /** 删除链表的节点 index 为 len - n */
  const len = list.length;
  if (len - n >= 1) list[len - n - 1].next = list[len - n].next;
  else return list[0].next;
  return list[0];
};
```

## 倒数 K 节点返回

- https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

```js
var getKthFromEnd = function (head, k) {
  const list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  /** 返回链表的节点 index 为 len - n */
  const len = list.length;
  return list[len - k];
};
```

## 排序链表

- https://leetcode.cn/problems/sort-list/submissions/

```js
var sortList = function (head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }
  list = list.sort((a, b) => a.val - b.val);

  const dynamicHead = new ListNode(0);
  let prev = dynamicHead;
  for (let i = 0, len = list.length; i < len; i += 1) {
    const node = list[i];
    if (i === 0) dynamicHead.next = node;
    prev.next = node;
    node.next = null;
    prev = node;
  }
  return dynamicHead.next;
};
```

## 回文链表

- https://leetcode.cn/problems/palindrome-linked-list/

```js
var isPalindrome = function (head) {
  let list = [];
  while (head) {
    list.push(head);
    head = head.next;
  }

  let len = list.length;
  for (let i = 0; i < Math.floor(len / 2); i += 1) {
    if (list[i].val !== list[len - i - 1].val) {
      return false;
    }
  }

  return true;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
