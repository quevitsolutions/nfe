scp -o StrictHostKeyChecking=no src/lib/contract.ts root@86.107.77.240:/root/webapp/src/lib/
scp -o StrictHostKeyChecking=no src/lib/hooks/useContract.ts root@86.107.77.240:/root/webapp/src/lib/hooks/
ssh -o StrictHostKeyChecking=no root@86.107.77.240 "bash /root/build_only.sh"
