---
title: 项目构建
# 一个页面只能有一个分类
category: 编码
# 一个页面可以有多个标签
tag:
  - 编程规范
# 此页面会在文章列表指定
sticky: true
---

## 项目构建

### 构建多模块（Module）项目

使用 IDEA 构建多模块项目，可以参照 https://github.com/shenqiangbin/sqber-demo 项目的结构。

本质上就是创建目录和添加对应的 pom.xml 文件。

因此，也可以不使用 IDEA 来创建多模块项目，直接创建目录和 pom.xml 文件也就可以的，然后用 IDEA 打开即可。  
目录和文件结构如下：

```
-- sqber-demo
    -- pom.xml
    -- common-tool
        -- pom.xml
    -- spring-log4j-demo
        -- pom.xml
```

根目录的 sqber-demo 下的 pom.xml 文件的 packaging 为 pom，表示这是一个父级的 pom。  
此文件的内容如下：

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.sqber</groupId>
    <artifactId>sqber-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
        <module>spring-log4j-demo</module>
        <module>cnki-dianzi-demo</module>
        <module>common-tool</module>
    </modules>

    <properties>
        <java.version>1.8</java.version>
        <spring-boot.version>2.3.3.RELEASE</spring-boot.version>
        <commons-logging.version>1.2</commons-logging.version>

        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>


    </properties>

    <dependencyManagement>

        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>

    </dependencyManagement>
</project>
```


### 复制模块

操作视频：

todo

如果我们有多个 Spring Boot 模块，按部就班的创建就比较慢了，如果已经有了一个 Spring Boot 模块，则直接复制过来改一改就好了。  

下面是操作步骤：

1、 IDEA 中选中模块，然后【复制】【粘贴】，重新命名。  
2、修改 pom.xml 中的 artifactId 和 build-finalName。  
3、右击 pom.xml 文件，选择 Add as Maven Project，让项目作为 Maven 项目加载进来。   
4、修改包名。   
5、修改启动文件的名字（如果有 BaseScan 注解，也需要修改下要扫描的包）。  

视频示例：

这里复制一份 spring-log4j-demo 模块，并重命名为 spring-db-demo 模块。

<iframe width="720" height="405" frameborder="0" src="https://www.ixigua.com/iframe/7031936639031050788?autoplay=0" referrerpolicy="unsafe-url" allowfullscreen></iframe>




