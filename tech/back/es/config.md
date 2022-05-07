---
title: 配置文件
category: ElasticSearch
---

## 空间警告

> 当磁盘空间使用到一定程度时，就变成只读状态，则不能再继续操作。

在 elasticsearch.yml 中配置
```
#当磁盘空间使用到 99% 时才变成只读状态。
cluster.routing.allocation.disk.watermark.flood_stage: 99%
```

!@#$1q2w3e4r

## 跨域配置

编辑 config/elasticsearch.yml 文件。  
添加如下内容： 

```
http.cors.enabled: true
http.cors.allow-origin: "*"
```

如果没有配置，elasticsearch-head 则会因为跨域问题而无法连接上 ES。

## 设置密码

```
xpack.security.enabled: true
xpack.license.self_generated.type: basic
xpack.security.transport.ssl.enabled: true

http.cors.allow-headers: Authorization,X-Requested-With,Content-Type,Content-Length
```
**重启 ES 后**，执行命令 `elasticsearch-setup-passwords interactive` 来设置密码。





