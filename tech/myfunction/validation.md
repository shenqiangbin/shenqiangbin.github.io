---
title: 参数校验
category: 框架
# 一个页面可以有多个标签
---


## 参数校验

基于 Spring Boot。

参数校验采用的是 javax.validation.constraints 中的注解。

在 pom.xml 中添加依赖。

```xml
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
</dependency>
```

## 使用形式

1、形式1（参数较多时不建议这么写）

此形式需要在控制器上加上注解 `@Validated`

```java
@GetMapping("/test/t1")
public R test2(@NotBlank(message = "id不能为空") @Size(message = "最大长度不能超过50", min = 1, max = 50) String id,
               @NotBlank(message = "msg不能为空") @Size(message = "最大长度不能超过50", min = 1, max = 50) String msg) {
    System.out.println("ok");
    return R.success();
}
```

2、形式2 参数封装到类中

在参数前面加上 @Validated（控制器上加注解无效）

```java
@GetMapping("/test/t2")
public R test2(@Validated TestQuery query) {
    System.out.println("ok");
    return R.success();
}
```

```java
@Data
public class TestQuery {

    @NotBlank(message = "名字不能为空")
    @Size(message = "最大长度不能超过50", min = 1, max = 50)
    private String name;

    private String age;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "请输入正确的邮箱")
    private String email;

    @Pattern(message = "手机号格式不正确", regexp = ConstStr.PHONE_REG)
    private String phone;
}
```

## 需要查询数据库的校验

有些时候需要校验参数在数据库的情况。此时，可以单独写一个 validate 方法对参数进行校验。
当不通过时，直接抛出 javax.validation.ValidationException 即可。

```java
@GetMapping("/test/t3")
public R tes3(@Validated TestQuery query) {
    validate(query);
    System.out.println("ok");
    return R.success();
}

private void validate(TestQuery query){
    boolean exists = db.search(query.name);
    if(exists) {
        throw new ValidationException("名称已经存在");
    }

    exists = db.search(query.code);
    if(exists) {
        throw new ValidationException("编码已经存在");
    }

    exists = db.search(query.phone);
    if(exists) {
        throw new ValidationException("手机号已经存在");
    }
}
```