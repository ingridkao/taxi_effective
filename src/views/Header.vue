<template>
	<header id="HeaderPage" ref="headerPage">
		<VideoPlayer id="videoWapper" :video-start="videoStart" @toggle="toggleVideoStatus"/>
		<div id="contextWrapper">
			<div>
				<a :href="copyUrl" id="logoBox"><img :src="LOGO" alt="TUIC"></a>
				<div>
					<h1>讓計程車在城市中更安全及有效率</h1>
					<h2>Making taxi service safer and more effective</h2>
				</div>
			</div>
			<p>建議使用電腦來取得理想的地圖互動效果</p>
			<footer>
				<button id="scroll_button" @click="scrollTo()">
					<!-- <svg  xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
						<g id="Ellipse_406" data-name="Ellipse 406" fill="none" stroke="#fff" stroke-width="2">
							<circle cx="32" cy="32" r="32" stroke="none"/>
							<circle cx="32" cy="32" r="31" fill="none"/>
						</g>
						<g id="icon_expand_more" data-name="icon/expand_more" transform="translate(16.187 19.187)">
							<rect id="boundary_24" data-name="boundary/24" width="32" height="32" transform="translate(-0.187 -0.187)" fill="none"/>
							<path id="icon_expand_more-2" data-name="icon/expand_more" d="M0,0,3.276,4.014,6.6,8.092,0,15.851" transform="translate(23.738 12.511) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
						</g>
					</svg> -->

				</button>
			</footer>
			<div id="buttonBox">
				<input type="hidden" id="webURL" :value="copyUrl">
				<button class="fbBtn" @click="shareToFb($event)"/>
				<button class="linkBtn" @click="copyURL($event)"/>
				<button :class="['videoBtn',videoStart? 'videoPause': 'videoStart']" @click="videoStart = !videoStart"/>"
			</div>
		</div>
	</header>
</template>

<script>
import LOGO from '@/assets/TUIC.svg'
import VideoPlayer from "@/components/VideoPlayer.vue"
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
			copyUrl: '#'
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
		background-color: #fff;
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
