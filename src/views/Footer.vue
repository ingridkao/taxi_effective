<template>
	<footer id="main_footer">
		<div class="tuicLogo">
			<a target="_blank" href="https://tuic.gov.taipei/">
				<img :src="tuic" alt="臺北大數據中心">
			</a>
		</div>
		<div>
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
		</div>
	</footer>
</template>
<script>
import tuic from '@/assets/img/tuic_logo.svg'
export default {
	data() {
		return {
			tuic
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
#main_footer {
	position: relative;
	text-align: left;
	background: rgba($titleColor, .9);
	color: $whiteColor;
	padding: 2rem 2rem 4rem 2rem;

	display: flex;
	justify-content: center;
	.tuicLogo{
		display: flex;
		align-items: center;
		border-right: 1px solid rgba($whiteColor, .6);
		padding-right: 5rem;
		margin-right: 5rem;
		img{
			width: 100%;
		}
	}
	h6{
		font-weight: normal;
		font-size: 1rem;
		margin: 2rem 0 0.5rem 0;
	}
	p{
		font-size: 0.875rem;
		margin-left: 2em;
	}
	a{
		color: $whiteColor;
		&:hover{
			color: $blueColor;
		}
	}
}
@media screen and (max-width:901px){
	#main_footer{
		flex-direction: column;
		.tuicLogo{
			border-right: none;
			padding-right: 0;
			margin-right: 0;
			width: 15rem;
		}

	}
}
</style>
