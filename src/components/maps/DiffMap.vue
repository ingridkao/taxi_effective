<template>
    <div class="diffBox">
        <div class="contextbox columnBox">
            <div>
                <h6>{{$t('diffmap.title')}}</h6>
                <p>{{$t('diffmap.p')}}</p>
            </div>
            <div class="mapLegendBox">
                <div class="yellow"><span>{{$t('scrollama5.digitally')}}</span></div>
                <div class="blue"><span>{{$t('scrollama5.heatZone')}}</span></div>
            </div>
        </div>
        <div ref="compareMapbox" class="compareMapbox">
            <div id="beforeMap" class="maps"/>
            <div id="afterMap" class="maps"/>
        </div>
        <Loading :load-start="mapLoading"/>
    </div>
</template>
<script>
import axios from 'axios'
import MobileDetect from 'mobile-detect'
import mapboxgl from 'mapbox-gl'
import Compare from 'mapbox-gl-compare'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'

import { mapboxBuildings, taxiHailHeatConfig, taxiAPPHeatConfig } from '@/assets/config/mapbox-style.js'
import { locationsCenter, initZoom, maxBound } from '@/assets/config/map-config.js'
import Loading from '@/components/Loading.vue'

const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const mobildDevice = mobileDetect.phone()? true: false
const compareZoom = mobildDevice? 12: 12.6

const mapconfig = {
    style: 'mapbox://styles/mapbox/light-v10',
    center: locationsCenter.taipei,
    maxBounds: maxBound.northArea,
    zoom: compareZoom,
    minZoom: compareZoom - 0.5,
    maxZoom: initZoom.maxZoom - 2
}

export default {
    data(){
        return {
            MapBoxObject: null,
            BeforeMapObject: null,
            AfterMapObject: null,
            compareMap: null,
            mapLoading: false
        }
    },
    mounted(){
        this.initMapBox()
    },
    destroyed(){
        this.MapBoxObject.remove()
        this.AfterMapObject.remove()
        this.BeforeMapObject.remove()
    },
	components: {
		Loading
	},
    methods: {
        initMapBox(){
            const Lang = this.$i18n.locale === 'zh-TW'? 'zh-Hant': 'en'
            mapboxgl.accessToken = MAPBOXTOKEN
            mapboxgl.Compare = Compare
            this.BeforeMapObject = new mapboxgl.Map({
                container: 'beforeMap',
                ...mapconfig
            }).addControl(new MapboxLanguage({defaultLanguage: Lang}))
            this.AfterMapObject = new mapboxgl.Map({
                container: 'afterMap',
                ...mapconfig
            }).addControl(new MapboxLanguage({defaultLanguage: Lang}))

            // Add zoom and rotation controls to the map.
            this.AfterMapObject.addControl( new mapboxgl.NavigationControl() )
            const container = this.$refs.compareMapbox
            this.MapBoxObject = new mapboxgl.Compare(
                this.BeforeMapObject,
                this.AfterMapObject, 
                container, {
                    // mousemove: true, // Optional. Set to true to enable swiping during cursor movement.
                    // orientation: 'vertical' // Optional. Sets the orientation of swiper to horizontal or vertical, defaults to vertical
                }
            )
            this.BeforeMapObject.touchZoomRotate.disable()
            this.AfterMapObject.touchZoomRotate.disable()
            this.BeforeMapObject.on("load", () => {
                this.mapLoading = true
                axios.get(`${BASE_URL}/data/appV2.geojson`).then(res => {
                    this.BeforeMapObject
                    .addSource('taxi_app_heat', { type: 'geojson', data: res.data })
                    .addLayer(mapboxBuildings)
                    .addLayer({
                        id: 'taxi_app_heat',
                        source: 'taxi_app_heat',
                        ...taxiAPPHeatConfig
                    })
                    this.mapLoading = false
                })
            })
            this.AfterMapObject.on("load", () => {
                this.mapLoading = true
                //路邊攔車數據
                axios.get(`${BASE_URL}/data/hailV2.geojson`).then(res => {
                    this.AfterMapObject
                    .addSource('taxi_hail_heat', { type: 'geojson', data: res.data })
                    .addLayer(mapboxBuildings)
                    .addLayer({
                        id: 'taxi_hail_heat',
                        source: 'taxi_hail_heat',
                        ...taxiHailHeatConfig
                    })
                    this.mapLoading = false
                })
                // this.AfterMapObject.on("click", (event) => {
                    // console.log( this.AfterMapObject.getCenter())
                    // console.log( this.AfterMapObject.getZoom())
                // })
            })
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/main.scss';
.diffBox{
    position: relative;
    width: 100%;
}
.compareMapbox{
    position: relative;
    width: 100%;
    height: 50vh;
    .maps{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: $whiteColor;
    }
    .mapboxgl-canvas-container{
        height: 100%;
    }
}
.mapboxgl-compare .compare-swiper-vertical{
    background-color: $blueColor;
}
</style>