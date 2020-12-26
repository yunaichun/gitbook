## 简介

> 算法-栈学习笔记。

## js实现栈

```js
class Stack {
    constructor(val = null) {
        this.val = []
    }
    // == 入栈   
    push(item){
        this.val.push(item);
    }
    // == 出栈
    pop(){
        return this.val.pop();
    }
    // == 栈顶元素
    peek(){
        return this.val[this.val.length - 1];
    }
}
```

## 对称字符合法性

leetcode: https://leetcode.com/problems/valid-parentheses

```js
class Solution {
    constructor() {
    }
    // o(1) * n
    isValid(s) {
        let stack = []
        const paren_map = { ')': '(', ']': '[', '}': '{' }
        let keys = Object.keys(paren_map)
        for (let i = 0, len = s.length; i < len; i++) {
            if (keys.indexOf(s[i]) < 0) {
                // == 左括号 push
                stack.push(s[i])
            } else if (paren_map[s[i]] != stack.pop()) {
                return false
            }
        }
        return !stack.length
    }
}

class Solution2 {
    constructor(props) {
        super(props)
    }
    isValid(s) {
        let length
        while (length !== s.length) {
            length = s.length
            s = s.replace('()', '').replace('{}', '').replace('[]', '')
        }
        return !s.length
    }
}
```

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
