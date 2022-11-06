<template>
	<view class="home-page bgF5F5F5">
		<com-head :backshow="true" :titleshow="true" title="我的店铺" color='#fff' bgcolor="transparent" class="topfiexd header-bg"></com-head>
		<view class="home-main p-2" v-if="getUser">
			<view class="flex justify-start align-center mb-2">
				<image src="../../static/images/logo.png" mode="aspectFill" class="rounded-circle" style="width: 108rpx;height: 108rpx;"></image>
				<view class="pl-2 ftffff flex-1">
					<view class="fs-32 mb-1">{{merchantInfo.merchant_name}}</view>
					<view class="fs-24">地址：{{merchantInfo.detail_address}}</view>
				</view>
			</view>
			<view class="flex align-center my-5 rounded bgffffff p-3">
				<text class="fs-32 border-right text-center" style="width: 100rpx;">余额</text>
				<text class="fs-40 font-weight-bold flex-1 ml-2 ft3d3c">{{Number(merchantInfo.merchant_wallet || 0).toFixed(2)}}</text>
			</view>
			<view class="pb-4 pt-2 bgffff rounded mb-3">
				<view class="mb-3 fs-36 pl-4">今日数据统计</view>
				<view class="flex justify-around align-center ">
					<view class="text-center ft333333">
						<view class="mb-2 fs-36">￥{{merchantInfo.totalInfo && merchantInfo.totalInfo.today_total_money}}</view>
						<view class="fs-28">今日销售额</view>
					</view>
					<view class="text-center ft333333">
						<view class="mb-2 fs-36">{{merchantInfo.totalInfo &&  merchantInfo.totalInfo.today_total_count}}</view>
						<view class="fs-28">今日订单数</view>
					</view>
				</view>
			</view>
			<view class="bgffff rounded p-3 mb-2">
				<view class="ft3333 fs-36">累计数据统计</view>
				<view class="py-2 flex justify-around align-center">
					<view class="text-center">
						<view class="mb-2 fs-40  ft3d3c"><text class="fs-24">￥</text>{{merchantInfo.totalInfo && merchantInfo.totalInfo.total_money}}</view>
						<view class="fta0a0 fs-28">累计销售额</view>
					</view>
					<view class="line"></view>
					<view class="text-center">
						<view class="mb-2 fs-40  ft3d3c">{{merchantInfo.totalInfo && merchantInfo.totalInfo.total_count}}</view>
						<view class="fta0a0 fs-28">累计订单数</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from "vuex";
	import merchantApi from '@/api/merchantApi.js'
	import comHead from "@/components/header/index.vue";
	import nullData from '@/components/null-data/index.vue'
	import loading from "@/components/loading/loading.vue";
	export default {
		components:{
			comHead,
			nullData,
			loading
		},
		data() {
			return {
				title: 'Hello',
				activenum:0,
				merchantInfo:{}
			}
		},
		created() {
			this.getmyMerchant()
		},
		computed:{
			...mapGetters(['getUser'])
		},
		methods: {
			getmyMerchant(){
				merchantApi.getDmerchantInfo().then(res => {
					this.merchantInfo = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.home-page{
		height: 100%;
		overflow-y: auto;
		.home-main{
			background-image: url(../../static/images/stores/theme-bg.png);
			background-size: 100%;
			background-position: center -44px;
			background-repeat: no-repeat;
		}
		.header-bg{
			background-image: url(../../static/images/stores/theme-bg.png);
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center top;
		}
		.box-wh{
			padding: 8rpx 6rpx;
			background-color: rgba(226,61,60,.5);
			color: #E23D3C;
		}
		.active-style{
			background-color: #E23D3C;
			color: #fff;
		}
		.line{
			height: 80rpx;
			width: 1rpx;
			background-color: #EDEDED;
			border-radius: 8rpx;
		}
		.not-border{
			&:nth-last-of-type(1){
				border: 0;
			}
		}
	}
</style>
