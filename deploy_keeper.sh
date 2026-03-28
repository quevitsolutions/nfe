#!/bin/bash
mkdir -p /root/keeper
mv /root/.env.keeper /root/keeper/.env
mv /root/keeper-bot.js /root/keeper/
cd /root/keeper
npm init -y
npm install ethers dotenv
pm2 start keeper-bot.js --name "aipcore-keeper" || pm2 restart aipcore-keeper
pm2 save
