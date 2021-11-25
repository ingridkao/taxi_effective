<script setup>
	import Header from '@/views/Header.vue'
	import Home from '@/views/Home.vue'
</script>

<template v-cloak>
	<Header/>
	<Home/>
	<footer id="main_footer">
		<h6>延伸連結：</h6>
		<p>
			<a target="_blank" href="https://www.motc.gov.tw/uploaddowndoc?file=survey/202011040929120.pdf&filedisplay=202011040929120.pdf&flag=doc">計程車營運狀況調查報告</a>：中華民國交通部
		</p>
		<p>
			<a target="_blank" href="https://data.gov.tw/dataset/134597">計程車招呼站</a>：提供臺北市各行政區計程車招呼站相關資訊。
		</p>
		<h6>相關新聞：</h6>
		<p>
			<a target="_blank" href="https://news.ltn.com.tw/news/Taipei/paper/1427502">計程車招呼站 半數熱點無法設</a>
		</p>
		<p>
			<a target="_blank" href="https://news.pts.org.tw/article/510220">民眾叫車習慣改變 小黃招呼站使用率偏低</a>
		</p>
		<!-- <div></div> -->
	</footer>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500&display=swap&subset=chinese-traditional');
[v-cloak] {
  display: none;
}
body{
	margin: 0;
	padding: 0;
}
#app {
	font-family: "Noto Sans TC", "Microsoft Yahei", "微軟雅黑", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: #F9F9F9;
	color: #2c3e50;
}
#main_footer {
	position: relative;
	padding: 10vh;
	text-align: left;
	background: #555;
	color: #ddd;
	h6{
		font-weight: normal;
	}
	p{
		text-indent: 2rem;
	}
	a{
		display: inline-block;
		padding: 0;
		color: #ddd;
		border-bottom: 1px solid #ddd;
		text-decoration: none;
		text-indent: 0;
		&:hover{
			color: #F9F9F9;
			border-color: #F9F9F9;
		}
	}
}
.hide{
	visibility: hidden;
	opacity: 0;
}
.columnBox{
	display: grid;
	grid-auto-columns: 50%;
	grid-auto-flow: column;
	grid-gap: 1rem;	
	>*{
		max-width: 30em;
		margin: 0 auto;
		padding: 2rem;
	}
}
img{
	height: 100%;
}
b{
	font-weight: bolder;
}
h1{
	font-size: 1.55rem;
}
h2{
	font-size: 1rem;
}
h6{
	font-size: 1.3rem;
	margin: 0 0 1rem 0;
}
p{
	font-size: 1rem;
	text-indent: 2rem;
	line-height: 1.8rem;
	margin: 0 0 1rem 0;
}
.mapLegendBox{
    >div{
        display: inline-block;
        position: relative;
        width: auto;
        font-size: .8rem;
        margin: 0 1rem;
        &:before {
            content: "";
            width: 0.8rem;
            height: 0.8rem;
            position: absolute;
            left: -1rem;
            top: 0.2rem;
        }
        &.yellow:before{
            background: #f5df3d;
        }
        &.blue:before{
            background: #85a3e0;
        }
        &.red:before{
            background: #ff6347;
        }
        &.taxiStationLegend:before{
            background: #eccbcb;
			border-radius: 50%;
        }
    }
}
.help{
	color: rgb(141, 97, 106) !important;
}
</style>
