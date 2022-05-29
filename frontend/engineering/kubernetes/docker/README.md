## 简介

> Docker 学习笔记。

## 安装

```sh
# 安装
curl fsSL https://get.docker.com/ | sh

# 版本信息
docker --version

# 详细信息
docker info

# 使用帮助
docker run --help
```

## 镜像操作

```sh
# 查看镜像列表
docker images

# 下载某个镜像
docker pull ubuntu

# 删除某个镜像
docker rmi IMAGEID

# 删除某个镜像(不推荐，因为要删除依赖此镜像创建的容器)
docker rmi -f IMAGEID

# 查看某个镜像(IMAGEID === REPOSITORY:TAG)
docker inspect IMAGEID

# 查找某个镜像
docker search ubuntu

# 添加新标签
docker tag ubuntu:latest ncyu1044173619/test:latest

# 上传镜像
docker login
docker push ncyu10441736/test:latest
```

## 容器操作

#### 基本操作

```sh
# 查看容器列表
docker ps -a

# 根据容器名称查找容器
docker ps -aq --filter name=oss_container_stg

# 新建某个容器
docker create -it --name CONTAINERNANE IMAGEID 

# 启动、终止、重启某个容器
docker start／stop/restart CONTAINERID

# 新建 + 启动容器(一般以守护态运行)
docker run -itd --name CONTAINERNANE IMAGEID /bin/bash

# 进入某个容器(exit后容器关闭)
docker attach CONTAINERID

# 进入某个容器(exit后容器不关闭)
docker exec -it CONTAINERID /bin/bash

# 删除某个容器
docker rm CONTAINERID

# 根据容器创建镜像
docker commit -m "description" -a "auth" CONTAINERID  REPOSITORY:TAG
```

#### 目录映射

```sh
docker run -itd --name CONTAINERNANE -v /localDir:/containerDir IMAGEID /bin/bash
```

#### 端口映射

```sh
docker run -it --name CONTAINERNANE -p localPort:containerPort IMAGEID
```

## DockerFile

#### 文件编写

```Dockerfile
FROM centos
RUN yum install wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN tar -xvf redis.tar.gz

# 以上执行会创建 3 层镜像。可简化为以下格式：
FROM centos
RUN yum install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```

#### 构建镜像

```sh
# 如果已经存在则覆盖
docker build -t nginx:v3 .
```

#### 指令简介

```
FROM：定制的镜像都是基于 FROM 的镜像

RUN：用于执行后面跟着的命令行命令

COPY：复制指令，从上下文目录中复制文件或者目录到容器里指定路径

WORKDIR：指定工作目录。
1、用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。（WORKDIR 指定的工作目录，必须是提前创建好的）
2、docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在

CMD：类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:
1、CMD 在 docker run 时运行
2、RUN 是在 docker build

EXPOSE：仅仅只是声明端口。作用：
1、帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射
2、在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口
```

## 参考资料

- [一张脑图整理Docker常用命令](https://cloud.tencent.com/developer/article/1772136)

