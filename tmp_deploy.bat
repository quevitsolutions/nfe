@echo off
set IP=86.107.77.240
set PASS=Exitofxtrade1211#
set REMOTE_PATH=/root/webapp

echo "Uploading Next-Themes Configuration..."
pscp -pw %PASS% -batch -q package.json root@%IP%:%REMOTE_PATH%/
pscp -pw %PASS% -batch -q tailwind.config.ts root@%IP%:%REMOTE_PATH%/

echo "Uploading Global Layout & Components..."
pscp -pw %PASS% -batch -q src/app/globals.css root@%IP%:%REMOTE_PATH%/src/app/
pscp -pw %PASS% -batch -q src/app/layout.tsx root@%IP%:%REMOTE_PATH%/src/app/
pscp -pw %PASS% -batch -q src/components/Providers.tsx root@%IP%:%REMOTE_PATH%/src/components/
pscp -pw %PASS% -batch -q src/components/ThemeToggle.tsx root@%IP%:%REMOTE_PATH%/src/components/
pscp -pw %PASS% -batch -q src/components/LayoutWrapper.tsx root@%IP%:%REMOTE_PATH%/src/components/
pscp -pw %PASS% -batch -q src/components/Sidebar.tsx root@%IP%:%REMOTE_PATH%/src/components/
pscp -pw %PASS% -batch -q src/components/BottomNav.tsx root@%IP%:%REMOTE_PATH%/src/components/

echo "Uploading Dashboard Core Forms..."
pscp -pw %PASS% -batch -q src/app/dashboard/layout.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/
pscp -pw %PASS% -batch -q src/app/dashboard/page.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/
pscp -pw %PASS% -batch -q src/app/dashboard/upgrade/page.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/upgrade/
pscp -pw %PASS% -batch -q src/app/dashboard/team/page.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/team/
pscp -pw %PASS% -batch -q src/app/dashboard/income/page.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/income/
pscp -pw %PASS% -batch -q src/app/dashboard/matrix-tree/page.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/matrix-tree/
pscp -pw %PASS% -batch -q src/app/dashboard/rewards/page.tsx root@%IP%:%REMOTE_PATH%/src/app/dashboard/rewards/

echo "Executing remote build..."
plink -ssh -pw %PASS% -batch root@%IP% "cd %REMOTE_PATH% && npm i next-themes && export NODE_OPTIONS='--max-old-space-size=8192' && npm run build && pm2 restart aipcore && pm2 save"

echo "Deployment Successful."
