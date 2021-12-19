---
title: JdbcTemplate 数据库访问
# 一个页面只能有一个分类
category: JdbcTemplate
# 一个页面可以有多个标签
# tag:
#   - 编程规范
# 此页面会在文章列表指定
sticky: false
---

## 数据库访问

访问数据库数据是最常用的功能。常见的有 MyBatis，然而个人不太喜欢。  

1、其对数据库的访问功能进行了封装，并不是封装不好，而是排查问题不方便；  
2、生成复杂的语句时，通过代码生成语句比写在 XML 中方便；  
3、查询某个方法使用的 SQL 时，还要跳转到 XML 文件中，不能快速定位。  
4、批量导入还是通过写代码的形式，且没有 JdbcTemplate 简单。


技术选型应该是用最简单的方法实现功能，且易于排查问题。

我们来看下 Spring 自家的 JdbcTemplate 是如何实现数据库查询的。


## 相关信息

- IDEA 2020.3
- Spring Boot 2.3.3.RELEASE


## 一个数据源

如果项目中只使用了一个数据源，比如项目中只用到一个 MySQL 数据库，那么在 Spring Boot 的项目文件中可以这样配置。

**application.yml**
```yml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/template?useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
```

在 pom.xml 中添加相关依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

然后在 `@Controller` `@Service` `@Repository` 中就可以注册 `JdbcTemplate` 了。
当然，规范的做法是放在 `@Repository` 中，也就是放在数据库访问层。 

？？ JdbcTemplate 是怎么初始化的？？
打断点的形式，看是怎么运行的。
> Spring Boot 都没有找到 JdbcTemplate Bean 的时候，会自动注册一个 Bean 。

我们复制一个简单的 Spring Boot 项目。进行查看。

关于 `JdbcTemplate` 的使用后面再介绍。

## 多个数据源

如果项目中用到多个数据源，比如项目中用到多个 MySQL 数据库，或者用到一个 MySQL 数据库，一个 Postgre 数据库。

那么这种情况，就需要配置下多数据源。