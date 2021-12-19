---
title: flume 安装
category: 数据采集
# 一个页面可以有多个标签
tag:
  - flume
---

## Linux 系统下的安装

首先下载 flume 压缩包 apache-flume-1.9.0-bin.tar.gz ，大小约为 64.8 M

下载地址为： [https://dlcdn.apache.org/flume/1.9.0/apache-flume-1.9.0-bin.tar.gz](https://dlcdn.apache.org/flume/1.9.0/apache-flume-1.9.0-bin.tar.gz)

将文件 apache-flume-1.9.0-bin.tar.gz 上传到服务器。

解压文件到 /usr/local 目录
```bash
# 解压后会多一个 apache-flume-1.9.0-bin 目录
tar -zxvf apache-flume-1.9.0-bin.tar.gz  -C /usr/local
```

创建 flume 目录软链接
```bash
# 访问 flume 目录就等同于访问 apache-flume-1.9.0-bin 目录
ln -s /usr/local/apache-flume-1.9.0-bin/ /usr/local/flume
```

添加环境变量

```bash
## 复制以下命令，执行即可
echo "" >>  /etc/profile.d/flume-my.sh
sed -i '$a export FLUME_HOME=/usr/local/flume' /etc/profile.d/flume-my.sh
sed -i '$a export PATH=$PATH:$FLUME_HOME/bin' /etc/profile.d/flume-my.sh
source /etc/profile
```

验证环境变量

```bash
[root@113localhost bin]# echo $PATH
/usr/local/sbin:/root/bin:/usr/local/flume/bin:/usr/local/java/bin:/usr/local/hadoop/bin:/usr/local/hadoop/sbin

# 输出结果中可以看到 /usr/local/flume/bin 则说明环境变量添加成功了
```



