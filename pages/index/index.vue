<template>
	<view class="page">
		
		<!-- 轮播图 S -->
		<swiper class="swiper_con" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block :key="item.id" v-for="item in carouseList">
				<swiper-item class="swiper_item" v-if="item.isShow">
					<navigator open-type="navigate" :url="'../movie/movie?trailerId='+item.movieId">
						<image :src="item.image" class="carousel" />
					</navigator>
				</swiper-item>
			</block>
		</swiper>
		<!-- 轮播图 E -->
		
		<!-- 热门超英 S -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" class="hot-ico" />
				<view class="hot-title">热门超英</view>
			</view>
		</view>
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="superhero in hotSuperList" :key="superhero.id">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId='+superhero.id">
					<view class="poster-wapper">
						<image :src="superhero.cover" class="poster"/>
						<view class="movie-name">{{superhero.name}}</view>
						<TrailerStars :innerScore="superhero.score" />
					</view>
				</navigator>
			</view>
		</scroll-view>
		<!-- 热门超英 E -->
		
		<!-- 热门预告 S-->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/interest.png" class="hot-ico" />
				<view class="hot-title">热门预告</view>
			</view>
		</view>
		<view class="hot-movies page-block">
			<!-- <video
				v-for="trailer in hotTrailerList"
			 :src="trailer.trailer"
			 :poster="trailer.poster"
			 :key="trailer.id"
			 class="hot-movie-single"
			 controls></video> -->
			 <view 
			 v-for="trailer in hotTrailerList"
			 :key="trailer.id"
			 :data-video="trailer"
			 @click="playVideo"
			 class="hot-movie-single"
			 >
				 <image class="poster_video" :src="trailer.poster" mode="aspectFill"></image>
				 <image class="play_icon" src="../../static/icos/playicon.png"></image>
			 </view>
		</view>
		<!-- 热门预告 E-->
		
		<!-- 猜你喜欢 S-->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/interest.png" class="hot-ico" />
				<view class="hot-title">热门预告</view>
			</view>
		</view>
		<view class="page-block guess-u-like">
			<view class="single-like-movie" v-for="(guessUlike, index) in guessULikeList" :key="guessUlike.id">
				<navigator :url="'../movie/movie?trailerId='+guessUlike.id">
					<image :src="guessUlike.cover" class="poster"></image>
				</navigator>
				<view class="movie-desc">
					<navigator :url="'../movie/movie?trailerId='+guessUlike.id">
						<view class="movie-title">{{guessUlike.name}}</view>
					</navigator>
					<TrailerStars :innerScore="9" :showNum="0"/>
					<view class="movie-info">{{guessUlike.basicInfo}}</view>
					<view class="movie-info">{{guessUlike.releaseDate}}</view>
				</view>
				<view class="movie-oper" @click="praiseMe" :data-gIndex="index">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">点赞</view>
					<view :animation="animationDataArr[index]" class="praise-me animation-opacity">+1</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 E-->
		<VideoDlg :video="nowVideo" v-if="showVideo" @hideVideo="hideVideo"/>
	</view>
</template>

<script>
	import TrailerStars from "../../components/trailerStars.vue";
	import superRequest from "../../utils/request.js";
	import VideoDlg from "../../components/video.vue";
	
	export default {
		data() {
			return {
				carouseList:[],
				hotSuperList:[],
				hotTrailerList:[],
				guessULikeList:[],
				animationDataArr:[],
				nowVideo:null,
				showVideo:false
			}
		},
		onLoad() {
			
			this.refreshData();
			// #ifdef APP-PLUS || MP-WEIXIN
			// 临时动画
			this.animation = uni.createAnimation();
			// #endif
		},
		onUnload() {
			// 清除动画
			this.animation = null;
			this.animationDataArr = null;
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		methods: {
			async refreshData() {
				uni.showLoading({
					title:"数据加载中...",
					mask: true
				});
				let carouseList = await superRequest.post("/index/carousel/list");
				this.carouseList = carouseList;
				let hotSuperList = await superRequest.post("/index/movie/hot",{type:"superhero"});
				this.hotSuperList = hotSuperList; 
				let hotTrailerList = await superRequest.post("/index/movie/hot",{type:"trailer"});
				this.hotTrailerList = hotTrailerList;
				let guessULikeList = await superRequest.post("/index/guessULike");
				this.guessULikeList = guessULikeList;
				uni.hideLoading();
				uni.stopPullDownRefresh();
			},
			praiseMe(e) {
				
				// #ifdef APP-PLUS || MP-WEIXIN
				let nowIndex = e.currentTarget.dataset.gindex;
				// 构建动画数据并且通过step表示完成动画
				this.animation.translateY(-68).opacity(1).step({duration:400});
				this.animationDataArr.splice(nowIndex,1,this.animation.export());
				setTimeout(() => {
					this.animation.translateY(0).opacity(0).step({duration:0});
					this.animationDataArr.splice(nowIndex,1,this.animation.export());
				},500);
				// #endif
			},
			playVideo(e) {
				console.log("首页当前要播放的电影：",e.currentTarget.dataset.video);
				this.nowVideo = e.currentTarget.dataset.video;
				this.showVideo = true;
			},
			hideVideo() {
				this.showVideo = false;
			}
		},
		components:{
			TrailerStars,
			VideoDlg
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
