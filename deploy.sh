#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e

npm run gitpage

# 移動至到打包後的dist目錄 
cd dist
cp index.html 404.html

# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init 
git checkout -b github-pages
git add -A
git commit -m 'Deploy 20221104 - 優化程式碼'

# 將 dist資料夾中的內容推送至遠端 taxi_effective main分支中，並強制無條件將舊有的內容取代成目前的內容（指令 git push -f)
git push -f https://<github access token>@github.com/<github user>/<github reso>.git
cd -
