## 简介

> MySQL 安装及使用学习笔记。

## 安装

#### mac 安装

```text
brew install mysql
```

#### ubuntu 安装

```text
命令: sudo apt-get install mysql-server mysql-client

配置文件: /etc/mysql/mysql.conf.d/mysqld.cnf
```

#### mysqld.conf 必要修改

```text
1. 外网可访问
# bind-address 127.0.0.1

2. 放开日志
general_log = 1
general_log_file = /etc/log/mysql/query.log
tail -f /etc/log/mysql/query.log

3. 默认端口 3306 修改
```

## 启动和登录

#### 版本

```sh
mysql --version
```

#### 启动

```sh
# 启动
service mysql start

# 停止
service mysql stop

# 重启
service mysql restart

# 状态
service mysql status
```

#### 登录

```text
不输入密码: mysql -u root

输入密码: mysql -u yunaichun -p
```

#### 用户创建并授权

```text
mysql 8 之前:
grant insert,delete,select,update on 数据库.* to "用户名"@"登录主机" indentified by "密码”;

mysql 8 之后:
CREATE USER 'yunaichun'@'%' IDENTIFIED BY 'yourpasswod';
GRANT ALL PRIVILEGES ON test.* TO 'yunaichun'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

注意
*.*指所有数据库，test.* 指 test 数据库；@"%"指的是所有主机，@"localhost"指本机
```

#### 用户查看

```text
查看所有用户: select host,user from mysql.user;

查看当前用户: select current_user();
```

#### navicate 低版本连接

```text
ALTER USER 'yunaichun'@'%' IDENTIFIED WITH mysql_native_password BY 'yourpasswod';

flush privileges;
```

## 基本使用

#### database 创建和删除

```text
查询所有 database
show databases;

创建 database
create database 库名 default character set gbk;

删除 database
drop database 库名;

使用 database
use 库名;
```

#### table 创建和删除

```text
查询所有表
show tables;

创建表
create table if not exists 表名(
    id int auto_increment not null primary key comment '主键id',
    username varchar(16) not null DEFAULT 'test' comment '姓名',
    brother char(8) comment '兄弟',
    age int comment '年龄',
    sex char(1) comment '性别',
    birthday date comment '生日'
) DEFAULT CHARSET=utf8;

删除表
drop table 表名;

查看表定义
describe 表名;
```

#### data 增删查改

```text
插入
insert into test(id,name,birthday) values(1,'xiaoming',2015);

更新
update test set name="xiaoli" where id=1;

删除
delete from test where id=1;

查询
select * from  test;
```

#### 查询相关

> 总数

```text
select count(*) from test
```

> 排序

```text
select * from test order by id ASC

ASC     根据id字段从小到大

DESC    根据id字段从大到小
```

> 模糊查询

```text
以N开头
SELECT * FROM test  WHERE City LIKE 'N%'

以N结尾
SELECT * FROM test  WHERE City LIKE '%N'

包含N
SELECT * FROM test  WHERE City LIKE '%N%'

不包含N
SELECT * FROM test  WHERE City NOT LIKE '%N%'

等于N
SELECT * FROM test  WHERE City LIKE 'N'
```

## 参考资料

- [Ubuntu安装MySQL](https://juejin.cn/post/6844903722250665997)
- [navicate低版本连接问题](https://blog.csdn.net/yubin1285570923/article/details/83352491)
