import {colors} from '../config/mapbox-style.js'
export const dataColor = [colors.gold, colors.nepal, "#4d6683", "#d89e8d", "#c7d0cd"]
export const taiwan_Obj = {
    "TaipeiCity": "臺北市",
    "NewTaipeiCity": "新北市",
    "KaohsiungCity": "高雄市",
    "TaichungCity": "臺中市",
    "TaoyuanCounty": "桃園市",
    "TainanCity": "臺南市",
    "KeelungCity": "基隆市",
    "ChiayiCounty": "嘉義縣",
    "PingtungCounty": "屏東縣",
    "HsinchuCounty": "新竹縣",
    "ChanghuaCounty": "彰化縣",
    "MiaoliCounty": "苗栗縣",
    "YilanCounty": "宜蘭縣",
    "NantouCounty": "南投縣",
    "ChiayiCity": "嘉義市",
    "HualienCounty": "花蓮縣",
    "YunlinCounty": "雲林縣",
    "HsinchuCity": "新竹市",
    "KinmenCounty": "金門縣",
    "TaitungCounty": "臺東縣",
    "PenghuCounty": "澎湖縣",
    "LienchiangCounty": "連江縣"
}

export const taxi_taiwan_count = {
    "TaipeiCity": 31554,
    "NewTaipeiCity": 22503,
    "KaohsiungCity": 9008,
    "TaichungCity": 7962,
    "TaoyuanCounty": 5574,
    "TainanCity": 4108,
    "KeelungCity": 1884,
    "ChiayiCounty": 1013,
    "PingtungCounty": 815,
    "HsinchuCounty": 805,
    "ChanghuaCounty": 765,
    "MiaoliCounty": 765,
    "YilanCounty": 744,
    "NantouCounty": 663,
    "ChiayiCity": 638,
    "HualienCounty": 582,
    "YunlinCounty": 562,
    "HsinchuCity": 532,
    "KinmenCounty": 473,
    "TaitungCounty": 456,
    "PenghuCounty": 435,
    "LienchiangCounty": 57
}

export const taxi_source_type = {
    "靠行計程車隊": 48.2,
    "運輸合作社": 26.2,
    "個人營業者": 25.6,
}
export const taxi_source_series = () => {
    const indexArray = Object.keys(taxi_source_type)
    return indexArray.map(item => {
        return {
            name: item,
            y: taxi_source_type[item]
        }
    })
}

export const passenger_action_index = {
    notJoined: '未加入車隊',
    join: '加入車隊'
}
export const passenger_action = [
    {
        type: "巡迴攬客",
        notJoined:75.8,
        join: 59.2
    },{
        type: "招呼站",
        notJoined:35.1,
        join: 28.9
    },{
        type: "定點等候(非招呼排班)",
        notJoined:25.2,
        join: 24.9
    },{
        type: "熟客電話",
        notJoined:21.3,
        join: 21.8
    },{
        type: "車行等候",
        notJoined:5.9,
        join: 4.6
    },{
        type: "APP叫車",
        notJoined:2.7,
        join: 13.4
    },{
        type: "其他(含共乘)",
        notJoined:2.1,
        join: 1
    },{
        type: "無線電衛星派車",
        notJoined:0,
        join: 100
    }
]

export const taxi_history = [
    {
        "時間": 2009,
        "業者數": 8015,
        "總車輛": 31117,
        "車隊數量": 1396,
        "靠行計程車": 17972,
        "合作社數量": 16,
        "運輸合作社": 6951,
        "個人業者數": 6603,
        "個人營業者": 6194
    },
    {
        "時間": 2010,
        "業者數": 7860,
        "總車輛": 30890,
        "車隊數量": 1389,
        "靠行計程車": 18005,
        "合作社數量": 17,
        "運輸合作社": 6800,
        "個人業者數": 6454,
        "個人營業者": 6085
    },
    {
        "時間": 2011,
        "業者數": 7674,
        "總車輛": 30745,
        "車隊數量": 1383,
        "靠行計程車": 18210,
        "合作社數量": 17,
        "運輸合作社": 6643,
        "個人業者數": 6274,
        "個人營業者": 5892
    },
    {
        "時間": 2012,
        "業者數": 7505,
        "總車輛": 30348,
        "車隊數量": 1374,
        "靠行計程車": 18193,
        "合作社數量": 17,
        "運輸合作社": 6386,
        "個人業者數": 6114,
        "個人營業者": 5769
    },
    {
        "時間": 2013,
        "業者數": 7343,
        "總車輛": 30155,
        "車隊數量": 1364,
        "靠行計程車": 18311,
        "合作社數量": 14,
        "運輸合作社": 6197,
        "個人業者數": 5965,
        "個人營業者": 5647
    },
    {
        "時間": 2014,
        "業者數": 6963,
        "總車輛": 29614,
        "車隊數量": 1357,
        "靠行計程車": 18655,
        "合作社數量": 14,
        "運輸合作社": 5946,
        "個人業者數": 5592,
        "個人營業者": 5013
    },
    {
        "時間": 2015,
        "業者數": 6733,
        "總車輛": 28668,
        "車隊數量": 1354,
        "靠行計程車": 18003,
        "合作社數量": 14,
        "運輸合作社": 5845,
        "個人業者數": 5365,
        "個人營業者": 4820
    },
    {
        "時間": 2016,
        "業者數": 6480,
        "總車輛": 27989,
        "車隊數量": 1346,
        "靠行計程車": 17741,
        "合作社數量": 14,
        "運輸合作社": 5662,
        "個人業者數": 5120,
        "個人營業者": 4586
    },
    {
        "時間": 2017,
        "業者數": 6279,
        "總車輛": 27817,
        "車隊數量": 1343,
        "靠行計程車": 17756,
        "合作社數量": 14,
        "運輸合作社": 5580,
        "個人業者數": 4922,
        "個人營業者": 4481
    },
    {
        "時間": 2018,
        "業者數": 6121,
        "總車輛": 28493,
        "車隊數量": 1339,
        "靠行計程車": 18625,
        "合作社數量": 14,
        "運輸合作社": 5497,
        "個人業者數": 4768,
        "個人營業者": 4371
    },
    {
        "時間": 2019,
        "業者數": 5835,
        "總車輛": 31369,
        "車隊數量": 1336,
        "靠行計程車": 21720,
        "合作社數量": 14,
        "運輸合作社": 5541,
        "個人業者數": 4485,
        "個人營業者": 4108
    },
    {
        "時間": 2020,
        "業者數": 5569,
        "總車輛": 31352,
        "車隊數量": 1335,
        "靠行計程車": 22020,
        "合作社數量": 14,
        "運輸合作社": 5492,
        "個人業者數": 4220,
        "個人營業者": 3840
    }
]