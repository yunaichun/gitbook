## 简介

> Redis 在 koa2 中缓存请求学习笔记。

## RedisStore 方法封装

> redisImpl.js

```javascript
const Redis = require('ioredis');
const config = require('../config');

class RedisStore {
  constructor() {
    this.redis = new Redis({
      ...config.redis,
      // keyPrefix: 'SESSION_ID:',
      ttl: 10 * 60,
      family: 4,
      db: 0
    });
  }

  async get(key) {
    let data = await this.redis.get(`${key}`);
    return JSON.parse(data);
  }

   // == 过期时间设置 10 分钟
  async set(key, value, maxAge = 10 * 60) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`${key}`, JSON.stringify(value), 'EX', maxAge);
    } catch (e) {}
    return value;
  }

  async destroy(key) {
    return await this.redis.del(`${key}`);
  }
}

module.exports = new RedisStore();
```


## controller 层

> 请求缓存至 redis

```javascript
async cacheToRedis(ctx, next) {
  const key = `user:${ctx.params.id}`;
  const user = await redisImpl.get(key);
  console.log('redis user value is:', user);
  if (!user) {
    const result = await { user: 'test', age: '1'};
    // == 查询到值将结果存储下来
    if (!result) {
      await redisImpl.set(key, 'null');
    } else {
      await redisImpl.set(key, result);
    }
    ctx.body = Utils.success(result);
    await next();
  } else {
    ctx.body = Utils.success(user);
    await next();
  }
}
```

## 项目实战

> 项目地址: https://github.com/yunaichun/koa2-dbs

## 参考资料

- [Redis + Node.js: 请求缓存](https://blog.csdn.net/bdss58/article/details/53590393)
