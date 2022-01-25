<template>
	<header id="HeaderPage" ref="headerPage">
		<keep-alive>
			<VideoPlayer id="videoWapper" v-if="!mobildDevice" :video-start="videoStart" @toggle="toggleVideoStatus"/>
		</keep-alive>
		<div id="contextWrapper">
			<div>
				<a :href="copyUrl" id="logoBox"><img :src="LOGO" alt="TUIC"></a>
				<div>
					<h1>讓計程車在城市中更安全及有效率</h1>
					<h2>Making taxi service safer and more effective</h2>
				</div>
			</div>
			<p v-if="mobildDevice">建議使用電腦來取得理想的地圖互動效果</p>
			<footer>
				<button id="scroll_button" @click="scrollTo()"/>
			</footer>
			<div id="buttonBox">
				<input type="hidden" id="webURL" :value="copyUrl">
				<button class="fbBtn" @click="shareToFb($event)"/>
				<button class="linkBtn" @click="copyURL($event)"/>
				<button v-if="!mobildDevice" :class="['videoBtn',videoStart? 'videoPause': 'videoStart']" @click="videoStart = !videoStart"/>
			</div>
		</div>
	</header>
</template>

<script>
import LOGO from '@/assets/TUIC.svg'
import VideoPlayer from "@/components/VideoPlayer.vue"
import MobileDetect from 'mobile-detect'
const mobileDetect = new MobileDetect(window.navigator.userAgent)
export default {
	name: "HeaderPage",
	components: {
		VideoPlayer
	},
	data() {
		return {
			LOGO,
			timeout: null,
			videoStart: false,
			copyUrl: '#',
			mobildDevice: mobileDetect.phone()? true: false
		}
	},
	beforeDestroy(){
		if(this.timeout){
			clearTimeout(this.timeout)
		}
	},
	mounted(){
		this.copyUrl = window.location.href
	},
    methods: {
        scrollTo(){
            const container = this.$refs.headerPage
			const containerTop = container.scrollHeight || container.clientHeight
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
			let count = scrollTop
            for( let i = scrollTop; i < containerTop; i++ ) {
                this.timeout = window.setTimeout(()=> {
                    count = count + 1
                    window.scrollTo({
                        top: count
                    })
                }, 0.5 * i)
            }
        },
        shareToFb(e){
            e.preventDefault()
            window.open(`http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.copyUrl)}`)
        },
        copyURL(e){
            e.preventDefault()
            if(window.innerWidth > 768){
				const webURLSelect = document.querySelector('#webURL')
				webURLSelect.setAttribute('type', 'text')
				webURLSelect.select()
                document.execCommand("copy")
				/* unselect the range */
				webURLSelect.setAttribute('type', 'hidden')
				window.getSelection().removeAllRanges()
            }else if (navigator.share) {
				navigator.share({
					title: '讓計程車在城市中更安全及有效率',
					text: '運用計程車的迄起數據評估計程車招呼站的優化與設置，並深入探討公有停車場結合計程車搭乘模式的可行性。',
					url: this.copyUrl,
				})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
			}
        },
        toggleVideoStatus(boolen){
            this.videoStart = boolen
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
$mainColor: darken($whiteColor, 25);
#HeaderPage{
	position: relative;
	box-sizing: border-box;
    width: 100vw;
	height: 100vh;
	background-color: $blackColor;
	background-size: cover;
	background-image: url('../assets/video/videoPoster.png');
	>div{
		position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
		&#videoWapper{
			z-index: 0;
		}
		&#contextWrapper{
			box-sizing: border-box;
			padding: 2rem;
			color: $mainColor;
			background-color: transparent;
			display: flex;
			flex-direction: column;
			align-items: self-start;
			justify-content: space-around;
			z-index: 1;
			footer{
				text-align: center;
				width: 100%;
				height: 4.75rem;
			}
		}
	}
}
#scroll_button{
	width: 4.75rem;
	height: 4.75rem;
	background-image: url('../assets/icon/scroll.svg');
}
#logoBox{
	display: inline-block;
	text-align: left;
	height: 3rem;
    margin: 0.5rem;
	img{
		filter: invert(1);
	}
}
#buttonBox{
	position: absolute;
	top: 10px;
	right: 10px;
	span{
		visibility: hidden;
	}
	button{
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		margin: 0 .25rem;
	}
	.divider{
		margin: 0 1rem;
		background-color: $whiteColor;
		width: 1px;
		height: 100%;  
	}
	.fbBtn{
		background-image: url('../assets/icon/fb.svg');
	}
	.linkBtn{
		background-image: url('../assets/icon/link.svg');
	}
	.videoBtn{
		&.videoStart{
			background-image: url('../assets/icon/play.svg');
		}
		&.videoPause{
			background-image: url('../assets/icon/pause.svg');
		}
	}
}
@media screen and (min-width:1920px){
	#buttonBox{
		top: 10px;
		right: 100px;
	}
}
</style>
