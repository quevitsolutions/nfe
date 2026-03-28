#!/bin/bash
cd /root/webapp
export NODE_OPTIONS='--max-old-space-size=8192'
export NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID='12345678901234567890123456789012'
npm run build 2>&1
pm2 restart aipcore
