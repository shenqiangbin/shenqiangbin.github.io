---
title: Linux修改SSH默认22端口
---

## OpenSSH

我们能够远程连接 Linux 服务器，是因为 SSH 协议。SSH 协议的默认端口就是 TCP 22 端口。  
OpenSSH 是一款用于远程登录的连接工具，一般情况下，Liunx 就是安装的此服务来实现远程登录的。

使用命令 `rpm -qa | grep ssh` 查看是否安装了 OpenSSH

```bash
# 查看 OpenSSH
[root@113localhost ~]# rpm -qa | grep ssh
libssh2-1.8.0-4.el7.x86_64
openssh-7.4p1-22.el7_9.x86_64
openssh-server-7.4p1-22.el7_9.x86_64
openssh-clients-7.4p1-22.el7_9.x86_64
```

安装了 OpenSSH 之后，我们就可以使用 ssh 命令连接 linux 了。

```
# 使用默认端口，以 root 账号登录
ssh root@192.168.3.18

# 使用23端口，以 root 账号登录
ssh -p23 root@192.168.3.18
```



## 查看 OpenSSH 配置文件

通过上面的查询，我们知道了 `openssh-server-7.4p1-22.el7_9.x86_64` 的这个服务名称。  
使用命令 `rpm -ql xxx` 可以查看服务的相关文件。

```bash {3}
[root@113localhost ~]# rpm -ql openssh-server-7.4p1-22.el7_9.x86_64
/etc/pam.d/sshd
/etc/ssh/sshd_config
/etc/sysconfig/sshd
/usr/lib/systemd/system/sshd-keygen.service
/usr/lib/systemd/system/sshd.service
/usr/lib/systemd/system/sshd.socket
/usr/lib/systemd/system/sshd@.service
/usr/lib64/fipscheck/sshd.hmac
/usr/libexec/openssh/sftp-server
/usr/sbin/sshd
/usr/sbin/sshd-keygen
/usr/share/man/man5/moduli.5.gz
/usr/share/man/man5/sshd_config.5.gz
/usr/share/man/man8/sftp-server.8.gz
/usr/share/man/man8/sshd.8.gz
/var/empty/sshd
```

## 修改配置文件

22 端口的配置就在 `/etc/ssh/sshd_config` 文件中。  
::: warning
为了安全起见，我们先保留 22 端口，防止再也无法远程上服务器。
:::

假如要把 22 端口修改成 1032 端口，那么在 Port 22 下面加上 Port 1032 端口，先临时保留 22 端口。

编辑配置文件命令：`vi /etc/ssh/sshd_config`

```bash
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
Port 22
Port 1032
```

## 重启 sshd 服务

配置文件修改之后，重启 sshd 服务即可。

```
systemctl restart sshd
```

## 防火墙开放新端口

既然要把 22 端口修改成 1032 端口，那么 1032 端口一定要对外开放。

```bash
# 开放 1032 端口
firewall-cmd --zone=public --permanent --add-port=1032/tcp

# 重启防火墙
systemctl restart firewalld 
```

确认是否已经开放 1032 端口

```bash
firewall-cmd --zone=public --list-ports
```

## 使用新端口连接

使用 SSH 命令（或者 SSH 远程工具）连接服务器，看是否能远程成功。

```bash
ssh -p1032 root@192.168.3.18
```

## 注释 22 端口

重新编辑 `/etc/ssh/sshd_config` 文件，注释 22 端口。

重启 sshd 服务。
