---
title: harbor部署
# 一个页面只能有一个分类
category: k8s
# 一个页面可以有多个标签
tag:
  - k8s
# 此页面会在文章列表指定
sticky: false
---
:::info 联系作者
QQ：1969858717
:::
私有镜像仓库的部署 Harbor (**Docker 部署**)

Harbor 官方网站：[https://goharbor.io/](https://goharbor.io/)

## 目的

私有 K8S 平台要使用私有的镜像仓库拉取镜像，而不是使用公共镜像仓库进行拉取。

## 整体步骤

安装前提：已经安装好 Docker 和 Docker-compose，Harbor 的运行是使用 docker-compose 运行的。  

Dokcer 和 Docker-compose 的安装方法：  
[Docker安装](https://shenqiangbin.github.io/tech/back/docker/install/)  
[Docker-compose安装](https://shenqiangbin.github.io/tech/back/docker/docker-compose/)

安装 Harbor

1. 环境说明
2. 下载安装文件
3. 修改配置文件（修改端口，修改 HTTPS 证书位置）
4. HTTPS 需要的 SSL 证书的生成
5. 命令行安装
6. 验证
7. 上传镜像

### 环境说明

| 软件         | 版本  | 查询命令 |
| ------------------------ | ----------------------- | ------------------ |
|系统：	|CentOS Linux release 7.9	cat |/etc/redhat-release
|Docker 版本：	|24.0.1	|docker version
|Docker-compose 版本：|	1.27.4	|docker-compose version
|Harbor 版本：|	v2.8.1	|

### 下载安装文件

在网址 [https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases) 下载如下文件，并上传到服务器上。

或直接下载： [https://github.com/goharbor/harbor/releases/download/v2.8.1/harbor-offline-installer-v2.8.1.tgz](https://github.com/goharbor/harbor/releases/download/v2.8.1/harbor-offline-installer-v2.8.1.tgz)

<img src='/assets/tech/harbor-download.png' style='width:800px;border:1px solid #3eb07c'></img>

### 修改配置文件

解压 harbor-offline-installer-v2.8.1.tgz 文件，复制一份配置模板文件，并进行配置。

```bash
# 解压
tar -zxvf harbor-offline-installer-v2.8.1.tgz

# 进入harbor目录，并复制模板文件
cd harbor && cp harbor.yml.tmpl harbor.yml
```

按需修改 harbor.yml 文件

hostname：可以使用 IP 或者域名（推荐使用域名，然后使用 hosts 进行解析）  
http.port: 访问端口，默认是80  
https.certificate ：nginx 使用 HTTPS 协议需要的证书  
https.private_key: nginx 使用 HTTPS 协议需要的私钥  
harbor_admin_password：帐号的密码  

**假设我们域名为：myharbor.com**， 修改示例如下：

<img src='/assets/tech/harbor-config.png' style='width:800px;border:1px solid #3eb07c'></img>

### HTTPS 需要的 SSL 证书的生成

（也就是生成上面配置的 /home/harbor/certs/myharbor.com.cert 和 key 文件）  
创建一个 certs 目录保存生成的证书，HTTPS 的证书生成也可以称为签发证书，  
由于我们的不是真域名，因此我们使用的是自签发证书形式，而不是使用大家公认的颁布机构。 

整体步骤：  
1、生成 CA 私钥  
2、生成 CA 证书  
3、生成应用证书私钥  
4、生成 SAN 文件  
5、生成应用证书（用到 CA 私钥、CA 证书、SAN文件、CSR文件）  

**以下在 certs 目录下执行**

生成 CA 私钥
```sh
openssl genrsa -out ca.key 4096
```

自签发生成 CA 证书
```sh
openssl req -x509 -new -nodes -sha512 -days 3650 \
-subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=myharbor.com" \
-key ca.key \
-out ca.crt
```

注意 CN 后面的 myharbor.com 是我们的服务器域名。

生成应用证书私钥
```sh
openssl genrsa -out myharbor.com.key 4096
```

生成 CSR 文件
```sh
openssl req -sha512 -new \
-subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=myharbor.com" \
-key myharbor.com.key \
-out myharbor.com.csr
```

生成 SAN 文件

生成一个ext文本文件，内容就是签发信息，把这些证书签发给哪些目标的域名
所以harbor的域名必须选择下面的三个域名，签发的证书只对下面三个域名有效

```sh
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1=myharbor.com
DNS.2=www.myharbor.com
DNS.3=harbor.magedu.local
EOF
```

生成应用证书

```sh
openssl x509 -req -sha512 -days 3650 \
             -extfile v3.ext \
             -CA ca.crt -CAkey ca.key -CAcreateserial \
             -in myharbor.com.csr \
             -out myharbor.com.crt
```

:::info 效果

```
[root@10server certs]# openssl x509 -req -sha512 -days 3650 \
>              -extfile v3.ext \
>              -CA ca.crt -CAkey ca.key -CAcreateserial \
>              -in myharbor.com.csr \
>              -out myharbor.com.crt
Signature ok
subject=/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=myharbor.com
Getting CA Private Key
```
:::

### 命令行安装

在解压后的 harbor 目录下运行
```
./install.sh --with-trivy 
```

<img src='/assets/tech/harbor-success.png' style='width:800px;border:1px solid #3eb07c'></img>

### 验证

配置 HOSTS 文件，将域名 myharbor.com 解析到指定服务器。  
172.16.1.10 myharbor.com （我的服务器的 IP 是 172.16.1.10）

直接输入 IP 访问也可以。只是会显示不安全。 https://172.16.1.10/

<img src='/assets/tech/harbor-web-ip.png' style='width:800px;border:1px solid #3eb07c'></img>

将 myharbor.com.crt 证书下载到电脑上，**安装证书**并添加到**始终信任**，在浏览器输入 myharbor.com 进行访问浏览。

<img src='/assets/tech/harbor-web.png' style='width:800px;border:1px solid #3eb07c'></img>


### 上传镜像

登录之前，先要配置 hosts。（即使是当前服务器也要配置）  
172.16.1.10 myharbor.com

登录
```docker login -u admin -p Harbor12345 myharbor.com```

直接去登录的话，会报错。

```sh
[root@10server harbor]# docker login -u admin -p Harbor12345 myharbor.com
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
Error response from daemon: Get "https://myharbor.com/v2/": tls: failed to verify certificate: x509: certificate signed by unknown authority
```

有两种处理办法（选其一即可）：  
1、跳过 HTTPS 证书认证   
2、配置证书

#### 方法一：跳过 HTTPS 证书认证
如果要跳过 HTTPS 的话，配置 编辑 /etc/docker/daemon.json（如果没有此文件，那么就创建一下）

```
{
"registry-mirrors": [ "http://hub-mirror.c.163.com" ],
"insecure-registries":["myharbor.com"]
}
```

然后重启　dokcer： (注意，如果使用的是 Harbor 服务器，重启之后，注意查看 harbor 相关容器是否启动）
```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

先在 Harbor 的页面上，创建一个 test 项目，然后推送到 test 项目上。

```sh
登录
docker login -u admin -p Harbor12345 myharbor.com

拉取一个镜像进行测试
docker pull hello-world

打上标签
docker tag hello-world:latest myharbor.com/test/hello-world:0529

推送
docker push myharbor.com/test/hello-world:0529
```

在浏览器的 Harbor 上查看。

#### 方法二：配置证书
添加证书，证书目录为 /etc/docker/certs.d/myharbor.com ，其中最后一个目录必须为域名名称。

::: warning
certs.d 的下的目录名必须和域名相同
:::

```
创建目录
mkdir -p /etc/docker/certs.d/myharbor.com

拷贝证书到此目录
cp /home/harbor/certs/myharbor.com.crt /etc/docker/certs.d/myharbor.com/

使用上面的逻辑在测试一遍。
docker login -u admin -p Harbor12345 myharbor.com

换一个镜像再试一次
docker pull busybox

docker tag busybox:latest myharbor.com/test/busybox:0529
docker push myharbor.com/test/busybox:0529
```

在浏览器的 Harbor 上查看。

## 其它

containerd 如何配置来访问私有镜像仓库 harbor ？

## 参考

https://www.cnblogs.com/punchlinux/p/16499966.html

https://goharbor.io/docs/2.8.0/install-config/

## 扩展

关于证书生成中的 CSR 文件

### CSR 文件

CSR 是 Certificate Signing Request 的缩写，从字面意思可以理解成 证书签发请求。
CSR 文件是公钥证书原始文件，包含了我们的一些信息，比如服务器信息和单位信息，这些需要提交给 CA 认证中心进行审核。

CSR 文件如何生成？

使用 OpenSSL 工具生成 CSR 文件
生成命令为：  
``` openssl req -new -nodes -sha256 -newkey rsa:2048 -keyout [$key_file] -out [$OpenSSL_CSR] ```  

说明：  
-new：表明生成一个新的 CSR 文件  
-nodes：表明密钥文件不被加密  
-sha256：使用的sha256算法  
-newkey rsa:2048：生成新的私钥文件，且密钥使用 rsa 算法  
-keyout $key_file：私钥文件要存放的路径  
-out $OpenSSL_CSR：CSR文件在存放的路径  

执行之后会要求输入一些必要信息：  
Organization Name：公司名称   
Organization Unit Name：部门名称  
Country Code：所属国家，中国的是 CN  
State or Province：州名或省份名称  
Locality：城市名称  
Common Name：申请 SSL 证书的域名  
Email Address：邮箱地址，可不写  
A challenge password：密码，可不写  

上面这些也可以使用 -subj 参数来指定

-subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=magedu.net"


官方介绍： https://www.openssl.org/docs/man3.0/man1/openssl-req.html

示例：  

```sh
openssl genrsa -out key.pem 2048
openssl req -new -key key.pem -out req.pem

等同于：

openssl req -newkey rsa:2048 -keyout key.pem -out req.pem 
 ```


同样，当我们的程序要使用 HTTPS 时，也可以使用上面这一套来操作。
