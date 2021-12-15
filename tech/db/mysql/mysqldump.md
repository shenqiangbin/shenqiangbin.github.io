---
title: 数据导出-mysqldump
category: 数据导出
# 一个页面可以有多个标签
tag:
  - mysqldump
---

## 按条件导出数据 

不添加 drop表语句，create表语句

示例：将 tpi 库下的 browselog 表中的满足  BrowseLogID>38 

导出语句为：

```sql
E:\>"D:\mysql-5.7.16-winx64\bin\mysqldump.exe"  -uroot -p --port=3308 --skip-add-drop-table --no-create-info  tpi --tables browselog --where=" BrowseLogID>38" > E:/result.sql
```

分段分析

```sql
E:\>"D:\mysql-5.7.16-winx64\bin\mysqldump.exe"  
-uroot -p --port=3308 
--skip-add-drop-table   // 不添加 drop 表语句
--no-create-info       // 不添加 create 表语句
tpi                   // tpi 库
--tables browselog    // browselog 表
--where=" BrowseLogID>38"  // 过滤条件

> E:/result.sql
```


导出的 result.sql 的内容为：

```sql
LOCK TABLES `browselog` WRITE;
/*!40000 ALTER TABLE `browselog` DISABLE KEYS */;
INSERT INTO `browselog` VALUES (39,'5','SA','127.0.0.1',27,'MYPERIOD',2,0,'2021-12-14 10:29:02','2021-12-14 10:29:02',0,'job');
/*!40000 ALTER TABLE `browselog` ENABLE KEYS */;
UNLOCK TABLES;
```


## 参照

[https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)


