<template>
	<view class="apply-agent bgF5F5F5">
		<com-head :titleshow="true" color="#333" :backshow="true" bgcolor="#fff" title="商家二维码"></com-head>

		<view class="rounded-lg bg-white  px-2 mx-3 mt-3 mb-2 pb-3">
			<view class="flex align-center  py-3  border-bottom">
				<text class="fs-32  Color333  mr-2" style="width: 150rpx;">店铺名称:</text>
				<input type="text" class="flex-1  Color333 fs-28" style="height: 50rpx;line-height: 50rpx;"
					placeholder="请输入公司名称" placeholder-class="placeholder" v-model="merchant_name"
					:disabled="disabled">
			</view>
		</view>
		<view class="flex align-end justify-center h-100 boxsizing" style="padding-bottom: 100px;" v-if="getUser.member_code">
			<canvas id="qrcode" canvas-id="qrcode" style="width: 300px;height: 300px;" />
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import config from "@/config/index.js";
	import uQRCode from '@/components/uqrcode/uqrcode.js'
	import comHead from '@/components/header/index.vue'
	import nullData from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	const baseUrl = config.api + '/api/community/upload';
	export default {
		components: {
			comHead,
			nullData,
			loading
		},
		data() {
			return {
				merchant_name:'',
				disabled:true
			};
		},
		created() {
			if(this.getUser  && this.getUser.is_shop_merchant == 1){
				if (JSON.stringify(this.getUser.merchant) != '[]') {
					this.merchant_name  = this.getUser.merchant.merchant_name
				}
			}
		},
		computed: {
			...mapGetters(['getUser']),
		},
		mounted() {
			this.showQrcode();//一加载生成二维码
		},
		methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				let url = `${config.href}/pages/settled/shoppay?member_code=${this.getUser.member_code}`
				this.$nextTick(function(){
						uQRCode.make({
					        canvasId: 'qrcode',
					        componentInstance: this,
					        size:300,
					        margin: 10,
					        text: url,
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
<style lang="scss" scoped>
	.apply-agent {
		min-height: 100vh;
	
		.code {
			border-color: #FF7142;
		}
	}
</style>
