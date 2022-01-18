<template>
	<main id="homePage">
		<div class="main__scrollama" ref="scrollama_container">
			<div class="scrollama headerWrapper" data-step-no="0">
				<Header/>
			</div>
			<div class="scrollama" data-step-no="1">
				<div class="contextbox">
					<h6>各縣市計程車營業登記數量</h6>
					<p>據2019年底統計，台灣共有計程車91,898輛，其中臺北市31,554輛，新北市22,503輛，佔全國的58.8%。</p>
					<TaiwanTaxiBarChart/>
					<div class="source">資料來源:交通部統計處</div>
				</div>
			</div>
			<div class="scrollama full" data-step-no="2">
				<div class="contextbox columnBox">
					<div>
						<h6>計程車營業登記佔比</h6>
						<div class="imgBox">
							<img :src="ratioImg" alt="北市計程車">
						</div>
						<p>據2019年底統計，北部地區(新北市、臺北市、桃園市、基隆市、宜蘭縣、新竹縣市)計程車登記<span class="vertialSuper">註</span>占比如下，個人營業者25.6%、運輸合作社26.2%、計程車隊48.2%，而目前僅有部分的計程車隊有進行搭乘數據收集與管理。</p>
						<div class="source">資料來源交通部統計處</div>
					</div>
					<div class="chartBox">
						<SourcePieChart/>
						<div class="annotation">
							<p>註. 依據<a href="http://www.rootlaw.com.tw/LawArticle.aspx?LawID=A040110050000100-1060104&LawNO=3000&LawNO1=34000&LawNoOrder=2&ShowType=SectionArticle" target="_blank">公路法第34條</a>為落實計程車總量管制，避免過多人開車上路造成道路壅塞、空污，計程車客運業以小客車載客且必須掛牌營業。</p>
						</div>
					</div>
				</div>
			</div>
			<div class="scrollama full" data-step-no="3">
				<div class="contextbox columnBox">
					<div>
						<h6>計程車司機載客行為</h6>
						<p>從交通部問卷調研發現，未加入車隊的司機主要以<b>巡迴攬客、招呼站、定點攬客</b>為主。而加入車隊的司機使用網路工具及無線電衛星派車的行為較高。</p>
						<JoinMotorcadeBarChart/>
						<div class="source">資料來源:交通部統計處</div>
					</div>
					<div>
						<h6>臺北市計程車營業登記類型變化</h6>
						<p>2009年至2017年臺北市的計程車數量減少了3300輛，但在2017年數位叫車平台(多元計程車)加入台灣市場後，近三年臺北市的計程車數持續上升，且加入計程車隊的比例由<b>57.8%上升至70.2%</b> ，因數位叫車平台的效率及方便性吸引許多司機加入，在台北近三年有22.4%的司機加入計程車隊。</p>
						<TaxiHistoryChart/>
						<div class="source">資料來源:臺北市政府交通局</div>
					</div>
				</div>
			</div>
			<div class="scrollama full" data-step-no="4" :class="{progress: currStepProgress > 0.5}">
				<DiffMap/>
			</div>
			<div class="scrollama" data-step-no="5">
				<div class="contextbox">
					<h6>計程車招呼站設置優化</h6>
					<p>至2019年底臺北市共243處的計程車招呼站，主要目的計程車司機能在招呼站牌排停等候客。</p>
					<p>因應交通局的招呼站設置需求，首先我們從路攔數據來探討計程車招呼的設置，藉由路攔的熱區作為後續招呼站設置的依據。</p>
					<div class="imgBox">
						<img :src="stationImg" alt="北市計程車招呼站設置地點多年未檢討，民權西路站外的排班點，依規定只能停六輛，但排班的車常超過兩倍。">
					</div>
					<div class="mapLegendBox">
						<div class="blue"><span>路邊攔車的搭乘熱區</span></div>
						<div class="taxiStationLegend"><span>計程車招呼站設置點</span></div>
					</div>
				</div>
			</div>
			<div class="scrollama" data-step-no="6">
				<div class="contextbox">
					<h6>招呼站設置點與實際搭乘熱區之關係</h6>
					<p>將路邊攔車地理點位與既有的招呼站分離出來，我們發現既有的招呼站周邊80公尺的搭乘比僅例佔11%，非計程車招呼站的搭乘比卻高達89%。</p>
					<p>代表計程車招呼站的設置點，和實際搭乘的熱區仍然有落差。</p>
					<div class="mapLegendBox">
						<div class="blue"><span>路邊攔車的搭乘熱區</span> <button class="toggleLayerBtn" @click="hailLayer = !hailLayer">{{hailLayer?'open': 'close'}}</button></div>
						<div class="red"><span>非招呼站的攔車熱區</span>  <button class="toggleLayerBtn" @click="hailNonstationLayer = !hailNonstationLayer">{{hailNonstationLayer?'open': 'close'}}</button></div>
						<div class="taxiStationLegend">計程車招呼站設置點</div>
					</div>
					<div class="annotation">
						<p>註1. 因考慮定位飄移招呼站周圍搭乘半徑設定為80m。</p>
						<p>註2. 本數據僅為車隊資料，無未加入車隊的個人業者資料。</p>
					</div>
				</div>
			</div>
			<div class="scrollama" data-step-no="7">
				<div class="contextbox">
					<h6>數據分析後盤點100處熱區</h6>
					<p>若要新設招呼站我們必須找到目前無設置招呼站的路段作為招呼站設置的建議。</p>
					<p>最後排點出了100處熱區作為優先現勘評估是否招呼站設置的依據，點擊圖表任一路段即可將該路段移至地圖中央。</p>
					<TopSpotBarChart @center="mapSetCenter"/>
				</div>
			</div>
			<div class="scrollama" data-step-no="8">
				<div class="contextbox">
					<h6>結論</h6>
					<p>透過數據了解需求是設置招呼站的第一步，再實際的業務上招呼站的設置，路幅要足夠、參考道路流量以及是否造成店家被阻擋，且最後需要當地居民的同意，數據可以作為輔助決策的參考依據而實際的執行還是需要多方的考量才能落實。</p>
					<p>另外我們後續也針對電召(APP叫車)的數據進行了分析，並結合了公有停車場的資料與交通局共同探討了停車場是否可以作為計程車暫時的停等空間，相關的研究成果也於<a target="_blank" href="https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvMzkwL3JlbGZpbGUvMTk2OTQvODI1MzIzOC80ZWJlODkzMC1hM2JkLTQ0YjItYTgyNi1jZTNlMGQwYjE0N2MucGRm&n=MTA5MDkyNeS6pOmAmuacg%2bWgseacg%2bitsOizh%2baWmV8xMDnlubTnrKw55qyh5Lqk6YCa5pyD5aCx5pyD6K2w6LOH5paZdjEucGRm&icon=.pdf">2020年第九次交通會報</a>上報告。</p>
				</div>
			</div>
		</div>
		<div class="map_container" :class="{hide: currStep == 0 || currStep == 3 || currStep == 4}">
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
@import '@/assets/scss/main.scss';
#homePage{
	width: 100vw;
}
.main__scrollama{
	position: relative;
	width: $asideWidth;
	z-index: 1;
	.scrollama {
		display: flex;
		width: 100%;
		height: 100vh;
		background-color: $whiteColor;
		color: $textSubColor;
		&.headerWrapper{
			width: 100vw;
		}
		h6{
			color: $titleColor;
		}
		a{
			color: $blackColor;
		}
	}
	.full{
		width: 100vw;
		.imgBox{
			height: 20em;
			margin-bottom: 1rem;
			padding: 0;
			text-align: left;
		}
		.chartbox > *{
			width: 100%;
		}
		.columnBox >*,
		.highchartsBox.highchartsPieBox{
			max-width: 30vw;
		}
	}
}

.map_container{
	position: fixed;
	width: calc(100% - #{$asideWidth});
	height: 100vh;
	top: 0;
	left: $asideWidth;
	opacity: 1;
	z-index: 0;
	transition-property: all;
	transition-duration: 3s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
}

.toggleLayerBtn{
	border-radius: 1rem;
	border: 2px solid $whiteColor;
	&:hover{
		border-color: darken($whiteColor, 10);
	}
}

.highchartsBox{
	height: calc(100vh - 20rem);
	&.highchartsPieBox{
		width: 100%;
		max-width: $asideWidth;
	}
	&.joinMotorcade{
		height: calc(100vh - 22.5rem);
		max-height: 47rem;
	}
	&.taxiHistory{
		height: calc(100vh - 26rem);
		max-height: 44.5rem;
	}
    &.scrollChart{
		@include scrollbar_style;
        height: calc(100vh - 19rem);
        overflow: scroll !important;
    }
	.highcharts-background{
    	fill: transparent;
	}
	.highcharts-container text{
		fill: $textSubColor !important;
	}
	.seriesStyle{
		font-size: 0.7rem;
		margin: 0.25rem;
		color: lighten($blackColor, 15);
	}
}

.highcharts-container text {
    fill: $textSubColor !important;
}

.highcharts-subtitle,
.highcharts-credits,
.highcharts-axis-title {
    fill-opacity: 0.7;
}
.highcharts-grid-line {
    stroke: $textSubColor;
    stroke-opacity: 0.2;
}
.highcharts-tooltip-box {
    fill: rgb($whiteColor,0.5);
}
.highcharts-column-series rect.highcharts-point {
    stroke: $whiteColor;
}
.path-stroke-transparent{
    path{
        stroke: transparent;
    }
}

.vertialSuper{
    vertical-align: super;
    font-size: 50%;
	opacity: 0.5;
}

@media screen and (max-width:501px){   
	.chartBox{
		height: 20rem;
	}
	.highchartsBox{
		@include scrollbar_style;
		height: calc(100vh - 12rem);
		overflow: scroll !important;
		&.highchartsPieBox,
		&.joinMotorcade,
		&.taxiHistory{
			width: 100%;
			height: 100%;
		}
	}
}

.inlineButton{
	display: inline-block;
    background: transparent;
    color: $textSubColor;
    border: none;
	border-bottom: 2px solid $textSubColor;
	font-size: 100%;
}
.source{
	text-align: right;
	font-size: 0.7rem;
	color: lighten($textSubColor, 20);
}
.columnBox{
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 48%;
	grid-gap: 2%;
	width: 100%;
	>*{
		max-width: $asideWidth;
		margin: 0 auto;
	}
	&.single{
		grid-auto-columns: 100%;
	}
}
@media screen and (max-width:501px){   
	.map_container{
		width: 100%;
		left: 0;
		filter: opacity(0.25);
	}
	.main__scrollama{
		width: 100%;
		.contextbox{
			height: 100%;
			padding: 10% 10% 0 10%;
			> * {
    			max-width: none;
				width: 100%;
			}
		}
		.scrollama{
			background-color: transparent;
			&[data-step-no="3"]{
				height: 300vh;
			}
			&[data-step-no="4"]{
				height: 100vh;
				.columnBox{
					display: block;
					height: auto;
					padding-bottom: 1rem;
				}
			}
			&[data-step-no="5"],
			&[data-step-no="6"],
			&[data-step-no="7"]{
				height: 200vh;
			}
			&[data-step-no="3"],
			&[data-step-no="4"],
			&[data-step-no="8"]{
				background-color: $whiteColor;
			}
		}
		.full{
			.imgBox{
				text-align: center;
				height: auto;
			}
		}
	}
	.columnBox{
		grid-auto-columns: 100%;
		grid-auto-flow: row;
		grid-gap: initial;
	}
}
</style>
