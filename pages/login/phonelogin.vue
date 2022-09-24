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
			<view class="rounded-circle fs-32 ftffff  flex align-center justify-center py-3 btn2-bg" @click="submit">登录</view>
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
			this.$store.commit("setRoutes",true);
			let isagree = uni.getStorageSync('isagree')+'';
			if(isagree){
				this.isagree = eval(isagree.toLowerCase());
			}
		},
		onShow() {
			let isagree = uni.getStorageSync('isagree')+'';
			if(isagree){
				this.isagree = eval(isagree.toLowerCase());
			}
		},
		methods:{
			...mapActions(['loginSmsCode','sendLoginSms','memberInfo','wxUserinfo']),
			loginMode(){
				this.$refs.LoginMode.open();
			},
			agreeFn(){
				this.isagree  = !this.isagree;
				uni.setStorageSync('isagree',this.isagree);
			},
			linkToHTML(url,title) {
				// 前端读取
				// uni.navigateTo({
				// 	url: `/pages/web-view/hybrid?url=${url}&title=${title}`
				// })
				// 后台读取
				let html;
				if(title=='隐私政策' && this.getConfig.Privacy_policy){
					html = this.getConfig.Privacy_policy.replace(/\t/g, "\n");
				}else if(title=='用户协议' && this.getConfig.user_agreement){
					html = this.getConfig.user_agreement.replace(/\t/g, "\n")
				}else{
					html = `<div style="fontSize:30px !important;textAlign:center;padding:20px">后台未配置${title}<div>`
				}
				uni.setStorage({
					key:title=='隐私政策'?"Privacy_policy":"user_agreement",
					data:html,
					success() {
						uni.navigateTo({
							url: `/pages/web-view/operation?title=${title}`
						})
					}
				})
			},
			async getCode(){
				try{
					// if(!this.isagree){
					// 	uni.showModal({
					// 		title:"提示",
					// 		content:'请阅读并同意《 用户协议 》和《 隐私政策 》',
					// 		showCancel:false,
					// 		confirmColor:'#E23D3C',
					// 	})
					// 	return;
					// };
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
			async submit(){
				try{
					// if(!this.isagree){
					// 	uni.showModal({
					// 		title:"提示",
					// 		content:'请阅读并同意《 用户协议 》和《 隐私政策 》',
					// 		showCancel:false,
					// 		confirmColor:'#E23D3C',
					// 	})
					// 	return;
					// };
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
					// if(!this.isagree){
					// 	uni.showToast({
					// 	    title: '请勾选同意后再进行登录',
					// 		icon:'none'
					// 	});
					// 	return;
					// }
					let data ={
						smsCode:this.smsCode,
						mobile:this.mobile
					}
					if(flag){
						flag  = false;
						uni.showLoading({
						    title: '登录中...',
						});
						let res =  await this.loginSmsCode(data);
						if(res.code == 200){
							uni.showToast({
							    title: '登录成功',
								icon:'none'
							});
							let token = res.data.token;
							this.$store.commit("setToken", token);
							this.GetInfo();
						}
					}
				}catch(e){
					console.log(e)
					uni.hideLoading();
					flag  = true;
					if(e.data.code == 402){
						uni.showToast({
						    title: e.msg,
							icon:'none'
						});
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/register/register"
							});
						},2000)
					}else{
						uni.showToast({
						    title: e.msg,
							icon:'none'
						});
					}
					//TODO handle the exception
				}
				
			},
			async GetInfo(){
				try{
					let res  = await this.memberInfo()
					uni.hideLoading();
					if(res.code == 200){
						this.$store.commit("setUser",res.data)
						setTimeout(()=>{
							flag  = true;
							uni.reLaunch({
								url:"/pages/main"
							});
						},2000)
					}
				}catch(e){
					flag  = true;
					console.log(e)
				}
			
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
