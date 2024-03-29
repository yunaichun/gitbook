## 简介

> Redis 安装及使用学习笔记。

## 安装

> mac 安装

```sh
brew install redis
```

> ubuntu 安装

```sh
# 命令
apt install redis-server

# 配置文件
/etc/redis/redis.conf
```

> redis.conf 必要修改

```text
1. 外网可访问
bind 127.0.0.1 ::1  -> bind 0.0.0.0

2. 密码配置
requirepass yourpassword

3. 放开日志
/var/log/redis/redis-server.log
tail -f /var/log/redis/redis-server.log

4. 默认端口 6379 修改
```

## 启动和登录

> 版本

```sh
redis-server --version
```

> 启动

```sh
# 启动
service redis start

# 停止
service redis stop

# 重启
service redis restart

# 状态
service redis status

# 版本
redis-server --version
```

> 登录

```sh
# 不写密码登录
redis-cli -p 9376

# 输入密码登录:
redis-cli  -h 127.0.0.1 -p 9376 -a yourpassword

# 登录成功后查看帮助:
help 命令
```

> 设置密码

```sh
# 登录成功后可获取密码
config get requirepass

# 登录成功后可设置密码
config set requirepass yourpassword

# auth密码是否正确
auth yourpassword
```

## 基本使用

```sh
# 设置 key 的值
set name test

# 设置 key 的过期时间(30s)
expire name 30

# 获取 key 的值
get name

# 获取 key 的过期时间
ttl name 

# 删除 key
del name

# 获取所有key值
keys *

# 查看key数量
info keyspace
```

## 参考资料

- [redis中文文档](http://www.redis.cn/documentation.html)
- [ubuntu 18.04 安装 Redis](https://wangxin1248.github.io/linux/2018/07/ubuntu18.04-install-redis.html)
- [redis五种数据类型和常用命令及适用场景](https://www.cnblogs.com/ryanlamp/p/9689682.html)
- [DataBase | Redis](https://www.bookstack.cn/read/Nodejs-Roadmap/redis.md)
