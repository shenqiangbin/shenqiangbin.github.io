
# 访问数据库 - JdbcTemplate

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