<template>
	<view class="bgF5F5F5 h-100vh">
		<comHead titleshow title="支付" bgcolor="#fff"  class="border-bottom"></comHead>
		<view class="px-3 pt-5">
			<view class="flex u-font-xl font-weight-bold mb-5 mt-5 fs-32">
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
			<view style="margin-top: 200rpx;">
				<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded" @click="openway">确认</view>
			</view>
		</view>
		
		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="Number(money)"
		fromType="shoppay"
		payType="5"
		:authcode="auth_code"
		:memberCode="member_code"
		></payconfig>
		
	</view>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex'
	import myApi from '@/api/myApi.js'
	import { getWeChatCode, getUrlCode, isWechat } from '@/utils/common.js'
	import comHead from '@/components/header/index.vue'
	import payconfig from "@/components/pay-modal/payconfig.vue";
	export default {
		components:{comHead, payconfig},
		data() {
			return {
				money:'',
				member_code:'',
				payList: [],
				way:null,
				checkeindex:0,
				auth_code:''
			}
		},
		onLoad(query) {
			this.member_code  = query.member_code
			query.member_code && uni.setStorageSync('member_code',query.member_code)
			this.isWeixin = isWechat()
		},
		onShow() {
			this.$refs.payconfig && this.$refs.payconfig.argumentsFn()
		},
		mounted() {
			let code = getUrlCode('code')
			if(this.isWeixin && code){
				this.member_code = uni.getStorageSync('member_code')
				this.auth_code = code
			} else {
				if(!uni.getStorageSync('token')){
					getWeChatCode()
				}
			}
		},
		computed:{
			...mapGetters(['getUser','getbottom','getToken'])
		},
		methods: {
			close() {
				this.$refs.payconfig.close();
			},
			openway() {
				if(!this.money){
					uni.showToast({
						title:'请输入支付金额',
						icon:'none'
					})
					return
				}
				this.$refs.payconfig.open();
			},
		}
	}
</script>

<style lang="scss"  scoped>
	
</style>
