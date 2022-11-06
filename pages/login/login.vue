<template>
	<view class="h-100vh bgffffff login-page">
		<com-head :titleshow="true" title="登录或注册" :backshow="true" :isRefresh='true'></com-head>
		<view class="flex flex-column position-relative login-content">
			<view class="ft1D2129  fs-40 text-center mb-5" style="padding-top:10vh">
				<image src="/static/images/logo.png" mode="widthFix" style="width: 200rpx;height: 200rpx;"></image>
			</view>
			<view class="text-center fs-32">盛世富购</view>
			<view class="mx-3" style="margin-top:10vh">
				<template>
					<loginBt :ispage="true" @click="getWeChatCode"></loginBt>
				</template>
			</view>
			<!--#ifdef APP-PLUS-->
			<template v-if="getPlatform == 'ios' && getConfig.ios_weixin_login.includes(`${getVersion}`)">
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
		</view>
		<card-bottom ref="LoginMode" :wx="false"></card-bottom>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import baseApi from '@/api/baseApi.js'
	import { getUrlCode,isWechat,getWeChatCode,getAlipayCode } from '@/utils/common.js'
	import comHead from "@/components/header/index.vue";
	import loginBt from '@/components/login/loginBtn.vue'
	import cardBottom from "./components/card-bottom.vue";
	export default {
		components:{comHead,loginBt, cardBottom},
		data(){
			return {
				code:null,//微信code
				inviteCode:''
			}
		},
		onLoad(){
			// #ifdef H5
			this.isWeixin = isWechat()
			let code = getUrlCode('code')
			if(this.isWeixin && code){
				this.code = code
				this.loginWxFn()
			}
			// #endif
		},
		computed:{
			...mapGetters(['getConfig','getPlatform','getVersion'])
		},
		methods:{
			loginMode(){
				this.$refs.LoginMode.open();
			},
			//请求微信接口，用来获取code
			getWeChatCode() {
				uni.showLoading({
					title:'登录中...'
				})
				const that = this
				// #ifdef APP-PLUS
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						console.log(res.provider)
						try{
							if (res.provider.includes('weixin')) {
								uni.login({
								  provider: 'weixin',
									onlyAuthorize:true,
								  success: function (loginRes) {
								    // console.log(loginRes.code);
										that.code = loginRes.code
										that.loginWxFn()
								  }
								});
							}
						}catch(e){
							console.log(e);
							//TODO handle the exception
						}
					}
				});
				// #endif
				// #ifdef H5
				getWeChatCode()
				// #endif
			},
			//把code传递给后台接口，静默登录
			loginWxFn(){
				uni.showLoading({
					title:'登录中...'
				})
				let data = {
					auth_code:this.code
				}
				baseApi.loginWx(data).then(res => {
					uni.hideLoading()
					uni.showToast({
					    title: '登录成功',
						icon:'none'
					});
					let token = res.data.token;
					this.$store.commit("setToken", token);
					this.GetInfo();
				}).catch(e => {
					uni.hideLoading()
					uni.showToast({
					    title: e.msg,
							icon:'none'
					});
				})
			},
			GetInfo() {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser",res.data)
					uni.reLaunch({
						url:"/pages/main"
					});
				})
			},
			navTo(type){
				uni.navigateTo({
					url:'/pages/login/phonelogin'
				})
			}
		}
	}
</script>

<style lang="scss">
.login-content{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
