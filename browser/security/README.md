## 简介

> 浏览器安全学习笔记。

## Dos 攻击（Denial of Service attack）

```text
是一种针对服务器的能够让服务器呈现静止状态的攻击方式。

有时候也加服务停止攻击或拒绝服务攻击。

其原理就是发送大量的合法请求到服务器，服务器无法分辨这些请求是正常请求还是攻击请求，所以都会照单全收。

海量的请求会造成服务器停止工作或拒绝服务的状态。这就是Dos攻击。

syn攻击就是常见的Dos攻击，让服务器处于TCP半连接状态
```

## SOL 注入攻击

```text
是指通过对web连接的数据库发送恶意的SQL语句而产生的攻击，从而产生安全隐患和对网站的威胁，可以造成逃过验证或者私密信息泄露等危害。

SQL注入的原理是通过在对SQL语句调用方式上的疏漏，恶意注入SQL语句。
```

```text
假如一个出版书籍的网站，具有根据作者姓名查询已出版书籍的功能，作者未出版的书籍不能被普通用户看到，因为版权属于隐私的问题。

那么假设请求是用HTTP的GET请求来完成的，其地址栏请求内容为：www.book.com?serach=echo
完成此功能的SQL语句为简单的根据条件查找：select * from book where author = 'echo' and flag = 1; flag等于1代表书籍已出版。

这时如果有的用户直接地址栏里输入www.book.com?serach='echo'--   这样请求会发生什么？？
　　　　　　　
这样的请求传到服务器里的状态会是这样子的 select * from book where author = 'echo' -- and flag = 1;

在SQL语句中--代表注释，会自动忽略掉后面的内容，所以这个请求是骗过服务器把作者为echo的已出版和未出版的书籍全部显示在网页上。造成网站违背开发者的意图，造成信息泄露。
```

## 跨站点请求伪造 CSRF（Cross-Site Request Forgeries）

#### 什么是 CSRF ？

```text
CSRF 英文全称是 Cross-site request forgery，所以又称为"跨站请求伪造"。

CSRF 攻击是指黑客引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。
简单来讲，CSRF 攻击就是黑客利用了用户的登录状态，并通过第三方的站点来做一些坏事。
```

#### 如何防范 CSRF ？

**1、Cookie 中设置 SameSite**

```text
set-cookie: 1P_JAR=2019-10-20-06;
expires=Tue, 19-Nov-2019 06:36:21 GMT;
path=/;
domain=.google.com;
SameSite=none
```

```text
SameSite 选项通常有 Strict、Lax 和 None 三个值。
1、Strict 最为严格。如果 SameSite 的值是 Strict，那么浏览器会完全禁止第三方 Cookie。

2、Lax 相对宽松一点。
在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。
但如果在第三方站点中使用 Post 方法， 或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。

3、如果使用 None 的话，在任何情况下都会发送 Cookie 数据。
```

**2、验证请求的来源站点（请求头 Origin 和 Referer）**

```text
Referer 是 HTTP 请求头中的一个字段，记录了该 HTTP 请求的来源地址。

在服务器端验证请求头中的 Referer 并不是太可靠，因此标准委员会又制定了 Origin 属性，
在一些重要的场合，比如通过 XMLHttpRequest、Fecth 发起跨站请求或者通过 Post 方法发送请求时，都会带上 Origin 属性。

服务器的策略是优先判断 Origin，如果请求头中没有包含 Origin 属性，再根据实际情况判断是否使用 Referer 值。
```

**3.3、CRRF Token**
```text
第一步，在浏览器向服务器发起请求时，服务器生成一个 CSRF Token。
CSRF Token 其实就是服务器生成的字符串，然后将该字符串植入到返回的页面中。

第二步，在浏览器端如果要发起的请求，那么需要带上页面中的 CSRF Token，然后服务器会验证该 Token 是否合法。
```

## XSS 攻击（Cross-Site scripting）

#### 什么是 XSS ？

```text
XSS 全称是 Cross Site Scripting，为了与"CSS"区分开来，故简称 XSS，翻译过来就是"跨站脚本"。

XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。
```

#### XSS 分类？

**1、存储型 XSS 攻击**

```text
用户设置字段时，服务器对关键字过滤不严格，比如可以将名称设置为一段 JavaScript，此段 JavaScript就被注入数据库中。
```

**2、反射型 XSS 攻击**

```text
恶意 JavaScript 脚本属于用户发送给网站请求中的一部 分，随后网站又把恶意 JavaScript 脚本返回给用户。

当恶意 JavaScript 脚本在用户页面中 被执行时，黑客就可以利用该脚本做一些恶意操作。

假如路由: http://localhost:3000/?xss=<script>alert('你被xss攻击了')</script> 
是将请求参数 xss 显示在页面上，则当打开这段 URL 时，用户会显示弹窗。
```

#### 如何防范 XSS ？

**1、服务器或者前端对输入进行过滤或转码**

```text
code:<script>alert('你被 xss 攻击了')</script>
转码之后
code:&lt;script&gt;alert(&#39; 你被 xss 攻击了 &#39;)&lt;/script&gt;
```

**2、Cookie 设置 HttpOnly 属性**

```text
由于很多 XSS 攻击都是来盗用 Cookie 的，因此还可以通过使用HttpOnly 属性来保护 Cookie 的安全。

使用 HttpOnly 标记的 Cookie 只能使用在 HTTP 请求过程中，所以无法通过 JavaScript 来 读取这段 Cookie。
```

```text
set-cookie: 1P_JAR=2019-10-20-06;
expires=Tue, 19-Nov-2019 06:36:21 GMT;
path=/;
domain=.google.com;
SameSite=none;
HttpOnly
```

- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601)
