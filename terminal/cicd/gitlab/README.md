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
  --hostname 47.99.145.58 \
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
docker exec -it gitlab

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
sudo docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```

## 注册gitlab runner

```sh
docker run --rm -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://ip/" \
  --registration-token "vtizNrFzQKFacsSMxsJX" \
  --description "first-register-runner" \
  --tag-list "test-cicd1,dockercicd1" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
```
