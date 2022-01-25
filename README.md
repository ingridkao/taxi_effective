# taxi_effective

## Demo
[demo](https://ingridkao.github.io/taxi_effective/)

## 開發碰到的問題
>>在手機上會一直閃退
最後確定的原因是因為地圖所使用上的點位檔案太過龐大，有兩種解法：
a. 透過後端寫一個api去filter geojson大小，目前僅靜態網頁
b. 將點位上傳到[Mapbox tilesets server](https://studio.mapbox.com/tilesets)
兩者現階段接皆無法解決，因此手機版先不呈現地圖只截GIF圖。

## Basic
Project setup
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
1. Edit .env.production
vi .env.production
```
VUE_APP_MAPBOXTOKEN = <your access token here>
VUE_APP_BASE_URL = <"/publicPath">
```
2. Build
```
npm run build
```
