## 简介

> k8s 学习笔记。

## XaaS

> 大类

- SaaS: Software as a service-面向终端用户; "软件即服务": 淘宝、微博、Gmail等
- PaaS: Platform as a service-面向开发者; "平台即服务": BaaS、CaaS、Serverless等
- IaaS: Infrastructure as a service-面向运维人员; "基础设施即服务": ECS、EC2

> PaaS 下分类

- FaaS: function as a service
- BaaS: backend as a service
- CaaS: container as a service

## Kubernetes 能力

- **服务发现和负载均衡**: Kubernetes 可以使用 DNS 名称或自己的 IP 地址公开容器，如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。
- **存储编排**: Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。
- **自动部署和回滚**: 你可以使用 Kubernetes 描述已部署容器的所需状态，它可以以受控的速率将实际状态更改为期望状态。例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器。
- **自动完成装箱计算**: Kubernetes 允许你指定每个容器所需 CPU 和内存（RAM）。 当容器指定了资源请求时，Kubernetes 可以做出更好的决策来管理容器的资源。
- **自我修复**: Kubernetes 重新启动失败的容器、替换容器、杀死不响应用户定义的 运行状况检查的容器，并且在准备好服务之前不将其通告给客户端。
- **密钥与配置管理**: Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。

## 参考资料

- [kubernetes 官方文档](https://kubernetes.io/docs/home/)
- [kubernetes 中文文档](https://kubernetes.io/zh/docs/home/)
- [极客时间-深入剖析 Kubernetes](https://time.geekbang.org/column/intro/100015201)
- [掘金小册-从 0 到 1 实现一套 CI/CD 流程](https://juejin.cn/book/6897616008173846543/section/6897634827311251471)
