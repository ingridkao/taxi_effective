<template>
    <div id="mapbox_container" class="mapboxBox"/>
    <Loading :load-start="mapLoading" :curr-step="currStep"/>
</template>
<script>
import { createApp, defineComponent, nextTick } from 'vue'
import * as turf from '@turf/turf' 
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

import Loading from '@/components/Loading.vue'
import MapboxPopup from '@/components/MapboxPopup.vue'

import { taiwanFillStyle, taiwanSymbolStyle, taiwanLineStyle, taxiHailHeatConfig, top100FillStyle, taxiStationPointStyle, taxiStationBufferStyle, taxiHailNonStationStyle, mapboxBuildings } from '@/assets/config/mapbox-style.js'
import { locationsCenter, initZoom, maxBound, fitBoundsConfig, durationConfig} from '@/assets/config/map-config.js'
import {hotspot} from '@/assets/js/topspot.js'

const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN

const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
export default {
    data(){
        return {
            MapBoxObject: null,
            MapBoxPopup: null,
            mapLoading: false,
            timeout: null,
            oldProgress: null,
            langObj : {
                ROADNAME: this.$t('hotmap.name'),
                NUMPOINTS: this.$t('hotmap.hail'),
                "百大熱點排序": this.$t('hotmap.order'),
                "敘述": this.$t('hotmap.desc'),
                "路寬": this.$t('hotmap.width'),
                "路段名稱": this.$t('hotmap.name'),
                "熱點時間": this.$t('hotmap.time')
            }
        }
    },
    mounted(){
        this.initMapBox()
    },
    destroyed(){
        this.MapBoxObject.remove()
        clearInterval(this.timeout)
    },
	components:{
		Loading, MapboxPopup
	},
    props: {
        currStep: {
            type: String,
            default: '0'
        },
        progress: {
            type: Number,
            default: 1
        },
        updateCenter: {
            type: Object,
            default: () => ({})
        },
        hailLayer: {
            type: Boolean
        },
        hailNonstationLayer: {
            type: Boolean
        }
    },
    computed: {
        langZh(){
            return this.$i18n.locale === 'zh-TW'
        }
    },
    watch: {
        currStep: function (val, oldVal) {
            // console.log('currStep: new: %s, old: %s', val , oldVal)
            this.currStepWatchHandler()
        },
        progress: function (val, oldProgress) {
            // console.log('progress: new: %s, old: %s', val, oldProgress)
            this.oldProgress = oldProgress
        },
        updateCenter: function (val, oldVal) {
            this.setHotspotToCenter(val)
        },
        hailLayer: function (val, oldVal) {
            this.toggleMapLayer('hail', val)
        },
        hailNonstationLayer: function (val, oldVal) {
            this.toggleMapLayer('taxi_hail_Nonstation',val)
        }
    },
    methods: {
        initMapBox(){
            const Lang = this.$i18n.locale === 'zh-TW'? 'zh-Hant': 'en'

            mapboxgl.accessToken = MAPBOXTOKEN
            this.MapBoxObject = new mapboxgl.Map({
                antialias: true,
                container: "mapbox_container",
                // style: mapStyle,
                style: 'mapbox://styles/mapbox/light-v10',
                center: locationsCenter.taiwan,
                minZoom: initZoom.taiwan - 1,
                maxZoom: initZoom.maxZoom,
                zoom: initZoom.taiwan
            }).addControl(new MapboxLanguage({ defaultLanguage: Lang }))

            // Add zoom and rotation controls to the map.
            this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )

            //https://docs.mapbox.com/mapbox-gl-js/example/toggle-interaction-handlers/
            this.MapBoxObject.scrollZoom.disable()
            this.MapBoxObject.touchZoomRotate.enable()

            // Add language controls to the map.
            if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
                mapboxgl.setRTLTextPlugin(`${BASE_URL}/js/mapbox-gl-rtl-text.js`) 
            }

            this.MapBoxObject.on("load", () => {
                this.mapLoading = true
                // console.log(this.MapBoxObject.getStyle().layers);
                this.MapBoxObject.addLayer(mapboxBuildings)
                this.MapBoxObject.setLayoutProperty('settlement-label', 'visibility', 'none')
                this.loadDataToMapbox()
            })
            this.MapBoxObject.on("click", (e) => {
            // //     // console.log( this.MapBoxObject.getBounds())
            // //     console.log( this.MapBoxObject.getCenter())
            // //     // console.log( this.MapBoxObject.getBearing())
                // console.log( this.MapBoxObject.getPitch())
                // console.log( this.MapBoxObject.getZoom())
            // //     // console.log(JSON.stringify(event.lngLat.wrap()))
            })
        },
        loadDataToMapbox(){
            const requestArray = [
                axios.get(`${BASE_URL}/data/taiwan_cities.geojson`),//台灣縣市界線
                axios.get(`${BASE_URL}/data/taxistation.geojson`),//243處的計程車招呼站
                axios.get(`${BASE_URL}/data/hailV2.geojson`),//路邊攔車數據
                axios.get(`${BASE_URL}/data/taxi_hail_Nonstation.geojson`),//無招呼站之路段
                axios.get(`${BASE_URL}/data/taxi_hotspot.geojson`)//百大路段
            ]
            const TaiwanSymbol = taiwanSymbolStyle(this.langZh)

            axios.all(requestArray).then(axios.spread((res0 ,res1, res2, res3, res4) => {
                this.MapBoxObject.addSource('taiwan_city', { 
                    type: 'geojson', 
                    data: res0.data 
                }).addLayer(taiwanFillStyle).addLayer(TaiwanSymbol).addLayer(taiwanLineStyle)

                const taxistationData = res1.data
                let rr_crds = []
                for(let i=0; i<taxistationData.features.length; i++){
                    if(taxistationData.features[i].geometry.coordinates){
                        let point = turf.point(taxistationData.features[i].geometry.coordinates)
                        let mileBuffer = turf.buffer(point, 80, {units: 'meters'})
                        rr_crds.push(mileBuffer)
                    }
                }
                this.MapBoxObject.addSource('taxistation', { 
                    type: 'geojson', 
                    data: taxistationData 
                }).addLayer(taxiStationPointStyle)

                this.MapBoxObject.addSource('taxistationBuffer', {
                    type: "geojson",
                    data: { 
                        type: "FeatureCollection", 
                        features: rr_crds
                    }
                }).addLayer(taxiStationBufferStyle)

                this.MapBoxObject.addSource('hail', { 
                    type: 'geojson', 
                    data: res2.data 
                }).addLayer({
                    id: 'hail',
                    source: 'hail',
                    layout : { visibility: 'none' },
                    ...taxiHailHeatConfig
                })

                this.MapBoxObject.addSource('taxi_hail_Nonstation', { 
                    type: 'geojson', 
                    data: res3.data 
                }).addLayer(taxiHailNonStationStyle)

                this.MapBoxObject.addSource('top100hotspot', { 
                    type: 'geojson', 
                    data: res4.data
                }).addLayer(top100FillStyle)

            })).finally(()=>{
                if(this.MapBoxObject.getLayer('top100hotspot')){
                    this.MapBoxObject.on('click', 'top100hotspot', (e) => {
                        this.MapBoxObject.getCanvas().style.cursor = 'pointer'
                        const LngLat = e.lngLat
                        const featuresData = e.features
                        const properties = featuresData[0]['properties']
                        this.setHotspotToCenter({
                            target: properties['序號'],
                            pos: LngLat
                        })
                        this.openMapboxPopup(featuresData, LngLat)
                    })
                }
                this.mapLoading = false
            })
        },
        setHotspotToCenter(hotspotData, init){
            if(hotspotData && hotspotData.target && hotspotData.pos){
                const {lng, lat} = hotspotData.pos
                if(lng & lat){
                    if(this.MapBoxObject.getLayer('top100hotspot')){
                        this.MapBoxObject.setPaintProperty('top100hotspot', 'fill-opacity',[
                            "match", ["get", "序號"], hotspotData.target,
                            1, 0.3
                        ])
                    }
                    this.MapBoxObject.easeTo({
                        center: [lng, lat],
                        zoom: initZoom.heatmp,
                        duration: durationConfig,
                        pitch: 60
                    })
                    const featuresData = [{
                        properties: hotspot.find(item => item['序號'] === hotspotData.target)
                    }]
                    const initDuration = init? durationConfig*1.25: durationConfig*0.5
                    this.timeout = setTimeout(() => {
                        this.openMapboxPopup(featuresData, hotspotData.pos)
                    }, initDuration)
                }
            }
        },
        openMapboxPopup(featuresData, LngLat){
            const LangObj = this.langObj
            const defindPopup = defineComponent({
                extends: MapboxPopup,
                setup() {
                    return { featuresData, LangObj}
                }
            })
            if(this.MapBoxPopup){
                this.MapBoxPopup.remove()
            }
            this.MapBoxPopup = new mapboxgl.Popup().setLngLat(LngLat).setHTML('<div id="popup-content"></div>').addTo(this.MapBoxObject)
            nextTick(() => { createApp(defindPopup).mount("#popup-content") })
        },
        toggleMapLayer(layer, toggle){  
            if(this.MapBoxObject.getLayer(layer)){
                this.MapBoxObject.setLayoutProperty(layer, 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        toggleTaiwanCity(toggle, filter){
            //台灣縣市界線
            if(this.MapBoxObject.getLayer('taiwan_city')){
                this.MapBoxObject
                .setLayoutProperty('taiwan_city', 'visibility', ((toggle)? 'visible': 'none'))
                // .setFilter('taiwan_city', filter? ["has", 'area']: null)
                // .setPaintProperty('taiwan_city', 'fill-opacity', (filter? 0.5: 0.7))
            }
        },
        toggleTaxistation(toggle){
            if(this.MapBoxObject.getLayer('taxistation')){
                this.MapBoxObject.setLayoutProperty('taxistation', 'visibility', ((toggle)? 'visible': 'none'))
            }
            if(this.MapBoxObject.getLayer('taxistationBuffer')){
                this.MapBoxObject.setLayoutProperty('taxistationBuffer', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        currStepWatchHandler(val, oldVal){
            this.toggleMapLayer('taxi_hail_Nonstation',false)
            this.toggleMapLayer('hail', false)
            this.toggleTaxistation(false)
            this.toggleMapLayer('top100hotspot',false)
            if(this.currStep == 1) {
                this.toggleTaiwanCity(true, true)
                this.MapBoxObject.fitBounds(maxBound.northArea, {
                    ...fitBoundsConfig,
                    maxZoom: initZoom.taiwan + 2
                })
            }
            if(this.currStep == 2 && this.oldProgress && this.oldProgress > this.progress){
                this.toggleTaiwanCity(true, false)
                this.MapBoxObject.fitBounds(maxBound.taiwan, {
                    ...fitBoundsConfig
                })
            }
            if(this.MapBoxPopup){
                this.MapBoxPopup.remove()
            }
            if(this.currStep <5 || this.currStep >7)return

            this.toggleTaiwanCity(false)
            if(this.currStep  == 5 || this.currStep  == 6){
                this.MapBoxObject.easeTo({
                    center: locationsCenter.taipei,
                    zoom: initZoom.taipei,
                    duration: durationConfig,
                    pitch: 0
                })
                //路邊攔車數據
                this.toggleMapLayer('hail', true)
                //243處的計程車招呼站
                this.toggleTaxistation(true)
                if(this.currStep == 6){
                    //無招呼站之路段
                    this.toggleMapLayer('taxi_hail_Nonstation',true)
                }
            }
            if(this.currStep == 7){
                this.toggleTaxistation(true)
                this.toggleMapLayer('top100hotspot',true)
                this.setHotspotToCenter({
                    target: '2',
                    pos: {lng: 121.55758431129362, lat: 25.03133011792518}
                }, true)
            }
        }
    }
}
</script>
<style lang="scss">
.mapboxBox,
.mapboxgl-canvas{
    width: 100%;
    height: 100%;
}
</style>