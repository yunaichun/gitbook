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

## 有效的括号

- https://leetcode.cn/problems/valid-parentheses

```js
var isValid = function(s) {
  /** 栈中存的是符号; 相邻成对则消除 */
  const stack = [];
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
  ]);
  const left = Array.from(map.keys());
  for (let i = 0; i < s.length; i += 1) {
    if (left.indexOf(s[i]) > -1) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map.get(last) !== s[i]) return false;
    }
  }
  return !stack.length;
};
```

## 有效的括号字符串

- https://leetcode.cn/problems/valid-parenthesis-string/

```js
var checkValidString = function(s) {
  const leftStack = [];
  const starStack = [];
  
  /** 先把右括号干掉 */
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (c === '(') {
      leftStack.push(i);
    } else if (c === '*') {
      starStack.push(i);
    } else {
      if (leftStack.length) {
        /** 右括号优先和左括号匹配 */
        leftStack.pop();
      } else if (starStack.length) {
        /** 没有左括号和星号匹配 */
        starStack.pop();
      } else {
        /** 否则就不是有效括号 */
        return false;
      }
    }
  }

  /** 然后看左括号能不能全部消除，因为星号可以被当作空字符串 */
  while (leftStack.length && starStack.length) {
    const leftIndex = leftStack.pop();
    const asteriskIndex = starStack.pop();
    if (leftIndex > asteriskIndex) return false;
  }
  return leftStack.length === 0;
};
```

## 最长有效括号

- https://leetcode.cn/problems/longest-valid-parentheses/

```js
var longestValidParentheses = function(s) {
  /** 栈中存的是符号的下标; 相邻成对则消除; 然后计算间隔 */
  const stack = [-1];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        max = Math.max(max, i - stack[stack.length - 1]);
      }
    }
  }
  return max;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
