## 简介

> Docker 学习笔记。

## 安装

```sh
# 安装相关
sudo apt-get update

sudo apt-get install curl

curl fsSL https://get.docker.com/ | sh

# 检测相关
docker --version

docker info

docker run --help
```

## 镜像操作

```
1、获取镜像
docker pull ubuntu

2、查看镜像
docker images
```
