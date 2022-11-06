<template>
	<view class="codepay h-100vh bgF5F5F5">
		<comHead backshow titleshow title="付款码" bgcolor="#fff" class="border-bottom"></comHead>
		<view class="flex  align-center  justify-center" style="padding-top:20vh" v-if="url">
			<canvas id="qrcode" canvas-id="qrcode" style="width: 300px;height: 300px;" />
		</view>
		<view class="text-center py-3 ft999999">请扫码付款</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import config from "@/config/index.js"
	import uQRCode from '@/components/uqrcode/uqrcode.js'
	import comHead from '@/components/header/index.vue'
	export default {
		components: {
			comHead
		},
		data() {
			return {
				url: '',
				trade_no: ''
			}
		},
		onLoad(query) {
			this.trade_no = query.trade_no
			this.url = config.href + '/pages/paymentcode/paycode?trade_no='+this.trade_no
		},
		mounted() {
			this.showQrcode(); //一加载生成二维码
		},
		methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				this.$nextTick(function() {
					uQRCode.make({
							canvasId: 'qrcode',
							componentInstance: this,
							size: 300,
							margin: 10,
							text: this.url,
							backgroundColor: '#ffffff',
							foregroundColor: '#000000',
							fileType: 'png',
							errorCorrectLevel: uQRCode.errorCorrectLevel.H
						})
						.then(res => {
							console.log(res)
						})
					// if(_this.$refs.qrcode)
					// _this.$refs.qrcode.crtQrCode()
				})
			}
		}
	}
</script>

<style>

</style>
