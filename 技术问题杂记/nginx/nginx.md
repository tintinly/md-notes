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

## 添加CROS头解决不支持跨域访问问题

```nginx
http {
    server {
		#反向代理
        location / {
            proxy_pass  http://172.17.1.1:10000/;
			
			#CORS 配置
            add_header 'Access-Control-Allow-Origin' '*';
			add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
			#是否允许cookie传输
            add_header 'Access-Control-Allow-Credentials' 'true';
			add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Data-Type,X-Requested-With,X-Data-Type,X-Auth-Token';
            
            #针对浏览器的options预请求直接返回200，否则会被403 forbidden--invalie CORS request
            if ( $request_method = 'OPTIONS' ) { 
								return 200;
						} 
        }
    }
}
```
或

```nginx
http {
    server {
		#反向代理
        location / {
            proxy_pass  http://172.17.1.1:10000/;
			
			# 处理预检 OPTIONS 请求
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, HEAD, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'Authorization, Accept, Content-Type, Docker-Content-Digest';
                add_header 'Access-Control-Expose-Headers' 'Docker-Content-Digest';
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Content-Length' 0;
                add_header 'Content-Type' 'text/plain';
                return 204;
            }

            # 添加 CORS 响应头
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, HEAD, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization, Accept, Content-Type, Docker-Content-Digest' always;
            add_header 'Access-Control-Expose-Headers' 'Docker-Content-Digest' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
    }
}
```

