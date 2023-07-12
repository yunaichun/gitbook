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

```sh
# 查看已经安装的 node
nvm ls

# 查看可以安装的 node
nvm ls-remote

# 安装指定版本
nvm install v10.15.0

# 安装稳定版
nvm install stable

# 切换不同 node 版本
nvm use v10.15.0

# 设定终端默认 node 版本
nvm alias default <version>
```

## 参考资料

- [在 Mac 下安装 nvm 管理 node（解决版）](https://segmentfault.com/a/1190000017391932)
- [node版本管理工具nvm-Mac下安装及使用](https://segmentfault.com/a/1190000004404505)
- [在 Mac 下安装 pyenv 管理 python](https://www.freecodecamp.org/chinese/news/python-version-on-mac-update/)
