## 简介

> Gitlab 学习笔记。

## Gitlab

#### 创建容器

```sh
# 拉取镜像
docker pull gitlab/gitlab-ce:latest

# 创建容器
docker run --detach \
  --name gitlab \
  --hostname ip \
  --restart always \
  --publish 443:443 --publish 80:80 --publish 222:22 \
  --volume /opt/gitlab/config:/etc/gitlab \
  --volume /opt/gitlab/logs:/var/log/gitlab \
  --volume /opt/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest

# detach                   后台运行
# name                     容器名称
# hostname                 域名或ip
# restart                  重启方式
# publish                  端口映射
# volume                   目录映射
# gitlab/gitlab-ce:latest  镜像名称
```

#### 修改密码

```sh
# 进入容器
docker exec -it gitlab /bin/bash

# 进入修改
gitlab-rails console

# 查询root用户
user = User.where(id: 1).first

# 修改 root 账号密码
user.password="12345678"

# 确认密码
user.password_confirmation="12345678"

# 保存操作
user.save!

# 退出
quit
```

## Gitlab Runner

#### 创建容器

```sh
# 拉取镜像
docker pull gitlab/gitlab-runner:latest

# 创建容器
docker run -d \
  --name gitlab-runner \
  --restart always \
  -v /opt/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest

# detach                       后台运行
# name                         容器名称
# restart                      重启方式
# volume                       目录映射
# gitlab/gitlab-runner:latest  镜像名称
```

#### 注册runner

```sh
docker run \
  --rm \
  -v /opt/gitlab-runner/config:/etc/gitlab-runner \
  gitlab/gitlab-runner:latest register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://172.25.160.141" \
  --registration-token "xBYmDZ33tyGbgHrxusBh" \
  --description "first-register-runner" \
  --tag-list "test-cicd,dockercicd" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"

# register               gitlab runner 与 gitlab 关联上，可以注册多个 runner。
#                        通过 gitlab/gitlab-runner:latest 镜像注册，会在 /opt/gitlab-runner/config 目录生成 config.tom runner 的配置文件
# --rm                   等价于在容器退出后，执行 docker rm -v。                      
# --executor             runner 执行器
# --docker-image         使用基础的 docker 镜像
# --url                  Gitlab 地址
# --registration-token   Runner 的 token
# --description          runner 的描述，在 Gitlab 后台可以看到
# --tag-list             指定在哪个 runner 下跑 pipeline
```

#### 修改配置

```
1、配置文件位置
/opt/gitlab-runner/config/config.toml

2、volumes 字段添加【部署 docker 镜像会使用到】
["/usr/bin/docker:/usr/bin/docker", "/var/run/docker.sock:/var/run/docker.sock"]

3、禁止每次pipeline都会拉取docker镜像
pull_policy = "if-not-present"
```

## .gitlab-ci.yml

#### 基本概念

```
pipeline         CI/CD流水线
stages           CI/CD流水线自定义的所有阶段，为数组
stage            CI/CD流水线从全局阶段中选择的某个阶段，非数组
job              CI/CD流水线某个阶段下的某个任务，换行输入
```

#### 常用关键字

```
script           某一个阶段 Runner 执行的脚本，当前行输入或者数组
retry            如果任务失败，重试的次数，当前行输入
image            指定一个基础 Docker 镜像作为基础运行环境，经常用到的镜像有 node、java、python、docker，当前行输入
tags             关键词用于指定 Runner，tags的取值范围是在该项目可见的 Runner tags 中
cache            将当前工作环境的一些文件或文件夹缓存起来，用于在各个 Job 初始化的时候恢复，当前行输入
when             指定条件下（分支）才会运行 Job
only/except      限定当前任务执行的条件
```

#### 基础配置

```yml
image: node:alpine

stages:
  - install
  - build
  - deploy

cache:
  key: npm_dist
  paths:
    - node_modules
    - dist
    - build
  
job_install:
  stage: install
  tags:
    - dockercicd
  script:
    - npm ci
  only:
    - staging
    - master

job_build_stg:
  stage: build
  tags:
    - dockercicd
  script: 
    - CI= npm run build:stg
  only:
    - staging
  allow_failure: true

job_build:
  stage: build
  tags:
    - dockercicd
  script: 
    - CI= npm run build
  only:
    - master
  allow_failure: true

job_deploy_stg:
  stage: deploy
  tags:
    - dockercicd
  script:
    - npm run deploy:stg
  only:
    - staging

job_deploy_prd:
  stage: deploy
  tags:
    - dockercicd
  script:
    - npm run deploy
  only:
    - master
  when: manual
```
