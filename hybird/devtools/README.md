## 简介

> CSS 选择器学习笔记。

## 不同环境调试介绍

```text
1. 微信
微信开发者工具

2. node
chrome: http://www.ruanyifeng.com/blog/2018/03/node-debugger.html

3. 安卓-webView
chrome: https://aotu.io/notes/2017/02/24/Mobile-debug/index.html
uc-devtools【不需翻墙】

4. 苹果-webView
safari【需要安装debugger包】

5. 安卓-浏览器
chrome: https://aotu.io/notes/2017/02/24/Mobile-debug/index.html
uc-devtools

6. 苹果-浏览器
safari: https://aotu.io/notes/2017/02/24/Mobile-debug/index.html

7. 安卓模拟器
chrome: https://developers.google.com/web/tools/chrome-devtools/remote-debugging?hl=zh-cn
```

## Charles 使用介绍

> 安装步骤

```text
1. 手机连接到 charles 代理，点击 allow

2. 手机输入下面地址，下载并安装证书：
https://chls.pro/ssl
http://www.charlesproxy.com/getssl

3. 查询具体手机: 安全人员选项开启，同时 usb 调试打开
```

> 注意事项

```text
1. 安卓手机修改下后缀为crt文件、苹果手机格式为pem（默认）

2. Proxy -> SSL Proxying Setting -> SSL Proxy -> *:*、*:443

3. 配置 mapping: Tools -> Map Remote

4. 安卓电脑信任文件: Proxy -> SSL Proxying Setting -> Root Certificate
```

## uc-devtools 使用介绍

```text
1. 下载 uc-devtools 并安装

2. 打开手机开发者选项，usb调试设置为允许，通过数据线链接电脑

3. 手机中需要安装 debug 包

4. 电脑打开 uc-dextools, 在设置选项中选择本地资源
```

## 移动端控制台

> vconsole

```text
npm install vconsole
new VConsole();
```

> eruda

```text
import eruda from 'eruda';
eruda.init();
```

- [Node 调试工具入门教程](http://www.ruanyifeng.com/blog/2018/03/node-debugger.html)
- [移动端真机调试指南](https://aotu.io/notes/2017/02/24/Mobile-debug/index.html)
- [Android 设备的远程调试入门](https://developers.google.com/web/tools/chrome-devtools/remote-debugging?hl=zh-cn)
- [uc-devtools调试文档](https://plus.ucweb.com/docs)
- [uc-devtools-网盘下载](https://pan.baidu.com/s/1qyWCYSu-JUHeV8ca_H64WA)
