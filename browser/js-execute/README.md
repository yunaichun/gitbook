## 简介

> 浏览器中 JS 执行机制学习笔记。

## 执行上下文

#### 什么是执行上下文

```text
函数、全局、eval。剪头函数没有自己的执行上下文，会继承外层函数的 this。
```

#### 执行上下文包括哪些

> 执行上下文包括词法环境和变量环境

```text
1. 变量环境
函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面了。

变量提升会使得顶层 var 变量在最顶部。

2. 词法环境
通过 let 声明的变量，在编译阶段会被存放到词法环境(Lexical Environment)中。

作用域块中通过 let 声明的变量，会被存放在词法环境的一个单独的区域中，这个区域中的变量并不影响作用域块外面的变量。

当块级作用域执行结束之后，其内部定义的变量就会从词法环境的栈顶弹出。
```

#### 当前执行上下文流程分析

**案例如下**

```js
function foo(){
    var a = 1
    let b = 2
    {
      let b = 3
      var c = 4
      let d = 5
      console.log(a)
      console.log(b)
    }
    console.log(b) 
    console.log(c)
    console.log(d)
}   
foo()
```

**1、编译并创建 foo 函数执行上下文**

```text
变量环境:
a = undefined
c = undefined

词法环境: 
b = undefined
```

**2、代码执行到块级作用域**

```text
变量环境:
a = 1
c = undefined

词法环境2: 
b = undefined
d = undefined
    ↑
词法环境1: 
b = 2
```

**3、代码执行到块级作用域console.log(a)**

```text
变量环境:
a = 1
c = 4

词法环境2: (词法环境中创建一个单独区域，存放新的 let申明)
b = 3
d = 5
    ↑
词法环境1: 
b = 2
```

**4、变量查找顺序**

```text
沿着词法环境从栈顶向栈底查找，找不到再到变量环境查找。
```

**5、代码执行完块级作用域**

```text
变量环境:
a = 1
c = 4

词法环境1: (当块级作用域执行结束之后，其内部定义的变量就会从词法环境的栈顶弹出。所以 词法环境2 被释放)
b = 2
```

## 作用域链

#### 什么是作用域链

```text
每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文。

我们把这个外部引用称为 outer。
```

#### 变量查找顺序

```text
1. 查找当前执行上下文的词法环境。

2. 查找当前执行上下文的变量环境。

3. 在当前执行上下文的变量环境的 outer 所指向的 执行上下文 中查找。
```

## 调用栈

```text
代码从当前执行上下文沿着作用域链开始执行。
```

## 调用栈案例分析: PART 1

```js
function bar() {
    console.log(myName)
}
function foo() {
    var myName = 'foo 变量环境'
    bar()
}
var myName = '全局 变量环境'
foo()
```

**1、bar 函数执行上下文**

```text
变量环境: 
outer = 全局执行上下文

词法环境: 无
```

**2、foo 函数执行上下文**

```text
变量环境: 
myName = 'foo 变量环境'
outer = 全局执行上下文

词法环境: 无
```

**3、全局执行上下文**

```text
变量环境: myName = '全局 变量环境'

词法环境: 无
```


**4、所以，当 bar 函数执行到 console.log(test) 时**

```text
在 bar 函数执行上下文 的 变量环境 的 outer 指向的 全局执行上下文 变量环境 中找到。
```

## 调用栈案例分析: PART2

```js
function bar() {
    var myName = 'bar 变量环境'
    let test1 = 100
    if (1) {
        let myName = 'bar 词法环境'
        console.log(test)
    }
}
function foo() {
    var myName = 'foo 变量环境'
    let test = 2
    {
        let test = 3
        bar()
    }
}
var myName = '全局 变量环境'
let myAge = 10
let test = 1
foo()
```

**1、bar 函数执行上下文**

```text
变量环境: 
myName = 'bar 变量环境'
outer = 全局执行上下文

词法环境:
myName = 'bar 词法环境'
    ↑
test1 = 100
```

**2、foo 函数执行上下文**

```text
变量环境: 
myName = 'foo 变量环境'
outer = 全局执行上下文

词法环境:
test3 = 3
    ↑
test2 = 2
```

**3、全局执行上下文**

```text
变量环境: 
myName = '全局 变量环境'
outer = null

词法环境:
myAge = 10
test = 2
```

**4、所以，当 bar 函数执行到 console.log(test) 时**

```text
在 bar 函数执行上下文 的 变量环境 的 outer 指向的 全局执行上下文 的 词法环境 中找到。
```

## 调用栈角度分析闭包

```js
function foo() {
    var myName = 'foo 变量环境'
    let test1 = 1
    const test2 = 2
    var innerBar = {
        getName: function() {
            console.log(test1)
            return myName
        },
        setName: function(newName) {
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName('111111')
bar.getName()
console.log(bar.getName())
```

#### 当代码执行到 foo 函数的 return 时调用栈如下

**1、foo 函数执行上下文**

```text
变量环境: 
myName = 'foo 变量环境'
innerBar = {...}
outer = 全局执行上下文

词法环境:
test1 = 1
test2 = 2
```

**2、全局执行上下文**

```text
变量环境: 
bar = undefined
outer = null

词法环境:
```

#### 当 foo 函数执行完成之后调用栈如下

```text
内部函数 getName 和 setName 总是可以访问它们的外部函数 foo 中的变量

所以当 innerBar 对象返回给全局变量 bar 时

虽然 foo 函数已经执行结束

但是 getName 和 setName 函数依然可以使用 foo 函数中的变量 myName 和 test1
```

**1、foo 函数执行上下文**

```text
foo(closure)
myName = 'foo 变量环境'
innerBar = {...}
```

**2、全局执行上下文**

```text
变量环境: 
bar = undefined
outer = null

词法环境:
```

**从上面总结闭包定义**

```text
在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，
当通过调用一个外部函数返回一个内部函数后，
即使该外部函数已经执行结束了，
但是内部函数引用外部函数的变量依然保存在内存中，
我们就把这些变量的集合称为闭包。

比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。
```

## 参考资料

- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)
- [深入了解 JavaScript 内存泄露 ](https://segmentfault.com/a/1190000020231307)
- [JS 中的可枚举属性与不可枚举属性以及扩展](https://www.cnblogs.com/moqiutao/p/7389146.html)
