<template>
	<view class="black">
		<image 
		class="cover"
		:src="cover"
		mode="widthFix"
		@longpress="operator"
		></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover:""
			}
		},
		onLoad(params) {
			this.cover = params.cover;
		},
		methods: {
			operator() {
				let me = this;
				uni.showActionSheet({
					itemList:["保存图片到本地","复制链接","ccc"],
					success:(res) => {
						console.log(res, res.tapIndex == 0);
						if(res.tapIndex == 0) {
							uni.showLoading({
								title:"图片保存中..."
							});
							console.log("cover", this.cover);
							uni.downloadFile({
								url:this.cover,
								success:(result) => {
									console.log("download", result.tempFilePath);
									uni.saveImageToPhotosAlbum({
										filePath:result.tempFilePath,
										success() {
											uni.showToast({
												title:"图片保存成功",
												icon:"none"
											});
										},
										complete() {
											uni.hideLoading();
										}
									})
								}
							})
						}
						if (res.tapIndex == 1) {
							uni.setClipboardData({
								data: this.cover,
								success: function () {
									uni.showToast({
										title:"复制链接成功",
										icon:"none"
									});
								}
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
.black {
	background-color: #000000;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover {
	align-self: center;
}
</style>
