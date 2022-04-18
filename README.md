# taxi_effective

### Creating a Project
使用vue-cli，在這邊使用Vue 3

```
vue create taxi_effective
```
## Demo
[demo](https://ingridkao.github.io/taxi_effective/)

## Project setup
1.  installs a package
    ```
    npm install
    ```

2. Compiles and hot-reloads for development
    ```
    npm run serve
    ```

3. Compiles and minifies for production
    1. Edit .env.production
    `vi .env.production`

        ```
        VUE_APP_MAPBOXTOKEN = <your access token here>
        VUE_APP_BASE_URL = <"/publicPath">
        ```
    2. Compiles
        ```
        npm run build
        ```

## 開發碰到的問題
1. 在手機上會一直閃退
    最後確定的原因是因為地圖所使用上的點位檔案太過龐大，有兩種解法：
    >a. 透過後端寫一個api去filter geojson大小，目前僅靜態網頁
    b. 將點位上傳到[Mapbox tilesets server](https://studio.mapbox.com/tilesets)
    兩者現階段接皆無法解決，因此手機版先不呈現地圖只截GIF圖。

2. GA in vue 3
    用vue-analytics有相依性問題，vue3-analytics作者說不維護了建議用[vue-gtag](https://matteo-gabriele.gitbook.io/vue-gtag/)，但用了之後還是覺得怪怪的，直接用GA介面上的程式碼GTAG.JS貼在index.html。
    >管理 > 追蹤資訊 > 追蹤程式碼

3. i18n
    使用支援vue3的`vue-i18n@9`，和@nuxtjs/i18n差不多
    1. 切換語系時寫法比較簡單
    2. 重新整理，[參考](https://ithelp.ithome.com.tw/articles/10262689?sc=iThelpR)


## 重新build遇到問題
>npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: taxi_effective@1.1.0
npm ERR! Found: mapbox-gl@2.7.0
npm ERR! node_modules/mapbox-gl
npm ERR!   mapbox-gl@"^2.7.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer mapbox-gl@">=0.32.1 <2.0.0" from mapbox-gl-compare@0.4.0

總之就是mapbox-gl-compare這個plugin，他的原始碼有版本限制，但是又一定要使用最新的mapbox v2.7.0；另外一定要使用v2+的最大原因是mapbox v1和v2的收費完全不一樣。
>"mapbox-gl": ">=0.32.1 <2.0.0"

直接使用比較暴力的方法-讓他強迫安裝，就可以解決一直無法安裝的問題。
```
npm i mapbox-gl-compare --force
```
如果還是不行先刪掉`node_modules`和`package-lock.json`，以及刪掉`package.json`裡面的『mapbox-gl-compare』。