---
title: 数据查询
category: CURD
# 一个页面可以有多个标签
tag:
  - 功能
---

## 概述 

大家都说软件无非就是 CURD，这里说一下这是【查询】。

查询有：
- 分页查询
- 查询全部
- 指定顺序查询

## 分页查询

假如我们有一个 资源表，表名为 `Resource`。字段信息如下：

```sql
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT '' COMMENT '名称',
  `category` int(11) DEFAULT '100' COMMENT '资源类型：100-导航资源；101-按钮资源',
  `requestUrl` varchar(20) DEFAULT '' COMMENT '导航url',
  `apis` varchar(2000) DEFAULT '' COMMENT '和资源想关的接口',
  `status` int(11) DEFAULT '1' COMMENT '0-记录已删除；1-未删除',
  `createUser` varchar(64) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `modifyUser` varchar(64) DEFAULT NULL,
  `modifyTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='资源表';
```

针对资源表，需要做一个分页查询功能。能够根据【名称】和【资源类型】进行查询。


分页查询无非就这样一个流程。

<img src='/assets/tech/page-query-flow.png'></img>
图片来源：[https://docs.qq.com/flowchart/DVnFuQVBjREhtTVZT](https://docs.qq.com/flowchart/DVnFuQVBjREhtTVZT)

我们分析一下这个流程，从中提取一些共性的东西。

分页请求对象包含了【当前页码】、【每页数量】、【排序】、【名称】、【资源类型】等信息。
其中【名称】、【资源类型】是此次资源表分页查询所特有的参数。而不管是针对哪个数据表进行分页查询功能，【当前页码】、【每页数量】、【排序】都是必备的参数，因此我们可以抽出一个基类。我们将此类定义为 `PageQuery`。

分页结果对象包含了【当前页码】、【每页数量】、【总页数】、【总数量】、【结果对象列表】。  
所有的分页查询的结果都是如此，只是结果对象列表的类型不同而已。因此我们可以抽出一个分页结果对象。我们将此类定义为`PageModel`。

`PageModel` 的伪代码如下：

```java
public class PageModel<T> {
    public List<T> list;
    public int pageIndex;
    public int pageSize;
    public long totalPage;
    public long totalCount;
}
```

从实体对象来看，整个流程有【请求对象实体】【返回结果实体】和【数据库对应实体】。   
分页请求对象就是我们的【请求对象实体】，继承自 `PageQuery`。  
【返回结果实体】就是 `PageModel` 中对应的列表类型。
【数据库对应实体】一般是数据库操作类查询出来的对应数据库字段信息的实体。

这三种实体一般会建立专门的目录进行存储。

在数据库对象转化成返回结果对象的过程中，只是相同属性的赋值，因此这里也会抽离出一个 `MyBeanUtil` 对象。

示例代码见：  
[https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java](https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java)





