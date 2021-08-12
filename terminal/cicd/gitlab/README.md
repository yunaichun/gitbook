## 简介

> Gitlab 学习笔记。

## 安装 gitlab

```sh
# 拉取镜像
docker pull gitlab/gitlab-ce:latest

# 创建容器
docker run --detach \
  --hostname ip \
  --publish 443:443 --publish 80:80 --publish 222:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest

# hostname  域名 或 ip
# publish 端口映射
# restart 重启方式
# volume 目录挂载
# gitlab/gitlab-ce:latest  镜像名称
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
