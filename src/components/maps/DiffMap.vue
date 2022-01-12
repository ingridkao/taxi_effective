<template>
    <div class="diffBox">
        <div class="contextbox columnBox">
            <div>
                <h6>計程車電召與路攔行為觀察</h6>
                <p>透過交通局公共運輸處的合作與聯繫，我們取得了2019/12/2-2019/12/08一周的取得計程車業者的起訖數據，提供數據之樣本車輛數約16,500輛，約占雙北計程車總數30%。可明顯的發現路攔的熱區集中於主要幹道(右)，而電召(app)的熱區的特性較明顯，面對不同的使用搭乘行為、及營運模式，市政府應該提出不同的解決方法。</p>
            </div>
            <div class="mapLegendBox">
                <div class="yellow"><span>電話、APP叫車的搭乘熱區</span></div>
                <div class="blue"><span>路邊攔車的搭乘熱區</span></div>
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
import mapboxgl from 'mapbox-gl'
import Compare from 'mapbox-gl-compare'
import axios from 'axios'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'

import { mapboxBuildings, taxiHailHeatConfig, taxiAPPHeatConfig } from '@/assets/config/mapbox-style.js'
import { locations_center, initZoom, maxZoom} from '@/assets/config/map-config.js'
import Loading from '@/components/Loading.vue'

const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
const mapconfig = {
    style: 'mapbox://styles/mapbox/light-v10',
    center: locations_center.taipei,
    zoom: initZoom.compare,
    minZoom: initZoom.compare - 0.5,
    maxZoom: maxZoom.defalut - 2
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
            mapboxgl.accessToken = MAPBOXTOKEN
            mapboxgl.Compare = Compare
            this.BeforeMapObject = new mapboxgl.Map({
                container: 'beforeMap',
                ...mapconfig
            }).addControl(new MapboxLanguage({defaultLanguage: 'zh-Hant'}))
            this.AfterMapObject = new mapboxgl.Map({
                container: 'afterMap',
                ...mapconfig
            }).addControl(new MapboxLanguage({defaultLanguage: 'zh-Hant'}))

            // this.BeforeMapObject.scrollZoom.disable()
            // this.AfterMapObject.scrollZoom.disable()
            // Add zoom and rotation controls to the map.
            this.AfterMapObject.addControl( new mapboxgl.NavigationControl() )

            const container = this.$refs.compareMapbox
            this.MapBoxObject = new mapboxgl.Compare(
                this.BeforeMapObject,
                this.AfterMapObject, 
                container, {
                    // mousemove: true, // Optional. Set to true to enable swiping during cursor movement.
                    orientation: 'vertical' // Optional. Sets the orientation of swiper to horizontal or vertical, defaults to vertical
                }
            )

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
                })
            })
            this.AfterMapObject.on("load", () => {
                this.mapLoading = true
                axios.get(`${BASE_URL}/data/hailV2.geojson`).then(res => {
                    this.AfterMapObject
                    .addSource('taxi_hail_heat', { type: 'geojson', data: res.data })
                    .addLayer(mapboxBuildings)
                    .addLayer({
                        id: 'taxi_hail_heat',
                        source: 'taxi_hail_heat',
                        ...taxiHailHeatConfig
                    })
                })
                // this.AfterMapObject.on("click", (event) => {
                    // console.log( this.AfterMapObject.getCenter())
                    // console.log( this.AfterMapObject.getZoom())
                // })
            })
            this.BeforeMapObject.on('idle', () => {
                this.mapLoading = false
            })
            this.AfterMapObject.on('idle', () => {
                this.mapLoading = false
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