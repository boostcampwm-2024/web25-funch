#!/bin/bash

EXIST_BLUE=$(netstat -lntp | grep 3000)

if [ -n "$EXIST_BLUE" ]; then
  TARGET_COLOR="green"
  NOW_COLOR="blue"
  CLIENT_PORT=3001
  CHAT_PORT=7991
  API_PORT=8081
  TARGET_SUFFIX="green"
  NOW_SUFFIX="blue"
else
  TARGET_COLOR="blue"
  NOW_COLOR="green"
  CLIENT_PORT=3000
  CHAT_PORT=7990
  API_PORT=8080
  TARGET_SUFFIX="blue"
  NOW_SUFFIX="green"
fi

pm2 start ${TARGET_SUFFIX}-ecosystem.config.json

for i in {1..30}; do
    if nc -z localhost $CLIENT_PORT && 
       nc -z localhost $CHAT_PORT && 
       nc -z localhost $API_PORT; then
        break
    fi
    sleep 1
done

sudo sed -i "s/proxy_pass http:\/\/127.0.0.1:[0-9]\+; # Blue\/Green 클라이언트 포트/proxy_pass http:\/\/127.0.0.1:${CLIENT_PORT}; # Blue\/Green 클라이언트 포트/" /etc/nginx/conf.d/www.funch.site.conf
sudo sed -i "s/proxy_pass http:\/\/127.0.0.1:[0-9]\+; # Blue\/Green API 포트/proxy_pass http:\/\/127.0.0.1:${API_PORT}; # Blue\/Green API 포트/" /etc/nginx/conf.d/www.funch.site.conf
sudo sed -i "s/proxy_pass http:\/\/127.0.0.1:[0-9]\+; # Blue\/Green 채팅 포트/proxy_pass http:\/\/127.0.0.1:${CHAT_PORT}; # Blue\/Green 채팅 포트/" /etc/nginx/conf.d/www.funch.site.conf

sudo nginx -s reload

pm2 delete chat-server-${NOW_SUFFIX}
pm2 delete next-client-${NOW_SUFFIX}
pm2 delete api-server-${NOW_SUFFIX}
