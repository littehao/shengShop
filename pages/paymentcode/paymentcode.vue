<template>
	<view class="bgF5F5F5">
		<comHead titleshow title="" bgcolor="tranasparent"  class="border-bottom"></comHead>
		<view class="px-3">
			<view class="fs-52 font-weight-bold ft333333" style="margin-bottom: 100rpx;">付款码支付</view>
			<view class="flex u-font-xl mb-5 mt-5 ft666666 fs-30">
				请输入需要支付的金额
			</view>	
			<view class="flex align-center rounded justify-center border-bottom" style="border-color: #E6E6E6;">
				<text class="fs-48 mr-2">¥</text>
				<view class="flex-1">
					<input
						placeholder="0.00"
						:border="true"
						v-model="money"
						type="number"
						focus
						style="height: 100rpx;width:100%;"
						placeholder-style="font-size:50rpx"
					 ></input>
				</view>
			</view>
			<view class="flex py-2 ft999999">现有绿分：{{(getUser && Number(getUser.available_rc_balance).toFixed(2)) || 0}}</view>
			<view style="margin-top: 20vh;">
				<view class="flex justify-center py-2 ftffffff font-weight-bold rounded-circle btnBg" @click="createScanPayOrderFn">确认</view>
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
