<template>
	<view class="page">
		
		<!-- 轮播图 S -->
		<swiper class="swiper_con" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block :key="item.id" v-for="item in carouseList">
				<swiper-item class="swiper_item" v-if="item.isShow">
					<image :src="item.image" class="carousel" />
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
				<view class="poster-wapper">
					<image :src="superhero.cover" class="poster"/>
					<view class="movie-name">{{superhero.name}}</view>
					<TrailerStars :innerScore="superhero.score" />
				</view>
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
			<video
				v-for="trailer in hotTrailerList"
			 :src="trailer.trailer"
			 :poster="trailer.poster"
			 :key="trailer.id"
			 class="hot-movie-single"
			 controls></video>
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
			<view class="single-like-movie">
				<image src="http://122.152.205.72:88/superhero/DC/BatManTheDarkKnightRises/cover.jpg" class="poster"></image>
				<view class="movie-desc">
					<view class="movie-title">金钢狼</view>
					<TrailerStars :innerScore="9" showNum="0"/>
					<view class="movie-info">
						2018 / 美国 / 科幻 动作
					</view>
					<view class="movie-info">
						2018 / 美国 / 科幻 动作
					</view>
				</view>
				<view class="movie-oper">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 E-->
		
	</view>
</template>

<script>
	import TrailerStars from "../../components/trailerStars.vue";
	import superRequest from "../../utils/request.js";
	
	export default {
		data() {
			return {
				carouseList:[],
				hotSuperList:[],
				hotTrailerList:[]
			}
		},
		async onLoad() {
			let carouseList = await superRequest.post("/index/carousel/list");
			this.carouseList = carouseList;
			let hotSuperList = await superRequest.post("/index/movie/hot",{type:"superhero"});
			this.hotSuperList = hotSuperList; 
			let hotTrailerList = await superRequest.post("/index/movie/hot",{type:"trailer"});
			this.hotTrailerList = hotTrailerList;
			console.log(hotTrailerList);
		},
		methods: {

		},
		components:{
			TrailerStars
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
