<template>
	<header id="HeaderPage" ref="headerPage">
		<VideoPlayer id="videoWapper"/>
		<div id="contextWrapper">
			<div>
				<a href="#" class="logoBox"><img :src="LOGO" alt="TUIC"></a>
				<div>
					<h1>如何讓計程車在城市中更安全及有效率</h1>
					<h2>How to make taxi more effectively and safety in the city</h2>
				</div>
			</div>
			<p>建議使用電腦來取得理想的地圖互動效果</p>
			<footer>
				<svg id="scroll_button" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" @click="scrollTo()">
					<g id="Ellipse_406" data-name="Ellipse 406" fill="none" stroke="#fff" stroke-width="2">
						<circle cx="32" cy="32" r="32" stroke="none"/>
						<circle cx="32" cy="32" r="31" fill="none"/>
					</g>
					<g id="icon_expand_more" data-name="icon/expand_more" transform="translate(16.187 19.187)">
						<rect id="boundary_24" data-name="boundary/24" width="32" height="32" transform="translate(-0.187 -0.187)" fill="none"/>
						<path id="icon_expand_more-2" data-name="icon/expand_more" d="M0,0,3.276,4.014,6.6,8.092,0,15.851" transform="translate(23.738 12.511) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
					</g>
				</svg>
			</footer>
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
			timeout: null
		}
	},
	beforeDestroy(){
		if(this.timeout){
			clearTimeout(this.timeout)
		}
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
				height: 3rem;
			}
		}
	}
}
#scroll_button{
	cursor: pointer;
	#Ellipse_406, #icon_expand_more-2{
		stroke: $mainColor;
	}
	&:hover {
		#Ellipse_406, #icon_expand_more-2{
			stroke: $blueColor;
		}
	}
}
</style>
