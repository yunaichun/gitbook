## 简介

> MVVM 简介学习笔记。

## 数据对象

```js
var data = {
    a: 200,
    level1: {
        b: 'str',
        c: [{ w: 90 }, { x: [1] }, 3],
        level2: {
            w: 90,
            x: [1]
        }
    }
};
```

## 检测数据

```js
observer(data);
```

## 实例 Watcher

```js
new Watcher(data, 'a', function(newVal, oldVal) {
    console.log('新值: ' + newVal + '----' + '旧值: ' + oldVal);
});
data.a = 300;
console.log('data', data);
```

## 实现目标

```js
我们目标是对数据 data 进行 observer 处理后

再实例 Watcher 如上所示，意味我们对数据 data 的 a 属性做了监听，同时收集了依赖

则当我们修改 data 的 a 属性时，就会触发我们收集的依赖函数

下面章节我们就来实现 observer 和 Watcher 函数，完全借鉴 Vue2 的做法来实现它
```

## 项目地址

地址: https://github.com/yunaichun/vue-study/tree/master/mvvm-simple

## 参考资料

- [Vue 源码 - observer 目录](https://github.com/yunaichun/vue-study/tree/master/vue-src/core/observer)
