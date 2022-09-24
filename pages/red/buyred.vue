<template>
	<view class="buyred bgf4f4 h-100vh">
		<comHead backshow titleshow title="买红包" bgcolor="#fff" class="border-bottom"></comHead>
		<view class="px-2 pt-3">
			<view class="flex u-font-xl font-weight-bold mb-3 fs-32">
				购买红包个数选择
			</view>
			<view class="flex flex-wrap mb-4">
				<block v-for="item in redNum" :key="item">
					<view class="flex fte9b461 mb-3 justify-center" style="width: 33%;" @tap="selectNum(item)">
						<text class="border bde9b461 py-2 text-center rounded fs-28" :class="red_count == item?'bg3d3c ftffffff':'fte9b461'" 
						style="width: 150rpx;">{{item}}</text>
					</view>
				</block>
			</view>
			
			<view class="flex u-font-xl font-weight-bold mb-3 fs-32">
				需支付金额
			</view>
			<view class="flex bgffff rounded py-2 justify-center font-weight-bold fs-32">{{moneyValue || placeholder}}</view>
			
			<view class="flex u-font-xl font-weight-bold mt-5 mb-3 fs-32">
				购买说明
			</view>
			<view class="flex flex-column u-font-lg ft999999">
				<view class="mb-1">1.红包{{getConfig.hongbaomoney || 0}}元/个</view>
				<view>2.请酌情购买，一旦购买，不可退还</view>
			</view>
			
			<view style="margin-top: 100rpx;">
				<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded" @click="openway">立即购买
				</view>
			</view>
		</view>
		
		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="Number(payNum)"
		fromType="buyRed"
		payType="2"
		:redCount="red_count"
		@buySuccess="buySuccess"
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
	export default {
		components:{ payconfig, comHead },
		data() {
			return {
				redNum: [1, 2, 5, 10, 20, 50],
				placeholder: '选择红包数量自动计算',
				moneyValue: '',
				payList: [],
				way: null,
				payNum: 0,
				checkeindex: 0,
				red_count:0,
			}
		},
		computed: {
			...mapGetters(['getUser', 'getbottom', 'getToken', 'getConfig'])
		},
		methods: {
			openway() {
				if (!this.moneyValue) {
					uni.showToast({
						title: '请选择红包个数',
						icon: 'none'
					})
					return;
				}
				this.$refs.payconfig.open();
			},
			close() {
				this.$refs.payconfig.close();
			},
			selectNum(item) {
				this.red_count =  item
				this.payNum = Number(item) * Number(this.getConfig.hongbaomoney || 1)
				this.moneyValue = '¥ ' + (Number(item) * Number(this.getConfig.hongbaomoney || 1)).toFixed(2)
			},
			buySuccess(){
				this.red_count = 0
				this.moneyValue = ''
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
