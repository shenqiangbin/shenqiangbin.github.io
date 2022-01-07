---
title: 文件上传
category: 文件上传
# 一个页面可以有多个标签
tag:
  - 功能
---

## 文件上传

文件上传功能是信息系统中常用的一个功能，用户通过选择本地文件将文件上传到信息系统中。

文件上传因文件的大小又分 **普通上传** 和 **分块上传**。

普通上传一般用在文件几M大小的情况。
分块上传一般用于文件几G大小的情况。

## 常见的场景

1. 上传图片，比如用户上传用户头像
2. 上传资料，比如用户上传某个业务相关的参考资料。
3. 上传压缩包，比如用户上传压缩包文件，上传之后系统再解压之后分析。
4. 上传 EXCEL 文件，比如通过上传包含用户信息的 EXCEL 文件来批量添加用户。

## 注意事项

- 文件保存在服务器时，为了防止和已有文件重复，通过还会为文件重新命名。
- 文件保存时，先要验证保存目录是否存在，不存在则需要创建。

## 普通上传

> 示例基于 Java 语言，使用 Spring Boot 框架实现。

### 未封装版本(不推荐)

这是我们常见的一种写法，代码包含了【文件类型的验证】【文件名处理】【文件保存】，最后输出【文件路径】。用到的地方，会到处再复制一份，代码冗余，不简洁。

```java
@PostMapping("/fileImport")
public R fileImport(HttpServletRequest request) throws Exception {
    MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
    MultipartFile file = multipartHttpServletRequest.getFile("file");
    byte[] content = file.getBytes();

    String fileName = file.getOriginalFilename();
    String extName = fileName.substring(fileName.lastIndexOf("."));

    if (!extName.equals(".xls") && !extName.equals(".xlsx")) {
        return R.warn("请上传 xls 或 xlsx 类型的文件");
    }
    String filePath = iSystemService.getFilePath(file);
    FileOutputStream outputStream = new FileOutputStream(filePath);
    outputStream.write(content);
    outputStream.close();
    log.info("处理文件");

    // 根据 filePath 做后续处理
}

 public String getFilePath(MultipartFile file) {
        String guid = UUID.randomUUID().toString().replaceAll("-", "");
        String fileName = file.getOriginalFilename();
        String extName = fileName.substring(fileName.lastIndexOf("."));
        String fileNameWithoutExt = fileName.replaceAll(extName, "");
        String fileNewName = fileNameWithoutExt + "-" + guid + extName;
        String filePath = fileUploadConfig.getSavePath() + fileNewName;
        log.debug("filePath" + filePath);
        return filePath;
}

```

::: info 说明

关于代码中的 `R` 请参照 [统一返回类](/)

:::

### 封装版本(推荐)

将上叙的代码公共的部分抽离封装到 `UploadFile` 类中。

示例项目：[https://github.com/shenqiangbin/some-demo/tree/main/spring-boot-demo](https://github.com/shenqiangbin/some-demo/tree/main/spring-boot-demo)  
相关代码：[https://github.com/shenqiangbin/some-demo/commit/bf5e9c6092893879e4bfe5b3543569c70168005c](https://github.com/shenqiangbin/some-demo/commit/bf5e9c6092893879e4bfe5b3543569c70168005c)

::: info 说明

项目基于的 [统一返回类](/) 和 [统一异常捕捉](/) 也在此次提交中。

:::

封装之后，上面的上传代码则可以简化为：

```java
@PostMapping("/test/file")
public R batAddUser(@NotEmpty(message = "文件不能为空") @RequestParam("file") MultipartFile[] files) throws IOException {

    List<String> fileList = UploadFile.createExcelUploadForExcel(fileUploadConfig.getSavePath(), files).save();
    return R.success(fileList);
}
```

接口通过参数 `@RequestParam("file")` 来获取文件对象 `MultipartFile`，前台传递的参数是 file，因为一个参数可以有好几个文件，因此这里是数组。当然，`MultipartFile` 可以通过 `Request` 来获取。

`UploadFile.createExcelUploadForExcel(filePath,files)` 是一个静态函数，通过文件保存路径和 `MultipartFile` 实例化一个 `UploadFile` 对象。此对象是针对 EXCEL 上传的，包含了扩展名的验证和大小 20M 的限制验证。

使用 `Postman` 进行测试。

**测试一：文件超过指定大小时，提示错误信息。**

<img src='/assets/tech/uploadfile.png' style='width:600px;border:1px solid #3eb07c'></img>

**测试二：文件上传成功，返回路径信息。**

<img src='/assets/tech/uploadfile2.png' style='width:600px;border:1px solid #3eb07c'></img>


**UploadFile 的自定义构造**

当默认的 UploadFile 无法满足时，可以通过 UploadFile 构建函数自定义验证。如下：

```java
@PostMapping("/test/file2")
public R batAddUser(@NotBlank(message = "name不能为空") String name, @RequestParam("file") MultipartFile[] files) throws IOException {

    List<String> fileList = createFileUpload(files).save();
    return R.success(fileList);
}

private UploadFile createFileUpload(MultipartFile[] files) {
    return new UploadFile(fileUploadConfig.getSavePath(), files, (fileName, ext, fileSize) -> {
        if (!ext.equals("xls") && !ext.equals("xlsx")) {
            throw new ValidationException(String.format("%s 类型不对。请上传 xls 或 xlsx 类型的文件", fileName));
        }
        long fileSizeM = (fileSize / 1024 / 1024);
        long sizeLimit = 1;
        if (fileSizeM > sizeLimit) {
            throw new ValidationException(String.format("%s(%sM) 文件不能大于%sM", fileName, fileSizeM, sizeLimit));
        }
    });
}
```

## 分块上传


