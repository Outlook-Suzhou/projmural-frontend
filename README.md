## Add a new kind of shape
> In order to design a new kind of shape, you need to add changes to the following files:
> - src/types/global.d.ts: add your new type of shape
> - src/components/shapes/
>    - add your newShape.tsx
>    - change baseShape.tsx
> - src/components/painting_content
>    - cursor_shape.tsx
>    - handle_layer_click.tsx
>- src/components/tool_bar/tools/add_shape.tsx
> - src/utils/calc_floatbar_position.ts
## How to migrate

projmural-frontend and projmural-backend both of them has their auto deploy work flow, Github Actions. It's deployed through using Docker. All we need to migrate is to change tho Host secret.  And we also need to migrate the nginx. The nginx.conf file locates in /etc/nginx/nginx.conf. below is the content. And the HTTPS certificate are also needed to be reapplied.
```
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

    server {
    	# 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    	listen       443 ssl;
    	# 域名，多个以空格分开
    	server_name  www.projmural.com projmural.com;
    
    	# ssl证书地址
    	ssl_certificate     /etc/letsencrypt/live/www.projmural.com-0001/fullchain.pem;  # pem文件的路径
    	ssl_certificate_key  /etc/letsencrypt/live/www.projmural.com-0001/privkey.pem; # key文件的路径 
    	# ssl验证相关配置
    	ssl_session_timeout  5m;    #缓存有效期
   	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
   	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
   	ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

	location = /api/doc {
	    proxy_pass http://localhost:8000;
	}
	location = /api/websocket {
	    proxy_pass http://localhost:8080;
	    proxy_set_header Upgrade $http_upgrade;
	    proxy_set_header Connection "upgrade";
	}
	location /api/ {
	    proxy_pass http://localhost:8081;
        }
	location / {
            root /home/intern/static;
	    try_files $uri $uri/ /index.html;
        }
    }
}
```
