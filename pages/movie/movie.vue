<template>
	<view class="page">
		
		<!-- 播放视频 S-->
		<view class="player">
			<video
			 :src="trailerInfo.trailer"
			 :poster="trailerInfo.poster"
			 class="movie"
			 controls></video>
		</view>
		<!-- 播放视频 E-->
		
		<!-- 影片基本信息 S-->
		<view class="movie-info">
			<image 
				:src="trailerInfo.cover"
				class="cover"></image>
				
			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>
				
				<view class="score-block">

					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					
					<view class="score-stars">
						<TrailerStars :innerScore="trailerInfo.score" :showNum="0" />
						<view class="prise-counts">{{trailerInfo.prisedCounts}}人点赞</view>
					</view>

				</view>
			</view>
		</view>
		<!-- 影片基本信息 E-->
		
		<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		<!-- 剧情介绍 S-->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 E-->
	</view>
</template>

<script>
	import superRequest from "../../utils/request.js";
	import TrailerStars from "../../components/trailerStars.vue";
	export default {
		data() {
			return {
				trailerInfo:{}
			}
		},
		async onLoad(params) {
			console.log(params);
			let trailerInfo = await superRequest.post("/search/trailer/"+params.trailerId);
			this.trailerInfo = trailerInfo;
		},
		methods: {
			
		},
		components:{
			TrailerStars
		}
	}
</script>

<style>
@import url("./movie.css");
</style>
