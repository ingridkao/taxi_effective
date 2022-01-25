<template>
	<main id="homePage">
		<div class="main__scrollama">
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
					<div class="">
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
			<div class="scrollama full progress" data-step-no="4">
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
				<div class="mapGifBox">GIF - 招呼站設置點與路邊攔車搭乘熱區之關係</div>
			</div>
			<div class="scrollama" data-step-no="6">
				<div class="contextbox">
					<h6>招呼站設置點與實際搭乘熱區之關係</h6>
					<p>將路邊攔車地理點位與既有的招呼站分離出來，我們發現既有的招呼站周邊80公尺的搭乘比僅例佔11%，非計程車招呼站的搭乘比卻高達89%。</p>
					<p>代表計程車招呼站的設置點，和實際搭乘的熱區仍然有落差。</p>
					<div class="mapLegendBox">
						<div class="blue"><span>路邊攔車的搭乘熱區</span></div>
						<div class="red"><span>非招呼站的攔車熱區</span></div>
						<div class="taxiStationLegend">計程車招呼站設置點</div>
					</div>
					<div class="annotation">
						<p>註1. 因考慮定位飄移招呼站周圍搭乘半徑設定為80m。</p>
						<p>註2. 本數據僅為車隊資料，無未加入車隊的個人業者資料。</p>
					</div>
				</div>
				<div class="mapGifBox">GIF - 招呼站設置點與實際搭乘熱區之關係</div>
			</div>
			<div class="scrollama" data-step-no="7">
				<div class="contextbox">
					<h6>數據分析後盤點100處熱區</h6>
					<p>若要新設招呼站我們必須找到目前<b>無設置招呼站的路段</b>作為招呼站設置的建議。</p>
					<p>最後排點出了100處熱區作為優先現勘評估是否招呼站設置的依據。</p>
					<div class="mapLegendBox">
						<div class="hotspot100Legend">100處熱區路段</div>
						<div class="taxiStationLegend">計程車招呼站設置點</div>
					</div>
					<TopSpotBarChart @center="mapSetCenter"/>
				</div>
				<div class="mapGifBox">GIF - 100處熱區</div>
			</div>
			<div class="scrollama" data-step-no="8">
				<div class="contextbox">
					<h6>結論</h6>
					<p>透過數據了解需求是設置招呼站的第一步，再實際的業務上招呼站的設置，路幅要足夠、參考道路流量以及是否造成店家被阻擋，且最後需要當地居民的同意，數據可以作為輔助決策的參考依據而實際的執行還是需要多方的考量才能落實。</p>
					<p>另外我們後續也針對電召(APP叫車)的數據進行了分析，並結合了公有停車場的資料與交通局共同探討了停車場是否可以作為計程車暫時的停等空間，相關的研究成果也於<a target="_blank" href="https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvMzkwL3JlbGZpbGUvMTk2OTQvODI1MzIzOC80ZWJlODkzMC1hM2JkLTQ0YjItYTgyNi1jZTNlMGQwYjE0N2MucGRm&n=MTA5MDkyNeS6pOmAmuacg%2bWgseacg%2bitsOizh%2baWmV8xMDnlubTnrKw55qyh5Lqk6YCa5pyD5aCx5pyD6K2w6LOH5paZdjEucGRm&icon=.pdf">2020年第九次交通會報</a>上報告。</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import Header from '@/views/Header.vue'
import DiffMap from '@/components/maps/DiffMap.vue'

import TaiwanTaxiBarChart from '@/components/charts/TaiwanTaxiBarChart.vue'
import TopSpotBarChart from '@/components/charts/TopSpotBarChart.vue'
import SourcePieChart from '@/components/charts/SourcePieChart.vue'
import JoinMotorcadeBarChart from '@/components/charts/JoinMotorcadeBarChart.vue'
import TaxiHistoryChart from '@/components/charts/TaxiHistoryChart.vue'

import ratioImg from '@/assets/img/ratio.jpeg'
import stationImg from '@/assets/img/station.jpeg'

export default {
	name: "HomePage",
	data() {
		return {
			mapCenterData: {},
			ratioImg,
			stationImg
		}
	},
	components:{
		DiffMap, Header,TaiwanTaxiBarChart, TopSpotBarChart, SourcePieChart, JoinMotorcadeBarChart, TaxiHistoryChart
	},
	methods: {
		mapSetCenter(e){}
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/home.scss';
@media screen and (max-width:501px){
	.highchartsBox{
		&.taiwanTaxiBar,
		&.joinMotorcade,
		&.taxiHistory{
			@include scrollbar_style;
			overflow: scroll !important;
			width: 100%;
			height: 32rem;
		}
		&.highchartsPieBox{
			height: 16rem;
		}
		&.scrollChart{
			height: 25.5rem;
		}
	}
	.main__scrollama{
		width: 100%;
	}
	.scrollama{
		background-color: $whiteColor;
		flex-direction: column;
		&.full .imgBox{
			text-align: center;
		}
		.contextbox{
			height: 100%;
			padding: 3rem 1.5rem 0 1.5rem;
			.annotation{
				margin-top: 2.5rem;
			}
			> * {
				max-width: none !important;
				width: 100%;
			}
		}
		&[data-step-no="1"]{
			height: 45rem;
		}
		&[data-step-no="2"]{
			height: 55rem;
		}
		&[data-step-no="3"]{
			height: 96rem;
		}
		&[data-step-no="4"]{
			height: calc(75vh + 20rem);
			.compareMapbox{
				height: 75vh;
			}
			.columnBox{
				display: block;
				height: auto;
				padding-bottom: 1rem;
			}
		}
		&[data-step-no="5"],
		&[data-step-no="6"],
		&[data-step-no="7"]{
			background-color: transparent;
			.contextbox{
				margin: 0;
				background-color: $whiteColor;
			}
			.mapGifBox{
				height: 75vh;
			}
		}
		&[data-step-no="5"]{
			height: calc(75vh + 38rem);
			.contextbox{
				height: 38rem;
			}
		}
		&[data-step-no="6"]{
			height: calc(75vh + 30rem);
			.contextbox{
				height: 30rem;
			}
		}
		&[data-step-no="7"]{
			height: calc(75vh + 46rem);
			.contextbox{
				height: 46rem;
			}
		}
		&[data-step-no="8"]{
			height: 30rem;
		}
	}
	.columnBox{
		grid-auto-columns: 100%;
		grid-auto-flow: row;
		grid-gap: initial;
	}
}
</style>
