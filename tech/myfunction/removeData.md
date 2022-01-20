---
title: 数据删除
category: CURD
# 一个页面可以有多个标签
tag:
  - 功能
---

## 数据删除

数据删除，即通常所说的“增删改查”中的“删”。

:::warning
需要注意的是，我们一般只是 **逻辑删除**，而不是 **物理删除**。  
逻辑删除：我们在记录上添加一个状态字段来记录是否删除了，而不是从数据库中真的删除。
逻辑删除的话可以避免数据误删除的风险。
:::

在常见的业务场景中，一般有单条删除和批量删除两种情况。  
为了简单，我们只写一个批量删除的接口即可，因为单条删除也可以使用批量删除的接口。

### 控制器层

前台传递一个由逗号分隔的 `id` 字符串即可。

```java
@PostMapping("remove")
public R save(@NotBlank(message = "ids不能为空") String ids) {
    String[] split = ids.split(",");
    int[] intIds = Arrays.stream(split).mapToInt(Integer::parseInt).toArray();
    long affect = resourceService.remove(intIds);

    return R.success(affect);
}
```

### 服务层

服务层 `resourceService` 内容如下：

```java
public long remove(int[] ids) {
    return resourceRepository.remove(ids);
}
```

服务层在这里没做什么处理，也太大意义，直接调用的数据库访问层。

### 数据库访问层

数据库访问层的代码如下：

```java
public long remove(int[] ids) {
    List<Object[]> batchArgs = new ArrayList<>();
    for (int id : ids) {
        batchArgs.add(new Object[]{RecordStatus.DELETED.getVal(), id});
    }
    String sql = "update resource set status = ? where id = ?";

    int[][] result = myJdbc.batch(sql, batchArgs, 1000);
    return MyJdbc.count(result);
}
```
数据库访问层使用批量执行语句的方法，而不是使用 `in(1,2,3,4)` 这种形式，担心数据库太大，`in`会有效率问题。


## 示例代码

[https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java](https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java)