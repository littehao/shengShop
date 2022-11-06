<template>
	<view class="bgF5F5F5 h-100vh">
		<comHead backshow titleshow title="" class="border-bottom"></comHead>
		<view class="px-3 pt-3">
			<view class="fs-52 font-weight-bold ft333333" style="margin-bottom: 100rpx;">发送红包</view>
			<view class="flex u-font-xl mb-2 mt-5 ft666666 fs-30">
				请输入红包数量
			</view>
			<view class="flex rounded justify-center border-bottom" style="border-color: #E6E6E6;">
				 <input
					placeholder="0"
					:border="true"
					type="number"
					v-model="red_count"
					style="height: 100rpx;width:100%;"
					placeholder-style="font-size:50rpx"
				  ></input>
			</view>
			<view class="flex py-2 ft999999 mb-4">现有红包余量：{{(getUser && Number(getUser.red_count)) || 0}}</view>
			<view class="flex flex-column ft999999">
				<view class="u-font-xl font-weight-bold mb-1 fs-28 ft666666">发送步骤说明：</view>
				<view class="fs-26">1.填写发送红包的数量(一次可以发送1个红包或多个红包)</view>
				<view class="fs-26">2.点击确认发送按钮</view>
				<view class="fs-26">3.在打开的新页面中，会生成红包二维码图片</view>
				<view class="fs-26">4.长按图片，选择发送给好友</view>
				<view class="fs-26">5.选择单个好友或者群即可</view>
			</view>
			<view class="position-fixed left-0 right-0" style="bottom: 5vh;">
				<view class="flex justify-center py-2 btnBg ftffffff font-weight-bold rounded-circle mx-3" @click="createSendRedPackFn">确认发送</view>
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
