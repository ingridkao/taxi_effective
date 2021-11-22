<script setup>
	import Home from '@/views/Home.vue'
</script>

<template v-cloak>
	<Home/>
	<footer id="main_footer">
		<p>延伸連結：</p>
		<p>
			<a target="_blank" href="https://www.motc.gov.tw/uploaddowndoc?file=survey/202011040929120.pdf&filedisplay=202011040929120.pdf&flag=doc">計程車營運狀況調查報告</a>：中華民國交通部
		</p>
		<p>
			<a target="_blank" href="https://data.gov.tw/dataset/134597">計程車招呼站</a>：提供臺北市各行政區計程車招呼站相關資訊。
		</p>
		<p>相關新聞：</p>
		<p>
			<a target="_blank" href="https://news.ltn.com.tw/news/Taipei/paper/1427502">計程車招呼站 半數熱點無法設</a>
		</p>
		<p>
			<a target="_blank" href="https://news.pts.org.tw/article/510220">民眾叫車習慣改變 小黃招呼站使用率偏低</a>
		</p>
	</footer>
</template>

<style lang="scss">
[v-cloak] {
  display: none;
}
body{
	margin: 0;
	padding: 0;
	background: linear-gradient( to bottom, #a8d3d8, #2b383c 30% , #ada8d8 75%,  #c19a8e);
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#main_footer {
	position: relative;
	padding: 10%;
	background: #c19a8e;
	margin-top: 50vh;
	text-align: left;
	a{
		display: inline-block;
		font-weight: bold;
		color: #2c3e50;
		text-decoration: none;
		padding:0.5rem;
		&:hover{
			color: #222;
		}
	}
}
</style>
