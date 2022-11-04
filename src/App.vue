<script setup>
	import { reactive, onMounted, onBeforeMount } from "vue"
	import MobileDetect from 'mobile-detect'
	import Home from '@/views/Home.vue'
	import Footer from '@/views/Footer.vue'
	const state = reactive({ isMobile: false })

    const resizeWindow = () => {
      	const mobileDetect = new MobileDetect(window.navigator.userAgent)
		state.isMobile = mobileDetect.phone() || document.body.clientWidth <= 600
	}
	onMounted(() => {
		resizeWindow()
		window.addEventListener('resize', resizeWindow)
	})
	onBeforeMount(() => {
		window.removeEventListener('resize', resizeWindow)
	})
</script>

<template v-cloak>
	<Home :isMobile="state.isMobile"/>
	<Footer/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500,600&display=swap&subset=chinese-traditional');
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/reset.scss';
[v-cloak] { display:none; }
#app {
	font-family: "Noto Sans TC", "Microsoft Yahei", "微軟雅黑", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    background: $whiteColor;
	color: $blackColor;
}
</style>
