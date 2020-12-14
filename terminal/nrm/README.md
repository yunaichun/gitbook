## 简介

> nrm 学习笔记。

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
npm publish
```

## 参考资料

- [nrm安装与配置](https://juejin.cn/post/6844904008994275335)
- [npm命令配置技巧](https://www.jianshu.com/p/0f8ba68a04ec)
- [npm常用命令](https://www.jianshu.com/p/087d839e1d0c)
- [如何发布自己的NPM包（模块）？](https://juejin.cn/post/6844903673684836365)
