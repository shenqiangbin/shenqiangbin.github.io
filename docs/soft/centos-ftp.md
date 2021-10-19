---
sidebar: auto
---

# CentOS 安装 FTP

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

## 操作

> 启动 FTP  
`systemctl start vsftpd`

## 访问

在浏览器输入 ftp://ip:21 即可访问。（端口不写也可以，ftp 默认就是 21 端口）  
可以看到一个 pub 目录。

或者使用 FileZilla 这种 FTP 软件也可以访问，使用匿名访问即可。

> 匿名访问时，只能**下载**，不能**上传**。

看到的 pub 目录对应的是服务器上的 `/var/ftp/pub` 目录。


## 相关配置

ftp 相关的配置文件在 `/etc/vsftpd` 目录下
