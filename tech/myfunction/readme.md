---
title: 软件功能
---

## 软件功能

这里指的是从软件功能角度来记录一些内容。  
比如，登录功能，单点登录还是普通登录，数据导出功能，一个表业务逻辑的 CURD（增删改查）等。


# 分页查询

分页查询的示例：

## 控制器
``` java
    @PostMapping("/getRoleManagerlist")
    public R geRoleManagerlist(RoleQuery roleQuery) {
        PageInfo<Role> dataList = iSystemService.getRoleList(roleQuery);
        return R.success(PagedModel.create(dataList));
    }
```

分页查询返回的对象是 PagedModel，服务层返回 PageInfo 后，通过 PageInfo 构建 PagedModel 即可。
> **注意** ：  
使用 MyBatis 时，服务层返回的结果一般时 PageInfo，当不使用 MyBatis时，服务层返回结果可以直接用 PagedModel

## 分页请求类

分页请求请继承 PageQuery ，此类包含了 currentPage 当前页码，pageSize 每页数量， sortStr 排序字符串 等信息
```
public class RoleQuery extends PageQuery {	
	private String name;
        // getter setter
}
```


## 服务层

PageHelper.startPage 和 new PageInfo 请放在 Service 层。
```
  public PageInfo<Role> getRoleList(RoleQuery query) {
        PageHelper.startPage(query.getCurrentPage(), query.getPageSize());
        List<Role> roleList = roleRepository.getList(role);
        return new PageInfo(roleList);
    }
```


# 新增更新

- 更新逻辑根据情况写多个接口，需要更新什么字段就更新什么字段。（一个接口存在的问题：每次都要查询库，拿到所有字段更新。而不从库中拿所有字段的话，前台只更新某些字段，没说更新的字段由于没赋值，可能被更新成空值）

- DO 需要继承 BaseDO ，新增逻辑中由 Request 转化为 DO 时（转化方法写在 Request 中即可）则无需再为创建字段和创建时间赋值（BaseDO 中赋值了）

- 更新逻辑，修改时间逻辑的改成可以放在 xml 中的 sql 语句中。
