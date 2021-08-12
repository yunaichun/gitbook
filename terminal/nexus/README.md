## 简介

> nexus 学习笔记。

## 如何搭建 nexus 服务

```text
启动服务
/opt/nexus/nexus-3.28.1-01/bin/nexus stop

停止服务
/opt/nexus/nexus-3.28.1-01/bin/nexus start

配置文件路径
/opt/nexus/nexus-3.28.1-01/etc/nexus-default.properties

访问地址
http://localhost:8081
```

## 忘记 nexus 密码操作

```
1、停止服务

2、进入OrientDB控制台
java -jar /opt/nexus/nexus-3.28.1-01/lib/support/nexus-orient-console.jar

3、在控制台执行
connect plocal:/opt/nexus/sonatype-work/nexus3/db/security admin admin

4、重置admin账号密码为xxx
update user SET password="xxx" UPSERT WHERE id="admin"

5、重启服务
```

## 参考资料

- [npm 私服搭建与包发布](https://juejin.cn/post/6844903805805412366)
- [使用 Nexus 搭建 Maven 私服](https://cloud.tencent.com/developer/article/1583875)
