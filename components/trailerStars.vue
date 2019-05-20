<template name="TrailerStars">
	<view class="movie-score-wapper">
		<view class="movie-score-wapperin">
			<view class="movie-score-stars">
				<image src="/static/icos/star-gray.png" class="star-ico" />
				<image src="/static/icos/star-gray.png" class="star-ico" />
				<image src="/static/icos/star-gray.png" class="star-ico" />
				<image src="/static/icos/star-gray.png" class="star-ico" />
				<image src="/static/icos/star-gray.png" class="star-ico" />
			</view>
			<view class="movie-score-stars movie-score-stars-light" :style="{width:100*innerScore/10+'%'}">
				<image src="/static/icos/star-yellow.png" class="star-ico" />
				<image src="/static/icos/star-yellow.png" class="star-ico" />
				<image src="/static/icos/star-yellow.png" class="star-ico" />
				<image src="/static/icos/star-yellow.png" class="star-ico" />
				<image src="/static/icos/star-yellow.png" class="star-ico" />
			</view>
		</view>
		<view class="movie-score" v-if="showNum != 0">{{innerScore}}</view>
	</view>
</template>

<script>
	export default {
		name: "TrailerStars",
		
		props: {
			innerScore: {
				type: Number,
				default: 0
			},    //定义外部传入的分数
			showNum:{
				type: Number,
				default: 1
			}         //是否显示分数 1为显示
		},
		
		created() {
			
		}
	}
</script>

<style>
.movie-score-wapper {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.movie-score-wapperin{
	width:100upx;
	position:relative;
}
.movie-score-stars{
	width:100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: hidden;
}
.movie-score-stars-light{
	position:absolute;
	top:50%;
	left:0;
	transform: translateY(-50%);
}
.star-ico {
	width: 20upx;
	height: 20upx;
	margin-top: 6upx;
	flex:0 0 auto;
	opacity:1;
}
.movie-score {
	font-size: 12px;
	color: grey;
	margin-left: 8upx;
}
</style>
