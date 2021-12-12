---
icon: note
title: 待做事项
article: false

breadcrumb: false
pageInfo: false
contributor: false
editLink: false
updateTime: false
prev: false
next: false
---

## 建站相关

- 图标替换，还有一些默认 header 中使用的图标
- 全文检索

> 全文检索  
https://www.algolia.com/

- 内容迁移
- 导航设定
-  ✅评论配置

> 评论支持邮件消息，参照下面的指导：  
https://waline.js.org/reference/server.html#%E9%82%AE%E4%BB%B6  
https://vercel.com/shenqiangbin/sqber-api/settings/environment-variables  
配置成功了，如果将域名 sqber.com 映射过去的话，需要修改其中的网址环境变量。
有评论并不会收到邮件，只是你回复别人，会给别人发送邮件。



## 其它

- ✅[人民日报](/life/paper-rmrb.html) (2021.11.28记)

------

- ✅ [IDEA 相关](/java/idea.html)
- ✅ [快速复制模块](java/create-project.html#复制模块)
- ✅ [B站如何直播（Mac）](life/livevideo)
- ✅ [VSCode](soft/vscode)
- ✅ [安装 ubuntu 系统](linux/ubuntu)

## 代码管理

- ✅ [Git](linux/git)

## 安全

- ✅ [接口安全设计](java/interface.html)

## TODO

接口安全设计（相关代码编写）

- 数据访问 - JDBC （将 JdbcTemplate 的相关数据访问功能抽离出公共接口）(事务支持 https://www.cnblogs.com/harrychinese/p/SpringBoot_jdbc_transaction.html)

- Spring Boot 单元测试


文件相关

- 普通文件上传
- 压缩包文件上传（支持GB大小、分块上传）在（template项目中有相关代码）
- 数据上传 EXCEL文件格式
- 树结构的数据上传 EXCEL文件格式
- 数据导出

其它

- nacos
- Spring Cloud

- 增删改查 知多少。


流水帐

- 整理新电脑，安装各种软件，整理 Google 中的收藏夹（把 Mac 的也整理后，使用 Google 帐号同步，以后统一处理）

修改 hosts
https://nullpointer.pw/github%E4%BB%A3%E7%A0%81clone%E5%8A%A0%E9%80%9F.html

ls -al ???

xp 密钥：
MRX3F-47B9T-2487J-KWKMF-RPWBY


HTTPS
自签名证书，CA机构颁布的证书

80 端口 nginx 配置
非 80 端口 nginx 的 https 配置

https://wangwenbo.cn/blog/archives/10.html

```nginx

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;

    server{
    	listen 443 ssl;
    	server_name localhost;
            ssl_certificate      server.crt;
            ssl_certificate_key  server.key;
            ssl_session_cache    shared:SSL:1m;
            ssl_session_timeout  5m;

            ssl_ciphers  HIGH:!aNULL:!MD5;
            ssl_prefer_server_ciphers  on;

    	location / {
    		root /home/test;
    		index index.html index.htm;
    		try_files $uri $uri/ /index.html;
    		proxy_http_version 1.1;
    	}
    }


    server{
        listen 8081 ssl;
        server_name localhost;


        ssl_certificate      server.crt;
        ssl_certificate_key  server.key;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;


        location / {
                root /home/test;
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
                proxy_http_version 1.1;
        }
    }



}

```


vuepress 支持搜索
https://vuepress-community.netlify.app/zh/plugins/serve/#host

支持通过 Chrome 保存到桌面，快捷访问

做成一个工具站也是博客站

迁移 站点内容


https://www.sofineday.com/vuepress-seo.html

2.0 的内容搜索插件有问题，会报错。
这个 https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html#%E5%AE%89%E8%A3%85

S38U9JNOF1
288af19e5025dc763ae67b75fcfb3164

