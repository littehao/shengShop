<template>
	<view class="order-page h-100vh bgF5F5F5 flex flex-column">
		<com-head :titleshow="true" title="订单管理" :backshow="true" bgcolor="#fff"></com-head>
		<v-tabs v-model="model" activeColor="#E7331F" class="topfiexd border-bottom border-top" :tabs="tabs"
			field="name" @change="changeTab" :lineColor="'url(' + require('../../static/images/tabs-line.png') + ')'">
		</v-tabs>
		<view class="flex-1 h-1">
			<comscroll
			ref="comscroll"
			@loadData="loadData"
			:isSuccess="isSuccess"
			:datalen="datalen"
	>
				<view class="py-3 px-2 order-main boxsizing">
					<view class="" v-if="status===1 || status===0">
						<block v-for="(item,index) in payList" :key="index">
							<order-card @openup="openup" :data='item' @Open="operation"></order-card>
						</block>
						<null-data v-if="payList.length == 0 && status == 1" class="order-main"></null-data>
					</view>
					<view class="" v-if="status !== 1">
						<block v-for="(item,index) in chantList" :key="index">
							<order-card @openup="openup" :data='item' @Open="operation"></order-card>
						</block>
						<null-data v-if="chantList.length == 0" class="order-main"></null-data>
					</view>
				</view>
			</comscroll>
		</view>
		<!--支付-->
		<payconfig 
		ref="payconfig" 
		:goodsPayNum="parameter.goodsPayNum" 
		:orderNo="parameter.order_no" 
		payType='1'
		@loadData="Refresh" 
		fromType="orderList"></payconfig>
		
		<uni-popup ref="dialog" type="dialog" style="z-index: 999999;">
			<uni-popup-dialog mode="base" :title="title" type="info" confirmcolor="#E7331F" :duration="2000"
				:before-close="true" @close="Close" @confirm="confirm" :content="contents"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	import myApi from '@/api/myApi.js'
	import Loading from "@/components/loading/loading.vue";
	import nullData from "@/components/null-data/index.vue";
	import vTabs from "@/components/v-tabs/v-tabs.vue";
	import comHead from "@/components/header/index.vue";
	import orderCard from "./components/Orcard.vue";
	import payconfig from "@/components/pay-modal/payconfig.vue";
	let merchant_id = null;
	export default {
		components: {
			comHead,
			orderCard,
			vTabs,
			nullData,
			Loading,
			payconfig
		},
		data() {
			return {
				page: 0,
				tabs: [{
						name: '全部'
					},
					{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '已签收'
					},
					{
						name: '已取消'
					},
				],
				payList: [],
				chantList: [],
				status: 0, // 请求参数
				model: 0, // tabs v-model 
				parameter: {},
				contents: "是否确认取消订单？",
				title: '订单取消',
				order_no: null,
				status_item: null,
				argumentsData: null, //微信订单提交返回app
				isSuccess:false,
				datalen:0,
			};
		},
		onLoad(option) {
			this.model = Number(option.index);
			// 判断进入指定的选项 状态
			if (this.model >= 3) {
				this.status = this.model - 1;
			} else {
				if (this.model == 2) {
					this.status = 6;
				} else {
					this.status = this.model;
				}
			}
		},
		onShow() {
			this.$refs.payconfig && this.$refs.payconfig.argumentsFn()
		},
		mounted() {
			this.$refs.comscroll.downCallback()
			// this.$refs.payconfig.open()
		},
		methods: {
			Refresh(){
				this.$refs.comscroll.downCallback()
			},
			loadData(page){
				if (this.model === 0 || this.model === 1) {
					this.getNoPayOrder();
				}
				if(this.model !== 1)this.getOrderMerchantGoods(page)
			},
			//切换tab
			changeTab(index) {
				this.model = index;
				if (index >= 3) {
					this.status = index - 1;
				} else {
					if (index == 2) {
						this.status = 6;
					} else {
						this.status = index;
					}
				}
				if (index === 0 || index === 1)this.getNoPayOrder();
				if(index !== 1)this.$refs.comscroll.downCallback()
			},
			//除待付款外的其他订单
			getOrderMerchantGoods(page) {
				let data = {
					status:this.status,
					page: page,
					limit: 10
				}
				this.isSuccess = false
				myApi.getOrderMerchantGoods(data).then(res => {
					let list = res.data
					this.isSuccess = true
					this.datalen = list.length
					if(page == 1){
						this.chantList = list
					} else {
						this.chantList = this.chantList.concat(list) 
					}
				})
			},
			//待付款订单列表
			getNoPayOrder() {
				this.isSuccess = false
				myApi.getNoPayOrder().then(res => {
					let list = res.data;
					this.isSuccess = true
					this.datalen = list.length
					this.payList = list;
				})
			},
			//打开支付弹框
			openup(parameter) {
				this.parameter = parameter;
				this.$refs.payconfig.open()
			},
			operation(val) {
				this.title = val.title;
				this.contents = val.contents;
				this.order_no = val.order_no;
				this.status_item = val.status;
				if (val.merchant_id) {
					merchant_id = val.merchant_id;
				}
				this.$refs.dialog.open();
			},
			Close() {
				this.$refs.dialog.close();
			},
			async confirm(value) {
				try {
					uni.showLoading({
						title: this.status_item == '待付款' ? '取消中...' : '加载中...'
					})
					let res = null;
					if (this.status_item == '待付款') {
						res = await myApi.orderCancle({
							order_no: this.order_no
						});
					} else if (this.status_item == '待收货') {
						res = await myApi.confirmReceipt({
							order_no: this.order_no,
							merchant_id
						});
					}
					uni.hideLoading();
					if (res.code == '200') {
						let _this = this;
						uni.showToast({
							title: _this.status_item == '待付款' ? '取消成功' : '收货成功',
						});
						this.Refresh();
						this.$refs.dialog.close();
						this.title = "";
						this.contents = "";
						this.order_no = null,
						this.status_item = null
					}
				} catch (e) {
					this.title = "";
					this.contents = "";
					this.order_no = null,
					this.status_item = null
					this.$refs.dialog.close();
					uni.showToast({
						title: e.msg,
						icon: 'none'
					});
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="less">
	.order-page {
		.order-main {
			background-color: #F4F4F4;
			min-height: calc(100vh - 95px - var(--status-bar-height));
		}

		.tab-w {
			width: 130rpx;
		}

		.popup-h {
			height: 50vh;
		}

		.default-bg {
			background: url(../../static/images/checke.png) no-repeat center center;
			background-size: 32rpx 32rpx;
		}

		.Select {
			background: url(../../static/images/checked.png) no-repeat center center;
			background-size: 32rpx 32rpx;
		}

		.btn-wh {
			height: 70rpx;
			border-radius: 35rpx;
		}

	}
</style>
