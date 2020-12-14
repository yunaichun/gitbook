## 简介

> linux 常用命令学习笔记。

## VIM 常用操作

> 移动光标

```text
h、j、k、l 
```

> 定位

```text
第一行: gg

最后一行: G/shift + g

行首: 0

行尾: $

上一行: O

下一行: o

显示当前页: ctrl+g
```

> 插入

```text
光标之后: i

下一行: o

上一行: O

光标下一个单词后: a

下一句起始位置: A
```

> 查找

```text
正向查找: /string

反向查找: ?string

查找下一个: n

查找上一个: N

高亮显示: :set hls
```

> 替换

```text
:s/old/new/g     光标所在行替换

:%s/old/new/g    全文替换

:行数             定位行数
```

> 复制粘贴

```text
选择: v

复制: y（:w filename）

粘贴: p（:r filename）
```

## 常用操作

> 查看磁盘

```text
df -h: 命令查看整个硬盘的大小 ，-h表示人可读的

du -d 1 -h: 命令查看当前目录下所有文件夹的大小 -d 指深度，后面加一个数值
```

> 查看内存

```text
查看总使用量: free

查看内存、CPU使用情况: op
```

> 查看端口

```text
查看所有: netstat -ntlp
查看端口: netstat -apn | grep 8080
杀死进程: kill -9 PID

mac查看端口: lsof -i:8080
mac杀死进程: kill PID
```

> shell脚本

```text
#!/bin/sh
comments=$1
git add .
git commit -m "${comments}"
```

> 软链接

```text
ln -s /usr/bin/clear /usr/local/bin/cls
```

> 解压缩

```text
压缩: tar -zcvf

解压: tar -zxvf
```

> 上传下载

```text
上传文件: scp -r 本地文件 root@47.99.145.58:/root/

下载文件: scp -r  root@47.99.145.58:/root/服务文件 ./
```

## 用户权限

> 添加用户

```text
user add -m yunaichun

passed yunaichun
```

> 查看用户

```text
w
```

> 用户 sudo 权限

```text
1.chmod u+w /etc/sudoers

2.vim /etc/sudoers
yunaichun   ALL=(ALL:ALL)   ALL #可以执行sudo
yunaichun   ALL=(ALL:ALL)   NOPASSWD:ALL #不用输入密码

3.chmod u-w /etc/sudoers
```

## 参考资料

- [鸟哥的 Linux 私房菜：基础学习篇 第四版 - PDF](https://tiramisutes.github.io/images/PDF/vbird-linux-basic-4e.pdf)
- [鸟哥的 Linux 私房菜：基础学习篇 第四版 - Gitbook](https://wizardforcel.gitbooks.io/vbird-linux-basic-4e/content/)
