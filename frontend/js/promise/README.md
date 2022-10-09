## 简介

> Promise 实现学习笔记。

## 构造函数

```js
/**
 * 1、先收集 then 回调，再执行构造函数
 * 2、then 返回的还是 Promise 实例
 * @param {Function} executor 
 */
function FakePromise(executor) {
  this.status = 'pending';
  this.data = undefined;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];
  try {
    executor(this.resolve.bind(this), this.reject.bind(this));
  } catch (error) {
    throw error;
  }
}
```

## then 方法

```js
/** then 不返回 this 返回 FakePromise 实例: 取决于后一个 promise 返回的值
 *  例: 如若 promise1 返回 resolved, then 还返回 this 的话，则整体返回 resolved，实际是 rejected
 *  promise2 = promise1.then(function foo(value) {
 *   return Promise.reject(3)
 *  })
 */
FakePromise.prototype.then = function (onResolvedCallback, onRejectedCallback) {
  onResolvedCallback = typeof onResolvedCallback === 'function' ? onResolvedCallback : function(value) { return value; };
  onRejectedCallback = typeof onRejectedCallback === 'function' ? onRejectedCallback : function(reason) { throw reason; };

  const _this = this;
  const collectResolve = function(resolve, reject) {
    try {
      const onResolvedCallbackRes = onResolvedCallback(_this.data);
      if (onResolvedCallbackRes instanceof FakePromise) {
        onResolvedCallbackRes.then(resolve, reject)
      } else {
        resolve(onResolvedCallbackRes);
      }
    } catch (error) {
      reject(error);
    }
  }
  const collectReject = function(resolve, reject) {
    try {
      const onRejectedCallbackRes = onRejectedCallback(_this.data);
      if (onRejectedCallbackRes instanceof FakePromise) {
        onRejectedCallbackRes.then(resolve, reject)
      } else {
        resolve(onResolvedCallbackRes);
      }
    } catch (error) {
      reject(error);
    }
  }
  return new FakePromise(function(resolve, reject) {
    if (_this.status === 'pending') {
      _this.onResolvedCallbacks.push(() => collectResolve(resolve, reject));
      _this.onRejectedCallbacks.push(() => collectReject(resolve, reject));
    }
    if (_this.status === 'resolved') collectResolve(resolve, reject);
    if (_this.status === 'rejected') collectReject(resolve, reject);
  });
}
```

## resolve 方法

```js
FakePromise.prototype.resolve = function (value) {
  /** setTimeout 的目的是为了先执行 then 收集回调函数*/
  setTimeout(function () {
    if (this.status === 'pending') {
      this.data = value;
      this.status = 'resolved';
      for (let i = 0, len = this.onResolvedCallbacks.length; i < len; i++) {
        this.onResolvedCallbacks[i](value);
      }
    }
  }.bind(this), 0);
}                                                                                     
```

## reject 方法

```js
FakePromise.prototype.reject = function (value) {
  /** setTimeout 的目的是为了先执行 then 收集回调函数 */
  setTimeout(function () {
    if (this.status === 'pending') {
      this.data = value;
      this.status = 'rejected';
      for (let i = 0, len = this.onRejectedCallbacks.length; i < len; i++) {
        this.onRejectedCallbacks[i](value);
      }
    }
  }.bind(this), 0);
}
```

## catch 方法

```js
FakePromise.prototype.catch = function (onRejectedCallback) {
  return this.then(null, onRejectedCallback);
}
```

## finally 方法

```js
FakePromise.prototype.finally = function (fn) {
  return this.then(function(value) {
    fn(value);
    return value;
  }, function(reason) {
    fn(value);
    return reason;
  });
}
```

## 静态方法

```js
FakePromise.resolve = function(value) {
  return new FakePromise(function(resolve) {
    resolve(value);
  });
}
FakePromise.reject = function(value) {
  return new FakePromise(function(resolve, reject) {
    reject(value);
  });
}
FakePromise.race = function(promises) {
  return new FakePromise(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      promises[i].then(function(value) {
        return resolve(value);
      }, function(error) {
        return reject(error);
      });
    }
  });
}
FakePromise.all = function(promises) {
  return new FakePromise(function(resolve, reject) {
    let [count, resolvedValues] = [0, []];
    for (var i = 0; i < promises.length - 1; i++) {
      promises[i].then(function(value) {
        resolvedValues[i] = value;
        if (++count === promises.length) return resolve(resolvedValues);
      }, function(error) {
        return reject(error);
      });
    }
  });
}
```

## 最终实现

Promise实现: https://github.com/yunaichun/javascript-note/blob/master/JS笔记/重要笔记/Promise构造函数实现.js

## 参考资料

- [剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)
- [解读Promise内部实现原理](https://juejin.cn/post/6844903521284784142)
- [深入 Promise(一)——Promise 实现详解](https://zhuanlan.zhihu.com/p/25178630)
