<template>
	<view class="page">
		
		<!-- 播放视频 S-->
		<view class="player">
			<video
			id="detailVideo"
			 :src="trailerInfo.trailer"
			 :poster="trailerInfo.poster"
			 class="movie"
			 controls></video>
		</view>
		<!-- 播放视频 E-->
		
		<!-- 影片基本信息 S-->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover='+trailerInfo.cover">
				<image 
					:src="trailerInfo.cover"
					class="cover"></image>
			</navigator>
				
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
		
		<!-- 演职人员 S-->
		<view class="plots-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<view
				class="actor-wapper"
				v-for="(staff, index) in staffPhoto"
				:key="staff.staffId"
				@click="lookStaff"
				:data-index="index"
				>
					<image
					class="single-actor"
					mode="aspectFill"
					:src="staff.photo"></image>
					<view class="actor-name">{{staff.name}}</view>
					<view class="actor-role">{{staff.actName}}</view>
				</view>			
			</scroll-view>
		</view>
		<!-- 演职人员 E-->
		
		<!-- 剧照 S-->
		<view class="plots-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image
				class="plot-image"
				v-for="(img, index) in plotPicsArray"
				:key="index"
				mode="aspectFill"
				@click="lookMe"
				:data-index="index"
				:src="img"></image>
			</scroll-view>
		</view>
		<!-- 剧照 E-->
	</view>
</template>

<script>
	import superRequest from "../../utils/request.js";
	import TrailerStars from "../../components/trailerStars.vue";
	export default {
		data() {
			return {
				trailerInfo:{},
				plotPicsArray:[],
				directorArray:[],
				actorArray:[]
			}
		},
		async onLoad(params) {
			console.log("传入的参数：",params);
			let trailerInfo = await superRequest.post("/search/trailer/"+params.trailerId);
			this.trailerInfo = trailerInfo;
			this.plotPicsArray = JSON.parse(trailerInfo.plotPics);
			let directorsArray = await superRequest.post(`/search/staff/${params.trailerId}/1`);
			this.directorArray=directorsArray;
			let actorArray = await superRequest.post(`/search/staff/${params.trailerId}/2`);
			this.actorArray=actorArray;
		},
		onShow() {
			if (this.video) {
				this.video.play();
			}
		},
		onReady() {
			this.video = uni.createVideoContext("detailVideo");
		},
		onHide() {
			this.video.pause();
		},
		// #ifdef MP
		onShareAppMessage(res) {
			return {
				title:this.trailerInfo.name,
				path:"/pages/movie/movie?tarilerId="+this.trailerInfo.id
			}
		},
		// #endif
		// #ifdef APP-PLUS
		onNavigationBarButtonTap(e) {
			let index = e.index;
			let trailerInfo = this.trailerInfo;
			if (index == 0) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://www.imovietrailer.com/#/pages/movie/movie?tarilerId="+this.trailerInfo.id,
					title: "超英预告:《"+trailerInfo.name+"》",
					summary: "超英预告:《"+trailerInfo.name+"》",
					imageUrl:trailerInfo.cover,
					success: function (res) {
							console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		},
		// #endif
		methods: {
			// 查看剧照
			lookMe(e) {
				uni.previewImage({
					urls:this.plotPicsArray,
					current:e.currentTarget.dataset.index
				})
			},
			// 查看演职列表
			lookStaff(e) {
				let staffPhoto = this.staffPhoto.map(item => item.photo);
				uni.previewImage({
					urls:staffPhoto,
					current:e.currentTarget.dataset.index
				})
			}
		},
		computed:{
			staffPhoto() {
				return this.directorArray.concat(this.actorArray);
			}
		},
		components:{
			TrailerStars
		}
	}
</script>

<style>
@import url("./movie.css");
</style>
