## 简介

> PM2 学习笔记。

## 安装

```text
npm i pm2 -g
```

## 基本使用

```text
初始化: pm2 init

显示所有服务: pm2 list

停止服务: pm2 stop id

重启服务: pm2 restart  id（修改线上代码的时候）

显示服务详情: pm2 show id

打印服务日志: pm2 logs  id --lines 1000 
```

## 自动发布

> package.json

```json
{
  "scripts": {
    "deploy:stag": "NODE_ENV=staging pm2 deploy ecosystem.config.js staging",
    "deploy:prod": "NODE_ENV=production  pm2 deploy ecosystem.config.js production"
  },
}
```

> ecosystem.config.js

```javascript
module.exports = {
  apps : [{
    name: 'koa2-dbs',
    script: './src/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_staging: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    staging : {
      user: 'root',
      host: '47.99.145.58',
      ref: 'origin/master',
      repo: 'git@github.com:yunaichun/koa2-dbs.git',
      path: '/var/www/koa2-dbs',
      'post-deploy' : 'cnpm ci && pm2 startOrReload ecosystem.config.js --env staging',
    },
    production : {
      user: 'root',
      host: '47.99.145.58',
      ref: 'origin/master',
      repo: 'git@github.com:yunaichun/koa2-dbs.git',
      path: '/var/www/koa2-dbs',
      'post-deploy' : 'cnpm ci && pm2 startOrReload ecosystem.config.js --env production'
    }
  }
};
```

> 流程分析

```text
1. pm2 deploy ecosystem.config.js staging 会执行 ecosystem.config.js 的 deploy 项的 production 配置

2. pm2 startOrReload ecosystem.config.js --env production 环境变量会取 ecosystem.config.js 的 app 项的 env_production 配置
```

## 参考资料

- [PM2官网](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- [PM2入门](https://juejin.cn/post/6844903816454733837)
- [使用pm2自动化部署node项目](https://juejin.cn/post/6844903665107468296)
- [使用pm2+nginx部署koa2(https)](https://juejin.cn/post/6844903496165277709)
