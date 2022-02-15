## 简介

> nrm 学习笔记。

## 镜像源管理

```sh
# 安装 nrm
npm i nrm -g

# 添加源
nrm add [name] [registry]

# 查看源
nrm ls

# 切换源
nrm use [name]

# 测试源
nrm test [name] 
```

## 镜像配置

```sh
# 查看
npm config ls

# 设置
npm config set <key> <value> [-g|--global]

# 获取
npm config get <key>

# 删除
npm config delete <key>

# 修改
npm config edit
```

## 参考资料

- [nrm 安装与配置](https://juejin.cn/post/6844904008994275335)
