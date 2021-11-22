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
					<router-link to="/" class="logoBox"><img :src="LOGO" alt="TUIC"></router-link>
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
					<p>據2019年底統計，北部地區(新北市、臺北市、桃園市、基隆市、宜蘭縣、新竹縣市)計程車登記<span class="vertialSuper">註</span>占比如下，個人營業者25.6%、運輸合作社26.2%、靠行計程車48.2%，目前僅有<b>部分的靠行計程車</b>有進行數據收集與管理。</p>
					<p>According to statistics at the end of 2017, there were 87,604 taxis in Taiwan, including 28,450 in Taipei City and 22,243 in New Taipei City, accounting for 57.9% of the country.</p>
					<SourcePieChart/>
					<div class="annotation">
						<p>註</p>
						<p>依據<a href="http://www.rootlaw.com.tw/LawArticle.aspx?LawID=A040110050000100-1060104&LawNO=3000&LawNO1=34000&LawNoOrder=2&ShowType=SectionArticle" target="_blank">公路法第34條</a>為落實計程車總量管制，避免過多人開車上路造成道路壅塞、空污，計程車客運業以小客車載客且必須掛牌營業。</p>
					</div>
					<!-- <div class="scroll-hint"/> -->
				</div>
			</div>
			<div class="step scrollama" data-step-no="3">
				<div>
					<p>從問卷調研發現，北部地區未加入車隊的司機主要以<b>巡迴攬客、招呼站、定點等候</b>為主，且其行為皆高於加入車隊之司機。</p>
					<JoinMotorcadeBarChart/>
				</div>
			</div>
			<div class="step scrollama" data-step-no="4">
				<div>
					<p>2009年至2017年臺北市的計程車數量減少了，但在2017年多元計程車加入台灣市場後近三年臺北市的計程車數持續上升，且靠行計程車的比例由57.8%上升至70.2% ，APP叫車的效率及方便性吸引許多司機加入，在台北近三年有22.4%的司機加入計程車行。</p>
					<TaxiHistoryChart/>
				</div>
			</div>
			<div class="step full scrollama" data-step-no="5" :class="{progress: currStepProgress > 0.5}">
				<div>
					<div>
						<p>為了取得計程車業者的起訖數據，透過交通局公共運輸處的合作與聯繫，我們取得了2019/12/2-2019/12/08一周的搭乘點位數據，提供數據之樣本車輛數約16,500輛，約占雙北計程車總數30%。</p>
					</div>
					<DiffMap/>
					<div>
						<p>左側地圖為電話、APP叫車的搭乘點位，而右側地圖為路邊攔車的搭乘點位；可明顯的發現<b>路邊攔車的熱區集中於主要幹道</b>，而電話、APP叫車的熱區的特性較分散，面對不同的使用搭乘行為、及營運模式，我們應該提出不同的解決方法。</p>
					</div>
				</div>
			</div>
			<div class="step scrollama" data-step-no="6">
				<div>
					<p>首先我們希望從路攔數據，來探討計程車招呼的設置與優化。</p>
					<p>2019年底截至目前，臺北市共設置了243處的計程車招呼站，目的在於讓計程車司機能夠在招呼站等候乘客，參照地圖我們可以看到計程車招呼站的設置點。</p>
					<div class="imgBox">
						<img src="https://img.ltn.com.tw/Upload/news/600/2012/09/25/135.jpg" alt="北市計程車招呼站設置地點多年未檢討，民權西路站外的排班點，依規定只能停六輛，但排班的車常超過兩倍。">
						<!-- <img :src="LOGO" alt="招呼站示意圖"> -->
					</div>
				</div>
			</div>
			<div class="step scrollama" data-step-no="7">
				<div>
					<p>將路邊攔車地理點位與既有的招呼站分離出來，我們發現既有的招呼站周邊80公尺的搭乘比僅例佔11%，非計程車招呼站的搭乘比卻高達89%。</p>
					<p>代表計程車招呼站的設置點，和實際搭乘的熱區仍然有落差，<button class="inlineButton" @click="pantTo">將地圖移動至圖片位置</button></p>
					
					<div class="imgBox">
						<img :src="desc1" alt="目前的招呼站設置與搭乘熱區有落差之示意圖">
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
					<p>最後排點出了100處熱區作為優先現勘評估是否招呼站設置的依據，點擊圖表任一路段即可將該路段移至地圖中央。</p>
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

import {hotspot} from '@/assets/js/topspot.js'
import LOGO from '@/assets/TUIC.svg'
import desc1 from '@/assets/desc1.png'

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
			desc1,
			currStep: null,
			currStepProgress: 0,
			activeTimeInterval: {},
			mapCenterData: {}
		};
	},
	components:{
		MapBox, DiffMap, TaiwanTaxiBarChart, TopSpotBarChart, SourcePieChart, JoinMotorcadeBarChart, TaxiHistoryChart
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
		},
		pantTo(){
			this.mapCenterData = {
				target: 'img',
				pos: {lng: 121.54644179218087, lat: 25.03973668018233}
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
				line-height: 1.8rem;
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
img{
	height: 100%;
}
.imgBox{
	display: inline-block;
	width: 100%;
	height: 17rem;
	overflow: hidden;
	box-sizing: border-box;
	padding: 1rem;
	text-align: center;
}
.logoBox{
	height: 2rem;
	text-align: left;
	img{
		filter: contrast(0);
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
	&.HistoryBox{
		height: 30rem;
	}
    &.scrollChart{
        overflow: scroll !important;
        height: calc(100vh - 19rem);
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
.vertialSuper{
    vertical-align: super;
    font-size: 50%;
	opacity: 0.5;
}
.inlineButton{
	display: inline-block;
    background: transparent;
    color: $textSubColor;
    border: none;
	border-bottom: 2px solid $textSubColor;
	font-size: 100%;
}
</style>
