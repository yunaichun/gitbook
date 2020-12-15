## 简介

> MongoDB 安装及使用学习笔记。

## 安装

#### mac 安装

```text
brew install mongodb
```

#### ubuntu 安装

```text
命令: sudo apt install mongodb

配置文件: /etc/mongodb.conf 
```

#### mongodb.conf 必要修改

```text
1. 外网可访问
bind_ip 127.0.0.1,172.18.92.220

2. 放开日志
/var/log/mongodb/mongodb.log
tail -f /var/log/mongodb/mongodb.log

3. 默认端口 27017 修改
```

## 启动和登录

#### 版本

```text
mongo --version
```

#### 启动

```text
启动: systemctl start mysql

停止: systemctl stop mysql

重启: systemctl restart mysql

状态: systemctl status mysql
```

#### 登录

```text
不输入密码: mongo localhost:17072

输入密码: mongo localhost:17072 -u yunaichun -p yourpassword
```

#### 用户创建并授权

```text
root用户创建
db.createUser({
        user: 'root',
        pwd: 'yourpassword',
        roles: [{ role: 'root', db: 'admin' }]
    }
);

普通用户创建
db.createUser({
        user: 'yunaichun',
        pwd: 'yourpassword',
        roles: [{ role: 'readWrite', db: 'test' }]
    }
);
```

#### 用户查看

```text
显示全部用户: show users;

查看当前用户: db.runCommand({connectionStatus : 1});

验证用户是否具有某数据库权限：db.auth('yunaichun', 'yourpassword'); 【配置文件开启 auth = true】
```

## 基本使用

#### database 创建和删除

```text
查询所有 database
show databases; (或 show abs)

创建并使用 database
use 库名;

删除 database
db.dropDatabase();
```

#### table 创建和删除

```text
查询所有表
show tables; (或 show collections;)

创建表
db.createCollection('表名');

删除表
db.表名.drop();
```

#### data 增删查改

```text
插入
for(i=3;i<10;i++) db.test.insert({x:i, y:100, z:100})

更新: 其余被置为空
db.test.update({x:4}, {x:3})
 
删除: 参数必传
db.test.remove({x:3})

查询
db.test.find({x:1}).pretty()
```

#### 更新相关

> 更新部分字段 

```text
db.test.update({x: 3}, {$set: {y: 99}})
```

> 更新不存在数据则插入 

```text
db.test.update({y: 999}, {y: 999}, true)
```

> 相同条件全部更新 

```text
db.test.update({z: 100}, {$set: {z: 98}}, false, true)
```

#### 查询相关

> 总数 

```text
db.test.find().count()
```

> 排序

```text
db.test.find().sort({x:1})

x为1       根据x字段从小到大

x为-1      根据x字段从大到小
```

> 跳过数据

```text
db.test.find().skip(3)
```

>限制条数

```text
db.test.find().skip(3).limit(2)
```

#### 索引相关

> 查看索引

```text
db.test.getIndexes()
```

> _id索引 - insert时候自动创建

```text
db.test.insert({x: 1})
```

> 单键索引

```text
db.test.ensureIndex({x: 1})

x:1代表正向索引，x:-1代表逆向索引、需要在使用数据库之前创建索引,否则严重影响数据库性能
```

> 多键索引

```text
db.test.ensureIndex({x: [1,2,3,4,5,6]}) 
```

> 复合索引

```text
db.test.ensureIndex({x: 1, y: 2}) 
```

> 过期索引

```text
db.test.insert({x: 1}, {expireAfterSeconds: 30}) 

30s之后过期
```

> 全文索引

```text
db.test.find({ $text: { $search: 3 } }, { score: { $meta: 'textScore' }}).sort({ score: { $meta: 'textScore' }})
```

## 参考资料

- [如何在 Ubuntu 上安装 MongoDB](https://www.cnblogs.com/wefeng/p/11503141.html)
