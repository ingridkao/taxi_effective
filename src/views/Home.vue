<template>
	<main id="homePage">
		<div class="main__scrollama" ref="scrollama_container">
			<div class="step scrollama" data-step-no="1">
				<div>
					<p>據2019年底統計，台灣共有計程車91,898輛，其中臺北市31,554輛，新北市22,503輛，佔全國的58.8%。</p>
					<!-- <p>According to statistics at the end of 2019 , there were 87,604 taxis in Taiwan , including 31,554 in Taipei City and 22,503 in New Taipei City , accounting for 58.8% of the country.</p> -->
					<TaiwanTaxiBarChart/>
				</div>
			</div>
			<div class="step scrollama" data-step-no="2">
				<div>
					<h6>計程車登記佔比</h6>
					<p>據2019年底統計，北部地區(新北市、臺北市、桃園市、基隆市、宜蘭縣、新竹縣市)計程車登記<span class="vertialSuper">註</span>占比如下，個人營業者25.6%、運輸合作社26.2%、靠行計程車48.2%，目前僅有<b>部分的靠行計程車</b>有進行數據收集與管理。</p>
					<!-- <p>According to statistics at the end of 2017, there were 87,604 taxis in Taiwan, including 28,450 in Taipei City and 22,243 in New Taipei City, accounting for 57.9% of the country.</p> -->
					<SourcePieChart/>
					<div class="annotation">
						<p>註.</p>
						<p>依據<a href="http://www.rootlaw.com.tw/LawArticle.aspx?LawID=A040110050000100-1060104&LawNO=3000&LawNO1=34000&LawNoOrder=2&ShowType=SectionArticle" target="_blank">公路法第34條</a>為落實計程車總量管制，避免過多人開車上路造成道路壅塞、空污，計程車客運業以小客車載客且必須掛牌營業。</p>
					</div>
				</div>
			</div>
			<div class="step scrollama full" data-step-no="3">
				<div class="columnBox">
					<div>
						<h6>計程車司機行為</h6>
						<p>從問卷調研發現，北部地區未加入車隊的司機主要以<b>巡迴攬客、招呼站、定點等候</b>為主，且其行為皆高於加入車隊之司機。</p>
						<JoinMotorcadeBarChart/>
					</div>
					<div>
						<p>2009年至2017年臺北市的計程車數量減少了，但在2017年多元計程車加入台灣市場後近三年臺北市的計程車數持續上升，且靠行計程車的比例由57.8%上升至70.2% ，APP叫車的效率及方便性吸引許多司機加入，在台北近三年有22.4%的司機加入計程車行。</p>
						<TaxiHistoryChart/>
					</div>
				</div>
			</div>
			<div class="step scrollama full" data-step-no="4" :class="{progress: currStepProgress > 0.5}">
				<div>
					<div class="columnBox">
						<div>
							<h6>乘客搭乘行為觀察</h6>
							<p>為了取得計程車業者的起訖數據，透過交通局公共運輸處的合作與聯繫，我們取得了2019/12/2-2019/12/08一周的搭乘點位數據，提供數據之樣本車輛數約16,500輛，約占雙北計程車總數30%。</p>
							<p>可明顯的發現<b>路邊攔車的熱區集中於主要幹道，而電話、APP叫車的熱區的特性較明顯</b>，面對不同的使用搭乘行為、及營運模式，我們應該提出不同的解決方法。</p>
						</div>
					</div>
					<DiffMap/>
				</div>
			</div>
			<div class="step scrollama" data-step-no="5">
				<div>
					<h6>計程車招呼站設置優化</h6>
					<p class="help">增加敘述：為什麼要從計程車招呼站設置著手</p>
					<p>首先我們從路邊攔車數據，來探討計程車招呼站的設置與優化。</p>
					<p>2019年底截至目前，臺北市共設置了243處的計程車招呼站，目的在於讓計程車司機能夠在招呼站等候乘客。</p>
					
					<div class="imgBox">
						<img src="https://s.yimg.com/ny/api/res/1.2/2BOsxKe_WCXXQjVPSCCEfA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtjZj13ZWJw/https://media.zenfs.com/ko/news_tvbs_com_tw_938/8a62052a4145431d1708324572eee962" alt="北市計程車招呼站設置地點多年未檢討，民權西路站外的排班點，依規定只能停六輛，但排班的車常超過兩倍。">
					</div>
					<div class="mapLegendBox">
						<div class="blue">路邊攔車的搭乘熱區</div>
						<div class="taxiStationLegend">計程車招呼站設置點</div>
					</div>
				</div>
			</div>
			<div class="step scrollama" data-step-no="6">
				<div>
					<h6>招呼站設置點與實際搭乘熱區之關係</h6>
					<p>將路邊攔車地理點位與既有的招呼站分離出來，我們發現既有的招呼站周邊80公尺的搭乘比僅例佔11%，非計程車招呼站的搭乘比卻高達89%。</p>
					<p>代表計程車招呼站的設置點，和實際搭乘的熱區仍然有落差。</p>
					<div class="mapLegendBox">
						<div class="blue">路邊攔車的搭乘熱區 <button class="toggleLayerBtn" @click="hailLayer = !hailLayer">{{hailLayer?'open': 'close'}}</button></div>
						<div class="red">非招呼站的攔車熱區  <button class="toggleLayerBtn" @click="hailNonstationLayer = !hailNonstationLayer">{{hailNonstationLayer?'open': 'close'}}</button></div>
						<div class="taxiStationLegend">計程車招呼站設置點</div>
					</div>
					<div class="annotation">
						<p>註1.</p>
						<p>因考慮定位飄移招呼站周圍搭乘半徑設定為80m。</p>
						<p>註2.</p>
						<p>本數據僅為車隊資料，無未加入車隊的個人業者資料。</p>
					</div>
				</div>
			</div>
			<div class="step scrollama" data-step-no="7">
				<div>
					<h6>數據分析後盤點100處熱區</h6>
					<p>若要新設招呼站我們必須找到目前無設置招呼站的路段作為招呼站設置的建議。</p>
					<p>最後排點出了100處熱區作為優先現勘評估是否招呼站設置的依據，點擊圖表任一路段即可將該路段移至地圖中央。</p>
					<TopSpotBarChart @center="mapSetCenter"/>
				</div>
			</div>
			<div class="step scrollama" data-step-no="8">
				<div class="help">結論...</div>
			</div>
		</div>
		<div class="map_container" :class="{hide: currStep == '' || currStep == 3 || currStep == 4}">
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

import TaiwanTaxiBarChart from '@/components/charts/TaiwanTaxiBarChart.vue'
import TopSpotBarChart from '@/components/charts/TopSpotBarChart.vue'
import SourcePieChart from '@/components/charts/SourcePieChart.vue'
import JoinMotorcadeBarChart from '@/components/charts/JoinMotorcadeBarChart.vue'
import TaxiHistoryChart from '@/components/charts/TaxiHistoryChart.vue'

import {hotspot} from '@/assets/js/topspot.js'

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
			currStep: null,
			currStepProgress: 0,
			mapCenterData: {},
			hailLayer: true,
			hailNonstationLayer: true
		}
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
$whiteColor: #fff;
$titleColor: #000;
$blackColor: #262626;
$textMainColor: $blackColor;
$textSubColor: lighten($blackColor, 5);
$asideWidth : 30rem;
#homePage{
	.main__scrollama{
		position: relative;
		width: $asideWidth;
		z-index: 1;
	}
	.map_container{
		position: fixed;
		width: calc(100vw - #{$asideWidth});
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
}
.main__scrollama{
	.step {
		display: flex;
		width: 100%;
		height: 100vh;
		>div{
			position: relative;
    		box-sizing: border-box;
			width: 100%;
			height: auto;
			padding: 2rem;
			background-color: $whiteColor;
			color: $textSubColor;
			h6{
				color: $titleColor;
			}
			a{
				color: $textMainColor;
			}
			.annotation{
				margin-top: 5rem;
				p{
					font-size: 0.8rem;	
					text-indent: 0;
				}
			}
		}
		&.full{
			width: 100vw;
			>div{
				width: 100%;
				padding: 3rem 1rem;
			}
		}
		&.landing{
			// position: relative;
			flex-direction: column;
			align-items: self-start;
			justify-content: space-around;
			padding: 0 2rem;
			color: darken($whiteColor, 25);
			background-color: $blackColor;
			// .bg{
			// 	position: absolute;
			// 	width: 100%;
			// 	height: 100%;
			// 	
			// 	background-image: url('~@/assets/card_background_taxi@2x.png');
			// 	background-repeat: no-repeat;
			// 	background-size: cover;
			// 	top: 0;
			// 	left: 0;
			// }
			> div{
				>*{
					display: block;
					margin: 0 0 0.2rem 0;
				}
			}
			>footer{
				width: 100%;
				height: 3rem;
				text-align: center;
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
			}

		}
	}
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
	display: inline-block;
	height: 2rem;
	text-align: left;
	img{
		filter: contrast(0);
	}
}
button{
	outline: 0;
	cursor: pointer;
}
.toggleLayerBtn{
	border-radius: 1rem;
	border: 2px solid #ddd;
	&:hover{
		border-color: #999;
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
	height: calc(100vh - 20rem);
	&.highchartsPieBox{
		height: 14rem;
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
