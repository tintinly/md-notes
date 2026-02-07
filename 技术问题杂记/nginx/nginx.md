## 请求经过nginx反向代理后，网络应用redirect location端口丢失的问题

```nginx
# 解决 为请求增加了自定义头
proxy_set_header Host             $http_host;

# 找到docker容器文件里 /etc/nginx/conf.d/include/proxy.conf 的标准配置
# 替换其中的proxy_set_header Host 配置 新建non_std_proxy.conf
add_header       X-Served-By $host;
proxy_set_header Host $host; # $host替换成$http_host
proxy_set_header X-Forwarded-Scheme $scheme;
proxy_set_header X-Forwarded-Proto  $scheme;
proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP          $remote_addr;
proxy_pass       $forward_scheme://$server:$port$request_uri;

# 然后直接include 
location / {
    include "non_std_proxy.conf";
}
```

## 强制HTTP重定向至HTTPS

使用`return 301`方式

```nginx
server {
    listen 80;
    server_name localhost;
    return 301 https://127.0.0.1$request_uri;
}
```

使用`rewrite`

```nginx
server {
    listen 80;
    server_name localhost;
    rewrite ^(.*)$ https://$host$1 permanent;
}
```

