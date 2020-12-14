## 简介

> tmux 学习笔记。

## 会话命令

```text
新建会话
tmux（tmux new -s "sessionname"）

查看会话
ctrl+b-->s

关闭会话
ctrl+b-->d（退出会话并删除：exit）

进入会话
tmux attach(进入上次会话) 
```

## 一个会话中多窗口设置

```text
创建窗口
ctrl+b-->c

切换窗口
ctrl+b-->窗口数字 

退出窗口
exit
```

## 一个窗口中的多个窗格

```text
垂直窗格
ctrl+b—>%

上下窗格
ctrl+b->"

切换窗格
ctrl+b-->方向键盘

退出窗格：exit
```

## 窗格可以滚动设置

```text
tmux set -g mouse on
```

## 参考资料

- [在 Linux/Mac 安装 Tmux 及其配置](https://my.oschina.net/am313/blog/865915)
- [tmux：打造精致与实用并存的终端](https://segmentfault.com/a/1190000008188987)
