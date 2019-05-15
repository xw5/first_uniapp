<template>
	<view class="page">
		<swiper class="swiper_con" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block :key="item.id" v-for="item in carouseList">
				<swiper-item class="swiper_item" v-if="item.isShow">
					<image :src="item.image" class="carousel" />
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	import superRequest from "../../utils/request.js";
	
	export default {
		data() {
			return {
				carouseList:[]
			}
		},
		async onLoad() {
			let carouseList = await superRequest.post("/index/carousel/list");
			this.carouseList = carouseList;
		},
		methods: {

		}
	}
</script>

<style>
	@import url("./index.css");
</style>
