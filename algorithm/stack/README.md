## 简介

> 算法-栈学习笔记。

## js 实现栈

```js
function Stack() {
  this.stack = [];
}
Stack.prototype.push = function (item) {
  this.stack.push(item);
};
Stack.prototype.pop = function () {
  return this.stack.pop();
};
Stack.prototype.peek = function () {
  return this.stack[this.stack.length - 1];
};
```

## 对称字符合法性

- leetcode: https://leetcode.cn/problems/valid-parentheses

```js
var isValid = function (s) {
  const stack = [];
  const map = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
  ]);
  for (let i = 0, len = s.length; i < len; i += 1) {
    const isLeft = map.has(s[i]);
    if (isLeft) {
      stack.push(s[i]);
    } else {
      if (!stack.length) return false;
      const last = stack[stack.length - 1];
      if (map.get(last) !== s[i]) return false;
      else stack.pop();
    }
  }
  return !stack.length;
};
```

## 最长有效括号

- leetcode: https://leetcode.cn/problems/longest-valid-parentheses/

```js
var longestValidParentheses = function (s) {
  /** 存入当前下标 index */
  const stack = [-1];
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      /** 遇到左括号 '(' 进栈*/
      stack.push(i);
    } else {
      /** 遇到右括号 ')' 将 '(' 出栈 */
      stack.pop();
      if (stack.length === 0) {
        /** 已经全部出栈之后，进来一个新的右括号 ')' 位置记录 */
        stack.push(i);
      } else {
        /** stack 最后一个元素为 ')' 的位置 */
        /** i - stack[stack.length - 1 值为消掉的元素数量 */
        res = Math.max(res, i - stack[stack.length - 1]);
      }
    }
  }
  return res;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
