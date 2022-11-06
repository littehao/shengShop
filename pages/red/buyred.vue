<template>
	<view class="buyred bgF5F5F5 h-100vh">
		<comHead backshow titleshow title="" class="border-bottom"></comHead>
		<view class="px-2 pt-3">
			<view class="fs-52 font-weight-bold ft333333" style="margin-bottom: 100rpx;">购买红包</view>
			<view class="flex u-font-xl font-weight-bold mb-3 fs-32 ft666666">
				选择购买个数
			</view>
			<view class="flex flex-wrap mb-4">
				<block v-for="item in redNum" :key="item">
					<view class="flex fte9b461 mb-3 justify-center" style="width: 33%;" @tap="selectNum(item)">
						<text class="border py-4 text-center rounded fs-36" :class="red_count == item?'bde9b461 bgEA4E3Da ftEA4E3D':'ft333333 bgEDEDED'" 
						style="width: 200rpx;">{{item}}</text>
					</view>
				</block>
			</view>
			
			<view class="flex u-font-xl font-weight-bold mb-2 fs-32 ft666666">
				需要支付的金额
			</view>
			<view class="flex align-center rounded justify-center border-bottom" style="border-color: #E6E6E6;">
				<text class="fs-32 mr-2">¥</text>
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
			
			<view class="flex u-font-xl font-weight-bold mt-5 mb-1 fs-32 ft666666">
				购买说明
			</view>
			<view class="flex flex-column u-font-lg ft999999">
				<view class="mb-1">1.红包{{getConfig.hongbaomoney || 0}}元/个</view>
				<view>2.请酌情购买，一旦购买，不可退还</view>
			</view>
			
			<view class="position-fixed left-0 right-0" style="bottom: 5vh;">
				<view class="flex justify-center py-3 btnBg ftffffff font-weight-bold rounded-circle mx-3" @click="openway">立即购买
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
		onShow() {
			this.$refs.payconfig && this.$refs.payconfig.argumentsFn()
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
				this.$refs.payconfig && this.$refs.payconfig.close();
			},
			selectNum(item) {
				this.red_count =  item
				this.payNum = Number(item) * Number(this.getConfig.hongbaomoney || 1)
				this.moneyValue = (Number(item) * Number(this.getConfig.hongbaomoney || 1)).toFixed(2)
			},
			// buySuccess(){
			// 	this.red_count = 0
			// 	this.moneyValue = ''
			// }
		}
	}
</script>

<style lang="scss" scoped>

</style>
