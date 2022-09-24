<template>
	<view class="bgf4f4">
		<comHead titleshow title="付款码支付" bgcolor="tranasparent"  class="border-bottom"></comHead>
		<view class="px-3">
			<view class="flex u-font-xl font-weight-bold mb-5 mt-5">
				请输入需要支付的金额
			</view>	
			<view class="flex align-center bgffff rounded justify-center">
				<text class="fs-32 text-center" style="width: 100rpx;">金额</text>
				<text class="fs-48 font-weight-bold mr-4">¥</text>
				<view class="flex-1">
					<input
						placeholder="请输入金额"
						:border="true"
						v-model="money"
						type="number"
						focus
						style="height: 100rpx;width:100%;"
					 ></input>
				</view>
			</view>
			<view class="flex justify-center py-2 ft999999">现有绿分：{{(getUser && Number(getUser.available_rc_balance).toFixed(2)) || 0}}</view>
			<view style="margin-top: 200rpx;">
				<view class="flex justify-center py-3 ftffffff font-weight-bold rounded btnBg" @click="createScanPayOrderFn">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex'
	import baseApi from '@/api/baseApi.js'
	import payApi from '@/api/payApi.js'
	import comHead from '@/components/header/index.vue'
	export default {
		components:{comHead},
		data() {
			return {
				money:''
			}
		},
		computed:{
			...mapGetters(['getUser'])
		},
		methods: {
			createScanPayOrderFn(){
				payApi.createScanPayOrder({money:this.money}).then(res => {
					this.GetInfo()
					uni.navigateTo({
						url:'/pages/paymentcode/code?trade_no='+res.data.trade_no
					})
				}).catch(err => {
					uni.$tools.toast(err.data.msg)
				})
			},
			GetInfo() {
				baseApi.memberInfo().then(res => {
					this.$store.commit("setUser", res.data)
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
