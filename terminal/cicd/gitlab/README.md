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
  -p 8093:8093 \
  -v /opt/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest

# detach                       后台运行
# name                         容器名称
# restart                      重启方式
# publish                      端口映射
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
  --url "http://ip" \
  --registration-token "token" \
  --description "first-register-runner" \
  --tag-list "osscicd,dockercicd" \
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

2、volumes 字段添加（可以在 docker 中使用 docker）
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

#### 预定义变量

```yml
# 1、在.gitlab-ci.yml中定义
variables:
  MY_VAR: 'test variables'
job_log_var:
  script:
    - echo $MY_VAR

# 2、pipeline中预定义的变量
# https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
job_get_all:
  script:
    - export

# 3、项目中定义的变量
# Settings -> CI/CD -> Variables
```

#### 流水线类型

```
1、基本流水线

2、DAG流水线

3、多项目流水线

4、父子流水线

5、合并请求流水线
```

#### 流水线触发

```
1、推送代码、合并分支

2、手动触发

3、定时触发

4、url请求触发
```

#### 流水线安全设置

```yml
# 1、自动取消旧的流水线：Settings -> CI/CD -> Auto-cancel redundant pipelines
interruptible: true

# 2、设置超时时间
timeout: 3 hour 30 minutes
timeout: 3h 30m

# 3、限定并发任务：保证安全部署，一个分支只能有一个部署任务
resource_group: prd

# 4、流水线调试：创建GitLab Runner映射端口 8093，/opt/gitlab-runner/config／config.toml
# [session_server]
#   session_timeout = 1800
#   listen_address = "[::]:8093"
#   advertise_address = "ip:8093"

# 5、设置部署冻结：Settings -> CI/CD -> Deploy freezes -> 分 时 日 月
rules:
  - if: '$CI_DEPLOY_FREEZE == null'
```
