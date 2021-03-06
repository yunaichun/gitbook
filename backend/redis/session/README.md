## 简介

> Redis 在 koa2 存储 session 学习笔记。

## 中间件封装

> middleware/session/redis.js

```javascript
const session = require('koa-session2');
const Redis = require('ioredis');
const config = require('../../config');

class RedisStore extends session.Store {
  constructor() {
    super();
    this.redis = new Redis({
      ...config.redis,
      // keyPrefix: 'SESSION_ID:',
      ttl: 10 * 60,
      family: 4,
      db: 0
    });
  }

  async get(sid) {
    let data = await this.redis.get(`SESSION_ID:${sid}`);
    return JSON.parse(data);
  }

   // == 过期时间设置 10 分钟
  async set(session,  { sid = this.getID(24), maxAge = 10 * 60 } = {}) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION_ID:${sid}`, JSON.stringify(session), 'EX', maxAge);
    } catch (e) {}
    return sid;
  }

  async destroy(sid) {
    return await this.redis.del(`SESSION_ID:${sid}`);
  }
}

module.exports = session({
  key: 'SESSION_ID',
  store: new RedisStore(),
});
```

## koa2 入口文件

> app.js 引用上步封装的中间件

```javascript
const Koa = require('koa');
const sessionRedis = require('./middleware/session/redis');

const app = new Koa();
app.use(sessionRedis);
app.listen(3000, () => {
  console.log('server started on port 3000');
});
```

## controller 层 session 设置和获取

> 将 session 写入 Redis

```javascript
async setSessionToRedis(ctx, next) {
  // == session 被存储在 redis 中,
  // == key 值为 SESSION_ID:7d388242d5ea08e43fedac11b8289ae8356a45ecce2fae1f
  // == value 为设置的值
  ctx.session = {
    user_id: Math.random().toString(36).substr(2),
    count: 0
  };
  ctx.body = Utils.success(ctx.session);
  await next();
}
```

> 获取 redis 设置的 session

```javascript
async getSessionFromRedis(ctx, next) {
  // == ctx.session 等价于 get SESSION_ID:7d388242d5ea08e43fedac11b8289ae8356a45ecce2fae1f
  ctx.session.count = ctx.session.count + 1;
  ctx.body = Utils.success(ctx.session);
  await next();
}
```

## 项目实战

> 项目地址: https://github.com/yunaichun/koa2-dbs

## 参考资料

- [koa2实现session的两种方式（基于Redis 和MySQL）](https://www.yht7.com/news/110874)
