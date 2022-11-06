<template>
	<view class="redcode h-100vh flex flex-column">
		<comHead titleshow title="分享好友" color="#fff"></comHead>
		<view class="pt-3 flex-1">
			<view class="flex align-end justify-center h-100 boxsizing codebg" style="padding-bottom: 100px;" v-if="trade_no">
				<view>
					<canvas id="qrcode" canvas-id="qrcode" style="width: 230px;height: 230px;" />
					<view class="fs-24 ftffffff text-center py-1">扫描二维码获取红包</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/config/index.js"
	import uQRCode from '@/components/uqrcode/uqrcode.js'
	import comHead from '@/components/header/index.vue'
	export default {
		components:{ comHead },
		data() {
			return {
				trade_no:'',
				url:''
			}
		},
		mounted() {
			this.showQrcode();//一加载生成二维码
		},
		onLoad(query) {
			this.trade_no = query.trade_no
			this.url = config.href + '/pages/red/disred?trade_no='+this.trade_no
		},
		methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				this.$nextTick(function(){
						uQRCode.make({
					        canvasId: 'qrcode',
					        componentInstance: this,
					        size: 230,
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
				})
			},
		}
	}
</script>

<style lang="scss">
.redcode{
	height: 100vh;
	background-image:url('/static/images/redbg1.png');
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: center bottom;
	.codebg{
		background-image:url('/static/images/redbg2.png');
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center bottom;
	}
}
</style>
