---
sidebar: auto
---

## 介绍

Nacos 是一个服务发现、配置管理和服务管理的平台。可以帮助我们更容易的构建、交付和管理微服务平台。Nacos支持几乎所有主流的“服务”的发现、配置和管理。

比如这些服务：
- Kubernetes Service
- gRPC & Dubbo RPC Service
- Spring Cloud RESTful Service

Nacos的关键特性：
服务发现和服务健康监测
动态配置服务

## 你的项目是否需要使用 Nacos

## 安装

### Windows系统

下载压缩包：nacos-server-1.4.1.zip
解压后，执行命令（standalone代表单机模式运行）
```bash
D:\nacos-server-1.4.1\nacos\bin>startup.cmd -m standalone
```
启动之后，可以访问 http://127.0.0.1:8848/nacos/ 进入管理页面，账号密码：nacos 和 nacos

关闭 nacos：
双击 shutdown.cmd 文件即可。

### Liunx 系统

::: warning
需要安装 Java JDK，版本需要是 1.8，其它版本的可能会有问题。
:::

解压 nacos-server-1.4.1.tar.gz
进入 bin 目录，执行命令（6/
.模式运行）
```bash
sh startup.sh -m standalone
```

关闭 nacos：
sh shutdown.sh


## 官网

官方网址
[https://nacos.io/zh-cn/index.html](https://nacos.io/zh-cn/index.html)



















