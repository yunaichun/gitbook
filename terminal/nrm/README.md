## 简介

> nrm + npm 学习笔记。

## 如何搭建npm组件库

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

## 镜像源管理

```text
安装
npm i nrm -g

添加
nrm add qingting 镜像源

查看
nrm ls

切换
nrm use 镜像源
```

## 镜像配置

```text
查看
npm config ls

设置
npm config set <key> <value> [-g|--global]

获取
npm config get <key>

删除
npm config delete <key>

修改
npm config edit
```

## 测试包

```text
组件库本地目录测试
npm link 

项目中其他项目测试
npm link package-name
```

## 发布包

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
- [nrm安装与配置](https://juejin.cn/post/6844904008994275335)
- [npm命令配置技巧](https://www.jianshu.com/p/0f8ba68a04ec)
- [npm常用命令](https://www.jianshu.com/p/087d839e1d0c)
- [如何发布自己的NPM包（模块）？](https://juejin.cn/post/6844903673684836365)
