<template>
	<view class="page">
		<view class="user_detail">
			<image class="user_header" :src="avatarUrl" />
			<text class="user_name">{{nickName}}</text>
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<button
			open-type="getUserInfo" 
			@getuserinfo="wxLogin"
			class="login_btn"
		>
			<image src="../../static/icos/weixin.png" class="login_wx" mode="scaleToFill" />
			<text class="login_btn_txt">微信登录</text>
		</button>
		<!-- #endif -->
		
		<!-- #ifdef APP-PLUS -->
		<view class="login_action">
			<image class="login_icon login_icon_wx" src="../../static/icos/weixin.png"/>
			<image class="login_icon" src="../../static/icos/QQ.png"/>
		</view>
		<!-- #endif -->
		
		<text class="login_tips">欢迎光临超英预告，登录留下脚步吧！</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:"无名氏",
				avatarUrl: "http://iph.href.lu/200x200?text=?"
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("./me.css");
</style>
