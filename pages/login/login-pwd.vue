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
			</view>
			<view class="flex align-center border-bottom py-5 mb-4">
				<text class="iconfont icon-shouji mr-2  fs-40 ft333333"></text>
				<input type="number" class="flex-1 fs-30 ft333333" style="height: 50rpx;line-height: 50rpx;" v-model="mobile" placeholder="请输入手机号"  placeholder-class="placeholder">
			</view>
			<view class="flex align-center border-bottom py-5" style="margin-bottom: 40rpx;">
				<text class="iconfont icon-mima1 mr-2  fs-40 ft333333"></text>
				<input type="password" class="flex-1 fs-30 ft333333" style="height: 50rpx;line-height: 50rpx;" v-model="password" placeholder="请输入密码"  placeholder-class="placeholder">
			</view>
			<view class="flex align-center justify-between fs-24 ftwhite mb-4" >
				<view class="flex align-center" @click="getpwd">
					<text class="checkbox checke" :class="{checked:ischecked}"></text>
					<text class="ml-1 fs-24 ftwhite">记住账号</text>
				</view>
			</view>
			<view class="flex align-center fs-24 ftb2b2 mb-4">
				<text class="checkbox mr-1 checke" :class="{checked:isagree}"  @click="agreeFn"></text>
				已阅读并同意
				<text  class="ft3d3c fs-24 mx-1" @tap="linkToHTML('user-agreement','用户协议')">《用户协议》</text>
			</view>
			<view class="rounded-circle fs-32 ftffff flex align-center justify-center py-3 submit" @click="submit">登录</view>
			<!--#ifdef APP-PLUS-->
			<template v-if="getPlatform == 'ios' && getConfig.ios_weixin_login && getConfig.ios_weixin_login.includes(`${getVersion}`)">
				<view class="flex justify-center align-center position-fixed left-0 right-0" style="bottom: 10vh;">
					<text class="fs-28 ft999999" @click="loginMode">其他登录方式</text>
					<text class="iconfont icon-xiayibu fs-36 fta0a0"></text>
				</view>
			</template>
			<template v-if="getPlatform == 'android'">
				<view class="flex justify-center align-center position-fixed left-0 right-0" style="bottom: 10vh;">
					<text class="fs-28 ft999999" @click="loginMode">其他登录方式</text>
					<text class="iconfont icon-xiayibu fs-36 fta0a0"></text>
				</view>
			</template>
			<!-- #endif -->
			<view style="height: 50px;"></view>
			
			<card-bottom ref="LoginMode" :pwd="false"></card-bottom>
		</view>
	</view>
</template>

<script>
	import baseApi from '@/api/baseApi.js'
	import comHead from '@/components/header/index.vue'
	import cardBottom from "./components/card-bottom.vue";
	import {mapActions,mapGetters} from "vuex";
	let flag = true;
	export default {
		components:{comHead,cardBottom},
		data() {
			return {
				password:"",
				mobile:"",
				ischecked:true,
				isagree:false,
			};
		},
		created() {
			flag  = true;
			let mobile = uni.getStorageSync('mobile');
			if(mobile){
				this.mobile  = mobile;
			}
		},
		computed:{
			...mapGetters(['getConfig','getPlatform','getVersion'])
		},
		methods:{
			loginMode(){
				this.$refs.LoginMode.open();
			},
			agreeFn(){
				this.isagree  = !this.isagree;
			},
			linkToHTML(url,title) {
				uni.navigateTo({
					url: `/pages/web-view/hybrid?url=${url}&title=${title}`
				})
			},
			submit(){
				if(!this.isagree){
					uni.$tools.toast('请阅读并同意《用户协议》')
					return;
				}
				if(!this.mobile){
					uni.$tools.toast('手机号不能为空')
					return;
				}
				if(!this.password){
					uni.$tools.toast('密码不能为空')
					return;
				}
				let data ={
					password:this.password,
					mobile:this.mobile
				}
				if(flag){
					flag  = false;
					uni.showLoading({
					    title: '登录中...',
					});
					baseApi.loginPw(data).then(res => {
						flag  = true;
						if(this.ischecked){
							uni.setStorageSync("mobile", this.mobile);
						}else{
							uni.removeStorageSync('mobile');
						}
						uni.hideLoading();
						uni.showToast({
						    title: '登录成功',
							icon:'none'
						});
						let token = res.data.token;
						this.$store.commit("setToken", token);
						this.GetInfo();
					}).catch(err => {
						uni.hideLoading();
						flag  = true;
						uni.showToast({
						    title: err.data.msg,
							icon:'none'
						});
					})
				}
			},
			GetInfo() {
				baseApi.memberInfo().then(res => {
					uni.hideLoading();
					this.$store.commit("setUser", res.data)
					setTimeout(()=>{
						flag  = true;
						uni.reLaunch({
							url:"/pages/main"
						});
					},2000)
				})
			},
			back(){
				uni.navigateBack()
			},
			getpwd(){
				this.ischecked  = !this.ischecked;
			}
		}
	}
</script>

<style lang="scss">
.login-page{
	.submit{
		background: linear-gradient(-90deg, #FF4550, #FC5E1F);
	}
}
</style>
