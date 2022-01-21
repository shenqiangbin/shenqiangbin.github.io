---
title: 数据导入
category: 数据导入
# 一个页面可以有多个标签
tag:
  - 功能
---

## 概述 

数据导入是系统中常见的一个功能，一般情况下通过上传数据文件向系统中添加批量数据。而上传的数据文件一般是 EXCEL 文件。 
比如：通过 EXCEL 文件批量添加用户信息。因此系统中会用到 EXCEL 的解析类。

EXCEL 文件的格式一般有 .xls,.xlsx,.csv 三种格式。因此又分为 **普通EXCEL的解析** 和 **CSV文件的解析**。

EXCEL 文件包含的数据量有多有少，当数据量非常多的情况下建议使用 **批量导入**，而不是 **一条一条导入**。  
另外数据量大的情况下，为了防止浏览器无响应，通常建议页面设置有 **导入进度显示**。

## 开发注意点

- 明确支持的 EXCEL 格式，可以只支持 .xls 和 .xlsx ，也可以只支持 csv 导入，为了简单可以支持一种。
- 明确上传的大小限制。

## EXCEL导入

这里将常用的 EXCEL 处理逻辑抽象成了一个 `CommonExcel` 类。  
此类接收 `文件路径`、`表头` 两个参数，然后通过 `handle` 方法返回处理结果。  
下面是两个使用示例。

[CommonExcel 源码](https://github.com/shenqiangbin/sqber-demo/blob/master/common-tool/src/main/java/com/sqber/commonTool/excel/CommonExcel.java)

```java
@GetMapping("/testFile")
public R testFile() throws IOException, IllegalAccessException, InstantiationException {

    String filePath = "D:\\code\\TPI\\大数据产品\\贵州大数据项目\\说明\\示例文件\\点排名地图测试数据.xlsx";
    CommonExcel commonExcel = CommonExcel.create(filePath, new String[]{"地区", "销售额", "经度", "维度"});
    SaveResult saveResult = commonExcel.handle();

    if (!saveResult.isSuccess()) {
        return R.warn(saveResult.getMsg());
    }

    List<List<String>> data = saveResult.getData();
    List<SaleModel> list = ListUtil.toList(data, SaleModel.class);

    return R.success(list);

}


@GetMapping("/testFile2")
public R testFile2() throws IOException, IllegalAccessException, InstantiationException {

    List<List<String>> data2 = new ArrayList<>();

    CommonExcel commonExcel = createCommonExcel2(data2);
    SaveResult saveResult = commonExcel.handle();

    if (!saveResult.isSuccess()) {
        return R.error(saveResult.getMsg());
    }

    List<List<String>> data = saveResult.getData();
    boolean same = data.equals(data2);
    List<SaleModel> list = ListUtil.toList(data2, SaleModel.class);

    return R.success(list);

}

private CommonExcel createCommonExcel2(List<List<String>> data) {
    return CommonExcel.create(
            "D:\\code\\TPI\\大数据产品\\贵州大数据项目\\说明\\示例文件\\点排名地图测试数据.xlsx",
            new String[]{"地区", "销售额", "经度", "维度"},
            (rowVal, rowIndex, totalRow) -> {
                data.add(rowVal);
                System.out.println("当前进度：" + rowIndex + "/" + totalRow);
                return true;
            });
}

```
