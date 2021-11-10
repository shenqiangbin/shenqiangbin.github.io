---
title: 简化代码
---

# 简化代码


我们一般会定义一个类来表示接口返回的结果。类一般包含了返回码，返回对象，返回消息。如下：

``` java
public class BaseResponse<T> {
    private int code;
    private T data;
    private String msg;

    // 省略
}
```

在控制器中，一般会这样使用。

```java
@ResponseBody
@RequestMapping(value = "/getArticleDetail")
public BaseResponse<ArticleDetail> getArticleDetail(String sysId){
    BaseResponse<ArticleDetail> result = new BaseResponse<>();
    try {
        ArticleDetail articleDetail = articleDetailService.getArticleDetail(sysId);
        result.setReturnStatus(ReturnStatus.Success);
        result.setData(articleDetail);
    } catch (Exception e) {
        e.printStackTrace();
        result.setReturnStatus(ReturnStatus.Error);
    }
    return result;
}
```

功能没有问题，只是我们的代码还可以再简化。BaseResponse 对象需要创建，code 字段和 data 字段还要赋值。  

我们可以将 BaseResponse 的创建和赋值放到 BaseResponse 中，形成一个方法。

简化后的代码如下：

```java
@ResponseBody
@RequestMapping(value = "/getArticleDetail")
public BaseResponse<ArticleDetail> getArticleDetail(String sysId) {
    try {
        ArticleDetail articleDetail = articleDetailService.getArticleDetail(sysId);
        return BaseResponse.success(articleDetail);
    } catch (Exception e) {
        log.error("{}", e);
        return BaseResponse.error(e.getMessage());
    }
}
```

代码行数减少后，也将清晰不少。如果使用拦截器统一处理异常后，那么 try catch 也就不用写了。代码会进一步精简。


```java
@ResponseBody
@RequestMapping(value = "/getArticleDetail")
public BaseResponse<ArticleDetail> getArticleDetail(String sysId) {
    ArticleDetail articleDetail = articleDetailService.getArticleDetail(sysId);
    return BaseResponse.success(articleDetail);
}
```
