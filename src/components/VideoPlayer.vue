<template>
    <div id="videoWapper" :class="{load: isLoad}" :style="{
        'background-image': 'url(' + VideoPoster + ')'
    }">
        <video ref="videoPlayer" class="videoBox"/>
    </div>
</template>
<style lang="scss" scoped>
    @import "~video.js/dist/video-js.min.css";
    @import '@/assets/scss/main.scss';
    #videoWapper{
        opacity: 1;
        transition: opacity 1s;
        &.load{
            opacity: 0.5;
        }
        .videoBox{
            width: 100vw;
            height: 100vh;
        }
        video{
            width: 100%;
        }
    }
</style>
<script>
import videojs from 'video.js'
import Video from '@/assets/video/500.mp4'
import VideoPoster from '@/assets/video/videoPoster.png'
export default {
    name: "VideoPlayer",
    data() {
        return {
            player: null,
            options:{
				controls: false,
				autoplay: true,
                preload: 'auto',
				muted: 'muted',
                loop: true,
				sources: [
					{
						type: "video/mp4",
						src:Video
					}
				]
            },
            isLoad: true,
            VideoPoster
        }
    },
    props: {
        videoStart: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        videoStart: function (val, oldVal) {
            if(val){
                this.player.play()
            }else{
                this.player.pause()
            }
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options)
        this.player.on('ready', () => {
            // console.log('onPlayerReady')
            this.isLoad = false
            this.$emit('toggle', true)
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.isLoad = true
            this.player.dispose()
        }
    }
}
</script>


