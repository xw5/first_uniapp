<template>
	<view class="page">
		<!-- 搜索区域 S-->
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input 
			type="text" 
			placeholder="找预告" 
			maxlength="10" 
			confirm-type="search"
			@confirm="searchMe"
			@input="searchMe"
			class="search-text" focus>
		</view>
		<!-- 搜索区域 E-->
		<!-- 搜索结果展示 S-->
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="trailer in trailerList" :key="trailer.id">
				<image class="poster" :src="trailer.cover"></image>
			</view>
		</view>
		<!-- 搜索结果展示 E-->
	</view>
</template>

<script>
	import superRequest from "../../utils/request.js";
	export default {
		data() {
			return {
				trailerList:[]
			}
		},
		nowPage:1,
		totalPage:1,
		keywords:"",
		async onLoad() {
			uni.showLoading({
				title:"数据加载中...",
				mask:true
			});
			let trailerList = await this.reuestTrailerList();
			this.trailerList = trailerList.rows;
			this.nowPage = trailerList.page;
			this.totalPage = trailerList.total;
			uni.hideLoading();
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			async searchMe(e) {
				uni.showLoading({
					title:"数据加载中...",
					mask:true
				});
				let value = e.detail.value;
				let trailerList = await this.reuestTrailerList(value);
				this.keywords = value;
				this.nowPage = trailerList.page;
				this.totalPage = trailerList.total;
				this.trailerList = trailerList.rows;
				uni.hideLoading();
			},
			async loadMore() {
				let nowPage = ++this.nowPage;
				let keywords = this.keywords;
				if (nowPage > this.totalPage) {
					uni.showToast({
						title:"没有更多数据了",
						icon:"none"
					});
					return;
				}
				uni.showLoading({
					title:"数据加载中...",
					mask:true
				});
				let trailerList = await this.reuestTrailerList(keywords, nowPage);
				this.nowPage = trailerList.page;
				this.totalPage = trailerList.total;
				this.trailerList.push(...trailerList.rows); 
				uni.hideLoading();
			},
			reuestTrailerList(keywords="", page=1, pageSize=12) {
				return superRequest.post("/search/list",{
					keywords,
					page,
					pageSize
				});
			}
		}
	}
</script>

<style>
@import url("./search.css");
</style>
