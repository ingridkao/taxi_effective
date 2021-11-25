<template>
    <main>
        <div class="mapLegendBox">
            <div class="yellow">電話、APP叫車的搭乘熱區</div>
            <div class="blue">路邊攔車的搭乘熱區</div>
        </div>
        <div ref="compareMapbox" class="compareMapbox">
            <div id="beforeMap" class="maps"/>
            <div id="afterMap" class="maps"/>
        </div>
        <Loading :load-start="mapLoading"/>
    </main>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import Compare from 'mapbox-gl-compare'
import axios from 'axios'

import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'

import { taxiHailHeat, taxiAPPHeat } from '@/assets/config/mapbox-style.js'
import { locations_center, initZoom} from '@/assets/config/map-config.js'
import Loading from '@/components/Loading.vue'

const BASE_URL = process.env.NODE_ENV === 'production'? process.env.VUE_APP_BASE_URL: '../..'
const MAPBOXTOKEN = process.env.VUE_APP_MAPBOXTOKEN
const MapboxLanguage = require('@/assets/js/mapbox-gl-language.js')
const mapconfig = {
    center: locations_center.taipei,
    zoom: initZoom.compare,
    minZoom: initZoom.compare - 0.5,
    maxZoom: 16
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
    created(){},
    mounted(){
        this.initMapBox()
    },
    destroyed(){
        this.MapBoxObject.remove()
        this.AfterMapObject.remove()
        this.BeforeMapObject.remove()
    },
	components:{
		Loading
	},
    methods: {
        initMapBox(){
            mapboxgl.accessToken = MAPBOXTOKEN
            mapboxgl.Compare = Compare
            this.BeforeMapObject = new mapboxgl.Map({
                container: 'beforeMap',
                style: 'mapbox://styles/mapbox/light-v10',
                ...mapconfig
            }).addControl(new MapboxLanguage({defaultLanguage: 'zh-Hant'}))
            this.AfterMapObject = new mapboxgl.Map({
                container: 'afterMap',
                style: 'mapbox://styles/mapbox/light-v10',
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
                    this.BeforeMapObject.addSource('taxi_app_heat', { type: 'geojson', data: res.data }).addLayer({
                        id: 'taxi_app_heat',
                        source: 'taxi_app_heat',
                        ...taxiAPPHeat
                    })
                })
            })
            this.AfterMapObject.on("load", () => {
                this.mapLoading = true
                axios.get(`${BASE_URL}/data/hailV2.geojson`).then(res => {
                    this.AfterMapObject.addSource('taxi_hail_heat', { type: 'geojson', data: res.data }).addLayer({
                        id: 'taxi_hail_heat',
                        source: 'taxi_hail_heat',
                        ...taxiHailHeat
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
<style lang="scss" scoped>
main{
    position: relative;
    width: calc(100% - 14rem);
    margin: 0 7rem;
}
.mapLegendBox{
    text-align: right;
    margin-bottom: 1rem;
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
    }
    .mapboxgl-canvas-container{
        height: 100%;
    }
    .mapboxgl-compare{
        background-color: #3887be;
    }
}
</style>