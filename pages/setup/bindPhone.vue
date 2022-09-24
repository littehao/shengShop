<template>
	<view class="pwd-page bgf4f4">
		<com-head backshow  :titleshow="true" color="#333" bgcolor="#fff"  title="绑定手机号"></com-head>
		
		<view class="bgffff rounded-lg px-2 mx-3 mt-3">
			<view class="flex align-center py-4 border-bottom">
				<text class="fs-32 ft3333" style="min-width: 200rpx;">手机号</text>
				<input class="flex-1" type="text" v-model="mobile" placeholder="请输入手机号" autocomplete="new-mobile" placeholder-class="placeholder">
			</view>
			<view class="flex align-center py-4 border-bottom">
				<text class="fs-32 ft3333" style="min-width: 200rpx;">设置密码</text>
				<input class="flex-1" type="password" v-model="password" placeholder="请输入登录密码" autocomplete="new-pwd" placeholder-class="placeholder">
			</view>
			<view class="flex align-center py-4">
				<text class="fs-32 ft3333" style="min-width: 200rpx;">确认密码</text>
				<input class="flex-1" type="password" v-model="repassword" placeholder="再次输入登录密码" autocomplete="new-repwd" placeholder-class="placeholder">
			</view>
		</view>
		
		<view class="position-fixed left-0 right-0 bgf4f4  flex align-center justify-center" style="height: 60px;bottom: 10vh;">
			<view class="btnBg fs-28 ftffff flex align-center justify-center rounded-circle mx-2 py-2  flex-1" @click="submit">确认</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from "vuex";
	import myApi from '@/api/myApi.js'
	import comHead from '@/components/header/index.vue'
	export default {
		components:{comHead},
		data() {
			return {
				mobile:"",
				password:"",
				repassword:"",
			};
		},
		methods:{
			submit(){
				if(!this.mobile){
					uni.$tools.toast('请输入手机号')
					return;
				}
				if(!this.password){
					uni.$tools.toast('密码不能为空')
					return;
				}
				if(this.password != this.repassword){
					uni.$tools.toast('密码不一致')
					return;
				}
				let data = {
					password:this.password,
					mobile:this.mobile
				}
				myApi.bindMobilePassword(data).then(res => {
					uni.showToast({
					    title: '绑定成功',
						icon:'none'
					});
					setTimeout(()=>{
						uni.navigateBack({delta:2})
					},2000)
				}).catch(e => {
					uni.showToast({
					    title: e.msg,
						icon:'none'
					});
				})
			}
		}
	}
</script>

<style lang="less">
.pwd-page{
	min-height: 100vh;
	.sendcode{
		min-width: 120rpx;
		height: 34rpx;
		line-height: 34rpx;
		text-align: center;
		border: 1px solid #FF4E54;
		border-radius: 10rpx;
	}
}
</style>
