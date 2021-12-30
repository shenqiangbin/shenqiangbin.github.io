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
E:\>"D:\mysql-5.7.16-winx64\bin\mysqldump.exe"  -uroot -p --port=3308 --skip-add-drop-table --no-create-info --skip-tz-utc  tpi --tables browselog --where=" BrowseLogID>38" > E:/result.sql
```

分段分析

```sql
E:\>"D:\mysql-5.7.16-winx64\bin\mysqldump.exe"  
-uroot -p --port=3308 
--skip-add-drop-table   // 不添加 drop 表语句
--no-create-info       // 不添加 create 表语句
--skip-tz-utc          // 保证 where 条件中有时间条件时，数据筛选正确
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

## mysqldump： Couldn't find table: ">"

使用 Java 程序来执行 mysqldump 命令的时候，使用 > 可能有问题。   
可能会提示 `mysqldump： Couldn't find table: ">"`   
使用参数 --result-file 来替换 > 即可。

比如：

`
String cmd = "mysqldump  -uroot -p123456 --port=3306 --skip-add-drop-table   --no-create-info --skip-tz-utc  personMgr --tables menu  --result-file=/home/sql/result.sql";
`

```java
String cmd = "mysqldump  -uroot -p123456 --port=3306 --skip-add-drop-table   --no-create-info --skip-tz-utc  personMgr --tables menu  --result-file=/home/sql/result.sql";
```

::: danger

**where 条件中不要有空格或其它字符之类的东西，否则在 Java 执行中也会报此错误，目前还不知如何解决。**

:::

## mysqldump: Can't create/write to file 

具体的错误信息为：

"msg": "mysqldump: [Warning] Using a password on the command line interface can be insecure.mysqldump: Can't create/write to file '\"/home/bigtable/resource/testwj_20211227_151356.sql\"' (OS errno 2 - No such file or directory)"

原因：

这个的原因是 --result-file="/home/sql/result.sql" ，即参数 result-file 的路径加了双引号的缘故。  
因此去掉双引号即可。

但奇怪的是，如果不是写在程序中，加引号也是可以的，放在程序中，不知为何就报错了。


## 参照

[https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)


