<template>
    <main>
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

import mapStyle,{ taxiHeatStyle, taxiHailHeat } from '@/assets/config/mapbox-style.js'
import { MAPBOXTOKEN, BASE_URL, locations_center, initZoom, maxBound} from '@/assets/config/map-config.js'
import Loading from '@/components/Loading.vue'

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
            })
            this.AfterMapObject = new mapboxgl.Map({
                container: 'afterMap',
                style: 'mapbox://styles/mapbox/light-v10',
                ...mapconfig
            })
            const container = this.$refs.compareMapbox
            this.MapBoxObject = new mapboxgl.Compare(
                this.BeforeMapObject,
                this.AfterMapObject, 
                container, {
                    // mousemove: true, // Optional. Set to true to enable swiping during cursor movement.
                    orientation: 'vertical' // Optional. Sets the orientation of swiper to horizontal or vertical, defaults to vertical
                }
            )
            // Add zoom and rotation controls to the map.
            // this.MapBoxObject.addControl( new mapboxgl.NavigationControl() )
            this.AfterMapObject.addControl(new MapboxLanguage({defaultLanguage: 'zh-Hant'}))
            this.BeforeMapObject.on("load", () => {
                this.mapLoading = true
                const taxiDataReqyest = [
                    axios.get(`${BASE_URL}/data/taxi_app1.geojson`),
                    axios.get(`${BASE_URL}/data/taxi_app2.geojson`),
                    axios.get(`${BASE_URL}/data/taxi_app3.geojson`),
                    axios.get(`${BASE_URL}/data/taxi_app4.geojson`)
                ]
                axios.all(taxiDataReqyest).then(axios.spread((res0 ,res1, res2, res3) => {
                    this.BeforeMapObject.addSource('taxi_app_1_heat', { type: 'geojson', data: res0.data }).addLayer({id: 'taxi_app_1_heat',source: 'taxi_app_1_heat',...taxiHeatStyle})
                    this.BeforeMapObject.addSource('taxi_app_2_heat', { type: 'geojson', data: res1.data }).addLayer({id: 'taxi_app_2_heat',source: 'taxi_app_2_heat',...taxiHeatStyle})
                    this.BeforeMapObject.addSource('taxi_app_3_heat', { type: 'geojson', data: res2.data }).addLayer({id: 'taxi_app_3_heat',source: 'taxi_app_3_heat',...taxiHeatStyle})
                    this.BeforeMapObject.addSource('taxi_app_4_heat', { type: 'geojson', data: res3.data }).addLayer({id: 'taxi_app_4_heat',source: 'taxi_app_4_heat',...taxiHeatStyle})
                    // console.log('BeforeMapObject load');
                }))
            })
            this.AfterMapObject.on("load", () => {
                this.mapLoading = true
                this.AfterMapObject.on("click", (event) => {
                    // console.log( this.AfterMapObject.getCenter())
                    // console.log( this.AfterMapObject.getZoom())
                })
                axios.get(`${BASE_URL}/data/taxi_hail.geojson`).then(res => {
                    this.AfterMapObject.addSource('taxi_hail_heat', { type: 'geojson', data: res.data }).addLayer(taxiHailHeat)
                })
            })
            this.BeforeMapObject.on('idle', () => {
                this.mapLoading = false
                // console.log('BeforeMapObject idle');
            })
            this.AfterMapObject.on('idle', () => {
                this.mapLoading = false
                // console.log('AfterMapObject idle');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.compareMapbox{
    position: relative;
    width: 90%;
    height: 60vh;
    margin: 0 5%;
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
}
</style>