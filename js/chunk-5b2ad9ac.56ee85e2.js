(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b2ad9ac"],{4397:function(n,e,t){"use strict";t.d(e,"d",(function(){return c})),t.d(e,"f",(function(){return h})),t.d(e,"b",(function(){return l})),t.d(e,"a",(function(){return p})),t.d(e,"c",(function(){return C})),t.d(e,"g",(function(){return s})),t.d(e,"e",(function(){return f}));var i=t("fb56");const o=[i["b"].gold,i["b"].nepal,"#4d6683","#d89e8d",i["b"].map],a={TaipeiCity:"臺北市",NewTaipeiCity:"新北市",KaohsiungCity:"高雄市",TaichungCity:"臺中市",TaoyuanCounty:"桃園市",TainanCity:"臺南市",KeelungCity:"基隆市",ChiayiCounty:"嘉義縣",PingtungCounty:"屏東縣",HsinchuCounty:"新竹縣",ChanghuaCounty:"彰化縣",MiaoliCounty:"苗栗縣",YilanCounty:"宜蘭縣",NantouCounty:"南投縣",ChiayiCity:"嘉義市",HualienCounty:"花蓮縣",YunlinCounty:"雲林縣",HsinchuCity:"新竹市",KinmenCounty:"金門縣",TaitungCounty:"臺東縣",PenghuCounty:"澎湖縣",LienchiangCounty:"連江縣"},u={TaipeiCity:"Taipei",NewTaipeiCity:"NewTaipei",KaohsiungCity:"Kaohsiung",TaichungCity:"Taichung",TaoyuanCounty:"Taoyuan",TainanCity:"Tainan",KeelungCity:"Keelung",ChiayiCounty:"Chiayi",PingtungCounty:"Pingtung",HsinchuCounty:"Hsinchu",ChanghuaCounty:"Changhua",MiaoliCounty:"Miaoli",YilanCounty:"Yilan",NantouCounty:"Nantou",ChiayiCity:"Chiayi",HualienCounty:"Hualien",YunlinCounty:"Yunlin",HsinchuCity:"Hsinchu",KinmenCounty:"Kinmen",TaitungCounty:"Taitung",PenghuCounty:"Penghu",LienchiangCounty:"Lienchiang"},r={notJoined:{en:"Non-fleet",zh:"未加入車隊"},join:{en:"Joined fleet",zh:"加入車隊"}},y={fleet:{en:"Taxi Fleet",zh:"靠行計程車隊"},corporation:{en:"Transportation Corporation",zh:"運輸合作社"},operators:{en:"Personal Operators",zh:"個人營業者"}},c=n=>"en-US"==n?Object.values(u):Object.values(a),h=n=>{const e="en-US"==n?"en":"zh",t={...y,...r};return Object.keys(g).map(n=>({name:t[n][e],y:g[n]}))},l=n=>{const e="en-US"==n?"en":"zh";return Object.keys(r).map((n,t)=>({name:r[n][e],data:d.map(e=>e[n]),color:o[t],dataLabels:[{enabled:!0}]}))},p=n=>{const e="en-US"===n?"type_en":"type_zh";return d.map(n=>n[e])},C=n=>{const e="en-US"==n?"en":"zh",t={vehicle:{en:"Vehicle",zh:"總車輛"},...y};return Object.keys(t).map((n,o)=>({name:t[n][e],type:0==o?"column":"spline",data:f.map(e=>e[n]),color:0==o?i["b"].map:i["e"][o-1]}))},s={TaipeiCity:31554,NewTaipeiCity:22503,KaohsiungCity:9008,TaichungCity:7962,TaoyuanCounty:5574,TainanCity:4108,KeelungCity:1884,ChiayiCounty:1013,PingtungCounty:815,HsinchuCounty:805,ChanghuaCounty:765,MiaoliCounty:765,YilanCounty:744,NantouCounty:663,ChiayiCity:638,HualienCounty:582,YunlinCounty:562,HsinchuCity:532,KinmenCounty:473,TaitungCounty:456,PenghuCounty:435,LienchiangCounty:57},g={fleet:48.2,corporation:26.2,operators:25.6},d=[{type_zh:"巡迴攬客",type_en:"On roaming",notJoined:75.8,join:59.2},{type_zh:"招呼站",type_en:"Taxi Stands",notJoined:35.1,join:28.9},{type_zh:"定點等候(非招呼排班)",type_en:"Point waiting",notJoined:25.2,join:24.9},{type_zh:"熟客電話",type_en:"Phone order",notJoined:21.3,join:21.8},{type_zh:"車行等候",type_en:"Fleet waiting",notJoined:5.9,join:4.6},{type_zh:"APP叫車",type_en:"APP order",notJoined:2.7,join:13.4},{type_zh:"其他(含共乘)",type_en:"Other(including sharing)",notJoined:2.1,join:1},{type_zh:"無線電衛星派車",type_en:"Radio hailing",notJoined:0,join:100}],f=[{time:2009,"業者數":8015,vehicle:31117,"車隊數量":1396,fleet:17972,"合作社數量":16,corporation:6951,"個人業者數":6603,operators:6194},{time:2010,"業者數":7860,vehicle:30890,"車隊數量":1389,fleet:18005,"合作社數量":17,corporation:6800,"個人業者數":6454,operators:6085},{time:2011,"業者數":7674,vehicle:30745,"車隊數量":1383,fleet:18210,"合作社數量":17,corporation:6643,"個人業者數":6274,operators:5892},{time:2012,"業者數":7505,vehicle:30348,"車隊數量":1374,fleet:18193,"合作社數量":17,corporation:6386,"個人業者數":6114,operators:5769},{time:2013,"業者數":7343,vehicle:30155,"車隊數量":1364,fleet:18311,"合作社數量":14,corporation:6197,"個人業者數":5965,operators:5647},{time:2014,"業者數":6963,vehicle:29614,"車隊數量":1357,fleet:18655,"合作社數量":14,corporation:5946,"個人業者數":5592,operators:5013},{time:2015,"業者數":6733,vehicle:28668,"車隊數量":1354,fleet:18003,"合作社數量":14,corporation:5845,"個人業者數":5365,operators:4820},{time:2016,"業者數":6480,vehicle:27989,"車隊數量":1346,fleet:17741,"合作社數量":14,corporation:5662,"個人業者數":5120,operators:4586},{time:2017,"業者數":6279,vehicle:27817,"車隊數量":1343,fleet:17756,"合作社數量":14,corporation:5580,"個人業者數":4922,operators:4481},{time:2018,"業者數":6121,vehicle:28493,"車隊數量":1339,fleet:18625,"合作社數量":14,corporation:5497,"個人業者數":4768,operators:4371},{time:2019,"業者數":5835,vehicle:31369,"車隊數量":1336,fleet:21720,"合作社數量":14,corporation:5541,"個人業者數":4485,operators:4108},{time:2020,"業者數":5569,vehicle:31352,"車隊數量":1335,fleet:22020,"合作社數量":14,corporation:5492,"個人業者數":4220,operators:3840}]},fdec:function(n,e,t){"use strict";t.r(e);var i=t("7a23");function o(n,e,t,o,a,u){const r=Object(i["resolveComponent"])("highcharts");return Object(i["openBlock"])(),Object(i["createBlock"])(r,{options:a.chartOptions,class:"highchartsBox highchartsPieBox"},null,8,["options"])}var a=t("4397"),u=t("fb56"),r={data(){return{chartOptions:{chart:{type:"pie"},credits:{enabled:!1},title:{text:null},accessibility:{announceNewData:{enabled:!0},point:{valueSuffix:"%"}},plotOptions:{pie:{colors:u["e"]},series:{dataLabels:{enabled:!0,format:"{point.name}<br>{point.y:.1f}%"}}},tooltip:{enabled:!1},series:[{name:"TaxiRegistration",colorByPoint:!0,data:Object(a["f"])(this.$i18n.locale)}]}}}},y=t("6b0d"),c=t.n(y);const h=c()(r,[["render",o]]);e["default"]=h}}]);
//# sourceMappingURL=chunk-5b2ad9ac.56ee85e2.js.map