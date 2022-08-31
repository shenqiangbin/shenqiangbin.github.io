---
title: k8s常用命令
# 一个页面只能有一个分类
category: k8s
# 一个页面可以有多个标签
tag:
  - k8s
# 此页面会在文章列表指定
sticky: false
---

| 作用                     | 命令                                                              | 说明                                                                  |
| ------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| 查看节点状态             | `kubectl get nodes`                                               |
| 应用某个 yaml 文件       | `kubectl apply -f xxx.yaml`                                       |
| 删除已经应用的 yaml 文件 | `kubectl delete -f xxx.yaml`                                      |
| 查看 xxx 空间下的 pod    | `kubectl get pods -n xxx`                                         |
| 查看 pod 详细信息        | `kubectl describe pod -n kube-system kube-flannel-ds-amd64-c4h6p` | `kube-system` 是空间名称，`kube-flannel-ds-amd64-c4h6p` 是 pod 名称。 |
