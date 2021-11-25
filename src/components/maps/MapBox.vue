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

import { taiwanFillStyle, taxiHailHeat, top100FillStyle, taxiStationPointStyle, taxiStationBufferStyle, taxiHailNonStationStyle } from '@/assets/config/mapbox-style.js'
import { locations_center, initZoom, maxZoom, maxBound, fitPadding} from '@/assets/config/map-config.js'
import {hotspot} from '@/assets/js/topspot.js'
const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN

const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
const durationConfig = 5000
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
            this.currStepWatchHandler(val)
        },
        progress: function (val, oldVal) {
            if(this.currStep == 5 && val > 0.2){
                this.toggleTaxistation(true)
            }else if(this.currStep == 6 && val > 0.15){
                this.toggleHailHeatMap(false)
            }
        },
        updateCenter: function (val, oldVal) {
            this.setCenter(val)
        },
        hailLayer: function (val, oldVal) {
            this.toggleHailHeatMap(val)
        },
        hailNonstationLayer: function (val, oldVal) {
            this.toggleHailNonstation(val)
        }
    },
    methods: {
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
                    console.log(hotspotData.target);
                    this.timeout = setTimeout(() => {
                        this.openMapboxPopup(featuresData, hotspotData.pos)
                    }, durationConfig*0.75)
                }
            }
        },
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
                this.MapBoxObject.addSource('taiwan_city', { type: 'geojson', data: res0.data }).addLayer(taiwanFillStyle)

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
                    ...taxiHailHeat, 
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
            //     // this.MapBoxObject.getCanvas().style.cursor = 'pointer'
            //     const featuresData = e.features
            //     const LngLat = e.lngLat
            //     console.log(LngLat);

            //     // console.log( this.MapBoxObject.getBounds())
            //     console.log( this.MapBoxObject.getCenter())
            //     // console.log( this.MapBoxObject.getBearing())
            //     // console.log( this.MapBoxObject.getPitch())
            //     console.log( this.MapBoxObject.getZoom())
            //     // console.log(JSON.stringify(event.lngLat.wrap()))
            // })
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
        toggleTaiwanCity(toggle, filter){
            //台灣縣市界線
            if(this.MapBoxObject.getLayer('taiwan_city')){
                this.MapBoxObject.setLayoutProperty('taiwan_city', 'visibility', ((toggle)? 'visible': 'none'))

                this.MapBoxObject.setFilter('taiwan_city', filter? ["has", 'area']: null)
                this.MapBoxObject.setPaintProperty('taiwan_city', 'fill-opacity', (filter? 0.2: 0.8))
            }
        },
        toggleHailNonstation(toggle){
            //無招呼站之路段
            if(this.MapBoxObject.getLayer('taxi_hail_Nonstation')){
                this.MapBoxObject.setLayoutProperty('taxi_hail_Nonstation', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        toggleHailHeatMap(toggle){
            //路邊攔車數據
            if(this.MapBoxObject.getLayer('hail')){
                this.MapBoxObject.setLayoutProperty('hail', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        toggleTaxistation(toggle){
            //243處的計程車招呼站
            if(this.MapBoxObject.getLayer('taxistation')){
                this.MapBoxObject.setLayoutProperty('taxistation', 'visibility', ((toggle)? 'visible': 'none'))
            }
            if(this.MapBoxObject.getLayer('taxistationBuffer')){
                this.MapBoxObject.setLayoutProperty('taxistationBuffer', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        toggleHeatMap(toggle){
            if(this.MapBoxObject.getLayer('top100hotspot')){
                this.MapBoxObject.setLayoutProperty('top100hotspot', 'visibility', ((toggle)? 'visible': 'none'))
            }
        },
        initAllMap(){
            this.toggleTaiwanCity(false)
            this.toggleTaxistation(false)
            this.toggleHeatMap(false)
            this.toggleHailHeatMap(false)
            this.toggleHailNonstation(false)
            if(this.MapBoxPopup){
                this.MapBoxPopup.remove()
            }
        },
        currStepWatchHandler(val, oldVal){
            // console.log('new: %s, old: %s', val, oldVal)
            switch (val) {
                case '0':
                    this.initAllMap()
                    break
                case '1':
                    this.toggleTaiwanCity(true, false)
                    this.MapBoxObject.fitBounds(maxBound.taiwan, {
                        maxZoom: maxZoom.taiwan,
                        padding: fitPadding,
                        duration: durationConfig
                    })
                    break
                case '2':
                    this.toggleTaiwanCity(true, true)
                    this.MapBoxObject.fitBounds(maxBound.northArea, {
                        maxZoom: initZoom.northArea,
                        padding: fitPadding,
                        duration: durationConfig
                    })
                    break
                case '3':
                    this.toggleTaiwanCity(false)
                    this.MapBoxObject.fitBounds(maxBound.taipei, {
                        maxZoom: maxZoom.taipei,
                        padding: fitPadding,
                        duration: durationConfig
                    })
                    break
                case '4':
                    this.toggleTaxistation(false)
                    this.toggleHailHeatMap(false)
                    break
                case '5':
                    this.toggleHailHeatMap(true)
                    this.MapBoxObject.fitBounds(maxBound.taipei, {
                        maxZoom: maxZoom.hotspot,
                        padding: fitPadding.compare,
                        duration: durationConfig
                    })
                    break
                case '6':
                    this.toggleHailNonstation(true)
                    this.toggleHeatMap(false)
                    this.MapBoxObject.easeTo({
                        center: locations_center.taipei,
                        zoom: initZoom.zoomin,
                        duration: durationConfig
                    })
                    if(this.MapBoxPopup){
                        this.MapBoxPopup.remove()
                    }
                    break
                case '7':
                    this.toggleHailNonstation(false)
                    this.toggleHeatMap(true)
                    this.MapBoxObject.easeTo({
                        center: locations_center.taipei,
                        zoom: initZoom.zoomin,
                        duration: durationConfig
                    })
                    break
                default:
                    break
            }
        }
    }
}
</script>
<style lang="scss">
.mapboxBox{
    width: 100%;
    height: 100%;
}
</style>