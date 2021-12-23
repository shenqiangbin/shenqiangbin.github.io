---
title: 启用 HTTPS
# 一个页面只能有一个分类
category: 安全
# 此页面会在文章列表指定
sticky: false
---

## SSL协议

HTTPS 本质就是使用 SSL 协议来加密网络传输内容。

## 证书

证书有【自签名证书】，虽然也可加密，但浏览器不认识这个证书，所以显示的不是一个绿锁。
和【自签名证书】相对应的则是【CA机构颁布的证书】。  
所以如果是企业用，还是花钱购买证书比较好。如果是个人用，可以申请免费的证书。

免费的签名证书可以参照这个站点的证书： 
[https://wangwenbo.cn/blog/archives/10.html](https://wangwenbo.cn/blog/archives/10.html)   
在阿里云上可以免费申请证书，且上面还有相关的使用文档。


## nginx 配置 https

80 端口 nginx 配置
非 80 端口 nginx 的 https 配置

nginx 配置如下

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

## 参照
[GitHub Pages 服务为自定义域名提供 HTTPS 支持](https://cloud.tencent.com/developer/article/1155967?from=article.detail.1452987)
