---
title: 统一异常处理
category: 框架
# 一个页面可以有多个标签
---

不要到处 try catch 进行异常捕捉，这是在掩饰错误，提前将 bug 显漏，提前解决才是正道。

另外，减少 try catch 可以使代表更加整洁，开发人员只需关注业务即可。

一个业务代表的示例：

```java
// 使用 @RestController 后，则 @ResponseBody 则不用写
// 使用 @GetMapping 和 @PostMaping 写起来更简单
@GetMapping("/account/captcha")
public R getCaptcha() throws IOException {
    ImageCaptchaDTO imageCap = codeService.getImageCaptcha();
    return R.success(imageCap);
}
```

如果在编码中，需要释放资源时，使用 try 即可。（try finally 可以，不推荐）

try 形式
```java
try (OutputStream os = response.getOutputStream()) {
     //xxxxxxx
}
```

（**不推荐**）try finally 形式
```java
OutputStream os
try {
    os = response.getOutputStream();   
} finally {
    if (os != null) {
        os.close();
    }
}
```

## 实现

添加如下类即可。需要保证此类会被 Spring Boot 扫描到。

实现是基于 ExceptionHandler 实现的，而不是基于 AOP 实现的。因为基于 AOP 实现，后台对参数的验证使用 javax.validation 进行实现时，验证失败的消息则走不到 AOP。

```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 统一异常处理
 */
@RestControllerAdvice
public class ExceptionOpr {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionOpr.class);

    @ExceptionHandler(Exception.class)
    public R globleExceptionHandler(Exception e) {

        LOGGER.error("error:", e);
        return R.error(e.getMessage());
    }
}

```


## 参照
[https://xwjie.github.io/rule/exception.html#%E9%94%99%E8%AF%AF%E8%8C%83%E4%BE%8B](https://xwjie.github.io/rule/exception.html#%E9%94%99%E8%AF%AF%E8%8C%83%E4%BE%8B)