## 简介

> HTTP 协议学习笔记。

## 状态码

#### 1xx: 请求已接收到，需要逬一步处理才能完成


```text
HTTP1.0不支持

100 Continue: 上传大文件前使用

101 Switch Protocols: 协议升级使用

102 Processing: WebDAV 请求可能包含许多涉及文件操作的子请求，需要很长时间才能完成请求。
该代码衷示服务器已经收到并正在处埋请求，但无响应可用.这样可以防止客户端超时，并假设请求丢失。
```

#### 2xx: 成功处理请求

```text
200 0K: 成功返回响应。

201 Created: 有新资源在服务端被成功创建。

202 Accepted: 服务器接收并开始处理滴求，但请求未处理完成。

203 Non-Authoritative Information: 当代理服务修改了 origin server 的原始响应包体时（例如更换了HTML中的元素值），代理服务器可以通过修改 200 为 203 的方式告知客户端这一事实。

204 No Content: 成功执行了请求且不携带响应包体，并暗示客户端无需更新当前的页面视图。

205 Reset Content: 成功执行了请求且不携带响应包体，同时指明客户端需更新当前的页面视图。

206 Partial Content: 使用 range 协议时返回部分内容。

207 Multi-Status: RFC4918, 在 WEBDAV 协议中以 XML 返回多个资源的状态。

208 Already Reported: RFC5842, 为避免相同集合下资源在 207 响应码下重复上报，使用 208 可以使用父集合的响应吗。
```

#### 3xx: 重定向使用 Location 指向的资源

```text
300 Multiple Choices: 资源衡多种表述，通过 300 返回给客户端后由其自行选择访问哪一种表述，由于缺乏明确的细节，300 很少使用。

301 Moved Permanently: 资源永久性的重定向到另一个 URI 中.

302 Found: 资源临时的重定向到另一个 URI 中。

303 See Other: 重定向到其他资源，常用于 POST/PUT 等方法的响应中，

304 Not Modified: 当客户端拥有可能过期的缓存时，会携带缓存标志的 etag、时间 等信息，询问服务端缓存是否可用，304 告诉客户端可以备用缓存。

307 Temporary Redirect: 类似 302 , 但明确重定向后请求方法必须与原请求方法相同，不可改变。

308 Permanent Redirect: 类似 301 , 但明确重定向后请求方法必须与原请求方法相同，不可改变。
```

#### 4xx: 客户端出现错误

```text
400 Bad Request: 服务器认为客户端出现了错误，但不能明确判断为以下哪种错误时使用此错误码。例如 HTTP 请求格式错误。

401 Unauthorized: 用户认证信息缺失或者不正确，导致服务器无法处理请求。

403 Forbidden: 服务器现解请求的含义，但没有权限执行此请求。

404 Not Found: 服务器没有找到对应的资源。

405 Method Not Allowed: 服务器不支持请求行中的 method 方法。

406 Not Acceptable: 对客户端指定的资源表述不存在（例如对语吉或者编码有要求），服务器返回表述列表供客户端选择。

407 Proxy Authentication Required: 对需要经由代理的请求，认证信息未通过代理服务器的验证。

408 Request Timeout: 服务器接收通求超时。

409 Conflict: 资源冲突，例如上传文件时目标位置已经存在版本更新的资源。

410 Gone: 服务器没有找到对应的资源，且明确的知遇该位置永久性找不到该资源。

411 Length Required: 如果请求含有包体且未携带 Content-Length 头部，且不属于 chunk 类请求。

412 Precondition Failed: 复用缓存时传递的 If-Unmodified-Since 或 lf-None-Match 头部不被满足。

413 Payload Too Large/Request Entity Too Large: 请求的包体超出服务器能处理的最大长度。

414 URI Too Long: 请求的 URI 超出服务器能接受的最大长度。

415 Unsupported Media Type: 上传的文件类型不被服务器支持。

416 Range Not Satisfiable: 无法提供 Range 请求中指定的那段包体。

417 Expectation Failed: 对于 Expect 请求头部期待的情况无法满足时的响应码。
```

#### 5xx: 服务端出现错误

```text
5OO Internal Server Error: 服务器内部错误，且不属于下描述类型。

501 Not Implemented: 服务器不支持实现请求所需要的功能。

502 Bad Gateway: 代理服务器无法获取到合法响应。

503 Service Unavailable: 服务器资源尚未准备好处理当前请求。

504 Gateway Timeout: 代理服务器无法及时的从上游获得响应。

505 HTTP Version Not Supported: 请求使用的 HTTP 协议版本不支持。

507 Insufficient Storage: 服务器没有足够的空间处理请求。

508 Loop Detected: 访问资源时检测到循环。

511 Network Authentication Required: 代理服务器发现客户端需要进行身份验证才能获得网络访问权限。
```

## 长连接与短连接

#### 长连接

```text
客户端请求
Connection: Keep-Alive

服务端表示支持:
Connection: Keep-Alive
```

#### 短连接

```text
Connection: Close
```

## Host头部

```text
Host: www.test.com
```

## 客户端IP

```text
运营商公网IP
X-Forward-For: 0.0.0.0

用户IP
X-Real-IP: 0.0.0.0

限制代理服务器最大转发次数
Max-Forwards: 1*DIGIT

指名经过代理服务器名称及版本
Via: kong/1.5.1

禁止代理服务器修改响应包体
Cache-Control: no-transform
```

## 请求和响应上下文

#### 请求上下文

```text
指名客户端的类型信息，服务器可以据此对资源的表述做抉择
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36

浏览器对来自某一页面的请求自动添加的头部
Referer: https://www.test.com/home?id=1
```

#### 响应上下文

```text
指明服务器上应用软件的信息，用于帮组客户端定位问题或统计数据
Server: nginx/1.16.1
```

## 请求包体

#### 包体协商要素

```text
媒体资源的 MIME 类型及质量因子
Accept: text/html

内容编码
Accept-Encoding: gzip

表述语言
Accept-Language: zh-cn
```

#### 传输包体方式

**定长包体**

```text
长度固定
Content-Length: 1*DIGIT
```

**不定长包体**

```text
Transfer-Encoding: chunked

指明包体以内联方式作为页面的一部分
Content-Disposition: inline

指明包体以附件方式下载
Content-Disposition: attachment;filename="test.png"
```

#### Form表单包体

**请求形式**

```text
指明这是一个多表述体包体
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryUt8p0AyvNIOXpCbw

请求体 Form Data 形式
------WebKitFormBoundaryUt8p0AyvNIOXpCbw
Content-Disposition: form-data; name="file"; filename="test.txt"
Content-Type: text/plain
------WebKitFormBoundaryUt8p0AyvNIOXpCbw--
```

**Content-Type 种类**

```text
数据被编码成 "&" 分割的键值对，同时以 "=" 分割键和值
application/x-www-form-urlencoded

boundary 分割符；每部分皆有 HTTP 头部描述子包体，如 Content-Type；last boundary 结尾
multipart/form-data
```

## 断点续传

#### 简介

```text
允许服务器基于客户端的请求只发送响应包体的一部分给到客户端；

客户端自动将多个片段的包体组合成完整的体积更大的包体。
```

#### 服务器是否支持

```text
支持
Accept-Ranges: bytes

不支持
Accept-Ranges: none
```

#### 服务器响应

```text
服务器正常响应
Content-Range: bytes 31-1333/1334
Content-Range: bytes 31-1333/*

请求范围不满足实际请求大小
416 Range Not Satisfiable

服务器不支持 Range 请求
200 OK
```

## Cookie 相关

#### 服务端设置 Cookie

```text
保存在客户端，由浏览器维护，表示应用状态的 HTTP 头部
set-cookie: 1P_JAR=2019-10-20-06;
expires=Tue, 19-Nov-2019 06:36:21 GMT;
domain=.google.com;
path=/;
SameSite=none;
HttpOnly
```

#### 客户端携带 Cookie

```text
Cookie: 1P_JAR=2019-10-20-06;
```

## 跨域访问

#### 请求头

```text
Access-Control-Request-Headers
Access-Control-Request-Methods
```

#### 响应头

```text
告诉浏览器哪些域可以访问
Access-Control-Allow-Origin

告诉浏览器是否可以携带 Cookie
Access-Control-Allow-Credentials

预检请求时，告诉客户端允许携带的头部
Access-Control-Allow-Headers

预检请求时，告诉客户端允许的请求方法
Access-Control-Allow-Methods

预检请求时，告诉客户端响应可以缓存多久
Access-Control-Max-Age

告诉客户端哪些响应头可以供客户端使用
Access-Control-Expose-Headers
```

## 缓存

#### 强缓存

```text
绝对时间: 服务端下发的时间，但是客户端可能不一致
Expires: Thu，21 Jan 2017 23:39:02 GMT

相对时间: 以客户端为准，单位为秒；Expires 也下发的话，以此为标准
Cache-Controll: max-age=3600
```

#### 协商缓存

**什么是条件请求？**

```text
由客户端携带条件判断信息，而服务器预执行条件验证通过后，再返回资源的描述。
```

**条件请求头**

```text
给服务端对比 Etag 的
If-Match: entity-tag
If-None-Match: entity-tag

给服务端对比 Last-Modified 的
If-Modified-Since: HTTP-date
If-None-Modified-Since: HTTP-date

If-Range: entity-tag/HTTP-date
```

**条件响应头**

```text
服务端响应给客户端的，客户端可以通过 If-None-Match 发送给服务端进行对比
Etag

上次修改时间，客户端可以通过 If-None-Match 发送给服务端进行对比
Last-Modified
```

#### Cache-Control

```text
max-age: 指定多久后过期。CSS 和 Javascript 文件可以这样设置。

no-cache: 表明必须向服务器发送一次请求，该请求头部必须携带 If-None-Match 等校验信息。服务端将会验证资源是否被修改过。HTML 文件可以这样设置。

no-store: 任何请求都不会被缓存。

no-transform: 禁止代理服务器修改响应包体。

public: 可以被代理或 CDN 缓存。

private: 不可以被代理或 CDN 缓存。
```

## 重定向

```text
当浏览器接收到重定向响应码时，读取响应头的 Location，获取到新的 URI 并跳转

Location: http://www.test.com
```

## 网络爬虫


#### robots.txt

```text
告知爬虫哪些内容不该爬取

User-Agent: 允许哪些机器人
Disallow: 禁止访问特性目录
Crawl-lay: 访问间隔秒数
Allow: 抵消 Disallow 命令
Sitemap: 指出站点地图的 URI
```

#### sitemap.txt

```text
搜索引擎优化
```

## 参考资料

- [浏览器缓存机制](https://juejin.cn/post/6844903593275817998)
- [Web协议详解与抓包实战](https://time.geekbang.org/course/intro/100026801)