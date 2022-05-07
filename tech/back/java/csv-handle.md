---
title: CSV读取导入终极解决方法
category: java
# 一个页面可以有多个标签
tag:
  - CSV
---

## 问题

读取 CSV 文件，读取的数据不正确

## 测试

CSV 文件导入，这是一个非常常见的功能，今天就来聊一聊它。

读取CSV文件的内容，最好不要自己去写，单纯的将文件中的内容读取出来然后每行数据按逗号分隔是不行的。这个没有考虑到数据里面也有逗号的情况。

我们做一个测试，测试文件是 test.csv 文件（因为某些原因暂不提供下载）

这是一个有 459 行数据的 CSV 文件，我们使用 WPS 或者 OFFICE 是可以正常查看的。

我们找了4个类库来读取这个文件，看哪个类库可以正常读取。

### 类库1：opencsv

测试失败，识别成了 85 行数据

```xml
 <dependency>
    <groupId>com.opencsv</groupId>
    <artifactId>opencsv</artifactId>
    <version>4.6</version>
</dependency>
```
测试代码位置：   
[https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader1.java
](https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader1.java
)

### 类库2：hutool

测试失败，识别成了 85 行数据

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.6.5</version>
</dependency>
```
测试代码位置：    
[https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader2.java
](https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader2.java
)

### 类库3：supercvs

测试失败，直接报错了

```xml
<dependency>
    <groupId>net.sf.supercsv</groupId>
    <artifactId>super-csv</artifactId>
    <version>2.4.0</version>
</dependency>
```
测试代码位置：  
[https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader3.java
](https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader3.java
)

### 类库4：fastCSV

测试成功

```xml
<dependency>
    <groupId>de.siegmar</groupId>
    <artifactId>fastcsv</artifactId>
    <version>2.0.0</version>
</dependency>
```

测试代码位置：  
https://gitee.com/sqber/javademo/blob/master/src/main/java/ExcelDemo/csv/CSVReader4.java

具体代码如下：

```java
String file = "/Users/adminqian/my/test.csv";
String charset = "utf-8";

CsvReader csv = CsvReader.builder().build(Paths.get(file), Charset.forName(charset));
int i = 0;
for (CsvRow item : csv) {
    i++;
    List<String> list = item.getFields();
    if (list.size() != 9) {
        System.out.println("here");
    }
    if(list.contains("用人单位招聘服务") || list.contains("Y12_GL05ZW01076")){
        System.out.println("here");
    }

}
System.out.println(i);
```

## 结论
fastcsv 是最合适的读取 CSV 文件的工具，兼容性最好。

测试项目地址：  
[https://gitee.com/sqber/javademo/tree/master/src/main/java/ExcelDemo/csv](https://gitee.com/sqber/javademo/tree/master/src/main/java/ExcelDemo/csv)