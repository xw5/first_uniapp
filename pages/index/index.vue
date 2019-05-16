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
		
		
	</view>
</template>

<script>
	import TrailerStars from "../../components/trailerStars.vue";
	import superRequest from "../../utils/request.js";
	
	export default {
		data() {
			return {
				carouseList:[],
				hotSuperList:[]
			}
		},
		async onLoad() {
			let carouseList = await superRequest.post("/index/carousel/list");
			this.carouseList = carouseList;
			let hotSuperList = await superRequest.post("/index/movie/hot",{type:"superhero"});
			this.hotSuperList = hotSuperList; 
			console.log(hotSuperList);
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
