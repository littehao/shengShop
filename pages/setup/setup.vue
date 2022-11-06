<template>
	<view  class="security-page bgf4f4">
		<comHead backshow titleshow title="账户设置" bgcolor="#fff"  class="border-bottom"></comHead>
		
		<view class="mx-2 mt-3 bgffff rounded p1-3">
			<view class="flex align-center justify-between border-bottom py-3" @click="navTo('/pages/setup/login-pwd')">
				<view class="flex align-center">
					<uni-icons type="locked" size="28"></uni-icons>
					<text class="fs-32 ft3333 ml-1">修改登录密码</text>
				</view>
				<text class="iconfont icon-xiayibu  fs-32 ftb2b2"></text>
			</view>
			<view class="flex align-center justify-between border-bottom py-3" @click="navTo('/pages/eidt-info/eidt-info')">
				<view class="flex align-center">
					<uni-icons type="compose" size="28"></uni-icons>
					<text class="fs-32 ft3333 ml-1">修改个人信息</text>
				</view>
				<text class="iconfont icon-xiayibu  fs-32 ftb2b2"></text>
			</view>
			<!--#ifdef H5-->
			<view class="flex align-center justify-between border-bottom py-3" @click="navTo('/pages/setup/bindPhone')">
				<view class="flex align-center">
					<uni-icons type="gear" size="28"></uni-icons>
					<text class="fs-32 ft3333 ml-1">绑定手机号</text>
				</view>
				<text class="iconfont icon-xiayibu  fs-32 ftb2b2"></text>
			</view>
			<!-- #endif -->
			<view class="flex align-center justify-between border-bottom py-3" @click="$refs.delpopup.open()">
				<view class="flex align-center">
					<uni-icons type="upload" size="28"></uni-icons>
					<text class="fs-32 ft3333 ml-1">注销账号</text>
				</view>
				<text class="iconfont icon-xiayibu  fs-32 ftb2b2"></text>
			</view>
		</view>
		
		<view class="position-fixed left-0 w-100 px-2 bottom-0 sizing mb-2">
			<view class="fabu bg-purple ftffff rounded-lg align-center text-center py-2 fs-28 " @click="logout">退出登录</view>
		</view>
		
		<uni-popup ref="popup" type="dialog" :maskClick="false">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<view class="fs-28 ft3333 font-weight-bold text-center p-4 pb-0">解绑微信账号</view>
				<view  class="fs-30 ft3333 text-center py-4 px-3">解绑微信后你将无法使用微信登录盛世富购，你确定要解绑吗？</view>
				<view class="flex text-center" style="height: 100rpx;line-height: 100rpx;">
					<view class="border-right fs-28 fta0a0" style="width: 50%;" @click="$refs.popup.close()">暂不解绑</view>
					<view class="flex-1 fs-28 ft3d3c" @click="Unbound">解绑</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="delpopup" type="dialog" :maskClick="false">
			<view class="bgffff rounded-lg" style="width: 560rpx;">
				<view class="fs-28 ft3333 font-weight-bold text-center p-4 pb-0">提示</view>
				<view  class="fs-30 ft3333 text-center py-4 px-3">注销账号后将不能使用，确定注销吗？</view>
				<view class="flex text-center" style="height: 100rpx;line-height: 100rpx;">
					<view class="border-right fs-28 fta0a0" style="width: 50%;" @click="$refs.delpopup.close()">取消</view>
					<view class="flex-1 fs-28 ft3d3c" @click="deletFn">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import comHead from '@/components/header/index.vue'
	import {mapActions,mapGetters} from "vuex";
	export default {
		components:{comHead},
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters(['getUser'])
		},
		methods:{
			...mapActions(['unbind','memberInfo']),
			deletFn(){
				this.$refs.delpopup.close()
				uni.removeStorageSync('token');
				uni.removeStorageSync('user');
				uni.removeStorageSync('address')
				uni.removeStorageSync('isagree');
				this.$store.commit("setUser",null)
				this.$store.commit("setToken",null)
				uni.showToast({
					title:"注销成功",
					icon:'none'
				})
				setTimeout( ()=>{
					uni.redirectTo({
						url:"/pages/main"
					})
				},1500)
			},
			logout(){
				uni.removeStorageSync('token');
				uni.removeStorageSync('user');
				uni.removeStorageSync('address')
				this.$store.commit("setUser",null)
				this.$store.commit("setToken",null)
				uni.showToast({
					title:"退出成功",
					icon:'none'
				})
				setTimeout( ()=>{
					uni.redirectTo({
						url:"/pages/login/login"
					})
				},1500)
			},
			async Unbound(){
				try{
					let res = await this.unbind();
					this.$refs.popup.close()
					if(res.code == 200){
						uni.showToast({
							title:res.msg
						})
						this.GetInfo();
					}
				}catch(e){
					this.$refs.popup.close()
					uni.showToast({
						title:e.data.msg,
						icon:"none"
					})
					//TODO handle the exception
				}
			},
			async GetInfo(){
				let res  = await this.memberInfo()
				if(res.code == 200){
					this.$store.commit("setUser",res.data)
					setTimeout(()=>{
						uni.navigateBack()
					},1000)
				}
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang="less">
.security-page{
	min-height: 100vh;
}
</style>
