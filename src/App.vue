<script setup>
	import Home from '@/views/Home.vue'
</script>
<template v-cloak>
	<Home/>
	<footer id="main_footer">
		<h6>相關研究內容：</h6>
		<p>
			<a target="_blank" href="https://www-ws.gov.taipei/Download.ashx?u=LzAwMS9VcGxvYWQvMzkwL3JlbGZpbGUvMTk2OTQvODI1MzIzOC80ZWJlODkzMC1hM2JkLTQ0YjItYTgyNi1jZTNlMGQwYjE0N2MucGRm&n=MTA5MDkyNeS6pOmAmuacg%2bWgseacg%2bitsOizh%2baWmV8xMDnlubTnrKw55qyh5Lqk6YCa5pyD5aCx5pyD6K2w6LOH5paZdjEucGRm&icon=.pdf">臺北市政府交通會報</a>：應用計程車搭乘熱點大數據規劃合理的計程車排班方案
		</p>
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
	</footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500&display=swap&subset=chinese-traditional');
[v-cloak] {
  display: none;
}
#app {
	font-family: "Noto Sans TC", "Microsoft Yahei", "微軟雅黑", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $whiteColor;
	color: $blackColor;
}
#main_footer {
	position: relative;
	padding: 10vh;
	text-align: left;
	background: lighten($blackColor, 5);
	color: $whiteColor;
	h6{
		font-weight: normal;
	}
	a{
		color: $whiteColor;
		border-bottom: 1px solid $whiteColor;
		&:hover{
			color: $blackColor;
			border-color: $blackColor;
		}
	}
}
</style>
