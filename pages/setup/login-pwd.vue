<template>
	<view class="pwd-page bgf4f4">
		<com-head backshow  :titleshow="true" color="#333" bgcolor="#fff"  title="修改登录密码"></com-head>
		
		<view class="bgffff rounded-lg px-2 mx-3 mt-3">
			<view class="flex align-center py-4 border-bottom">
				<text class="fs-32 ft3333" style="min-width: 200rpx;">验证码</text>
				<input class="flex-1" type="text" v-model.trim="smsCode" placeholder="请输入验证码" autocomplete="new-code" placeholder-class="placeholder">
				<text class="fs-24 ft3d3c sendcode px-1 flex align-center  justify-center" @click="getCode" style="width: 180rpx;height: 60rpx;">{{codeText}}</text>
			</view>
			<view class="flex align-center py-4 border-bottom">
				<text class="fs-32 ft3333" style="min-width: 200rpx;">设置密码</text>
				<input class="flex-1" type="password" v-model.trim="password" placeholder="设置新的登录密码" autocomplete="new-pwd" placeholder-class="placeholder">
			</view>
			<view class="flex align-center py-4 border-bottom">
				<text class="fs-32 ft3333" style="min-width: 200rpx;">确认密码</text>
				<input class="flex-1" type="password" v-model.trim="repassword" placeholder="再次输入登录密码" autocomplete="new-repwd" placeholder-class="placeholder">
			</view>
		</view>
		
		<view class="position-fixed left-0 right-0  bottom-0 bgf4f4  flex align-center justify-center" style="height: 60px;">
			<view class="btnBg fs-28 ftffff flex align-center justify-center rounded-circle mx-2 py-2  flex-1" @click="submit">确认</view>
		</view>
	</view>
</template>

<script>
	import baseApi from '@/api/baseApi.js'
	import {mapActions,mapGetters} from "vuex";
	import comHead from '@/components/header/index.vue'
	let istimer = true;
	let timer = null;
	export default {
		components:{comHead},
		data() {
			return {
				codeText:"获取验证码",
				smsCode:"",
				password:"",
				repassword:"",
				mobile:''
			};
		},
		created() {
			istimer =  true;
		},
		methods:{
			getCode(){
				if(istimer){
					istimer = false;
					if(isNaN(this.codeText))this.codeText =  "发送中...";
					baseApi.sendUpdatePasswordSms().then(res => {
						let num = 60;
						clearInterval(timer);
						timer  = setInterval( ()=>{
							num --;
							this.codeText =  num;
							if(num <= 0){
								istimer = true;
								this.codeText =  "获取验证码";
								clearInterval(timer);
							}
						},1000)
					}).catch(e => {
						console.log(e)
						if(e.data && e.data.ttl >  0){
							istimer = false;
							let num = e.data.ttl;
							clearInterval(timer);
							timer  = setInterval( ()=>{
								num --;
								this.codeText =  num;
								if(num <= 0){
									istimer = true;
									this.codeText =  "获取验证码";
									clearInterval(timer);
								}
							},1000)
						}else{
							this.codeText =  "获取验证码";
							istimer = true;
						}
						uni.showToast({
						    title: e.msg,
							icon:'none'
						});
					})
				}
			},
			submit(){
				if(!this.smsCode){
					uni.showToast({
					    title: '请输入验证码',
						icon:'none'
					});
					return;
				}
				if(!this.password){
					uni.showToast({
					    title: '密码不能为空',
						icon:'none'
					});
					return;
				}
				if(this.password != this.repassword){
					uni.showToast({
					    title: '密码不一致',
						icon:'none'
					});
					return;
				}
				
				let data = {
					password:this.password,
					smsCode:this.smsCode
				}
				baseApi.updatePassword(data).then(res => {
					uni.showToast({
					    title: '操作成功',
						icon:'none'
					});
					setTimeout(()=>{
						uni.navigateBack({delta:2})
					},2000)
				}).catch(e => {
					uni.showToast({
					    title: e.data.msg,
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
