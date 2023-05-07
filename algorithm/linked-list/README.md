## 简介

> 算法-链表学习笔记。

## js 实现链表

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
var reverseKGroup = function (head, k) {
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
    if (isPush) {
      list.push(head);
    } else {
      list.splice(list.length - 1, 0, head);
    }
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
    const right = list.length - 1 - i;
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

## 两数相加

- https://leetcode.cn/problems/add-two-numbers/
- https://leetcode.cn/problems/add-strings/

```js
var addTwoNumbers = function (l1, l2) {
  /** 拿到节点值 */
  const list1 = [];
  while (l1) {
    list1.push(l1.val);
    l1 = l1.next;
  }
  const list2 = [];
  while (l2) {
    list2.push(l2.val);
    l2 = l2.next;
  }
  /** 数字相加 */
  const results = [];
  let i = 0;
  let j = 0;
  let addOne = 0;
  while (i < list1.length || j < list2.length || addOne !== 0) {
    const a = list1[i] || 0;
    const b = list2[j] || 0;
    results.push((a + b + addOne) % 10);
    if ((a + b + addOne) / 10 >= 1) addOne = 1;
    else addOne = 0;
    i += 1;
    j += 1;
  }
  /** 构建新链表 */
  const dynamicHead = new ListNode();
  let prev = dynamicHead;
  for (let i = 0, len = results.length; i < len; i += 1) {
    const current = new ListNode(results[i]);
    if (i === 0) dynamicHead.next = current;
    prev.next = current;
    prev = current;
  }
  return dynamicHead.next;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
