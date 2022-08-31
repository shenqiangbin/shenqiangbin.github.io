---
title: k8s部署
# 一个页面只能有一个分类
category: k8s
# 一个页面可以有多个标签
tag:
  - k8s
# 此页面会在文章列表指定
sticky: false
---

参考：

- [https://blog.csdn.net/qq_45400861/article/details/125552537](https://blog.csdn.net/qq_45400861/article/details/125552537)

三台 Linux，一个 master，两个 node。

master: 172.16.1.10  
node1: 172.16.1.11  
node2: 172.16.1.12

## 初始配置

**3 台均配置**

```bash
#关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭swap
# 临时
swapoff -a
# 永久关闭
sed -ri 's/.*swap.*/#&/' /etc/fstab

# 根据规划设置主机名【master节点上操作】
hostnamectl set-hostname 10server
# 根据规划设置主机名【node1节点操作】
hostnamectl set-hostname 11server
# 根据规划设置主机名【node2节点操作】
hostnamectl set-hostname 12server

# 在master添加hosts
vi /etc/hosts
172.16.1.10 10server
172.16.1.11 11server
172.16.1.12 12server

# 将桥接的IPv4流量传递到iptables的链
vi /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1

# 生效
sysctl --system

# 时间同步
yum install ntpdate -y
ntpdate time.windows.com
# 查看时间
date


# 关闭selinux
# 永久关闭
sed -i 's/enforcing/disabled/' /etc/selinux/config

# 重启
reboot

# 查看
getenforce

```

## 安装 docker

**3 台均安装**

### 配置 yum 源

```bash
cat <<EOF > /etc/yum.repos.d/docker.repo
[docker-ce-edge]
name=Docker CE Edge - \$basearch
baseurl=https://mirrors.aliyun.com/docker-ce/linux/centos/7/\$basearch/edge
enabled=1
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/docker-ce/linux/centos/gpg
EOF
```

### yum 安装

```bash
# yum安装
yum -y install docker-ce

# 查看docker版本
docker -v
Docker version 19.03.13, build 4484c46d9d

# 开机启动docker
systemctl enable docker

# 启动docker
systemctl start docker
```

### 镜像加速

```bash
touch /etc/docker/daemon.json
cat <<EOF > /etc/docker/daemon.json
{
    "registry-mirrors":[
      "https://registry.docker-cn.com",
      "https://docker.mirrors.ustc.edu.cn",
      "http://hub-mirror.c.163.com",
      "https://cr.console.aliyun.com/",
      "https://hub.docker.com/"
    ]
}
EOF
```

```bash
cat /etc/docker/daemon.json
systemctl restart docker
```

## 安装 k8s

**3 台均安装**

### 配置 yum 源

```bash
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://repo.huaweicloud.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://repo.huaweicloud.com/kubernetes/yum/doc/yum-key.gpg https://repo.huaweicloud.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

### yum 安装

```bash
# 安装kubelet、kubeadm、kubectl，同时指定版本
yum install -y kubelet-1.18.0 kubeadm-1.18.0 kubectl-1.18.0
# 设置开机启动
systemctl enable kubelet
# 启动 kubelet
systemctl start kubelet

```

## 部署 Kubernetes Master

在 master 节点服务器执行（172.16.1.10）

拷贝这个

```bash
kubeadm init \
--apiserver-advertise-address=172.16.1.10 \
--image-repository registry.aliyuncs.com/google_containers \
--kubernetes-version v1.18.0 \
--service-cidr=10.96.0.0/12  \
--pod-network-cidr=10.244.0.0/16  \
--ignore-preflight-errors=NumCPU
```

命令说明：

```bash
kubeadm init \
--apiserver-advertise-address=172.16.1.10 \		# 当前主机ip
--image-repository registry.aliyuncs.com/google_containers \		# 镜像
--kubernetes-version v1.18.0 \		# 版本
--service-cidr=10.96.0.0/12  \		# 这个参数后的IP地址直接就套用10.96.0.0/12 ,以后安装时也套用即可，不要更改
--pod-network-cidr=10.244.0.0/16	#k8s内部的pod节点之间网络可以使用的IP段，不能和service-cidr写一样，如果不知道怎么配，就先用这个10.244.0.0/16
```

此命令会比较慢，因为会拉取镜像。  
当出现如下内容时，说明安装成功了。

```bash
............
............
............
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 172.16.1.10:6443 --token iip6dt.25hpm9mjgruhujd1 \
    --discovery-token-ca-cert-hash sha256:dac0bc358bb64e1f0ed00782e7d2ba3f8e2d707e26cda0c1fd699fc5ce2ba922
```

上面提示的命令执行一下。

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

查看节点状态

```bash
kubectl get nodes
NAME       STATUS     ROLES    AGE     VERSION
10server   NotReady   master   3m10s   v1.18.0
```

当前的主节点已经有了，另外两个节点没有加进来。执行上面提示的最后的命名，把其它节点加进来。

:::warning
注意拷贝自己显示的命令，如果 token 过期，使用 `kubeadm token create --print-join-command` 重新生成。
:::

在 node1: 172.16.1.11 node2: 172.16.1.12 上执行如下命令：

```bash
kubeadm join 172.16.1.10:6443 --token iip6dt.25hpm9mjgruhujd1 \
    --discovery-token-ca-cert-hash sha256:dac0bc358bb64e1f0ed00782e7d2ba3f8e2d707e26cda0c1fd699fc5ce2ba922
```

再查看

```
[root@10server yum.repos.d]# kubectl get nodes
NAME       STATUS     ROLES    AGE    VERSION
10server   NotReady   master   7m2s   v1.18.0
11server   NotReady   <none>   58s    v1.18.0
12server   NotReady   <none>   63s    v1.18.0
```

## 部署 CNI 网络插件

上面的状态还是 NotReady，下面我们需要网络插件，来进行联网访问

```
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
这是删除应用。
kubectl delete -f kube-flannel.yml
```

```
# 查看状态 【kube-system是k8s中的最小单元】
kubectl get pods -n kube-system

如果一直是 pending，则说明 kube-flannel.yml 中的镜像一直没有拉下来。
```

```
kubectl get nodes
NAME       STATUS     ROLES    AGE    VERSION
10server   NotReady   master   7m2s   v1.18.0
11server   NotReady   <none>   58s    v1.18.0
12server   NotReady   <none>   63s    v1.18.0
```

## Q: node 是 notready 状态

如果 node 节点是 ready 的状态，那么先通过 `docker images` 查看下是否有如下镜像了，其实这些镜像信息在文件 `kube-flannel.yml` 中已经体现了。
尤其是 flannel、flannel-cni-plugin、coredns 这三个要有。

```bash
[root@11server home]# docker images
REPOSITORY                                           TAG                 IMAGE ID            CREATED             SIZE
rancher/mirrored-flannelcni-flannel                  v0.19.1             252b2c3ee6c8        3 weeks ago         62.3MB
rancher/mirrored-flannelcni-flannel-cni-plugin       v1.1.0              fcecffc7ad4a        3 months ago        8.09MB
registry.aliyuncs.com/google_containers/kube-proxy   v1.18.0             43940c34f24f        2 years ago         117MB
registry.aliyuncs.com/google_containers/pause        3.2                 80d28bedfe5d        2 years ago         683kB
registry.aliyuncs.com/google_containers/coredns      1.6.7               67da37a9a360        2 years ago         43.8MB
```

如果没有，从其它地方复制一份，然后导入进来即可。

```bash
# 导入命令
docker load -i coredns.tar
docker load -i flannel.tar
docker load -i flannel-plugin.tar
```

导入之后，再通过命令 `kubectl get nodes` 查看，状态应该就会变成 ready 状态了。如下所示。

```bash
[root@10server ~]# kubectl get nodes
NAME       STATUS   ROLES    AGE     VERSION
10server   Ready    master   3d      v1.18.0
11server   Ready    <none>   2d22h   v1.18.0
12server   Ready    <none>   16m     v1.18.0
```

参考：https://blog.csdn.net/omaidb/article/details/123139301

kubectl describe pod -n kube-system kube-flannel-ds-amd64-c4h6p
