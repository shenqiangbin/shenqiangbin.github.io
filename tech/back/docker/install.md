---
title: docker部署
# 一个页面只能有一个分类
category: docker
# 一个页面可以有多个标签
tag:
  - docker
# 此页面会在文章列表指定
sticky: false
---

## 在线安装

### 环境说明

| 软件         | 版本  | 查询命令 |
| ------------------------ | ----------------------- | ------------------ |
|系统：	|CentOS Linux release 7.9	cat |/etc/redhat-release

### 安装命令
```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo yum -y install docker-ce docker-ce-cli containerd.io
systemctl start docker
systemctl enable docker

# 查看版本
docker -v
```