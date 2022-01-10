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

import { taiwanFillStyle, taiwanSymbolStyle, taxiHailHeatConfig, top100FillStyle, taxiStationPointStyle, taxiStationBufferStyle, taxiHailNonStationStyle } from '@/assets/config/mapbox-style.js'
import { locations_center, initZoom, maxZoom, maxBound, fitPadding} from '@/assets/config/map-config.js'
import {hotspot} from '@/assets/js/topspot.js'
const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN

const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
const durationConfig = 5000
const fitBoundsConfig = {
    padding: fitPadding,
    duration: durationConfig
}
export default {
    data(){
        return {
            MapBoxObject: null,
            MapBoxPopup: null,
            mapLoading: false,
            timeout: null
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
            default: ''
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
    computed: {},
    watch: {
        currStep: function (val, oldVal) {
            this.currStepWatchHandler(val, oldVal)
        },
        progress: function (val, oldVal) {
            if(val <0.1)return
            // console.log('progress: new: %s, old: %s', val, oldVal)
            if(oldVal && oldVal > val){
                if(this.currStep == 2){
                    this.toggleTaiwanCity(true, false)
                    this.MapBoxObject.fitBounds(maxBound.taiwan, {
                        ...fitBoundsConfig,
                        maxZoom: maxZoom.taiwan
                    })
                }
            }else{
                if(this.currStep == 1) {
                    this.toggleTaiwanCity(true, true)
                    this.MapBoxObject.fitBounds(maxBound.northArea, {
                        ...fitBoundsConfig,
                        maxZoom: initZoom.northArea
                    })
                }else if(this.currStep == 5){
                    //243處的計程車招呼站open
                    this.toggleTaxistation(true) 
                }else if(this.currStep == 6){
                    this.toggleMapLayer('hail', false)
                }
            }
        },
        updateCenter: function (val, oldVal) {
            this.setCenter(val)
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
            mapboxgl.accessToken = MAPBOXTOKEN
            this.MapBoxObject = new mapboxgl.Map({
                antialias: true,
                container: "mapbox_container",
                // style: mapStyle,
                style: 'mapbox://styles/mapbox/light-v10',
                center: locations_center.taiwan,
                zoom: initZoom.taiwan,
                minZoom: initZoom.taiwan,
                maxZoom: 18
            })
            // Add zoom and rotation controls to the map.
            this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )
            this.MapBoxObject.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hant' }))

            //https://docs.mapbox.com/mapbox-gl-js/example/toggle-interaction-handlers/
            this.MapBoxObject.scrollZoom.disable()
            // Add language controls to the map.
            if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
                mapboxgl.setRTLTextPlugin(`${BASE_URL}/js/mapbox-gl-rtl-text.js`) 
            }
            this.MapBoxObject.on("load", () => {
                this.mapLoading = true
                // console.log(this.MapBoxObject.getStyle().layers);
                this.MapBoxObject.setLayoutProperty('settlement-label', 'visibility', 'none')
                this.loadDataToMapbox()
            })
            this.MapBoxObject.on('idle', () => {
                this.mapLoading = false
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
            axios.all(requestArray).then(axios.spread((res0 ,res1, res2, res3, res4) => {
                this.MapBoxObject
                .addSource('taiwan_city', { type: 'geojson', data: res0.data })
                .addLayer(taiwanFillStyle)
                .addLayer(taiwanSymbolStyle)
    
                const taxistationData = res1.data
                let rr_crds = []
                for(let i=0; i<taxistationData.features.length; i++){
                    if(taxistationData.features[i].geometry.coordinates){
                        let point = turf.point(taxistationData.features[i].geometry.coordinates)
                        let mileBuffer = turf.buffer(point, 80, {units: 'meters'})
                        rr_crds.push(mileBuffer)
                    }
                }
                this.MapBoxObject.addSource('taxistation', { type: 'geojson', data: taxistationData }).addLayer(taxiStationPointStyle)
                this.MapBoxObject.addSource('taxistationBuffer', {
                    "type": "geojson",
                    "data": { "type": "FeatureCollection", "features": rr_crds}
                }).addLayer(taxiStationBufferStyle)
                this.MapBoxObject.addSource('hail', { type: 'geojson', data: res2.data }).addLayer({
                    id: 'hail',
                    source: 'hail',
                    layout : { visibility: 'none' },
                    ...taxiHailHeatConfig, 
                })
                this.MapBoxObject.addSource('taxi_hail_Nonstation', { type: 'geojson', data: res3.data }).addLayer(taxiHailNonStationStyle)
                this.MapBoxObject.addSource('top100hotspot', { type: 'geojson', data: res4.data }).addLayer(top100FillStyle)
            }))

            this.MapBoxObject.on('click', 'top100hotspot', (e) => {
                this.MapBoxObject.getCanvas().style.cursor = 'pointer'
                const LngLat = e.lngLat
                const featuresData = e.features
                const properties = featuresData[0]['properties']
                this.setCenter({
                    target: properties['序號'],
                    pos: LngLat
                })
                this.openMapboxPopup(featuresData, LngLat)
            })
            // this.MapBoxObject.on("click", (e) => {
            //     // console.log( this.MapBoxObject.getBounds())
            //     console.log( this.MapBoxObject.getCenter())
            //     // console.log( this.MapBoxObject.getBearing())
            //     // console.log( this.MapBoxObject.getPitch())
            //     console.log( this.MapBoxObject.getZoom())
            //     // console.log(JSON.stringify(event.lngLat.wrap()))
            // })
        },
        setCenter(hotspotData){
            if(hotspotData && hotspotData.target && hotspotData.pos){
                const {lng, lat} = hotspotData.pos
                if(lng & lat){
                    this.MapBoxObject.setPaintProperty('top100hotspot', 'fill-opacity',[
                        "match", ["get", "序號"], hotspotData.target,
                        1, 0.3
                    ])
                    this.MapBoxObject.easeTo({
                        center: [lng, lat],
                        zoom: initZoom.zoomin,
                        duration: durationConfig
                    })
                    const featuresData = [{
                        properties: hotspot.find(item => item['序號'] === hotspotData.target)
                    }]
                    this.timeout = setTimeout(() => {
                        this.openMapboxPopup(featuresData, hotspotData.pos)
                    }, durationConfig*0.75)
                }
            }
        },
        openMapboxPopup(featuresData, LngLat){
            const defindPopup = defineComponent({
                extends: MapboxPopup,
                setup() {
                    return { featuresData }
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
                .setFilter('taiwan_city', filter? ["has", 'area']: null)
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
        easeToTaipei(){
            this.MapBoxObject.easeTo({
                center: locations_center.taipei,
                zoom: initZoom.zoomin,
                duration: durationConfig
            })
        },
        currStepWatchHandler(val, oldVal){
            if(val>7)return
            // console.log('currStep: new: %s, old: %s', val, oldVal)
            this.toggleTaiwanCity(false)
            this.toggleMapLayer('top100hotspot',false)
            this.toggleTaxistation(false)
            this.toggleMapLayer('hail', false)
            this.toggleMapLayer('taxi_hail_Nonstation',false)
            if(this.MapBoxPopup){
                this.MapBoxPopup.remove()
            }
            switch (val) {
                case '5':
                    //243處的計程車招呼站
                    this.toggleTaxistation(true)
                    //路邊攔車數據
                    this.toggleMapLayer('hail', true)
                    this.MapBoxObject.fitBounds(maxBound.taipei, {
                        ...fitBoundsConfig,
                        maxZoom: maxZoom.hotspot,
                        padding: fitPadding.compare
                    })
                    break
                case '6':
                    //無招呼站之路段
                    this.toggleTaxistation(true) 
                    this.toggleMapLayer('hail', true)
                    this.toggleMapLayer('taxi_hail_Nonstation',true)
                    this.easeToTaipei()
                    break
                case '7':
                    this.toggleMapLayer('top100hotspot',true)
                    this.easeToTaipei()
                    break
                default:
                    break
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