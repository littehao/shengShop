<template>
	<view>
		<comHead titleshow title="支付中" bgcolor="#fff" class="border-bottom"></comHead>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import payApi from '@/api/payApi.js'
	import { closeWindow,getUrlCode,isWechat,getWeChatCode,getAlipayCode } from '@/utils/common.js'
	import comHead from '@/components/header/index.vue'
	export default {
		components: {
			comHead
		},
		data() {
			return {

			}
		},
		onLoad(query) {
			query.trade_no && uni.setStorageSync('trade_no', query.trade_no)
			this.isWeixin = isWechat()
			let code = this.isWeixin ? getUrlCode('code') : getUrlCode('auth_code')
			if (code) {
				this.auth_code = code
			}
			this.handScanOrderFn()
		},
		computed: {
			...mapGetters(['getToken'])
		},
		methods: {
			handScanOrderFn() {
				let trade_no = uni.getStorageSync('trade_no')
				let data = {
					trade_no: trade_no
				}
				//获取微信code
				if (!this.getToken && !this.auth_code && this.isWeixin) {
					getWeChatCode()
					return;
				}
				//获取支付宝code
				if (!this.getToken && !this.auth_code && !this.isWeixin) {
					getAlipayCode()
					return;
				}
				if (this.auth_code) data.auth_code = this.auth_code
				payApi.handScanOrder(data).then(res => {
					uni.removeStorageSync('trade_no')
					uni.showToast({
						title: res.msg
					})
					closeWindow()
				}).catch(err => {
					uni.showToast({
						title: e.msg
					})
					closeWindow()
				})
			}
		}
	}
</script>

<style>

</style>
