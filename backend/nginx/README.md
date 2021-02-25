## 简介

> Nginx 学习笔记。

## 安装

> mac 安装

```text
命令: brew install nginx

安装位置: /usr/local/etc/nginx/nginx.conf
```

> ubuntu 安装

```text
命令: apt-get install nginx

安装位置: /etc/nginx/nginx.conf
```

## 基本使用

```text
启动: sudo nginx

停止: sudo nginx -s stop

重启: sudo nginx -s reload
```

## 跨域

```conf
server {
    # 将前后端都反向代理到本地 8080 端口
    listen                8080;
    server_name           host;
    
    # 前端地址
    location  / {
        proxy_pass        http://host:4000;
    }

    # api 地址
    location /v1/ {
        proxy_pass        http://ip:3000;
    }
}
```

## 均衡负载

```conf
# 通过 upstream 配置均衡负载
upstream webUpStreaml {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen                8000;
    server_name           127.0.0.1;

    location / {
        proxy_pass        http://webUpStreaml;
    }
}
```

## BrowserRouter 配置

#### 开发环境-配置webpack

```js
// == 即将以 / 开头的路径都指向 index.html
historyApiFallback: {
  rewrites: [
    { from: /^\//, to: '/index.html' },
  ],
}
```

#### 线上环境-配置nginx

```conf
server {
    listen 80;
    server_name www.answera.top;

    charset utf-8;
    set $home /var/www/test-static;

    location / {
        expires 10m;
        default_type text/html;
        root $home;
        # 即将所有404页面指向到 index.html
        try_files /index.html =404;
    }
}
```

#### 线上环境-koa2服务


```text
1、路径对应文件存在则返回

2、不存在则返回 index.html

3、手动实现的一个静态服务npm包: https://github.com/yunaichun/ync-lerna-packages/tree/master/packages/ync-react-browserrouter-server
```

## 参考资料

- [前端开发者必备的Nginx知识](https://juejin.cn/post/6844903793918738440)
- [前端必会的 Nginx入门视频教程(共11集)](https://juejin.cn/post/6844903701459501070)
- [nginx从入门到实践](https://juejin.cn/post/6844903519003099149#heading-106)
- [nginx中location、rewrite用法总结](https://www.cnblogs.com/dadonggg/p/7797281.html)
