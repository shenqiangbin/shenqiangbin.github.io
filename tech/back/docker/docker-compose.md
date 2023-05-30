---
title: docker-compose部署
# 一个页面只能有一个分类
category: docker
# 一个页面可以有多个标签
tag:
  - docker
# 此页面会在文章列表指定
sticky: false
---

docker-compose 可以运行一系列的服务，服务定义在 docker-compose.yml 文件中。

### 环境说明

| 软件         | 版本  | 查询命令 |
| ------------------------ | ----------------------- | ------------------ |
|系统：	|CentOS Linux release 7.9	cat |/etc/redhat-release

### 安装
```
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.11.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose 

chmod +x /usr/local/bin/docker-compose
```

命令解读：curl -L 下载指定文件，后面是一个网址。网址中有两个占位符，一个值是 uname -s，一个值是 uname -m。
文件下载后，保存到 /usr/local/bin/docker-compose，也就是说下载的文件改名成 docker-compose 了。然后再赋予文件可执行的权限。

<span style="color:red;font-size:20px;">执行失败怎么办？</span>

失败一般是由于无法下载文件导致的，我们可以先解析到文件网址，然后通过迅雷下载。  
我解析到的地址为：  
https://github.com/docker/compose/releases/download/1.27.4/docker-compose-Linux-x86_64


### 查看版本

docker-compose version

### 常用命令

docker-compose ps  	查看容器运行情况  
docker-compose down  	 停止并删除运行的容器  
docker-compose up 	启动容器  
docker-compose stop	
docker-compose build	
docker-compose rm	删除

#### docker-compose up 和 docker-compose up -d

默认情况，docker-compose up 启动的容器都在前台，控制台将会同时打印所有容器的输出信息，可以很方便进行调试。
当通过 Ctrl-C 停止命令时，所有容器将会停止。
如果使用 docker-compose up -d，将会在后台启动并运行所有的容器。一般推荐生产环境下使用该选项。

