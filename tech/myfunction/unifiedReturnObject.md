---
title: 统一返回对象
category: 框架
# 一个页面可以有多个标签
---

## 统一返回对象

:::info 说明
严格的说，这不算软件功能的分类，这算项目的框架基础。
:::

这里讨论的【返回对象】指的是后台接口返回给前台的数据对象。   
此数据对象包含 `返回码，返回消息，接口数据` 三部分。  

返回码：代表接口是否正常返回，比如 1 为正常，0 为服务器异常，3 为传入参数数据验证失败。
返回消息：当接口参数数据验证失败时或其它问题时，返回的消息提示。
接口数据：接口返回的业务数据。

:::warning 
当返回数据需要添加其它信息时，要在【接口数据】中添加这些信息，而不是扩展【统一返回对象】。

后台验证失败的返回码 **不要** 搞那么多，不建议这种做法： 401 代表`名称长度过长`， 402 代表`手机号格式不正确`。 前台再根据返回码的不同提示不同的消息。此做法不建议。

验证失败就定义为 400（或其它数字），前台直接展示后台返回的【返回消息】即可。
:::


此类名称为 R.java 

R 的推荐用法：

 * <p>成功 - 没具体数据：R.success() </p>
 * <p>成功 - 有具体数据：R.success(data) </p>
 * <p>成功 - 有具体数据和消息：R.success(data,msg)</p>
 * <p>出错 - 默认消息：服务器错误：R.error()</p>
 * <p>出错 - 自定义消息：R.error(msg)</p>
 * <p>校验型错误 - 比如参数校验：R.warn(msg)</p>

 R 的代码如下：

 ```java


/**
 * 统一结果类
 *
 */
public class R {

    private static final int SUCCESS = 1;
    private static final int ERROR = 0;
    private static final int ValidateFailure = 2;

    private int code;
    private Object data;
    private String msg;

    private R(int code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 参数验证失败
     *
     * @param msg
     * @return
     */
    public static R warn(String msg) {
        return new R(ValidateFailure, msg, "");
    }

    /**
     * 出错
     *
     * @param msg
     * @return
     */
    public static R error(String msg) {
        return new R(ERROR, msg, "");
    }

    /**
     * 出错
     *
     * @return
     */
    public static R error() {
        return new R(ERROR, "服务繁忙,请稍后重试", "");
    }


    /**
     * 成功
     *
     * @return
     */
    public static R success() {
        return new R(SUCCESS, "", "");
    }

    /**
     * 成功
     *
     * @param data
     * @return
     */
    public static R success(Object data) {
        return new R(SUCCESS, "", data);
    }

    /**
     * 成功
     *
     * @param data
     * @param msg
     * @return R
     */
    public static R success(Object data, String msg) {
        return new R(SUCCESS, msg, data);
    }

    public int getCode() {
        return code;
    }

    public Object getData() {
        return data;
    }

    public String getMsg() {
        return msg;
    }
}


 ```