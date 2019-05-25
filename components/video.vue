<template>
	<view class="video_wrap" @click="hideVideo">
		<Text class="video_title">{{video.name}}</Text>
		<video
		 :src="video.trailer"
		 :poster="video.poster"
		 class="movie-con"
		 id="detailVideo"
		 @click.stop=""
		 controls></video>
	</view>
</template>

<script>
	export default {
		props:{
			video:{
				type:Object,
				default:null
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods:{
			hideVideo() {
				this.$emit("hideVideo");
			}
		},
		
		mounted() {
			this.videoObj = uni.createVideoContext("detailVideo");
		},
		
		beforeDestroy() {
			this.videoObj.pause();
		}
	}
</script>

<style>
	.video_wrap{
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;
		z-index:100;
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color:rgba(0,0,0,0.8);
	}
	.video_title{
		font-size:36upx;
		margin-bottom: 30upx;
		color:#EAEAEA
	}
	.movie-con{
		width:100%;
		heigh:auto;
	}
</style>
