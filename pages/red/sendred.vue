<template>
	<view class="bgf4f4 h-100vh">
		<comHead backshow titleshow title="买红包" bgcolor="#fff" class="border-bottom"></comHead>
		<view class="px-2 pt-3">
			<view class="flex flex-column">
				<view class="u-font-xl font-weight-bold mb-3 fs-32">发送步骤说明：</view>
				<view>1.填写发送红包的数量(一次可以发送1个红包或多个红包)</view>
				<view>2.点击确认发送按钮</view>
				<view>3.在打开的新页面中，会生成红包二维码图片</view>
				<view>4.长按图片，选择发送给好友</view>
				<view>5.选择单个好友或者群即可</view>
			</view>
			<view class="flex u-font-xl font-weight-bold mb-3 mt-5 fs-32">
				发送数量填写
			</view>	
			<view class="flex bgffff rounded justify-center">
				 <input
				    placeholder="请输入数量"
				    :border="true"
					type="number"
					class="text-center"
					v-model="red_count"
					style="height: 100rpx;width:100%;"
				  ></input>
			</view>
			<view class="flex justify-center py-2 ft999999">现有红包余量：{{(getUser && Number(getUser.red_count)) || 0}}</view>
			<view style="margin-top: 100rpx;">
				<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded" @click="createSendRedPackFn">确认发送</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import myApi from '@/api/myApi.js'
	import baseApi from '@/api/baseApi.js'
	import { mapActions,mapGetters } from "vuex";
	import comHead from '@/components/header/index.vue'
	export default {
		components:{ comHead },
		data() {
			return {
				customStyle:{
					textAlign:'center',
					height:'100rpx'
				},
				red_count:'',
			}
		},
		computed:{
			...mapGetters(['getUser','getbottom','getToken'])
		},
		methods: {
			createSendRedPackFn(){
				if(!this.red_count){
					uni.$tools.toast('请输入红包数量')
					return
				}
				let data  = {red_count:this.red_count}
				myApi.createSendRedPack(data).then(res => {
					const { trade_no } = res.data
					this.GetInfo(trade_no)
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:'none'
					})
				})
			},
			GetInfo(trade_no) {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser",res.data)
					uni.navigateTo({
						url:'/pages/red/redcode?trade_no=' + trade_no
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
