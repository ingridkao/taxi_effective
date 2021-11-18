<template>
    <main id="mapbox_container">
        <div id="mapboxBg"/>
        <div id="mapboxBox1" class="mapboxBox"/>
        <Loading :load-start="mapLoading" :curr-step="currStep"/>
    </main>
</template>
<script>
import { createApp, defineComponent, nextTick } from 'vue'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

import Loading from '@/components/Loading.vue'
import MapboxPopup from '@/components/MapboxPopup.vue'

import mapStyle,{ taiwanFillStyle, taxiHeatStyle, top100FillStyle, zoomCircleRadiusForShow } from '@/assets/config/mapbox-style.js'
import { MAPBOXTOKEN, BASE_URL, locations_center, initZoom, maxZoom, maxBound, fitPadding} from '@/assets/config/map-config.js'
const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
const durationConfig = 5000
export default {
    data(){
        return {
            MapBoxObject: null,
            mapLoading: false
        }
    },
    mounted(){
        this.initMapBox()
    },
    destroyed(){},
	components:{
		Loading, MapboxPopup
	},
    props: {
        currStep: {
            type: String,
            default: ''
        },
        progress: {
            type: Number,
            default: 1
        },
        timeInterval: {
            type: Object,
            default: () => ({})
        },
        updateCenter: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {},
    watch: {
        currStep: function (val, oldVal) {
            if(val != oldVal){
                this.currStepWatchHandler(val, oldVal)
            }
        },
        progress: function (val, oldVal) {
            if(this.currStep == 6 && val > 0.1){
                // this.toggleTaxiStation(true)
            }
        },
        timeInterval: {
            handler: function(newObj){},
            deep: true,
            immediate: false
        },
        updateCenter: function (val, oldVal) {
            this.setCenter(val)
        },
    },
    methods: {
        setCenter(hotspotData){
            if(hotspotData && hotspotData.target){
                this.MapBoxObject.setPaintProperty('top100hotspot', 'fill-opacity',[
                    "match", ["get", "序號"], hotspotData.target,
                    1, 0.3
                ])
                const {lng, lat} = hotspotData.pos
                if(lng & lat){
                    this.MapBoxObject.easeTo({
                        center: [lng, lat],
                        zoom: initZoom.zoomin,
                        duration: durationConfig
                    })
                }
            }
        },
        initMapBox(){
            mapboxgl.accessToken = MAPBOXTOKEN
            this.MapBoxObject = new mapboxgl.Map({
                antialias: true,
                container: "mapboxBox1",
                // style: mapStyle,
                style: 'mapbox://styles/mapbox/light-v10',
                center: locations_center.taiwan,
                zoom: initZoom.taiwan,
                minZoom: 7,
                maxZoom: 19
            })
            // Add zoom and rotation controls to the map.
            this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )
            this.MapBoxObject.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hant' }))

            //https://docs.mapbox.com/mapbox-gl-js/example/toggle-interaction-handlers/
            this.MapBoxObject.scrollZoom.disable();
            // Add language controls to the map.
            if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
                mapboxgl.setRTLTextPlugin(`${BASE_URL}/js/mapbox-gl-rtl-text.js`) 
            }
            this.MapBoxObject.on("load", () => {
                this.mapLoading = true
                this.loadDataToMapbox()
            })
            this.MapBoxObject.on('idle', () => {
                this.mapLoading = false
            })
        },
        loadDataToMapbox(){
            const requestArray = [
                axios.get(`${BASE_URL}/data/taiwan_cities.geojson`),//台灣縣市界線
                axios.get(`${BASE_URL}/data/taxi_hail_Nonstation.geojson`),//無招呼站之路段
                // axios.get(`${BASE_URL}/data/taxi_hotspot.geojson`)//243處的計程車招呼站
                axios.get(`${BASE_URL}/data/taxi_hotspot.geojson`)//百大路段
            ]
            axios.all(requestArray).then(axios.spread((res0 ,res1, res2) => {
                this.MapBoxObject.addSource('taiwan_city', { type: 'geojson', data: res0.data }).addLayer({
                    id: 'taiwan_city',
                    source: 'taiwan_city',
                    ...taiwanFillStyle
                })
                this.MapBoxObject.addSource('taxi_hail_Nonstation', { type: 'geojson', data: res1.data }).addLayer({
                    id: 'taxi_hail_Nonstation',
                    source: 'taxi_hail_Nonstation',
                    layout : { visibility: 'none' },
                    ...taxiHeatStyle
                })
                this.MapBoxObject.addSource('top100hotspot', { type: 'geojson', data: res2.data }).addLayer({
                    id: 'top100hotspot',
                    source: 'top100hotspot',
                    ...top100FillStyle
                })
            }))

            this.MapBoxObject.on('click', 'top100hotspot', (e) => {
                const featuresData = e.features
                const LngLat = e.lngLat
                const properties = featuresData[0]['properties']

                this.setCenter({
                    target: properties['序號'],
                    pos: LngLat
                })
                const defindPopup = defineComponent({
                    extends: MapboxPopup,
                    setup() {
                        return { featuresData }
                    }
                })

                new mapboxgl.Popup().setLngLat(LngLat).setHTML('<div id="popup-content"></div>').addTo(this.MapBoxObject)
                nextTick(() => { createApp(defindPopup).mount("#popup-content") })
            })

            this.MapBoxObject.on("click", (event) => {
                this.MapBoxObject.getCanvas().style.cursor = 'pointer'
                // console.log( this.MapBoxObject.getBounds())
                // console.log( this.MapBoxObject.getCenter())
                // console.log( this.MapBoxObject.getBearing())
                // console.log( this.MapBoxObject.getPitch())
                console.log( this.MapBoxObject.getZoom())
                // console.log(JSON.stringify(event.lngLat.wrap()))
            })
        },
        toggleTaiwanCity(toggle, filter){
            if(this.MapBoxObject.getLayer('taiwan_city')){
                this.MapBoxObject.setLayoutProperty('taiwan_city', 'visibility', ((toggle)? 'visible': 'none'))

                this.MapBoxObject.setFilter('taiwan_city', filter? ["has", 'area']: null)
                this.MapBoxObject.setPaintProperty('taiwan_city', 'fill-outline-color', (filter? "rgb(255,255,255)":"rgba(255,255,255,0.2)"))
                this.MapBoxObject.setPaintProperty('taiwan_city', 'fill-opacity', (filter? 0.5: 0.8))
            }
        },
        toggleHailNonstation(toggle){
            if(this.MapBoxObject.getLayer('taxi_hail_Nonstation')){
                this.MapBoxObject.setLayoutProperty('taxi_hail_Nonstation', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        toggleTaxiStation(toggle){
            if(this.MapBoxObject.getLayer('taxi_station')){
                this.MapBoxObject.setLayoutProperty('taxi_station', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        toggleHeatMap(toggle){
            if(this.MapBoxObject.getLayer('top100hotspot')){
                this.MapBoxObject.setLayoutProperty('top100hotspot', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        // toggleWorkTrackPath(toggle, discolor){
        //     const visibility = (toggle)? 'visible': 'none'
        //     const lineColor = (discolor)? '#efe99d': '#97b5b2'
        //     if(this.MapBoxObject.getLayer('work_track')){
        //         this.MapBoxObject.setLayoutProperty('work_track', 'visibility', visibility)
        //         this.MapBoxObject.setPaintProperty('work_track', 'line-color', lineColor)
        //     }
        //     if(this.MapBoxObject.getLayer('work_track_old')){
        //         this.MapBoxObject.setLayoutProperty('work_track_old', 'visibility', visibility)
        //         this.MapBoxObject.setPaintProperty('work_track_old', 'line-color', lineColor)
        //     }
        // },
        // toggleWorkoffTrackPath(toggle, discolor){
        //     const visibility = (toggle)? 'visible': 'none'
        //     const lineColor = (discolor)? '#53b7c4': '#97b5b2'
        //     if(this.MapBoxObject.getLayer('offwork_track')){
        //         this.MapBoxObject.setLayoutProperty('offwork_track', 'visibility', visibility)
        //         this.MapBoxObject.setPaintProperty('offwork_track', 'line-color', lineColor)
        //     }
        //     if(this.MapBoxObject.getLayer('offwork_track_old')){
        //         this.MapBoxObject.setLayoutProperty('offwork_track_old', 'visibility', visibility)
        //         this.MapBoxObject.setPaintProperty('offwork_track_old', 'line-color', lineColor)
        //     }
        // },
        initAllMap(){
            // this.toggleHeatMap(false)
        },
        currStepWatchHandler(val, oldVal){
            // console.log('new: %s, old: %s', val, oldVal)
            // console.log(val);
            switch (val) {
                case '0':
                    break
                case '1':
                    this.toggleTaiwanCity(true, false)
                    // this.MapBoxObject.easeTo({
                    //     center: locations_center.taiwan,
                    //     zoom: initZoom.taiwan,
                    //     bearing: 0,
                    //     pitch: 0,
                    //     duration: durationConfig
                    // })
                    this.MapBoxObject.fitBounds(maxBound.taiwan, {
                        maxZoom: maxZoom.taiwan,
                        padding: fitPadding.commom,
                        duration: durationConfig
                    })
                    break
                case '2':
                    this.toggleTaiwanCity(true, true)
                    this.MapBoxObject.fitBounds(maxBound.northArea, {
                        maxZoom: initZoom.northArea,
                        padding: fitPadding.commom,
                        duration: durationConfig
                    })
                    break;
                case '3':
                    break;
                case '4':
                    this.toggleTaiwanCity(false)
                    // 
                    // this.toggleWorkTrackPath(true, false)
                    // this.toggleWorkoffTrackPath(true, false)
                    // if(this.MapBoxObject.getLayer('taipei_accident')){
                    //     this.MapBoxObject
                    //     .setPaintProperty('taipei_accident', 'circle-color', '#32d0c2')
                    //     .setPaintProperty('taipei_accident', 'circle-radius', zoomCircleRadiusForShow)
                    // }
                    // if(this.MapBoxObject.getLayer('my_accident')){
                    //     this.MapBoxObject.setLayoutProperty('my_accident', 'visibility', 'visible')
                    // }
                    // if(this.MapBoxObject.getLayer('taipei_accident')){
                    //     this.MapBoxObject
                    //     .setPaintProperty('taipei_accident', 'circle-color', 
                    //         ["match",["get", "Weather"],
                    //         "晴","#cab138",
                    //         "陰","#2ec7a5",
                    //         "強風","#f1839c",
                    //         "雨","#9fd7fd",
                    //         "暴雨","#38adff",
                    //         "#ddd"
                    //     ])
                    //     .setPaintProperty('taipei_accident', 'circle-radius', zoomCircleRadiusForShow)
                    // }
                    this.MapBoxObject.fitBounds(maxBound.taipei, {
                        maxZoom: maxZoom.taipei,
                        padding: fitPadding.commom,
                        duration: durationConfig
                    })
                    break;

                case '5':
                    this.toggleHailNonstation(false)
                    // this.toggleTaxiStation(false)
                    break;
                case '6':
                    this.toggleHailNonstation(true)
                    // if(this.MapBoxObject.getLayer('taipei_accident')){
                    //     this.MapBoxObject
                    //     .setPaintProperty('taipei_accident', 'circle-color', 
                    //         ["match",["get", "DealType"],
                    //         "A1類交通事故","#d4b24c",
                    //         "A2類交通事故","#8989ad",
                    //         "#ddd"
                    //     ])
                    //     .setPaintProperty('taipei_accident', 'circle-radius', 
                    //         ["match",["get", "DealType"],
                    //         "A1類交通事故",2.5,
                    //         "A2類交通事故",1.5,
                    //         1
                    //     ])
                    // }
                    // this.$emit('update', {})


                    break;
                case '7':
                    this.toggleHailNonstation(true)
                    this.toggleHeatMap(false)
                    this.MapBoxObject.fitBounds(maxBound.taipei, {
                        maxZoom: maxZoom.hotspot,
                        padding: fitPadding.commom,
                        duration: durationConfig
                    })
                    // if(this.MapBoxObject.getLayer('taipei_accident')){
                    //     this.MapBoxObject
                    //     .setPaintProperty('taipei_accident', 'circle-color', 
                    //         ["match",["get", "CarType"],
                    //         "自用小客車","#b0a5ca",
                    //         "大型重型機車1(550C.C.以上)","#338daf",
                    //         "大型重型機車2(250-550C.C.)","#64c59d",
                    //         "乘客","#94d075",
                    //         "普通重型機車","#7f385c",
                    //         "腳踏自行車與其他","#7f4238",
                    //         "行人","#c38378",
                    //         "#ddd"
                    //     ])
                    //     .setPaintProperty('taipei_accident', 'circle-radius', zoomCircleRadiusForShow)
                    // }
                    break;
                case '8':
                    this.toggleHailNonstation(false)
                    this.toggleHeatMap(true)
                    this.MapBoxObject.easeTo({
                        center: locations_center.taipei,
                        zoom: maxZoom.hotspot,
                        duration: durationConfig
                    })
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#mapbox_container {
    position: fixed;
    width: 100%;
	height: 100%;
    top: 0;
    z-index: 0;
    >div{
        position: absolute;
    }
}
#mapboxBg{
    width: 100%;
    height: 100%; 
    top: 0;
    left: 0;
}
.mapboxBox{
    width: 98%;
    height: 98%;
    margin: 1%;
    top: 0;
    left: 0;
}
</style>