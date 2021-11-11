<template>
	<main id="homePage">
		<div class="container" :class="{hide: currStep == 0}">
			<MapBox 
				:curr-step='currStep' 
				:opacity="currStepProgress" 
				:time-interval="activeTimeInterval"
				@update="updateActiveTimeInterval"
			/>
		</div>
		<div class="main__scrollama" ref="scrollama_container">
			<div class="step" data-step-no="0">
				<h1>如何讓計程車在城市中更安全及有效率</h1>
				<h2>How to make taxi more effectively and safety in the city</h2>
				<p>
					title & video， 參考https://senseable.mit.edu/desirable-streets/
				</p>
				<p>建議使用電腦開啟，來取得理想的互動效果</p>
			</div>
			<div class="step" data-step-no="1">
				<div>
					<!-- <h6 :style="{color: sectionColor[0]}">01_Commute</h6> -->
					<p>據2019年底統計，台灣共有計程車91,898輛，其中臺北市31,554輛，新北市22,503輛，佔全國的58.8%。</p>
					<p>According to statistics at the end of 2019 , there were 87,604 taxis in Taiwan , including 31,554 in Taipei City and 22,503 in New Taipei City , accounting for 58.8% of the country.</p>
					<TaiwanTaxiBarChart/>
				</div>
			</div>
			<div class="step" data-step-no="2">
				<div>
					<!-- <h6 :style="{color: sectionColor[1]}">02_District</h6> -->
					<p>據2019年底統計，北部地區(新北市、臺北市、桃園市、基隆市、宜蘭縣、新竹縣市)計程車登記占比如下，個人營業者25.6%、運輸合作社26.2%、靠行計程車隊48.2%，而目前僅有部分的靠行計程車隊有進行數據收集與管理。</p>
					<p>According to statistics at the end of 2017, there were 87,604 taxis in Taiwan, including 28,450 in Taipei City and 22,243 in New Taipei City, accounting for 57.9% of the country.</p>
					<SourcePieChart/>
					<!-- <div class="scroll-hint"/> -->
				</div>
			</div>
			<div class="step" data-step-no="3">
				<div>
					<!-- <h6 :style="{color: sectionColor[2]}">03_Weather</h6> -->
					<p>從問卷調研發現，北部地區未加入車隊的司機主要以<b>巡迴攬客、招呼站、定點攬客</b>為主，且其行為皆高於加入車隊之司機。</p>
					<JoinMotorcadeBarChart/>
				</div>
			</div>
			<div class="step" data-step-no="4">
				<div>
					<!-- <h6 :style="{color: sectionColor[3]}">04_Season</h6> -->
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
			<div class="step" data-step-no="4">
				<div>
					<h6 :style="{color: sectionColor[4]}">05_Road</h6>
					<p>這幾次車禍的地點都在巷口或街口，對於自己的車輛保養及駕駛當下的注意力狀態需要再多注意，希望地方政府可以對路況妥善優化，像是車輛隨意臨停問題、巷弄的反射鏡髒污處理及架設。</p>
					<p>數據指出大部分的事故多發生在四岔路、直路及三岔路，事故嚴重程度區分為三種：</p>
					<ul>
						<li>Ａ１類指造成人員當場或二十四小時內死亡之交通事故</li>
						<li>Ａ２類指造成人員受傷或超過二十四小時死亡之交通事故</li>
						<li>Ａ３類指僅有車輛財物受損之交通事故</li>
					</ul>
					<RoadTypeChart/>
				</div>
			</div>
			<div class="step" data-step-no="5">
				<div>
					<h6 :style="{color: sectionColor[6]}">06_epilogue</h6>
					<p>由於數據中有車禍致死的欄位（24小時內死亡、2-30日內死亡），擷取這一部分數據並分類事故當下的交通類型，篩選出來的圖表如下圖，由於區域較窄建議可以點擊圖表下方的圖示，篩選出想要查看的車種。</p>
					<DeathCarTypeChart/>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import "intersection-observer"
import scrollama from "scrollama"
import MapBox from '@/components/maps/MapBox.vue'
// import MapBox from '@/components/maps/DiffMap.vue'
import TaiwanTaxiBarChart from '@/components/charts/TaiwanTaxiBarChart.vue'
import SourcePieChart from '@/components/charts/SourcePieChart.vue'
import JoinMotorcadeBarChart from '@/components/charts/JoinMotorcadeBarChart.vue'
import TaxiHistoryChart from '@/components/charts/TaxiHistoryChart.vue'
import HistoryLineChart from '@/components/HistoryLineChart.vue'
import WeatherPieChart from '@/components/WeatherPieChart.vue'
import RoadTypeChart from '@/components/RoadTypeChart.vue'
import DeathCarTypeChart from '@/components/DeathCarTypeChart.vue'

import {sectionColor} from '@/assets/config/page-style.js'

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
			sectionColor,
			currStep: null,
			currStepProgress: 0,
			activeTimeInterval: {}
		};
	},
	components:{
		MapBox, TaiwanTaxiBarChart, SourcePieChart, JoinMotorcadeBarChart, TaxiHistoryChart, HistoryLineChart, WeatherPieChart, RoadTypeChart, DeathCarTypeChart
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
				this.currStepProgress = (Math.floor(progress*100)/100)/2+0.5
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
		}
	}
}
</script>

<style lang="scss">
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
			background-color: rgb(50,50,50,0.8);
			box-shadow: 1px 1px 5px rgb(0,0,0,0.5);
			width: 100%;
			height: auto;
			margin: 10vh 0 0 2rem;
			padding: .5rem;
			text-align: left;
			h6{
				position: absolute;
				left: -2rem;
				bottom: 2.5rem;
				font-size: 2rem;
				color: #98a5b7;
				background: rgba(0,0,0,0.3);
				margin: 0;
				padding: 1rem 3rem;
			}
			b{
				color: rgb(153, 74, 74);
			}
			p{
				color: #afafaf;
				font-size: 1rem;
    			text-indent: 2rem;
				line-height: 1.5rem;
			}
			a{
				color: #ddd;
			}
			ul{
				color: #afafaf;
				font-size: 0.7rem;
			}
		}
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
				h6{
					position: relative;
					top: 0;
					padding: 1rem;
					font-size: 1rem;
				}
			}
		}
	}
}
ul{
	list-style-type: none;
	padding: 0;
}
.iconList{
	color: #ddd;
	&:before{
		content: '';
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		margin: 0 .5rem;
		border-radius: 50%;
		background: #ddd;
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
</style>
