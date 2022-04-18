<template>
	<main id="homePage">
		<div class="main__scrollama" ref="scrollama_container">
			<div class="scrollama headerWrapper" data-step-no="0">
				<Header :step="currStep"/>
			</div>
			<div class="scrollama" data-step-no="1">
				<div class="contextbox">
					<h6>{{$t('scrollama1.title')}}</h6>
					<p>{{$t('scrollama1.p')}}</p>
					<!-- <p>{{ $t('message.hi', { name: 'ttttt' }) }}</p> -->
					<TaiwanTaxiBarChart/>
					<div class="source">{{$t('scrollama1.source')}}</div>
				</div>
			</div>
			<div class="scrollama full" data-step-no="2">
				<div class="contextbox columnBox">
					<div>
						<h6>{{$t('scrollama2.title')}}</h6>
						<div class="imgBox">
							<img :src="ratioImg" :alt="$t('scrollama2.imgAlt')">
						</div>
						<p v-html="$t('scrollama2.p')"/>
						<div class="source">{{$t('scrollama1.source')}}</div>
					</div>
					<div class="chartBox">
						<SourcePieChart/>
						<div class="annotation">
							<p>
								{{$t('scrollama2.annotation1')}}
								<a href="http://www.rootlaw.com.tw/LawArticle.aspx?LawID=A040110050000100-1060104&LawNO=3000&LawNO1=34000&LawNoOrder=2&ShowType=SectionArticle" target="_blank" :title="$t('linkTo')">
									{{$t('scrollama2.annotation2')}}
								</a>
								{{$t('scrollama2.annotation3')}}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="scrollama full" data-step-no="3">
				<div class="contextbox columnBox">
					<div class="">
						<h6>{{$t('scrollama3.title1')}}</h6>
						<p v-html="$t('scrollama3.p1')"/>
						<JoinMotorcadeBarChart/>
						<div class="source">{{$t('scrollama1.source')}}</div>
					</div>
					<div>
						<h6>{{$t('scrollama3.title2')}}</h6>
						<p v-html="$t('scrollama3.p2')"/>
						<TaxiHistoryChart/>
						<div class="source">{{$t('scrollama3.source')}}</div>
					</div>
				</div>
			</div>
			<div class="scrollama full" data-step-no="4" :class="{progress: currStepProgress > 0.5}">
				<DiffMap/>
			</div>
			<div class="scrollama" data-step-no="5">
				<div class="contextbox">
					<h6>{{$t('scrollama5.title')}}</h6>
					<p>{{$t('scrollama5.p1')}}</p>
					<p>{{$t('scrollama5.p2')}}</p>
					<div class="imgBox">
						<img :src="stationImg" :alt="$t('scrollama5.imgBox')">
					</div>
					<div class="mapLegendBox">
						<div class="blue"><span>{{$t('scrollama5.heatZone')}}</span></div>
						<div class="taxiStationLegend"><span>{{$t('scrollama5.taxiStation')}}</span></div>
					</div>
				</div>
			</div>
			<div class="scrollama" data-step-no="6">
				<div class="contextbox">
					<h6>{{$t('scrollama6.title')}}</h6>
					<p>{{$t('scrollama6.p1')}}</p>
					<p>{{$t('scrollama6.p2')}}</p>
					<div class="mapLegendBox">
						<div class="blue">
							<span>{{$t('scrollama5.heatZone')}}</span>
							<button class="toggleLayerBtn" @click="hailLayer = !hailLayer">
								{{hailLayer?'open': 'close'}}
							</button>
						</div>
						<div class="red">
							<span>{{$t('scrollama5.nonStand')}}</span>
							<button class="toggleLayerBtn" @click="hailNonstationLayer = !hailNonstationLayer">
								{{hailNonstationLayer?'open': 'close'}}
							</button>
						</div>
						<div class="taxiStationLegend">{{$t('scrollama5.taxiStation')}}</div>
					</div>
					<div class="annotation">
						<p>{{$t('scrollama6.annotation1')}}</p>
						<p>{{$t('scrollama6.annotation2')}}</p>
					</div>
				</div>
			</div>
			<div class="scrollama" data-step-no="7">
				<div class="contextbox">
					<h6>{{$t('scrollama7.title')}}</h6>
					<p v-html="$t('scrollama7.p1')"/>
					<p>{{$t('scrollama7.p2')}}</p>
					<div class="mapLegendBox">
						<div class="hotspot100Legend">{{$t('scrollama7.hotspot100Legend')}}</div>
						<div class="taxiStationLegend">{{$t('scrollama5.taxiStation')}}</div>
					</div>
					<TopSpotBarChart @center="mapSetCenter"/>
				</div>
			</div>
			<div class="scrollama" data-step-no="8">
				<div class="contextbox">
					<h6>{{$t('scrollama8.title')}}</h6>
					<p>{{$t('scrollama8.p1')}}</p>
					<p>
						{{$t('scrollama8.p2')}}
						<a target="_blank" href="https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvMzkwL3JlbGZpbGUvMTk2OTQvODI1MzIzOC80ZWJlODkzMC1hM2JkLTQ0YjItYTgyNi1jZTNlMGQwYjE0N2MucGRm&n=MTA5MDkyNeS6pOmAmuacg%2bWgseacg%2bitsOizh%2baWmV8xMDnlubTnrKw55qyh5Lqk6YCa5pyD5aCx5pyD6K2w6LOH5paZdjEucGRm&icon=.pdf" :title="$t('linkTo')">
							{{$t('scrollama8.p3')}}
						</a>
						{{$t('scrollama8.p4')}}
					</p>
				</div>
			</div>
		</div>
		<div class="map_container" :class="{hide: mapContainerHide}">
			<MapBox 
				:curr-step='currStep' 
				:progress="currStepProgress" 
				:update-center="mapCenterData"
				:hail-layer='hailLayer'
				:hail-nonstation-layer='hailNonstationLayer'
			/>
		</div>
	</main>
</template>

<script>
import "intersection-observer"
import scrollama from "scrollama"
import MapBox from '@/components/maps/MapBox.vue'

import DiffMap from '@/components/maps/DiffMap.vue'
import Header from '@/views/Header.vue'

import TaiwanTaxiBarChart from '@/components/charts/TaiwanTaxiBarChart.vue'
import TopSpotBarChart from '@/components/charts/TopSpotBarChart.vue'
import SourcePieChart from '@/components/charts/SourcePieChart.vue'
import JoinMotorcadeBarChart from '@/components/charts/JoinMotorcadeBarChart.vue'
import TaxiHistoryChart from '@/components/charts/TaxiHistoryChart.vue'

import {hotspot} from '@/assets/js/topspot.js'
import ratioImg from '@/assets/img/ratio.jpeg'
import stationImg from '@/assets/img/station.jpeg'

export default {
	name: "HomePage",
	mounted () {
		this._scroller = scrollama()
		this.setup()
	},
	beforeDestroy() {
		this._scroller.destroy()
	},
	data() {
		return {
			currStep: '0',
			currStepProgress: 0,
			mapCenterData: {},
			hailLayer: true,
			hailNonstationLayer: true,
			ratioImg,
			stationImg
		}
	},
	components:{
		MapBox, DiffMap, Header,TaiwanTaxiBarChart, TopSpotBarChart, SourcePieChart, JoinMotorcadeBarChart, TaxiHistoryChart
	},
	computed: {
		opts() {
			return Object.assign({},  {
				step: Array.from(this.$refs.scrollama_container.childNodes),
				progress: true

			}, this.$attrs)
		},
		mapContainerHide() {
			return this.currStep == 0 || this.currStep == 3 || this.currStep == 4
		}
	},
	methods: {
		setup() {
			this._scroller.destroy()
			this._scroller
			.setup(this.opts)
			.onStepProgress(resp => {
				const {progress} = resp	
				this.currStepProgress = (Math.floor(progress*100)/100)/2
			})
			.onStepEnter(resp => {
				const {element} = resp
				this.currStep = element.dataset.stepNo
			})
			.onStepExit(resp => {
				const {element} = resp
				this.currStep = element.dataset.stepNo
			})
			window.addEventListener('resize', this.handleResize)
		},
		handleResize () {
			this._scroller.resize()
		},
		mapSetCenter(e){
			if(hotspot[e] && hotspot[e]['center']){
				const hotspotData = hotspot[e]
				this.mapCenterData = {
					target: hotspotData['序號'],
					pos: hotspotData['center']
				}
			}
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/home.scss';
</style>
