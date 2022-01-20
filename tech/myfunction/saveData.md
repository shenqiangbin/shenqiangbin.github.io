---
title: 数据保存
category: CURD
# 一个页面可以有多个标签
tag:
  - 功能
---

## 数据保存

数据保存，即通常所说的“增删改查”中的“改”。

:::tip 小技巧
新增和保存一般需要传递的参数相同，保存逻辑需要多传递一个 **记录id** 。  
这种情况下，保存逻辑的请求参数对象就可以 **继承自** 新增逻辑的参数对象。
:::

### 控制器层

```java
@PostMapping("save")
public R save(@Valid ResourceSaveRequest request) {
    resourceService.save(request);
    return R.success();
}
```

接口接收前台传入的参数对象 `ResourceSaveRequest`，通过 `javax.validation`来进行校验。  
这里，`ResourceSaveRequest` 直接继承了 `ResourceAddRequest`。

`ResourceSaveRequest` 内容如下：

```java
@Data
public class ResourceSaveRequest extends ResourceAddRequest {

    @NotNull(message = "id不能为空")
    private Integer id;
}
```

### 服务层

服务层 `resourceService` 内容如下：

```java
public void save(ResourceSaveRequest request) {
    Resource model = MyBeanUtil.trans(request, Resource.class);

    model.setModifyTime(new Date());
    model.setModifyUser("updateUser");

    resourceRepository.save(model);
}
```

这里将 `ResourceSaveRequest` 传递到了服务层，是因为更新可能会有多个方法，如果服务层只有一个
`save(Resource)`, 那么当有多个更新方法时，会有问题，除非 `save(Resource)` 每次从数据库获取最新，然后再更新。

### 数据库访问层

数据库访问层的代码如下：

```java
public void save(Resource model) {
    String sql = "update resource set name = ?,category=?,requestUrl=?,apis=?,modifyTime=?,modifyUser=? where id =?";
    Object[] args = {model.getName(), model.getCategory(), model.getRequestUrl(), model.getApis(),model.getModifyTime(), model.getModifyUser(), model.getId()};
    myJdbc.update(sql, args);
}
```

## 示例代码

[https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java](https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java)