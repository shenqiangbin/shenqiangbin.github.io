---
title: 日志
---

# 日志

说到日志，大家都很熟悉，系统中常用 log4j 来记录日志。基本人人都会使用日志，也知道如何通过 log4j 来记日志。
然而，你所说的自己会记日志，可能只局限于知道 log4j 该如何使用。知道 log.debug 是记录的 debug 级别的日志。
知道 log.info 是记录的 info 级别的日志。

也就是说，我们掌握了这项技术，知道这个技术怎么引入，有哪些方法。然而这还不够，我们还应该知道在哪里合适使用，
也就是说在编码的时候哪里应该记录日志。

## 场景

通常情况下，在我们的系统中只有在异常的地方记录了异常的日志信息，其它地方都没有记录日志信息。我之前也是这么干的。
这样做有什么不好吗？

当一个功能出现问题时，你只能说本地调试一下。当这只是一个简单的功能时还好，当这是一个逻辑复杂的功能时，调试也是很麻烦的。
更糟糕的是，通常是线上环境出现的问题，你连调试的机会都没有。


## 记录关键节点信息

当开发一个功能的时候，尤其是一个业务复杂的功能，在日志中记录下业务关键节点的信息尤其重要。这是你诊断问题的关键。
当点击到你开发的功能时，在日志中应该能清楚的体现业务的处理逻辑和关键数据。


下面是一个预览文档功能的日志

```
msg - uniformSettlement 请求参数：platform=SZRW&product=SZRWDATA&filename=SHYI202103001&tabl
msg - uniformSettlement 加密参数结果：1X3EIS1C+z5mb5ErlM/2LIQ0W0kBbPY1KyBO54ODIUuzxY0
msg - redis 中有 downloadtoken
msg - download: url-http://10.120.67.101:8087/docdown/api/read/down?platform=SZRW&product=SZRWDATA&filename=SHYI202103001&
msg - download content-type:application/xml
msg - download: result-ok
msg - templateFilePath:F:/git/szrwWeb/szrwWebPro/target/classes/xsl/docbook_1.xslt
```

此功能需要构建请求参数，并将参数加密，然后还需要再调用一个下载文件的接口。  
这个功能的关键点就在于接口的参数数据，因此将其记录下来很有必要。  
当此预览文档功能报错时，主要就是看传递的参数是否正确。


上面是一个简单的例子，当遇到一个特别复杂的功能时，更能突出日志的重要，特别是展示业务处理分支，会给人一目了然的感觉。当有合适的案例时，再进行补充吧。