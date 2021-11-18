<template>
	<main id="homePage">
		<div class="container" :class="{hide: currStep == 0 || currStep == 5}">
			<MapBox 
				:curr-step='currStep' 
				:progress="currStepProgress" 
				:time-interval="activeTimeInterval"
				:update-center="mapCenterData"
				@update="updateActiveTimeInterval"
			/>
		</div>
		<div class="main__scrollama" ref="scrollama_container">
			<div class="step full landing" data-step-no="0">
				<div>
					<router-link to="/"><img :src="LOGO" alt="TUIC"></router-link>
					<h1>如何讓計程車在城市中更安全及有效率</h1>
					<h2>How to make taxi more effectively and safety in the city</h2>
				</div>
				<p>建議使用電腦開啟，來取得理想的互動效果</p>
			</div>
			<div class="step scrollama" data-step-no="1">
				<div>
					<p>據2019年底統計，台灣共有計程車91,898輛，其中臺北市31,554輛，新北市22,503輛，佔全國的58.8%。</p>
					<p>According to statistics at the end of 2019 , there were 87,604 taxis in Taiwan , including 31,554 in Taipei City and 22,503 in New Taipei City , accounting for 58.8% of the country.</p>
					<TaiwanTaxiBarChart/>
				</div>
			</div>
			<div class="step scrollama" data-step-no="2">
				<div>
					<p>據2019年底統計，北部地區(新北市、臺北市、桃園市、基隆市、宜蘭縣、新竹縣市)計程車登記占比如下，個人營業者25.6%、運輸合作社26.2%、靠行計程車隊48.2%，而目前僅有部分的靠行計程車隊有進行數據收集與管理。</p>
					<p>According to statistics at the end of 2017, there were 87,604 taxis in Taiwan, including 28,450 in Taipei City and 22,243 in New Taipei City, accounting for 57.9% of the country.</p>
					<SourcePieChart/>
					<!-- <div class="scroll-hint"/> -->
				</div>
			</div>
			<div class="step scrollama" data-step-no="3">
				<div>
					<p>從問卷調研發現，北部地區未加入車隊的司機主要以<b>巡迴攬客、招呼站、定點攬客</b>為主，且其行為皆高於加入車隊之司機。</p>
					<JoinMotorcadeBarChart/>
				</div>
			</div>
			<div class="step scrollama" data-step-no="4">
				<div>
					<p>2009年至2017年臺北市的計程車數量減少了，但在2017年多元計程車加入台灣市場後近三年臺北市的計程車數持續上升，且靠行車的比例由57.8%上升至70.2% ，APP叫車的效率及方便性吸引許多司機加入，在台北近三年有22.4%的司機加入計程車行。</p>
					<TaxiHistoryChart/>
					<!-- <HistoryLineChart @update="updateActiveTimeInterval"/> -->
					<!-- <p>
						點擊圖表上圓點與地圖互動。
						<span v-show="activeTimeInterval.category && activeTimeInterval.count">
							<button @click="activeTimeInterval = {}">Clear</button>
							篩選出{{activeTimeInterval.category}}事故有{{activeTimeInterval.count}}件。
						</span>
					</p> -->
					<!-- <div class="scroll-hint"/> -->
				</div>
			</div>
			<div class="step full scrollama" data-step-no="5" :class="{progress: currStepProgress > 0.5}">
				<div>
					<div>
						<p>為了取得計程車業者的起訖數據，透過交通局公共運輸處的合作與聯繫，我們取得了2019/12/2-2019/12/08一周的搭乘點位數據，提供數據之樣本車輛數約16,500輛，約占雙北計程車總數30%。</p>
						<p>可明顯的發現路攔的熱區集中於主要幹道(右)，而電召的熱區的特性較明顯，面對不同的使用搭乘行為、及營運模式，我們應該提出不同的解決方法。</p>
					</div>
					<!-- <DiffMap/> -->
					<div>
						<p>為了取得計程車業者的起訖數據，透過交通局公共運輸處的合作與聯繫，我們取得了2019/12/2-2019/12/08一周的搭乘點位數據，提供數據之樣本車輛數約16,500輛，約占雙北計程車總數30%。</p>
						<p>可明顯的發現路攔的熱區集中於主要幹道(右)，而電召的熱區的特性較明顯，面對不同的使用搭乘行為、及營運模式，我們應該提出不同的解決方法。</p>
					</div>
					<!-- <RoadTypeChart/> -->
				</div>
			</div>
			<div class="step scrollama" data-step-no="6">
				<div>
					<p>首先我們希望從路攔數據來探討，計程車招呼的設置與優化。</p>
					<p>至2019年底臺北市共243處的計程車招呼站，主要目的計程車司機能在招呼站牌排停等候客。</p>
					<div class="imgBox">
						<img :src="LOGO" alt="招呼站示意圖">
					</div>
				</div>
			</div>
			<div class="step scrollama" data-step-no="7">
				<div>
					<p>首先必續了解目前計程車招呼站的使用情形。疊合路攔點位與既有的招呼站位置，發現既有的招呼站周邊的搭乘比僅例佔11%，非計程車招呼站熱區佔89%。</p>
					<p>代表著計程車招呼站有實際的搭乘熱區有落差。</p>
					<div class="imgBox">
						<img :src="LOGO" alt="招呼站與搭乘熱區有落差示意圖">
					</div>
					<div class="annotation">
						<p>註1.</p>
						<p>因考慮定位飄移招呼站周圍搭乘半徑設定為80m。</p>
						<p>註2.</p>
						<p>本數據僅為車隊資料，無未加入車隊的個人業者資料。</p>
					</div>
				</div>
			</div>
			<div class="step scrollama" data-step-no="8">
				<div>
					<p>若要新設招呼站我們必須找到目前無設置招呼站的路段作為招呼站設置的建議。</p>
					<p>最後排點出了100處熱區作為優先現勘評估是否招呼站設置的依據。</p>
					<TopSpotBarChart @center="mapSetCenter"/>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import "intersection-observer"
import scrollama from "scrollama"
import MapBox from '@/components/maps/MapBox.vue'
import DiffMap from '@/components/maps/DiffMap.vue'
import TaiwanTaxiBarChart from '@/components/charts/TaiwanTaxiBarChart.vue'
import TopSpotBarChart from '@/components/charts/TopSpotBarChart.vue'
import SourcePieChart from '@/components/charts/SourcePieChart.vue'
import JoinMotorcadeBarChart from '@/components/charts/JoinMotorcadeBarChart.vue'
import TaxiHistoryChart from '@/components/charts/TaxiHistoryChart.vue'
import HistoryLineChart from '@/components/HistoryLineChart.vue'
import WeatherPieChart from '@/components/WeatherPieChart.vue'
import RoadTypeChart from '@/components/RoadTypeChart.vue'

import {sectionColor} from '@/assets/config/page-style.js'
import {hotspot} from '@/assets/js/topspot.js'
import LOGO from '@/assets/TUIC.svg'

export default {
	name: "HomePage",
	mounted () {
		this._scroller = scrollama()
		this.setup();
	},
	beforeDestroy() {
		this._scroller.destroy();
	},
	data() {
		return {
			LOGO,
			sectionColor,
			currStep: null,
			currStepProgress: 0,
			activeTimeInterval: {},
			mapCenterData: {}
		};
	},
	components:{
		MapBox, DiffMap, TaiwanTaxiBarChart, TopSpotBarChart, SourcePieChart, JoinMotorcadeBarChart, TaxiHistoryChart, HistoryLineChart, WeatherPieChart, RoadTypeChart
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
				// this.currStepProgress = (Math.floor(progress*100)/100)/2+0.5
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
		updateActiveTimeInterval(obj){
			this.activeTimeInterval = obj
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
$prvColor: red;
$whiteColor: #fff;
$blackColor: #262626;
$textMainColor: $blackColor;
$textSubColor: lighten($blackColor, 5);
.container{
	opacity: 1;
	transition-property: all;
	transition-duration: 3s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
}
.hide{
	visibility: hidden;
	opacity: 0;
}

.main__scrollama{
    position: relative;
	z-index: 1;
	width: 30%;
	max-width: 28rem;
	// pointer-events: none;
	.step {
		display: flex;
		width: 100%;
		height: 100vh;
		>div{
			position: relative;
			width: 100%;
			height: auto;
			text-align: left;
			b{
				border-bottom: 2px solid $prvColor;
			}
			p{
				color: $textSubColor;
				font-size: 1rem;
    			text-indent: 2rem;
				line-height: 1.5rem;
			}
			a{
				color: $textMainColor;
			}
			ul{
				color: $textSubColor;
				font-size: 0.7rem;
			}
			.annotation{
				position: absolute;
				bottom: 1rem;
				left: 0;
				padding: 1rem;
				p{
					font-size: 0.8rem;	
					margin: 0;
					text-indent: 0;
				}
			}
		}
		&.scrollama{
			>div{
				position: relative;
				background-color: rgb($whiteColor,0.8);
				box-shadow: 1px 1px 5px rgb($blackColor,0.5);
				margin: 10vh 0 0 2rem;
				padding: .5rem;
			}
		}
		&.full{
			width: 100vw;
			>div{
				margin: 10vh 0;
			}
		}
		&.landing{
			flex-direction: column;
			align-items: self-start;
			justify-content: space-around;
			padding: 2rem;
			color: darken($whiteColor, 25);
			background-color: $blackColor;
			> div{
				>*{
					display: block;
					margin: 0 0 0.2rem 0;
				}
			}
			a{
				width: 3rem;
				height: 3rem;
				margin: 1rem 0;
				img{
					height: 100%;
					filter: invert(100%);
				}
			}
			h1{
				color: $whiteColor;
				font-size: 1.55rem;
			}
			h2{
				font-size: 1rem;
			}
		}
	}
}

.imgBox{
	width: 100%;
	height: 15rem;
	overflow: hidden;
	box-sizing: border-box;
	padding: 1rem;
	text-align: center;
	img{
		height: 100%;
		filter: invert(1);
	}
}
@media screen and (max-width:1025px){   
	.main__scrollama{
		width: 100%;
		.step {
			// height: auto;
			>div{
    			width: 80%;
				margin: 4rem auto;
			}
		}
	}
}
ul{
	list-style-type: none;
	padding: 0;
}
.iconList{
	color: $textMainColor;
	&:before{
		content: '';
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		margin: 0 .5rem;
		border-radius: 50%;
		background: $textMainColor;
	}
	&.sun:before{
		background: #cab138;
	}
	&.cloud:before{
		background: #2ec7a5;
	}
	&.wind:before{
		background: #f1839c;
	}
	&.rain:before{
		background: #9fd7fd;
	}
	&.overrain:before{
		background: #38adff;
	}
}
.scroll-hint{
	width: 25px;
	height: 40px;
	background: transparent;
	border: 4px solid #5d5d5d;
	border-radius: 2em;
	position: relative;
	display: flex;
	justify-content: center;
	margin: 5rem auto 0;
	&:after{
		content: '';
		display: block;
		position: absolute;
		width: 4px;
		height: 4px;
		background: #5d5d5d;
		margin-top: 4px;
		border-radius: 1em;
		animation: scroll-hint 2400ms ease infinite;
	}
}
@keyframes scroll-hint {
	0%, 35% {opacity: 1;}
	15% {
		height: 12px;
		translateY: (15px);
	}
	50%, 100% {
		height: 4px;
		transform: translateY(40px);
		opacity: 0;
	}
}

.highchartsBox{
	height: 600px;
	&.highchartsPieBox{
		height: 25rem;
	}
    &.scrollChart{
        overflow: scroll !important;
        height: calc(100vh - 18rem);
    }
	.highcharts-background{
    	fill: rgb($whiteColor,0.5);
	}
	.highcharts-container text{
		fill: $textSubColor !important;
	}
	.seriesStyle{
		font-size: 0.7rem;
		margin: 0.25rem;
		color: lighten($textSubColor, 10);
	}
}
.highcharts-container text {
    fill: $textSubColor;
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
.tooltipBox{
    width: 15rem;
    >*{
        word-break: break-all;
        width: 15rem;
        white-space: normal;
        margin: 0;
        padding: 0;
    }
    h6{
        font-size: 0.9rem;
        color: $textMainColor;
    }
    p{
        font-size: 0.7rem;
        color: $textSubColor;
    }
}
</style>
