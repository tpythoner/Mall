#!/bin/bash

select var in "production" "development";
do
	if [ $var = "production" ];then
		#forever方式启动
		#NODE_ENV=production forever start -l ~/.forever/access.log -e ~/.forever/error.log -w -a app.js
		#PM2启动方式
		#pm2 start -i max --merge-logs --watch -e ./logs/errors.log -o ./logs/access.log app.js
		pm2 start -i 4 --merge-logs --watch app.js
		break
	else
		#NODE_ENV=development forever start -l forever.log -e err.log -a app.js
		supervisor app.js
		break
	fi
done

exit
