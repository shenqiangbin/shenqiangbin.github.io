---
title: 采集 FTP 目录的数据到 HDFS
category: 数据采集
# 一个页面可以有多个标签
tag:
  - flume
---

## 需求

采集其他厂商系统产生的日志到 HDFS

## 分析

其他厂商的系统有自己的服务器，为了采集其日志，可以将采集软件（比如 Flume）部署到目标服务器上监控特定的目录进行采集。  

但是，这样的缺点有：

1、这些服务器是其他厂商的，不愿开放太多权限。  
2、即使开放了权限，如果采集逻辑发生变化（比如监控目录变化），还需要重新部署。


所以，其他厂商可以在自己的服务器上安装 FTP，通过 FTP 的形式将需要采集得目录共享出来。
采集软件还可以部署在我们自己的服务器上，当采集逻辑改变时，通过配置修改即可。


## 采集可以达到的效果

- 配置 [FTP账号]、[密码]、[需要采集的目录] 即可
- 采集到 HDFS 的目录和原目录结构保持一致、文件名保持一致
- 新增的文件可以采集
- 文件新增的内容可以采集（在 HDFS 中会以新文件保存）

::: warning
文件修改的内容无法采集，只能采集新增的内容。（如果采集的是日志，则只会有新增的内容）
:::


## Flume 配置文件

Flume 需要用到的插件：

github 地址: [https://github.com/keedio/flume-ftp-source](https://github.com/keedio/flume-ftp-source)  
gitee 备份地址： [https://gitee.com/sqber/flume-ftp-source](https://gitee.com/sqber/flume-ftp-source)

切换到 flume 的 bin 目录。执行如下命令：

`./flume-ng agent -n agent -c ../conf/ -f /usr/local/flume/conf/ftp2.properties -Dflume.root.logger=INFO,console`

配置文件 ftp2.properties 内容如下：

```

### wwww.keedio.com 
# example file, protocol is ftp, process by lines, and sink to file_roll
# for testing poporses.

## Sources Definition for agent "agent"
#ACTIVE LIST
agent.sources = ftp1
agent.sinks = k1
agent.channels = ch1 

##### SOURCE IS ftp server

# Type of source for ftp sources
agent.sources.ftp1.type = org.keedio.flume.source.ftp.source.Source
agent.sources.ftp1.client.source = ftp

# Connection properties for ftp server
agent.sources.ftp1.name.server = 192.168.52.65
agent.sources.ftp1.port = 21

agent.sources.ftp1.user = ftpuser
agent.sources.ftp1.password = 12345678

# Process files in
agent.sources.ftp1.working.directory = /var/ftp/tomlog2
# Proces files matches (java regex for ftp-ftps)
# agent.sources.ftp1.filter.pattern = .+\\.out

# keep file track status in folder
# agent.sources.ftp1.folder = /var/log/flume-ftp
# file track status name
# agent.sources.ftp1.file.name = ftp1-status-file.ser

# Discover delay, each configured milisecond directory will be explored
agent.sources.ftp1.run.discover.delay=5000

# Process by lines
agent.sources.ftp1.flushlines = true

# Discover and process files under user's home directory
agent.sources.ftp1.search.recursive = true
# Do not process file while it is being written.
agent.sources.ftp1.processInUse = true
# If file must not be processed while it is being written, wait timeout.
agent.sources.ftp1.processInUseTimeout = 30

agent.sources.ftp1.fileHeader = true
agent.sources.ftp1.basenameHeader = true

agent.sinks.k1.type=hdfs
agent.sinks.k1.hdfs.path=hdfs://10.120.69.50:8020/flume_data/10.120.69.50/%{filePath}
agent.sinks.k1.hdfs.fileType=DataStream
agent.sinks.k1.hdfs.writeFormat=Text
agent.sinks.k1.hdfs.filePrefix=%{fileName}

agent.channels.ch1.type = memory
agent.channels.ch1.capacity = 10000
agent.channels.ch1.transactionCapacity = 1000

agent.sources.ftp1.channels = ch1

agent.sinks.k1.channel = ch1
```

## Flume 运行日志保存到数据库

Flume 运行命令时，添加上 db
`/usr/local/flume/bin/flume-ng agent -n agent -c /usr/local/flume/conf/ -f /usr/local/flume/conf/ftp2.properties -Dflume.root.logger=INFO,CONSOLE,db`


修改 {flume_path}/conf/log4j.properties 文件

``` properties
# flume.root.logger=INFO,LOGFILE 末尾添加 db
flume.root.logger=INFO,LOGFILE,db

# 此段代码加在末尾
# db
log4j.appender.db=org.apache.log4j.jdbc.JDBCAppender
log4j.appender.db.BufferSize=5
log4j.appender.db.driver=com.mysql.cj.jdbc.Driver
log4j.appender.db.URL=jdbc:mysql://192.168.52.64:3306/demo_task?useSSL=false&serverTimezone=Asia/Shanghai
log4j.appender.db.user=root
log4j.appender.db.password=123456
log4j.appender.db.layout=org.apache.log4j.PatternLayout
log4j.appender.db.sql=insert into flume_log(Class,Method,createTime,LogLevel,MSG) values ('%C','%M','%d{yyyy-MM-dd HH:mm:ss}','%p','%m')

```

flume_log 的 SQL 语句为

``` sql
CREATE TABLE `flume_log` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `class` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `loglevel` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

将 MySQL 驱动放到 {flume_path}/lib 目录下，此处放的是 mysql-connector-java-8.0.21.jar 文件。


## 问题

### flume-ftp-source 如何获取原始文件名和目录？

在 GitHub 的 README.md 介绍中我们并没有找到相关的配置。但在其中看见这样一句。

``` {3}
2.0.10
Flume core: upgrade to Apache Flume 1.7.0
Source: add file's name and path to event header
Jsch: upgrade Jsch to 0.1.54 for new host key type (ecdsa-sha2-nistp256)
Jsch: add configurable parameter for testing: strictHostKeyChecking.
```

我们切换到 2.0.10 分支，查看下提交记录，可以找到一个这样的提交。

![An image](/assets/bigdata/flume/ftp-add-filename.png)

查看这个提交的代码 [这里](https://gitee.com/sqber/flume-ftp-source/commit/fd3117b46ab32789311139a0381928e63a30c583)，在 327 行可以看到两行代码，也就是下面的第 9、10 行代码。

```java {9-10}
  /**
   * @param lastInfo byte[]
   * @void process last appended data to files
   */
  public void processMessage(byte[] lastInfo, String fileName, String filePath) {
    byte[] message = lastInfo;
    Event event = new SimpleEvent();
    Map<String, String> headers = new HashMap<>();
      headers.put("fileName", fileName);
      headers.put("filePath", filePath);
      headers.put("timestamp", String.valueOf(System.currentTimeMillis()));
      event.setBody(message);
      event.setHeaders(headers);
      try {
        getChannelProcessor().processEvent(event);
      } catch (ChannelException e) {
        LOGGER.error("ChannelException", e);
      }
      sourceCounter.incrementCountSizeProc(message.length);
      sourceCounter.incrementEventCount();
    }
```

因此，可知代表名字和路径的关键字事 fileName 和 filePath。在 flume 的配置文件中添加上即可。

```{2,5}
agent.sinks.k1.type=hdfs
agent.sinks.k1.hdfs.path=hdfs://10.120.69.50:8020/flume_data/%{filePath}
agent.sinks.k1.hdfs.fileType=DataStream
agent.sinks.k1.hdfs.writeFormat=Text
agent.sinks.k1.hdfs.filePrefix=%{fileName}
```