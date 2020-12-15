## 简介

> MongoDB 关系对象模型 Mongoose 学习笔记。

## mongoose 封装

> 主要是导出 mongoose 对象模型, 供 model 层使用

```javascript
const mongoose = require('mongoose');
const config = require('../../config');

const { user, password, host, port, database } = config.mongo;

mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${database}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => {
	if (err) {
		console.log('connect mongo error -->', err);
		process.exit(1);
	}
	console.log('connect mongo success'); 
});

module.exports = {
    mongoose
};
```

## model 层

> 主要是导出连接了数据库的 mongoose, 供 service 层使用

```javascript
const { mongoose } = require('./index');
const Schema = mongoose.Schema;

module.exports = mongoose.model('test', new Schema({
  username: {
    type: String,
    required: [true, 'username 不能为空'],
    default: 'test',
	},
	brother: {
    type: String,
    default: 'test',
  },
  age: {
    type: Number,
    default: 'test',
  },
  sex: {
    type: String,
    default: 'test',
  },
  birthday: {
    type: Date,
    default: 'test',
  }
}), 'test');
```

## service 层

> 主要是通过 sequelize 对象模型对 MySQL 做增删查改操作, 供 contriller 层使用

```javascript
const Model = require('../../model/mongo/test');

module.exports = {
  async insert(body) {
    const newModal = new Model(body);
    const result = await newModal.save();
    return result;
  },
  async remove(params) {
    const result = await Model.remove(params);
    return result;
  },
  async update(body, params) {
    const result = await Model.update(params, body, { multi: true });
    return result;
  },
  async findOne(params) {
    const result = await Model.findOne(params);
    return result;
  },
  async findAndCountAll(params) {
    let { page, size } = params;
    page = Number(page);
    size = Number(size);
    delete params.page;
    delete params.size;
    const rows = await Model.find(params)
      .skip((page - 1) * size)
      .limit(size)
      .sort({'_id': -1});
    const count = await Model.count({})
    return { rows, count };
  },
};
```

## contriller 层

> 处理请求，可调用 service 层对数据库操作

```javascript
const Service = require('../../service/mongo/test');
const Utils = require('../../utils/output');

module.exports = {
  async insert(ctx, next) {
    const body = ctx.request.body;
    const result = await Service.insert(body);
    ctx.body = Utils.success(result);
    await next();
  },
  async remove(ctx, next) {
    const params = { _id: ctx.params.id };
    const result = await Service.remove(params);
    ctx.body = Utils.success(result);
    await next();
  },
  async update(ctx, next) {
    const body = ctx.request.body;
    const params = { username: ctx.params.id };
    const result = await Service.update(body, params);
    ctx.body = Utils.success(result);
    await next();
  },
  async findOne(ctx, next) {
    const params = ctx.request.query;
    const result = await Service.findOne(params);
    ctx.body = Utils.success(result);
    await next();
  },
  async findAndCountAll(ctx, next) {
    const params = ctx.request.query;
    const { page, size } = params;
    const { count, rows } = await Service.findAndCountAll(params);
    ctx.body = Utils.success({
      data: rows,
      count,
      page,
      size,
    });
    await next();
  },
};
```

## 项目实战

> 项目地址: https://github.com/yunaichun/koa2-dbs

## 参考资料

- [mongoose 官方文档](http://mongoosejs.com/docs/guide.html)
- [koa2入门（3）mongoose 增删改查](https://www.cnblogs.com/cckui/p/10429064.html)
- [Mongoose 之 populate 使用](https://www.geekjc.com/post/5b1776a7ddaf2b2080df6bc5)
- [消息队列(暂存)](https://cloud.tencent.com/developer/article/1543087)
