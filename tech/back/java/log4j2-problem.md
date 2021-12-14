---
title: 【漏洞预警】Log4j2执行漏洞
category: 漏洞
# 一个页面可以有多个标签
tag:
  - log4j2
---

## 【漏洞预警】Apache Log4j2 远程代码执行漏洞 

如果是 Spring Boot 项目，在 pom.xml 文件中指定 log4j2 使用最新版本即可。

```xml
<log4j2.version>2.16.0</log4j2.version>
```

而关于 log4j2 版本的最新消息可以查看 github 和 mvnrepository。

网址如下：

[https://github.com/apache/logging-log4j2/tags](https://github.com/apache/logging-log4j2/tags)
[https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core](https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core)

