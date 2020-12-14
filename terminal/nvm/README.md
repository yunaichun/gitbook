## 简介

> nvm 学习笔记。

## Ubuntu 安装

```text
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | zsh

source ~/.zshrc
```

## Mac 安装

```text
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | zsh

source ~/.zshrc
```

## 常见命令

```text
查看已经安装的node
nvm ls

查看可以安装的node
nvm ls-remote

安装指定版本
nvm install v10.15.0

安装稳定版
nvm install stable

切换不同node版本
nvm use v10.15.0

通过官网安装的node版本号查看
nvm use system
```

## 参考资料

- [在 Mac 下安装 nvm 管理 node（解决版）](https://segmentfault.com/a/1190000017391932)
- [node版本管理工具nvm-Mac下安装及使用](https://segmentfault.com/a/1190000004404505)
