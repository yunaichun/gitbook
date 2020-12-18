## 简介

> Promise 实现学习笔记。

## 构造函数

```js
constructor(executor) {
    this.status = 'pending';
    this.data = undefined;
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];
    try {
        executor(this.resolve.bind(this), this.reject.bind(this))
    } catch(e) {
        throw(e);
    }
}
```

## resolve 方法

```js
resolve(value) {
    setTimeout(function() {
        let self = this;
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value; 
            for(let i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }.bind(this));
}
```

## reject 方法

```js
reject(value) {
    setTimeout(function() {
        let self = this;
        if (self.status === 'pending') {
            self.status = ‘rejected';
            self.data = value; 
            for(let i = 0; i < self.onRejectedCallback.length; i++) {
                self.onRejectedCallback[i](value)
            }
        }
    }.bind(this));
}
```

## catch 方法

```js
catch(onRejected) {
    return this.then(null, onRejected);
}
```

## finally 方法

```js
finally(fn) {
    return this.then(function(value) {
        setTimeout(fn);
        return value;
    }, function(reason) {
        setTimeout(fn);
        return reason;
    });
}
```

## deferred 方法

```js
deferred() {
    let dfd = {}
    dfd.promise = new PromiseNew(function(resolve, reject) {   
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
stop() {
    return new PromiseNew(function() {});
}
```

## then 方法

```js
then(onResolved, onRejected) {
    let self = this;
    let promise2;

    // == 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function(value) { return value; };
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason; };

    if (self.status === 'resolved') {
        return promise2 = new PromiseNew(function(resolve, reject) {
            setTimeout(function() {
                try {
                    let x = onResolved(self.data);
                    if (x instanceof PromiseNew) {
                        x.then(resolve, reject);
                   } else {
                        resolve(x);
                   }
               } catch (e) {
                   reject(e);
               }
           }.bind(self));
       });
    }

    if (self.status === 'rejected') {
        return promise2 = new PromiseNew(function(resolve, reject) {
            setTimeout(function() {
                try {
                    let x = onRejected(self.data);
                    if (x instanceof PromiseNew) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            }.bind(self));
        });
    }

    if (self.status === 'pending') {  
        return promise2 = new PromiseNew(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {
                    let x = onResolved(self.data);
                    if (x instanceof PromiseNew) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);   
                }
           });
           self.onRejectedCallback.push(function(reason) {
               try {
                   let x = onRejected(self.data);
                   if (x instanceof PromiseNew) {
                       x.then(resolve, reject);
                   } else {            
                       resolve(x);
                   }
               } catch (e) {
                   reject(e);
               }
           });
       });
    }
}
```

## PromiseNew.resolve 方法

```js
PromiseNew.resolve = function(value) {
    return new PromiseNew(function(resolve, reject) {
        if (value instanceof PromiseNew) {
            value.then(resolve, reject);
        } else {
            resolve(value);
        }
    })
}
```

## PromiseNew.resolve 方法

```js
PromiseNew.reject = function(value) {
    return new PromiseNew(function(resolve, reject) {
        reject(reason);
    })
}
```

## PromiseNew.all 方法

```js
PromiseNew.all = function(promises) {
    return new PromiseNew(function(resolve, reject) {
        if (Object.prototype.toString.call(promises) === '[object Array]') {
            let resolvedCounter = 0;
            let promiseNum = promises.length;
            let resolvedValues = new Array(promiseNum);
            for (let i = 0; i < promiseNum; i++) {
                promises[i].then(function(value) {
                    resolvedCounter++;
                    resolvedValues[i] = value;
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedValues);
                     }
               }, function(reason) {
                   return reject(reason);
               });
           }
        } else {
           reject('Uncaught (in promise) TypeError: 
           #<PromiseNew> is not iterable');
        }
    })
}
```

## PromiseNew.race 方法

```js
PromiseNew.race = function(promises) {
    return new PromiseNew(function(resolve, reject) {
        if (Object.prototype.toString.call(promises) === '[object Array]') {
            for (var i = 0; i < promises.length; i++) {
                promises[i].then(function(value) {
                    return resolve(value);
                }, function(reason) {
                    return reject(reason);
                });
            }
        } else {
            reject('Uncaught (in promise) TypeError: 
            #<PromiseNew> is not iterable');
        }
    })
}
```

## 最终实现地址

Promise实现: https://github.com/yunaichun/javascript-note/blob/master/JS笔记/重要笔记/Promise构造函数实现.js

## 参考资料

- [剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)
- [解读Promise内部实现原理](https://juejin.cn/post/6844903521284784142)
- [深入 Promise(一)——Promise 实现详解](https://zhuanlan.zhihu.com/p/25178630)
