#!/bin/bash
yum update -y
sudo yum install git -y
sudo yum install -y gcc gcc-c++ make openssl-devel
[ ! -d /ghin-app ] && mkdir -p /ghin-app && sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 fs-983fe131.efs.us-west-2.amazonaws.com:/ /ghin-app
cd /tmp
curl -O https://nodejs.org/dist/v6.11.1/node-v6.11.1.tar.gz
tar -xf node-v6.11.1.tar.gz && rm -f node-v6.11.1.tar.gz
cd node-v6.11.1
./configure
make
sudo make install
sudo ln -s /usr/local/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/node /usr/lib/node
sudo ln -s /usr/local/bin/npm /usr/bin/npm
cd ..
rm -fv node-v6.11.1/
mkdir -p /tmp/ghin-app-prod
cd /tmp/ghin-app-prod
git clone http://github.com/rdpepple/node-ghin2 .
mkdir ghin-tar
mv ghin-app.tar.gz ghin-tar
cd ghin-tar
tar -xf ghin-app.tar.gz && rm -f ghin-app.tar.gz
cd ..
rsync -War ./ghin-tar/ /ghin-app/
cd ..
rm -rf ghin-app-prod
cd /ghin-app
npm install
echo "Instance is healthy" >/ghin-app/healthy.html
npm start
