<template>
	<view class="">
		<uni-popup ref="pay" type="bottom" :mask-click="false" style="z-index: 999;">
			<view class="pay-way bgffff">
				<view class="position-relative">
					<text class="iconfont icon-cuowu fs-56 fta0a0 position-absolute left-0 top-0 mt-2 ml-2" @click="close"></text>
					<text class="py-4 flex justify-center align-center fs-36 font-weight-bold"> 选择支付方式</text>
				</view>
				<view class="flex align-center justify-center ft3d3c border-bottom">
					<text class="fs-36">¥</text><text class="fs-60">{{Number(goodsPayNum).toFixed(2)}}</text>
				</view>
				<block v-for="(item,index) in payList" :key="index">
					<view class="px-2 flex align-center" @click="checkeFn(index)">
						<image v-if="item.name.includes('支付宝')" style="width: 37rpx;height: 37rpx;" class="flex mr-1"
							src="/static/images/payway2.png" mode="widthFix"></image>
						<image v-if="item.name.includes('微信')" style="width: 37rpx;height: 37rpx;" class="flex mr-1"
							src="/static/images/wx_hy.png" mode="widthFix"></image>
						<image v-if="item.pay_code == 2 || item.pay_code == 5" style="width: 37rpx;height: 37rpx;"
							class="flex mr-1" src="/static/images/payway3.png" mode="widthFix"></image>
						<image v-if="item.name.includes('小店')" style="width: 37rpx;height: 37rpx;" class="flex mr-1"
							src="/static/images/payway1.png" mode="widthFix"></image>
						<image v-if="item.name.includes('代付')" style="width: 37rpx;height: 37rpx;" class="flex mr-1"
							src="/static/imgs/replace_payment.png" mode="widthFix"></image>
						<image v-if="item.name.includes('银')" style="width: 37rpx;height: 37rpx;" class="flex mr-1"
							src="/static/images/yinlianzhifu.png" mode="widthFix"></image>
						<view class="flex-1  border-bottom py-3 flex align-center justify-between">
							<text
								class="fs-28 ft3333 flex-1">{{item.name}}{{(item.pay_code == 2 || item.pay_code == 5)?`（￥${Number(item.money)|| '0.00'}）`:''}}</text>
							<text class="checkbox checke" :class="{checked:checkeindex == index}"></text>
						</view>
					</view>
				</block>
				<view class="mx-2 py-2 rounded-circle fs-28  ftffff btnBg flex align-center justify-center mt-3" @click="paying">立即支付</view>
				<view :style="{height: (getbottom + 20)+'px'}"></view>
			</view>
		</uni-popup>
		<!--打开密码支付-->
		<paypwd ref="pwd" @submit="pwdPay" :paynum="Number(goodsPayNum).toFixed(2)"></paypwd>
	</view>
</template>

<script>
	import payApi from '@/api/payApi.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex';
	import paypwd from '@/components/pay-modal/paypwd.vue';
	import config from '@/config/index.js';
	import mixins from './mixins.js'
	export default {
		mixins:[mixins],
		components: {
			paypwd
		},
		props: {
			goodsPayNum:{
				type:[String,Number],
				default:'0.00'
			},
			payType: { //需要支付的类型
				type: String,
				default: ""
			},
			fromType:{//来自哪个功能的支付
				type: String,
				default: ""
			},
			orderNo:{//订单号
				type: String,
				default: ""
			},
			address:{
				type:Object,
				default:() => {}
			},
			cartList:{
				type:Array,
				default:() => []
			},
			redCount:{//红包数量
				type:Number,
				default:0
			},
			turnYinfen:{//工分转换绿分
				type:[String,Number],
				default:0
			},
			memberCode:{//商户号
				type:[String,Number],
				default:0
			},
			authcode:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				checkeindex: 0,
				payList: [],
				way: null,
				act_password: null,
				order_no: ""
			}
		},
		computed: {
			...mapGetters(['getUser', 'getbottom', 'getToken']),
		},
		created() {
			this.payFlag =  true;
			this.getPayConfigList();
		},
		methods: {
			argumentsFn(){
				// #ifdef APP-PLUS
					setTimeout(() => {
						var param = plus.runtime.arguments;
						console.log(param)
						if (param != ''){
							if(param == 'success'){
								uni.$tools.toast('支付成功')
							} else {
								uni.$tools.toast('支付失败')
							}
							this.close()
							plus.runtime.arguments = null;
							plus.runtime.arguments = "";
						}
					},200)
				// #endif
			},
			close() {
				this.$refs.pay.close();
				this.act_password = null;
				this.checkeindex = 0;
			},
			open() {
				this.$refs.pay.open();
			},
			getPayConfigList() {
				let data = {}
				// #ifdef APP-PLUS
					data.pay_scene = 2
				// #endif
				
				// #ifdef H5
					data.pay_scene = 1
				// #endif
				if (this.payType) data.shopType = this.payType
				// console.log(data)
				payApi.payConfigList(data).then(res => {
					this.payList = res.data
					if (this.payList.length > 0)
						this.way = this.payList[0]
				})
			},
			checkeFn(index) {
				this.checkeindex = index;
				if (index != 100) {
					this.way = this.payList[index];
				} else {
					this.way = null;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-h {
		height: 50vh;
	}

	.btn-wh {
		height: 70rpx;
		border-radius: 35rpx;
	}
</style>
