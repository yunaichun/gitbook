## 简介

> zsh 学习笔记。

## Ubuntu 安装

```sh
# 1. ubuntu 中默认安装了哪些 shell  
$ cat /etc/shells

# 2. 当前正在运行的是那个版本的 shell
$ echo $SHELL

# 3. 正式安装zsh、git和wget 
$ sudo apt-get install zsh git wget
$ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

# 4. 替换bash为zsh： 
$ chsh -s /bin/zsh 

# 5. 重启： 
$ sudo reboot 
```

## Mac 安装

```sh
# 1. 下载 oh-my-zsh
git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh

# 2. 创建 .zshrc 文件
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc

# 3. 设置 zsh
chsh -s /bin/zsh
```

## 参考资料

- [在 ubuntu 中安装与配置 zsh 与 oh-my-zsh](https://www.jianshu.com/p/546effd99c35)
- [mac 配置彩色 shell(oh my zsh)](https://www.jianshu.com/p/522c8b464ed8)
- [install zsh on windows](https://www.youtube.com/watch?v=CrWB9zg4fLg)
