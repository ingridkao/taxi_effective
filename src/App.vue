<script setup>
	import MobileDetect from 'mobile-detect'

	import Home from '@/views/Home.vue'
	import HomeMobile from '@/views/HomeMobile.vue'
	import Footer from '@/views/Footer.vue'

	const mobileDetect = new MobileDetect(window.navigator.userAgent)
	const mobildDevice = mobileDetect.phone()? true: false
</script>

<template v-cloak>
	<keep-alive>
		<HomeMobile v-if="mobildDevice"/>
		<Home v-else/>
	</keep-alive>
	<Footer/>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500&display=swap&subset=chinese-traditional');
[v-cloak] { display:none; }

#app {
	font-family: "Noto Sans TC", "Microsoft Yahei", "微軟雅黑", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $whiteColor;
	color: $blackColor;
}
</style>
