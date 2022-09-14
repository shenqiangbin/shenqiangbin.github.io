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
| 查看 某个 pod 运行状态   | `kubectl get pod my-nginx-684bd4f4c-jnzdd -o wide -n test`        |
| 查看 pod 详细信息        | `kubectl describe pod -n kube-system kube-flannel-ds-amd64-c4h6p` | `kube-system` 是空间名称，`kube-flannel-ds-amd64-c4h6p` 是 pod 名称。 |

## 空间命令

| 作用         | 命令                             | 说明                     |
| ------------ | -------------------------------- | ------------------------ |
| 列举所有空间 | `kubectl get ns`                 | -                        |
| 创建空间     | `kubectl create namespace test`  | 创建一个名为 test 的空间 |
| 删除空间     | `kubectl delete namespaces test` | 删除名为 test 的空间     |
