---
title: Mac 下 ElasticSearch 的安装
category: ElasticSearch
---

打开网址 [https://elasticsearch.cn/download/](https://elasticsearch.cn/download/)，下载 Mac 版本的 ElasticSearch 压缩包。

下载解压后，在对应的 bin 目录下运行命令 `./elasticsearch` 即可。

在浏览器中打开网址 localhost:9200，如果出现以下类似内容，则说明 ElasticSearch 启动成功。

```
{
  "name" : "qian.local",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "cU28HAsRQZSL-Z3UNxfN5Q",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```