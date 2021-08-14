## 简介

> Gitlab 学习笔记。

## 安装 gitlab

#### 容器安装

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

# 修改密码
user.password="12345678"

# 确认密码
user.password_confirmation="12345678"

# 保存操作
user.save!

# 退出
quit
```

## 安装 gitlab runner

```sh
# 拉取镜像
docker pull gitlab/gitlab-runner:latest

# 创建容器
docker run -d \
  --name gitlab-runner \
  --restart always \
  -v /opt/gitlab-runner/config:/etc/gitlab-runner \
  -v /opt/gitlab-runner/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest

# detach                       后台运行
# name                         容器名称
# restart                      重启方式
# volume                       目录映射
# gitlab/gitlab-runner:latest  镜像名称
```

## 注册 gitlab runner

```sh
docker run \
  --rm -v /opt/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner:latest register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://ip" \
  --registration-token "token" \
  --description "first-register-runner" \
  --tag-list "test-cicd,dockercicd" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"

# register               gitlab runner 与 gitlab 关联上，可以注册多个 runner。
#                        通过 gitlab/gitlab-runner:latest 镜像注册，会在 config 目录生成 config.tom runner配置文件
# --rm                   等价于在容器退出后，执行 docker rm -v。                      
# --executor             runner 执行器
# --docker-image         使用基础的 docker 镜像
# --url                  Gitlab 地址
# --registration-token   Runner 的 token
# --description          runner 的描述，在 Gitlab 后台可以看到
# --tag-list             指定在哪个 runner 下跑 pipeline
```
