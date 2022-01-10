<template>
    <div id="videoWapper">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>
<style lang="scss" scoped>
    @import "~video.js/dist/video-js.min.css";
</style>
<script>
import videojs from 'video.js'
import Video from '@/assets/video/500.mp4'
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
                poster:'',
				sources: [
					{
						type: "video/mp4",
						src:Video
					}
				]
            }
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options)
        this.player.on('ready', () => {
            console.log('onPlayerReady')
            this.player.play()
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>


