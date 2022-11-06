<template>
	<view class="bgF5F5F5 h-100vh exhangepage">
		<comHead backshow titleshow title=""></comHead>
		<view class="p-3 pt-3">
			<view class="fs-52 font-weight-bold ft333333 mt-5" style="margin-bottom: 80rpx;">工分兑换绿分</view>
			<view class="head_box flex align-center justify-center">
				<view class="all-box flex flex-column justify-center">
					<text
						class="all-num text-center ft333333">{{(getUser && Number(getUser.available_integral).toFixed(2)) || 0}}</text>
					<text class="all-title mb-3 text-center fs-28 ft666666">当前工分</text>
				</view>
			</view>
			<view class="py-3">
				<view class="flex u-font-xl font-weight-bold mb-1 fs-32 ft666666">
					请输入兑换分数
				</view>
				<view class="flex rounded justify-center border-bottom" style="border-color: #E6E6E6;">
					 <input
						placeholder="0.00"
						:border="true"
						type="number"
						v-model="turn_yinfen"
						style="height: 100rpx;width:100%;"
						placeholder-style="font-size:50rpx"
						@input="changeInput"
					  ></input>
				</view>
				<view class="flex u-font-xl font-weight-bold mb-1 fs-32 ft666666 mt-4">
					需支付金额
				</view>
				<view class="flex align-center rounded justify-center border-bottom" style="border-color: #E6E6E6;">
					<text class="fs-32 mr-1">¥</text>
					<view class="flex-1">
						<input
							placeholder="0.00"
							:border="true"
							v-model="moneyValue"
							disabled
							type="number"
							class="fs-48"
							style="height: 100rpx;width:100%;"
							placeholder-style="font-size:50rpx"
						 ></input>
					</view>
				</view>
			
				<view class="position-fixed left-0 right-0" style="bottom: 5vh;">
					<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded-circle mx-3" @click="openway">确认转换
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
		onShow() {
			this.$refs.payconfig && this.$refs.payconfig.argumentsFn()
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
