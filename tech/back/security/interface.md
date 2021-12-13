---
title: 接口安全
# 一个页面只能有一个分类
category: 安全
# 此页面会在文章列表指定
sticky: true
---

## 接口安全

- 接口安全使用**签名方式**
- 调用方需要申请 appKey 和 appSecret 来访问接口

接口签名规则参照了微信支持接口的签名规则，但稍有不同。参照地址：
[https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_3](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=4_3)

签名形式：

1、将发送参照按钮字典序排序  
2、使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串 stringA  
3、在 stringA 最后拼接上 appSecret 得到 stringSignTemp 字符串，并对 stringSignTemp 进行 HMAC-SHA256 运算，再将得到的字符串所有字符转换为大写，得到 sign 值。

示例：

假如参数传递如下：
- appKey：wxd930ea5d5a258f4f （appKey）
- nonce：ibuaiVcKdpRxkhJA  （随机数）
- timestamp：1637714827254  (时间戳)
- dataid：10000100 (业务参数)
- params：{"name":"test","age":"1000"} （业务参数）

(参数没有数据时，传空字符串即可)


排序后的 stringA 为：  
`
appKey=wxd930ea5d5a258f4f&dataid=10000100&nonce=ibuaiVcKdpRxkhJA&params={"name":"test","age":"1000"}&timestamp=1637714827254
`

stringA 拼接上 appSecret 得到 stringSignTemp : 
`appKey=wxd930ea5d5a258f4f&dataid=10000100&nonce=ibuaiVcKdpRxkhJA&params={"name":"test","age":"1000"}&timestamp=1637714827254&key=192006250b4c09247ec02edce69f6a2d`

然后对 stringSignTemp 进行 HMAC-SHA256 加密 并 转大写得到签名：`00451B052AD905C4D5C8A665D09BB20FB50912AC4BBA28AD0967DE3A7E467175`

最终得的发送给接口的数据为：
- appKey：wxd930ea5d5a258f4f （appKey）
- nonce：ibuaiVcKdpRxkhJA  （随机数）
- timestamp：1637714827254  (时间戳)
- dataid：10000100 (业务参数)
- params：{"name":"test","age":"1000"} （业务参数）
- sign： 00451B052AD905C4D5C8A665D09BB20FB50912AC4BBA28AD0967DE3A7E467175


必传参数：
appKey、nonce、timestamp、sign

代码示例：

```java
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;

import java.io.IOException;
import java.util.*;


public class SignUtil {

    public static void main(String[] args) throws IOException {
        test();
    }

    public static void test() throws IOException {

        Map<String, Object> paraMap = new HashMap<>();
        paraMap.put("name", "test");
        paraMap.put("age", "1000");
        String json = JSONUtil.toString(paraMap);

        Map<String, Object> map = new HashMap<>();
        map.put("dataid", "10000100");
        map.put("params", json);

        String url = "/share/v1/dataMeta";
        post(url, map);
    }

    public static void post(String url, Map<String, Object> paraMap) throws IOException {
        Map<String, Object> map = new HashMap<>();
        map.put("appKey", "wxd930ea5d5a258f4f");
        map.put("nonce", "ibuaiVcKdpRxkhJA");
        long time = System.currentTimeMillis();
        time = 1637714827254L;
        map.put("timestamp", time);

        map.putAll(paraMap);

        String appSecret = "192006250b4c09247ec02edce69f6a2d";
        String result = sign(map, appSecret);
        System.out.println(result); 
        // result: 00451B052AD905C4D5C8A665D09BB20FB50912AC4BBA28AD0967DE3A7E467175

        map.put("sign", result);

        
        HttpHelper.httpPost(url, map, null);
    }

    public static String sign(Map<String, Object> map, String key) {
        String sortStr = getSortStr(map);
        String str = sortStr + "&key=" + key;
        String hmacSha256 = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, key).hmacHex(str).toUpperCase();
        return hmacSha256;
    }

    public static String getSortStr(Map<String, Object> map) {
        List<String> keys = new ArrayList(map.keySet());
        Collections.sort(keys);
        StringBuilder content = new StringBuilder();

        for (int i = 0; i < keys.size(); ++i) {
            String key = keys.get(i);
            String value = map.get(key).toString();
            if (i == keys.size() - 1) {
                content.append(key).append("=").append(value);
            } else {
                content.append(key).append("=").append(value).append("&");
            }
        }
        return content.toString();
    }
}

```

## 数据交换接口

中台是动态创建的分享资源，每个资源对应的分享接口的参数和结果可能不同。
因此，可以通过接口元数据接口获取资源接口参数信息。

### 接口元数据
POST `/share/v1/dataMeta`  
`Content-Type: application/x-www-form-urlencoded`

参数：
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appKey |是  |string |应用标识   |
|nonce |是  |string | 随机数    |
|timestamp     |是  |long | 时间戳    |
|sign     |是  |string | 签名    |
|dataid     |是  |string | 资源标识    |

返回结果：
```json
 {
    "code": 200, // 返回码
    "data": {
        "params": xxx, // 参数信息
        "result": xxx // 返回结果
    },
    "msg": "" // 消息
}
```

返回结果包含了 **参数信息** 和 **返回结果**

**示例：**

假如中台开放了一个 **用户资源** 。 且此资源的配置示例如下(管理员配置的)：

**资源标识** ： user001  
**资源说明**： 用户资源  
xxxx 省略 （哪个库，哪个表，或者其它）  
**返回结果配置**：
```json
[
    {
        "para": "id",
        "paraCate": "String",
        "name": "唯一标识"
    },
    {
        "para": "name",
        "paraCate": "String",
        "name": "姓名"
    },
    {
        "para": "age",
        "paraCate": "int",
        "name": "年龄"
    }
]
```
**请求参数配置**：
```json
[
    {
        "para": "name",
        "paraCate": "String",
        "name": "姓名",
        "oper": "精确",
        "filed": "name",
        "demo": "张三",
        "remark": "根据姓名过滤",
        "must": "否"
    },
    {
        "para": "age",
        "paraCate": "int",
        "name": "年龄",
        "oper": "精确",
        "filed": "name",
        "demo": "10",
        "remark": "根据年龄过滤",
        "must": "否"
    },
    {
        "para": "beginTime",
        "paraCate": "String",
        "name": "起始时间",
        "oper": "大于等于",
        "filed": "业务创建时间字段",
        "demo": "2010-10-10 10:10:10",
        "remark": "其它说明",
        "must": "否"
    },
    {
        "para": "endTime",
        "paraCate": "String",
        "name": "结束时间",
        "oper": "小于等于",
        "filed": "业务创建时间字段",
        "demo": "2010-10-10 10:10:10",
        "remark": "其它说明",
        "must": "否"
    } 
]
```
> 时间过滤使用的可以是原始记录的时间，也可以是进入中台的时间(假如能生成)


则调用 **用户资源接口 ** 的元数据信息，则返回结果示例如下：

参数信息：
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|name |否  |string |根据姓名过滤   |
|age |否  |string | 根据年龄过滤    |
|beginTime |否  |string | 起始时间    |
|endTime |否  |string | 结束时间    |

返回结果：
|参数名|类型|说明|
|:----    |:----- |-----   |
|id   |long |唯一标识  |
|name   |string |名称  |
|age  |int | 年龄   |


### 数据接口


接口需要考虑的因素：

1、数据量较大时，一次性调用获取所有数据不可取，因此接口需要支持 **分批获取**。  
2、调用方分批获取时需要知道 **数据总量**，方可知道调用次数。  
3、调用方可能需要增量获取数据，因此接口需要支持按 **时间段** 获取数据。



POST `/share/v1/data`  
`Content-Type: application/x-www-form-urlencoded`


参数：
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appKey |是  |string |应用标识   |
|nonce |是  |string | 随机数    |
|timestamp     |是  |long | 时间戳    |
|sign     |是  |string | 签名    |
|dataid     |是  |string | 资源标识    |
|pageIndex     |是  |int | 当前页(批次)    |
|pageSize     |是  |int | 每页数据(批次数量)    |
|params     |否  |String | 其它参数（参数信息从元数据接口获取）JSON形式传递：{"name":"张三","age":"10","beginTime:"2020-10-10 10:10:10","endTime":"2021-11-11 10:10:10"}  |

::: warning
数据接口实现 ** 时间段 ** 的参数传递是通过 params 参数传递的，因为时间段过滤所使用的字段需要资操作人员去配置。
:::

返回结果：
```json
 {
    "code": 200, // 返回码
    "data": [  // 具体数据
        {
            // 返回结果在接口元数据中查看
            xxx : xxx,
            xxx : xxx,
            xxx : xxx,
        }
    ],
    "msg": "" // 消息
}
```

### 数据总量接口

POST `/share/v1/dataCount`  
`Content-Type: application/x-www-form-urlencoded`

参数：
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appKey |是  |string |应用标识   |
|nonce |是  |string | 随机数    |
|timestamp     |是  |long | 时间戳    |
|sign     |是  |string | 签名    |
|dataid     |是  |string | 资源标识    |
|params     |否  |String | 其它参数（参数信息从元数据接口获取）JSON形式传递：{"name":"张三","age":"10"}  |



返回结果：
```json
 {
    "code": 200, // 返回码
    "data": 100000, // 总数
    "msg": "" // 消息
}
```


## 调用伪代码

```java
int pageSize = 1000;
long count = dataCount(dataid,params);
long totalPage = count / pageSize + (totalCount % pageSize == 0 ? 0 : 1);
for(int i = 1; i <= totalPage; i++){
    PageData data = data(dataid,i,pageSize,params);
    // PageData 业务处理，还可以根据唯一标识（如果业务数据有）判重。
}
```

## 错误码

|错误码|说明|
|:----   |-----   |
|200   | 成功 |
|500   | 系统错误 |
|400   | 参数错误 |
|401   | 签名验证失败 |
|403   | 没有权限 |

