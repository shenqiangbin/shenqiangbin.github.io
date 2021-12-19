---
title: CentOS 安装 FTP
category: 部署
# 一个页面可以有多个标签
tag:
  - FTP
---

## 查看是否已安装

`rpm -qa |grep vsftpd`

## 安装

安装可以在线安装或离线安装。

### 在线安装

通过 yum 命令即可下载 rpm 包并自动安装。

`yum install vsftpd -y`

### 离线安装

离线安装首先需要下载 ftp 安装包。下载地址为：[http://rpmfind.net/linux/rpm2html/search.php?query=vsftpd(x86-64)](http://rpmfind.net/linux/rpm2html/search.php?query=vsftpd(x86-64))

我的系统是 CentOS 7，对应下载的安装包为 vsftpd-3.0.2-29.el7_9.x86_64.rpm  
上传文件到服务器后，执行安装命令：
`rpm -ivh vsftpd-3.0.2-21.el7.x86_64.rpm`


---

通过【在线安装】或者【离线安装】之后，可以通过 `rpm -ql vsftpd` 命令查看相关内容。

``` shell
[root@localhost ~]# rpm -ql vsftpd
/etc/logrotate.d/vsftpd
/etc/pam.d/vsftpd
/etc/vsftpd
/etc/vsftpd/ftpusers
/etc/vsftpd/user_list
/etc/vsftpd/vsftpd.conf
/etc/vsftpd/vsftpd_conf_migrate.sh
/usr/lib/systemd/system-generators/vsftpd-generator
/usr/lib/systemd/system/vsftpd.service
/usr/lib/systemd/system/vsftpd.target
/usr/lib/systemd/system/vsftpd@.service
/usr/sbin/vsftpd
/usr/share/doc/vsftpd-3.0.2
/usr/share/doc/vsftpd-3.0.2/AUDIT
/usr/share/doc/vsftpd-3.0.2/BENCHMARKS
/usr/share/doc/vsftpd-3.0.2/BUGS
/usr/share/doc/vsftpd-3.0.2/COPYING
/usr/share/doc/vsftpd-3.0.2/Changelog
/usr/share/doc/vsftpd-3.0.2/EXAMPLE
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE/README
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE/README.configuration
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE/vsftpd.conf
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE/vsftpd.xinetd
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE_NOINETD
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE_NOINETD/README
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE_NOINETD/README.configuration
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE_NOINETD/vsftpd.conf
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/PER_IP_CONFIG
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/PER_IP_CONFIG/README
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/PER_IP_CONFIG/README.configuration
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/PER_IP_CONFIG/hosts.allow
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/README
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_HOSTS
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_HOSTS/README
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS/README
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS/README.configuration
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS/logins.txt
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS/vsftpd.conf
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS/vsftpd.pam
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS_2
/usr/share/doc/vsftpd-3.0.2/EXAMPLE/VIRTUAL_USERS_2/README
/usr/share/doc/vsftpd-3.0.2/FAQ
/usr/share/doc/vsftpd-3.0.2/INSTALL
/usr/share/doc/vsftpd-3.0.2/LICENSE
/usr/share/doc/vsftpd-3.0.2/README
/usr/share/doc/vsftpd-3.0.2/README.security
/usr/share/doc/vsftpd-3.0.2/REWARD
/usr/share/doc/vsftpd-3.0.2/SECURITY
/usr/share/doc/vsftpd-3.0.2/SECURITY/DESIGN
/usr/share/doc/vsftpd-3.0.2/SECURITY/IMPLEMENTATION
/usr/share/doc/vsftpd-3.0.2/SECURITY/OVERVIEW
/usr/share/doc/vsftpd-3.0.2/SECURITY/TRUST
/usr/share/doc/vsftpd-3.0.2/SIZE
/usr/share/doc/vsftpd-3.0.2/SPEED
/usr/share/doc/vsftpd-3.0.2/TODO
/usr/share/doc/vsftpd-3.0.2/TUNING
/usr/share/doc/vsftpd-3.0.2/vsftpd.xinetd
/usr/share/man/man5/vsftpd.conf.5.gz
/usr/share/man/man8/vsftpd.8.gz
/var/ftp
/var/ftp/pub
```

## 开放21端口

查看端口是否开放  
`firewall-cmd --query-port=6379/tcp`

开放21端口  
`firewall-cmd --add-port=21/tcp --permanent`

重启防火墙  
`systemctl restart firewalld`

## 操作

启动 FTP  
`systemctl start vsftpd`

重新启动 FTP  
`systemctl restart vsftpd`


## 访问

在不修改任何配置的情况下，默认是可以匿名访问的。但只能 **下载**，不能 **上传**。 

在浏览器输入 ftp://ip:21 即可访问。（端口不写也可以，ftp 默认就是 21 端口）  
可以看到一个 pub 目录，这个目录对应的是服务器上的 `/var/ftp/pub` 目录

或者使用 FileZilla 这种 FTP 软件也可以访问。

## 相关配置

ftp 相关的配置文件在 `/etc/vsftpd` 目录下

## 问题

### 通过 systemctl start 启动失败

> 查看端口 21 是否被占用，或者使用 ps -ef | grep ftp 看是否已经启动，已启动则杀掉后，通过 systemctl start vsftpd 启动。

### 500 OOPS: failed to open xferlog log file:/var/log/xferlog

> 删除 /var/log/xferlog 文件，重新启动 vsftpd

### 操作超时

打开 FTP 服务器上的文件夹时发生错误。请检查是否有权限访问该文件夹。  
详细信息: 操作超时

> 重启下服务器好了