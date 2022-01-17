---
title: 数据新增
category: CURD
# 一个页面可以有多个标签
tag:
  - 功能
---

## 数据新增

数据新增，即通常所说的“增删改查”中的“增”。

- 参数校验

## 普通的新增

### 控制器层

```java
@PostMapping("add")
public R add(@Valid ResourceAddRequest request) {
    Resource model = MyBeanUtil.trans(request, Resource.class);
    long id = resourceService.add(model);
    log.error("the id is :", id);
    return R.success(id);
}
```

接口接收前台传入的参数对象 `ResourceAddRequest`，通过 `javax.validation`来进行校验。
然后通过 `MyBeanUtil`将传入的对象转换成数据库对象`Resource`。  
新增之后，返回新增数据的 id 信息。

`ResourceAddRequest` 内容如下：

```java
import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ResourceAddRequest {

    @NotBlank(message = "名称不能为空")
    @Size(min = 0, max = 150, message = "最大长度不超过150")
    private String name;

    //@NotBlank(message = "路由不能为空")
    @Size(min = 0, max = 150, message = "最大长度不超过150")
    private String requestUrl;

    @NotNull(message = "分类不能为空")
    private Integer category;
}

```

### 服务层

服务层 `resourceService` 内容如下：

```java
@Service
public class ResourceService {

    private ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public long add(Resource model) {
        model.setCreateTime(new Date());
        model.setCreateUser("createUser");
        model.setStatus(RecordStatus.EXISTS.getVal());
        return resourceRepository.add(model);
    }
}
```

创建人 createUser 这里是写死的，结合上登录之后，这里就可以修改了。

### 数据库访问层

数据库访问层的代码如下：

```java
public long add(Resource model) {
    String sql = String.format(
            "insert resource (`name`, `category`, `requestUrl`, `apis`, " +
                    "`status`, `createUser`, `createTime`) values(%s)",
            MyJdbc.args(7));
    Object[] args = {
            model.getName(), model.getCategory(), model.getRequestUrl(), model.getApis(),
            model.getStatus(), model.getCreateUser(), model.getCreateTime()};
    return myJdbc.add(sql, args);
}
```
数据库访问层使用了自己封装的 MyJdbc，其中在拼接 sql 语句的时候，用到了 `MyJdbc.args` 静态方法，此方法就是构建 N 个由 ？构成的字符串。


## 示例代码

[https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java](https://github.com/shenqiangbin/sqber-demo/blob/master/spring-db-demo/src/main/java/com/sqber/dbdemo/controller/ResourceController.java)