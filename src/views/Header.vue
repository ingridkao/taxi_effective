<template>
	<header id="HeaderPage">
		<div>
			<a href="#" class="logoBox"><img :src="LOGO" alt="TUIC"></a>
			<div>
				<h1>如何讓計程車在城市中更安全及有效率</h1>
				<h2>How to make taxi more effectively and safety in the city</h2>
			</div>
		</div>
		<p>建議使用電腦開啟，來取得理想的互動效果</p>
		<footer>
			<img :src="scroll_button" alt="scroll">
		</footer>
	</header>
</template>

<script>
import LOGO from '@/assets/TUIC.svg'
import scroll_button from '@/assets/scroll_button.svg'

export default {
	name: "HeaderPage",
	data() {
		return {
			LOGO,
			scroll_button
		};
	}
}
</script>
<style lang="scss" scoped>
$whiteColor: #fff;
$titleColor: #000;
$blackColor: #262626;
$textMainColor: $blackColor;
$textSubColor: lighten($blackColor, 5);
#HeaderPage{
	position: relative;
    width: 100vw;
	height: 100vh;
	z-index: 1;
	background-color: $blackColor;
	display: flex;
	flex-direction: column;
	align-items: self-start;
	justify-content: space-around;
	padding: 2rem;
	box-sizing: border-box;
	color: darken($whiteColor, 25);
	footer{
		text-align: center;
		width: 100%;
		height: 3rem;
	}
}
@media screen and (max-width:1025px){   
}
// .scroll-hint{
// 	width: 25px;
// 	height: 40px;
// 	background: transparent;
// 	border: 4px solid #5d5d5d;
// 	border-radius: 2em;
// 	position: relative;
// 	display: flex;
// 	justify-content: center;
// 	margin: 5rem auto 0;
// 	&:after{
// 		content: '';
// 		display: block;
// 		position: absolute;
// 		width: 4px;
// 		height: 4px;
// 		background: #5d5d5d;
// 		margin-top: 4px;
// 		border-radius: 1em;
// 		animation: scroll-hint 2400ms ease infinite;
// 	}
// }
// @keyframes scroll-hint {
// 	0%, 35% {opacity: 1;}
// 	15% {
// 		height: 12px;
// 		translateY: (15px);
// 	}
// 	50%, 100% {
// 		height: 4px;
// 		transform: translateY(40px);
// 		opacity: 0;
// 	}
// }
</style>
