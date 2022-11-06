<template>
	<view class="cash-page bgf4f4">
		<com-head :titleshow="true" title="充值消费劵" :backshow="true" bgcolor="#fff"></com-head>
		<view class="profitout-main main-pt px-3">
			<view class="bgffff rounded overflow-hidden">
				<view class="flex justify-between align-center px-3 py-4 bgEDED">
					<view class="fs-28" style="min-width: 100rpx;">我的消费劵</view>
					<view class="flex justify-end flex-1">
						<view class="fta0a0 fs-36">{{(getUser && Number(getUser.with_draw_balance).toFixed(2)) || 0}}</view>
					</view>
				</view>
				<view class="px-3 py-4">
					<view class="fs-24">充值金额</view>
					<view class="flex py-4 justify-between align-center border-bottom border-light-secondary">
						<view class="fs-56 flex-1 flex align-center">￥<input type="number" v-model="money"
								class="flex-1 flex" placeholder="请输入充值金额" placeholder-class="placeholder" /></view>
					</view>
					<view class="position-fixed left-0 right-0" style="bottom: 5vh;">
						<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded-circle mx-3" @click="openway">充值
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="Number(money)" 
		fromType="rechargeJuan" 
		payType='3'
		></payconfig>
	</view>
</template>

<script>
	import comHead from "@/components/header/index.vue";
	import payconfig from "@/components/pay-modal/payconfig.vue";
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		components: {
			comHead,
			payconfig
		},
		data() {
			return {
				money: "",
			}
		},
		onLoad(query) {
			this.from = query.from
		},
		onShow() {
			this.$refs.payconfig && this.$refs.payconfig.argumentsFn()
		},
		computed: {
			...mapGetters(['getToken', 'getUser', 'getConfig','getbottom']),
		},
		methods: {
			openway() {
				if (!this.money) {
					uni.showToast({
						title: '请输入充值金额',
						icon: 'none'
					})
					return;
				}
				this.$refs.payconfig.open();
			},
			close() {
				this.$refs.payconfig.close();
			}
		},
	}
</script>

<style lang="less" scoped>
	.cash-page {
		height: 100vh;

		.main-pt {
			padding-top: 75rpx;
		}

		.btn-style {
			height: 84rpx;
			line-height: 84rpx;
			margin-top: 85rpx;
			border-radius: 42rpx;
		}

		.addWay {
			border: 1px solid #E2231A;
			height: 40px;
		}
	}
</style>
