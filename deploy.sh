#!/bin/bash
# Move config to Nginx
cp /root/aipcore.conf /etc/nginx/sites-available/default
systemctl restart nginx

# Rebuild Next.js app 
cd /root/webapp
cp /root/next.config.ts .
export NODE_OPTIONS='--max-old-space-size=8192'
export NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID='12345678901234567890123456789012'
npm run build 2>&1

# Restart PM2
pm2 restart aipcore || pm2 start npm --name 'aipcore' -- start
pm2 save

# Setup SSL
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d aipcore.online -d www.aipcore.online --non-interactive --agree-tos -m admin@aipcore.online
