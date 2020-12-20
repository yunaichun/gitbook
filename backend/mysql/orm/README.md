## 简介

> MySQL 关系对象模型 Sequelize 学习笔记。

## sequelize 封装

> 主要是导出连接了数据库的 sequelize , 供 model 层使用

```javascript
const Sequelize = require('sequelize');
const config = require('../../config');

const { host, port, user, password, database } = config.mysql;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'mysql',
});

sequelize.authenticate().then(() => {
  console.log('connect mysql success.');
}).catch(err => {
  console.error('connect mysql error -->', err);
});

module.exports = {
  Sequelize,
  sequelize
};
```

## model 层

> 主要是导出 sequelize 对象模型, 供 service 层使用

```javascript
const { Sequelize, sequelize } = require('./index');

module.exports = sequelize.define('test', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '主键id'
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'test',
    comment: '姓名'
  },
  brother: {
    type: Sequelize.STRING,
    comment: '兄弟'
  },
  age: {
    type: Sequelize.INTEGER,
    comment: '年龄'
  },
  sex: {
    type: Sequelize.STRING,
    comment: '性别'
  },
  birthday: {
    type: Sequelize.DATE,
    comment: '生日'
  },
}, {
  freezeTableName: true,
  timestamps: false
});
```

## service 层

> 主要是通过 sequelize 对象模型对 MySQL 做增删查改操作, 供 contriller 层使用

```javascript
const Model = require('../../model/mysql/test');

module.exports = {
  async insert(body) {
    const result = await Model.create(body);
    return result;
  },
  async delete(params) {
    const result = await Model.destroy(params);
    return result;
  },
  async update(body, params) {
    const result = await Model.update(body, params);
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
    const result = await Model.findAndCountAll({
      where: params,
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'DESC']],
    });
    return result;
  },
};
```

## contriller 层

> 处理请求，可调用 service 层对数据库操作

```javascript
const Service = require('../../service/mysql/test');
const Utils = require('../../utils/output');

module.exports = {
  async insert(ctx, next) {
    const body = ctx.request.body;
    const result = await Service.insert(body);
    ctx.body = Utils.success(result);
    await next();
  },
  async delete(ctx, next) {
    const params = { where: { id: ctx.params.id } };
    const result = await Service.delete(params);
    ctx.body = Utils.success(result);
    await next();
  },
  async update(ctx, next) {
    const body = ctx.request.body;
    const params = { where: { id: ctx.params.id } };
    const result = await Service.update(body, params);
    ctx.body = Utils.success(result);
    await next();
  },
  async findOne(ctx, next) {
    const params = { where: ctx.request.query };
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
      page,
      size,
      count,
    });
    await next();
  },
};
```

## 项目实战

> 项目地址: https://github.com/yunaichun/koa2-dbs

## 参考资料

- [Sequelize 官方文档](https://sequelize.org)
- [Sequelize 中文文档](https://www.sequelize.com.cn)
- [廖雪峰 - 使用Sequelize](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [详细易用的 Sequelize 解读](https://juejin.cn/post/6844903897673269255)
- [sequelize model的常用方法](https://blog.csdn.net/skyblacktoday/article/details/104351477)
- [Node.js Sequelize 模型(表)之间的关联及关系模型的操作](https://itbilu.com/nodejs/npm/EJarwPD8W.html#relation-sync)
