## 简介

> npm 学习笔记。

## 如何搭建 npm 服务

```text
安装
npm i verdaccio -g --unsafe-perm

启动服务
verdaccio
pm2 start verdaccio

停止服务
pm2 stop verdaccio

配置文件路径
~/.config/verdaccio/config.yaml

访问地址
http://localhost:4873
```

## 测试 npm 包

```text
组件库本地目录测试
npm link 

项目中其他项目测试
npm link package-name
```

## 发布 npm 包

```text
升级补丁版本号
npm version patch

升级小版本号
npm version minor

升级大版本号
npm version major

登录
npm login

发布
npm publish --access=public
```

## 参考资料

- [使用 verdaccio 搭建私有 npm 仓库](https://fe.rualc.com/note/npm-verdaccio.html#npm-install)
- [使用 verdaccio 搭建 npm 私有仓库](https://juejin.cn/post/6844903776533364749)
- [npm 命令配置技巧](https://www.jianshu.com/p/0f8ba68a04ec)
- [npm 常用命令](https://www.jianshu.com/p/087d839e1d0c)
- [如何发布自己的 NPM 包（模块）？](https://juejin.cn/post/6844903673684836365)
