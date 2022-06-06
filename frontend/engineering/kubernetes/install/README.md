## 简介

> Kubernetes 搭建学习笔记。

## kubeadm 安装

```sh
$ apt-get update && apt-get install -y apt-transport-https

$ curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

# 添加 kubeadm kubectl kubelet 镜像源
$ cat <<EOF > /etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

$ apt-get update

# 安装指定版本 kubeadm kubectl kubelet
$ apt-cache madison kubeadm
$ apt-get install kubeadm=1.20.2-00 kubectl=1.20.2-00 kubelet=1.20.2-00
$ systemctl daemon-reload && systemctl restart kubelet

# 查看 kubeadm kubelet kubectl 版本
$ kubeadm version
$ kubelet --version
$ kubectl version
```

## Kubernetes 的 Master 节点部署

```sh
# 查看初始配置
$ kubeadm config print init-defaults

# 配置文件 kubeadm.yaml
$ cat <<EOF > kubeadm.yaml
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
controllerManager:
  extraArgs:
    horizontal-pod-autoscaler-use-rest-clients: "true"
    horizontal-pod-autoscaler-sync-period: "10s"
    node-monitor-grace-period: "10s"
apiServer:
  extraArgs:
    runtime-config: "api/all=true"
kubernetesVersion: "v1.20.2"
EOF

# 拉取默认镜像
$ kubeadm config images pull --config kubeadm.yaml

# 初始化 kubernetes
$ kubeadm init --config kubeadm.yaml --ignore-preflight-errors=NumCPU

# kubectl 默认会使用这个目录下的授权信息访问 Kubernetes 集群
$ mkdir -p $HOME/.kube
$ cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ chown $(id -u):$(id -g) $HOME/.kube/config

# 安装网络插件
$ kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

## kubectl 常用命令

```sh
# 查看当前集群节点
$ kubectl get nodes

# 查看某个节点信息
$ kubectl describe node izbp1g1c3fleihgg4vmtjiz

# 检查节点上某个 Pod 的状态
$ kubectl get pods -n kube-system
```

## Kubernetes 的 Worker 节点部署

```sh
# 生成 token
$ kubeadm token create --print-join-command

# 加入 Master 节点
kubeadm join 172.18.92.220:6443 --token uns1dr.3joa764s9qjho23z \
    --discovery-token-ca-cert-hash sha256:fa43f443a4f12bedda4de336fd9782231b4d9a418a71b9a29c1b9ba20fc0250
```

## Kubernetes 的 Master 节点策略

#### 问题及原因

- 默认情况下 Master 节点是不允许运行用户 Pod 的;
- 可以运行的原理: 一旦某个节点被加上了一个 Taint, 即被 "打上了污点", 那么所有 Pod 就都不能在这个节点上运行;
- 除非, 有个别的 Pod 声明自己能"容忍"这个"污点", 即声明了 Toleration, 它才可以在这个节点上运行.


#### 创建污点和容忍

```sh
# master 节点增加一个键值对格式的 Taint (污点)
$ kubectl taint nodes izbp1g1c3fleihgg4vmtjiz foo=bar:NoSchedule

# Pod 中声明 Toleration (容忍)
$ cat <<EOF > pod.yaml
apiVersion: v1
kind: Pod
...
spec:
  tolerations:
  - key: "foo"
    operator: "Equal"
    value: "bar"
    effect: "NoSchedule"
EOF
```

#### 默认污点及删除

```sh
# master 节点默认 Taints: node-role.kubernetes.io/master:NoSchedule

# 法一: Pod 中声明 Toleration (容忍)
$ cat <<EOF > pod.yaml
apiVersion: v1
kind: Pod
...
spec:
  tolerations:
  - key: "foo"
    operator: "Exists"
    effect: "NoSchedule"
EOF
 node-role.kubernetes.io/master:NoSchedule

# 法二: 删除 Taint
$ kubectl taint nodes --all node-role.kubernetes.io/master-
```

## 插件安装

#### Dashboard 可视化

```sh
# 安装 Dashboard 可视化 插件
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc6/aio/deploy/recommended.yaml

# 运行以下命令之后访问地址: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
$ kubectl proxy

# 插件地址: https://github.com/kubernetes/dashboard
```

#### 容器存储插件

```sh
# 安装
$ kubectl apply -f https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/ceph/common.yaml
$ kubectl apply -f https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/ceph/operator.yaml
$ kubectl apply -f https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/ceph/cluster.yaml

# 查看
kubectl get pods -n rook-ceph-system
kubectl get pods -n rook-ceph

# 插件地址: https://github.com/rook/rook
```
