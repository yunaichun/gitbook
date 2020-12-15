## 简介

> 接口压测学习笔记。

## 基础概念

```text
压力测试有3个核心概念，分别是：VU（并发）、RPS（每秒请求数）和 RT（响应时间）。

响应时间好理解这里不做解释；
并发是指同时在线准备发送请求的虚拟用户数，这些用户当前还未给服务器造成压力；
RPS 是指服务器实际处理的请求数（或事务数），是实际的吞吐量，走完了整个请求响应过程。
因此，RPS 才是服务器真实性能指标，也是压力测试的重点。

三者的关系是: RPS = VU / RT。

由于响应时间的复杂性和不确定性，压力测试有两种测试模式，即：并发模式和 RPS 模式。

并发模式下工具有wrk、ab、阿里PTS、JMeter、LoadRunner等，此类测试模式由于RT不准确，一般用于定性分析，适合环境单一的单接口测试。

RPS模式下工具有vegeta、loadtest、阿里PTS，此类测试更适合定量分析，可以进行容量规划、全链路性能测试等。
```

## 安装

#### 并发模式压测工具-wrk

> C 语言实现的并发压测工具，特点是能以极小的机器性能模拟大量的并发。

```bash
$ git clone https://github.com/wg/wrk.git

$ cd wrk

$ make

$ mv wrk /usr/local/bin
```

#### RPS模式压测工具-vegeta

> Go 语言实现的 RPS 压测工具，比 loadtest 性能好 2 倍，功能也更全面，并且方便分布式压测。

```bash
# mac安装
$ brew install vegeta

#  linux安装：
$ wget https://github.com/tsenart/vegeta/releases/download/v12.7.0/vegeta-12.7.0-linux-amd64.tar.gz
$ tar xvf vegeta-12.7.0-linux-amd64.tar.gz
$ mv vegeta /usr/local/bin/
```

## wrk 压测

> 开始压测: 每秒 5000 的并发，持续 60 秒的压测

```bash
# 说明：
# t为线程数
# c为连接数
# t与c相乘即为可产生的并发数
# d为测试持续时间（单位可以是s、m、h）
# latency为输出统计
$ wrk -t10 -c500 -d60s --latency 接口地址
```

> 通过阿里云的主机监控获取当时的cpu

> 通过阿里云的负载均衡 7 层协议 QPS 获取真实的 RPS 值


## vegeta压测

> 开始压测: 产生稳定的 5000 RPS 压力, 持续 60 秒

```bash
# 说明：
# echo XXX为输入的命令
# vegeta attack -rate=5000 -duration=1m 表示产生稳定的 5000 RPS 压力, 持续 60 秒
# tee results.bin 表示将标准输入结果输出至 results.bin
# vegeta report表示产生vegeta报告
$ echo "GET 接口地址" | vegeta attack -rate=5000 -duration=10m | tee results.bin | vegeta report
```

> 通过阿里云的主机监控获取当时的cpu

> 通过阿里云的负载均衡 7 层协议 QPS 获取真实的 RPS 值

## 参考资料

- [vegeta 官网](https://github.com/tsenart/vegeta)
- [wrk 官网](https://github.com/wg/wrk)
