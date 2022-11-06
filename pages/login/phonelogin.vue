<template>
	<view class="login-page">
		<comHead></comHead>
		<view class="mx-5">
			<view class="flex align-center" style="height: 44px;margin-bottom: 20rpx;">
				<text  class="iconfont icon-cuowu fs-56 ft3333" @click="back"></text>
			</view>
			<image style="width: 100px;height: 100px;" src="/static/images/logo.png" class="flex mx-auto rounded-circle" mode="widthFix"></image>
			<view class="flex flex-column text-center" style="margin-top: 80rpx;">
				<text class="fs-56">登录</text>
				<!-- <text class="underline"></text> -->
			</view>
			<view class="flex align-center fs-30 fta0a0 mt-1 justify-center" style="margin-bottom: 80rpx;">
				<text  @click="navTo">还没有账号，立即注册 <text class="iconfont icon-arrow_right"></text></text>
			</view>
			<view class="flex align-center border-bottom py-5 mb-4">
				<text class="iconfont icon-shouji mr-2  fs-40 ft3333"></text>
				<input type="number" class="flex-1 fs-30  ft3333" placeholder="请输入手机号" v-model="mobile"  placeholder-class="placeholder">
			</view>
			<view class="flex align-center border-bottom py-5">
				<text class="iconfont icon-yanzhengma mr-2  fs-40 ft3333"></text>
				<input type="number" class="flex-1 fs-30 ft3333" placeholder="请输入验证码" v-model="smsCode"  placeholder-class="placeholder">
				<text class="fs-28 ft3d3c" @click="getCode">{{codeText}}</text>
			</view>
			<view class="rounded-circle fs-32 ftffff  flex align-center justify-center py-3 btnBg" @click="submit">登录</view>
			<view class="flex justify-center align-center mt-4">
				<text class="fs-28 ft3d3c" @click="loginMode">其他登录方式</text>
				<text class="iconfont icon-xiayibu fs-36 fta0a0"></text>
			</view>
			<view style="height: 50px;"></view>
		</view>
		<card-bottom ref="LoginMode" :phone="false"></card-bottom>
	</view>
</template>

<script>
	import baseApi from '@/api/baseApi.js'
	import comHead from '@/components/header/index.vue';
	import cardBottom from "./components/card-bottom.vue";
	import  {mapActions,mapGetters}  from 'vuex'
	let istimer = true;
	let flag = true;
	let timer = null;
	export default {
		components:{comHead,cardBottom},
		data() {
			return {
				codeText:"获取验证码",
				smsCode:"",
				mobile:"",
				isagree:false
			};
		},
		computed:{
			...mapGetters(['getConfig']),
		},
		created() {
			istimer =  true;
		},
		methods:{
			loginMode(){
				this.$refs.LoginMode.open();
			},
			async getCode(){
				try{
					if(!this.mobile){
						uni.showToast({
						    title: '手机号不能为空',
							icon:'none'
						});
						return;
					}
					if(istimer){
						istimer = false;
						if(isNaN(this.codeText))this.codeText =  "发送中...";
						let res = await this.sendLoginSms({mobile:this.mobile})
						if(res.code  ==  200){
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
						}
						
					}
				}catch(e){
					uni.showToast({
					    title: e.msg,
						icon:'none'
					});
					if(e.data.code == 402){
						this.codeText = '获取验证码'
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/register/register"
							});
						},2000)
						return;
					}
					if(e.data.ttl >  0){
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
						istimer = true;
						this.codeText =  "获取验证码";
					}
					
					//TODO handle the exception
				}
				
			},
			submit(){
				if(!this.mobile){
					uni.showToast({
					    title: '手机号不能为空',
						icon:'none'
					});
					return;
				}
				if(!this.smsCode){
					uni.showToast({
					    title: '验证码不能为空',
						icon:'none'
					});
					return;
				}
				let data ={
					smsCode:this.smsCode,
					mobile:this.mobile
				}
				uni.showLoading({
				    title: '登录中...',
				});
				baseApi.loginSmsCode(data).then(res => {
					uni.showToast({
					    title: '登录成功',
							icon:'none'
					});
					let token = res.data.token;
					this.$store.commit("setToken", token);
					this.GetInfo();
				})
			},
			GetInfo(){
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser",res.data)
					setTimeout(()=>{
						flag  = true;
						uni.reLaunch({
							url:"/pages/main"
						});
					},2000)
				})
			},
			navTo(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			back(){
				uni.navigateBack()
			},
			pwdLogin(){
				uni.navigateTo({
					url:'/pages/login/login-pwd'
				})
			},
			
		}
	}
</script>

<style lang="less">
.login-page{
	.underline{
		width: 117rpx;
		height: 15rpx;
		background: linear-gradient(-90deg, #FF4550, #FC5E1F);
		margin-top: -15rpx;
	}
	.submit{
		background: linear-gradient(-90deg, #FF4550, #FC5E1F);
	}
	.weixin{
		background: linear-gradient(-90deg, #05be01, #05bd05);
	}
}
</style>
