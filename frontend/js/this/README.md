## 简介

> this 关键字学习笔记。

## 普通函数

#### 未被上一级调用，this 指向 window

```js
function a() {
    var user = 'test';
    console.log(this); // window
    console.log(this.user); // undefined
}
a();
```

#### 被上一级对象调用，this 指向上一级对象

```js
var obj1 = {
    user: 'test',
    fn: function() {
        console.log(this.user); // test
        console.log(this); // obj1
    }
};
obj1.fn();
```

#### 层级对象嵌套的情况，this 始终指向上一级调用对象

```js
var obj2 = {
    a: 10,
    child: {
        a: 12,
        fn: function() {
            console.log(this.a); // 12
            console.log(this); // obj2.child
        }
    }
};
obj2.child.fn();
```

#### this 永远指向最后调用它的对象

```js
var obj3 = {
    a: 10,
    child: {
        a: 12,
        fn: function() {
            console.log(this.a); // undefined
            console.log(this); // window
        }
    }
};
var j = obj3.child.fn;
j();
```

## 构造函数

#### 构造函数无 return : 指向实例对象

```js
function fn() {
    this.user = 'test';
    console.log(this);
}
var a = new fn();
console.log(a.user); // test
console.log(a instanceof fn); // true
```

#### 构造函数有 return 的值: 五种简单数据类型

```js
// == String，Number，Boolean，Null，Undefined
function fn() {
    this.user = 'test';
    console.log(this);
    return null;
}
var a = new fn();
console.log(a.user); // test
console.log(a instanceof fn); // true
```

#### 构造函数有 return 的值: Object/Function

```js
// == Object、Function
function fn() {
    this.user = 'test';
    console.log(this);
    return {};
}
var a = new fn();
console.log(a.user); // undefined
console.log(a instanceof fn); // false
```

## 箭头函数

```text
ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。
```

```js
var myObj = {
    name: 'name1', 
    showThis: function() {
        console.log(this); // myObj
        var bar = () => {
            console.log(this); // myObj
            this.name = 'name2';
        }
        bar();
    }
};
myObj.showThis();
console.log(myObj.name); // name2
```

## 参考资料

- [彻底理解js中this的指向](https://mp.weixin.qq.com/s/KtIujq2Iq3YTHvWevJw8Cg)
