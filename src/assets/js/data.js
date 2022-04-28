import {colors, pieColor} from '../config/mapbox-style.js'
export const dataColor = [colors.gold, colors.nepal, "#4d6683", "#d89e8d", colors.map]

// langs
const taiwan_Obj_zh = {
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

const taiwan_Obj_en = {
    "TaipeiCity": "Taipei",
    "NewTaipeiCity": "NewTaipei",
    "KaohsiungCity": "Kaohsiung",
    "TaichungCity": "Taichung",
    "TaoyuanCounty": "Taoyuan",
    "TainanCity": "Tainan",
    "KeelungCity": "Keelung",
    "ChiayiCounty": "Chiayi",
    "PingtungCounty": "Pingtung",
    "HsinchuCounty": "Hsinchu",
    "ChanghuaCounty": "Changhua",
    "MiaoliCounty": "Miaoli",
    "YilanCounty": "Yilan",
    "NantouCounty": "Nantou",
    "ChiayiCity": "Chiayi",
    "HualienCounty": "Hualien",
    "YunlinCounty": "Yunlin",
    "HsinchuCity": "Hsinchu",
    "KinmenCounty": "Kinmen",
    "TaitungCounty": "Taitung",
    "PenghuCounty": "Penghu",
    "LienchiangCounty": "Lienchiang"
}

export const passenger_action_index = {
    notJoined: {en: "Non-fleet", zh: "未加入車隊"},
    join: {en: "Joined fleet", zh: "加入車隊"}
}

export const TaxiLangs = {
    fleet: {en: "Taxi Fleet", zh: "靠行計程車隊"},
    corporation: {en: "Transportation Corporation", zh: "運輸合作社"},
    operators: {en: "Personal Operators", zh: "個人營業者"}
}

export const taxi_history_name = {
    ...TaxiLangs,
    time: {en: "Time", zh: "時間"},
    operator: {en: "Operator count", zh: "業者數"},
    vehicle: {en: "Vehicle", zh: "總車輛"},
    fleet: {en: "Fleets", zh: "車隊數量"},
    corporation: {en: "Corporation", zh: "合作社數量"},
}

export const taiwan_bar_series = (lang) => {
    if(lang == 'en-US'){
        return Object.values(taiwan_Obj_en)
    }else{
        return Object.values(taiwan_Obj_zh)
    }
}

export const taxi_source_series = (lang) => {
    const Lang = (lang == 'en-US'? 'en': 'zh')
    const NameObj = {
        ...TaxiLangs,
        ...passenger_action_index
    }
    return Object.keys(taxi_source_type).map(key => {
        return {
            name: NameObj[key][Lang],
            y: taxi_source_type[key]
        }
    })
}

export const fleets_source_series = (lang) => {
    const Lang = (lang == 'en-US'? 'en': 'zh')
    return Object.keys(passenger_action_index).map((actionKey, actionindex) =>{
        return {
            // showInLegend: false,           
            name: passenger_action_index[actionKey][Lang],
            data: passenger_action.map(item => item[actionKey]),
            color: dataColor[actionindex],
            dataLabels: [{enabled: true}]
        }
    })
}

export const fleets_categories = (lang) => {
    const Lang = (lang === 'en-US'? 'type_en': 'type_zh')
    return passenger_action.map((actionKey) =>{
        return actionKey[Lang]
    })
}

export const history_series_column = (lang) => {
    const Lang = (lang == 'en-US'? 'en': 'zh')
    const dataObj = {
        vehicle: {en: "Vehicle", zh: "總車輛"},
        ...TaxiLangs
    }
    return Object.keys(dataObj).map((key,index) => {
        return {
            name: dataObj[key][Lang],
            type: index == 0 ? 'column':'spline',
            data: taxi_history.map(data => data[key]),
            color: index == 0 ? colors.map: pieColor[index-1]
        }
    })
}

// Datas
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
const taxi_source_type = {
    fleet: 48.2,
    corporation: 26.2,
    operators: 25.6,
}

const passenger_action = [
    {
        type_zh: "巡迴攬客",
        type_en: "On roaming",
        notJoined:75.8,
        join: 59.2
    },{
        type_zh: "招呼站",
        type_en: "Taxi Stands",
        notJoined:35.1,
        join: 28.9
    },{
        type_zh: "定點等候(非招呼排班)",
        type_en: "Point waiting",
        notJoined:25.2,
        join: 24.9
    },{
        type_zh: "熟客電話",
        type_en: "Phone order",
        notJoined:21.3,
        join: 21.8
    },{
        type_zh: "車行等候",
        type_en: "Fleet waiting",
        notJoined:5.9,
        join: 4.6
    },{
        type_zh: "APP叫車",
        type_en: "APP order",
        notJoined:2.7,
        join: 13.4
    },{
        type_zh: "其他(含共乘)",
        type_en: "Other(including sharing)",
        notJoined:2.1,
        join: 1
    },{
        type_zh: "無線電衛星派車",
        type_en: "Radio hailing",
        notJoined:0,
        join: 100
    }
]

export const taxi_history = [
    {
        "time": 2009,
        "業者數": 8015,
        "vehicle": 31117,
        "車隊數量": 1396,
        "fleet": 17972,
        "合作社數量": 16,
        "corporation": 6951,
        "個人業者數": 6603,
        "operators": 6194
    },
    {
        "time": 2010,
        "業者數": 7860,
        "vehicle": 30890,
        "車隊數量": 1389,
        "fleet": 18005,
        "合作社數量": 17,
        "corporation": 6800,
        "個人業者數": 6454,
        "operators": 6085
    },
    {
        "time": 2011,
        "業者數": 7674,
        "vehicle": 30745,
        "車隊數量": 1383,
        "fleet": 18210,
        "合作社數量": 17,
        "corporation": 6643,
        "個人業者數": 6274,
        "operators": 5892
    },
    {
        "time": 2012,
        "業者數": 7505,
        "vehicle": 30348,
        "車隊數量": 1374,
        "fleet": 18193,
        "合作社數量": 17,
        "corporation": 6386,
        "個人業者數": 6114,
        "operators": 5769
    },
    {
        "time": 2013,
        "業者數": 7343,
        "vehicle": 30155,
        "車隊數量": 1364,
        "fleet": 18311,
        "合作社數量": 14,
        "corporation": 6197,
        "個人業者數": 5965,
        "operators": 5647
    },
    {
        "time": 2014,
        "業者數": 6963,
        "vehicle": 29614,
        "車隊數量": 1357,
        "fleet": 18655,
        "合作社數量": 14,
        "corporation": 5946,
        "個人業者數": 5592,
        "operators": 5013
    },
    {
        "time": 2015,
        "業者數": 6733,
        "vehicle": 28668,
        "車隊數量": 1354,
        "fleet": 18003,
        "合作社數量": 14,
        "corporation": 5845,
        "個人業者數": 5365,
        "operators": 4820
    },
    {
        "time": 2016,
        "業者數": 6480,
        "vehicle": 27989,
        "車隊數量": 1346,
        "fleet": 17741,
        "合作社數量": 14,
        "corporation": 5662,
        "個人業者數": 5120,
        "operators": 4586
    },
    {
        "time": 2017,
        "業者數": 6279,
        "vehicle": 27817,
        "車隊數量": 1343,
        "fleet": 17756,
        "合作社數量": 14,
        "corporation": 5580,
        "個人業者數": 4922,
        "operators": 4481
    },
    {
        "time": 2018,
        "業者數": 6121,
        "vehicle": 28493,
        "車隊數量": 1339,
        "fleet": 18625,
        "合作社數量": 14,
        "corporation": 5497,
        "個人業者數": 4768,
        "operators": 4371
    },
    {
        "time": 2019,
        "業者數": 5835,
        "vehicle": 31369,
        "車隊數量": 1336,
        "fleet": 21720,
        "合作社數量": 14,
        "corporation": 5541,
        "個人業者數": 4485,
        "operators": 4108
    },
    {
        "time": 2020,
        "業者數": 5569,
        "vehicle": 31352,
        "車隊數量": 1335,
        "fleet": 22020,
        "合作社數量": 14,
        "corporation": 5492,
        "個人業者數": 4220,
        "operators": 3840
    }
]