<template>
	<view class="bgf4f4 h-100vh exhangepage">
		<comHead backshow titleshow title="工分兑换绿分" bgcolor="#fff" class="border-bottom"></comHead>
		<view >
			<view class="head_box flex align-center justify-center">
				<view class="all-box flex flex-column justify-center">
					<text
						class="all-num text-center ftffffff">{{(getUser && Number(getUser.available_integral).toFixed(2)) || 0}}</text>
					<text class="all-title mb-3 text-center fs-28 ftffffff">当前工分</text>
				</view>
			</view>
			<view class="p-3">
				<view class="flex u-font-xl font-weight-bold mb-3 mt-5">
					工分转换多少绿分？
				</view>
				<view class="flex bgffffff rounded justify-center">
					<input placeholder="请输入转换数量" :border="true" type="number" class="text-center" v-model="turn_yinfen"
						style="height: 100rpx;width:100%;" @input="changeInput"></input>
				</view>
				<view class="flex u-font-xl font-weight-bold mb-3 mt-5">
					需支付金额
				</view>
				<view class="flex bgffffff rounded py-2 ft999999 px-3 justify-center">{{moneyValue || placeholder}}</view>
			
				<view style="margin-top: 100rpx;">
					<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded" @click="openway">确认转换
					</view>
				</view>
			</view>
		</view>
		
		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="Number(moneyValue)"
		fromType="exchange"
		payType="4"
		:turnYinfen="turn_yinfen"
		></payconfig>

	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import myApi from '@/api/myApi.js'
	import comHead from '@/components/header/index.vue'
	import payconfig from "@/components/pay-modal/payconfig.vue";
	let frist = true;
	let payFlag = true;
	export default {
		components: { payconfig, comHead },
		data() {
			return {
				placeholder: '自动计算',
				moneyValue: '',
				turn_yinfen: '',
				payList: [],
				way: null,
				checkeindex: 0,
				act_password: ''
			}
		},
		computed: {
			...mapGetters(['getUser', 'getbottom', 'getConfig'])
		},
		methods: {
			changeInput(data) {
				this.moneyValue = (Number(data.detail.value) * (this.getConfig.jin_fen_turn_pay_wechat_rate && Number(this
					.getConfig.jin_fen_turn_pay_wechat_rate)) || 0).toFixed(2)
			},
			openway() {
				if (!this.turn_yinfen) {
					uni.$tools.toast('请输入转换数量')
					return;
				}
				this.$refs.payconfig.open();
			},
			close() {
				this.$refs.payconfig.close();
			},
		}
	}
</script>

<style lang="scss">
	.head_box {
		width: 750rpx;
		height: 380rpx;
		background-image: url(../../static/images/balance_bg.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center top;
		position: relative;

		.all-box {
			height: 200rpx;
			padding-bottom: var(--status-bar-height);

			.all-num {
				font-size: 50rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}

			.all-title {
				font-weight: 500;
			}

			.score-card-bg {
				width: 100%;
				height: 90rpx;
			}
		}

		.tab-box {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			width: 710rpx;
			height: 90rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 30rpx 30rpx 0px 0px;
			border-bottom: 1rpx solid #dfdfdf;
			padding: 0 30rpx;

			.tab-item {
				flex: 1;

				.tab-name {
					display: inline-block;
					font-size: 30rpx;
					font-family: Noto Sans S Chinese;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					border-bottom: 4rpx solid transparent;
					line-height: 86rpx;
				}
			}
		}
	}
</style>
