<template>
	<view class="orcard-comp px-3 py-2 bgffff rounded-lg mb-2">
		<view class="fs-24 flex justify-between align-start ft3333 pb-1">
			<text class="fs-32  flex-1 pr-5 d-block text-bold">{{goods_name}}</text>
			<view class="">
				<text class="d-block ft-purple">{{data.status}}</text>
			</view>
		</view>
		<view v-if="data.goods && data.goods.length>1" @click="navTo(1)">
			<scroll-view class="w-100" :scroll-x="true" style="white-space: nowrap;">
				<block v-for="(item,index) in data.goods">
					<image :src="item.img" class="rounded-lg mr-1 d-inline-block" mode=""
						style="width: 164rpx;height:164rpx"></image>
				</block>
			</scroll-view>
		</view>
		<view class="flex justify-start" @click="navTo()" v-else>
			<image :src="data.goods[0].img" class="d-block rounded-lg " mode="scaleToFill"
				style="width: 164rpx;height:164rpx"></image>
			<view class="pl-3  flex-1">
				<view class="ft3333 fs-28 mb-1 line">{{data.goods[0].goods_name||'-'}}</view>
				<view class="mb-1" v-if="data.goods[0].specs">
					<text class="fs-20 ft3333 bgf4f4 rounded goods-rule px-2">{{Object.values(data.goods[0].specs.specs).join(' ')}}</text>
				</view>
				<view class="ft3333 fs-24 py">数量：<text class="">x{{data.total_num}}</text></view>
				<view class="ft3333 fs-24 py">单价：<text class="ftED3C">￥{{data.goods?data.goods[0].unit_price:null}}</text></view>
			</view>
		</view>
		<view class="fta0a0 fs-24 text-right pt-3 pb-1">共{{data.total_num}}件</view>
		<view class="pb-2 flex justify-between align-center">
			<text class="fs-24 ft3333">下单时间：{{data.created_at}}</text>
			<text class="fs-32 ftED3C"><text class="fs-24 ftED3C">￥</text>{{data.order_amount}}</text>
		</view>
		<view class="flex justify-end align-center" v-if="data.status==='待付款'">
			<view class="rounded-circle fs-24   boxsizing border btn-whr flex justify-center align-center"
				@click="clickCancel()">取消订单</view>
			<view class="fs-24 ftffffff ml-2 mr-1 rounded-circle btnBg btn-whr  flex justify-center align-center"
				@click="clickPayment()">立即付款</view>
		</view>
		<view class="flex justify-end align-center" v-if="data.status==='待收货'">
			<view class="py-1 px-2 rounded-circle fs-24 ft3333 border flex justify-center align-center border-secondary"
				@click="clickCollect()">确认收货</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	export default {
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				// contents: "是否确认取消订单？",
				// title:'订单取消',
				
			}
		},
		computed: {
			goods_name() {
				let {
					data
				} = this;
				if (data.goods && data.goods.length > 1) {
					return data.merchant_name
				} else {
					if (data.status === '待付款') {
						return data.goods ? data.goods[0].merchant_name : 'UU';
					} else {
						return data.merchant_name;
					}
				}
			},
		},
		methods: {
			...mapActions(['orderCancle','orderReturnGoods']),
			navTo(val) {
				uni.navigateTo({
					url: `/pages/order/Orderdetail?order_no=${this.data.order_no}&merchant_id=${this.data.merchant_id}&status=${this.data.status}`,
				})
			},
			clickPayment() {
				this.$emit('openup',{order_no:this.data.order_no,goodsPayNum:this.data.order_amount});
			},
			clickCancel() {
				console.log(this.data.status);
				this.$emit('Open',{title:'订单取消',contents:'是否确认取消订单？',order_no:this.data.order_no,status:this.data.status});
				// this.$refs.dialog.open();
			},
			clickCollect(){
				this.$emit('Open',{title:'确认收货',contents:'请收到商品确认无误后再确认收货',order_no:this.data.order_no,status:this.data.status,merchant_id:this.data.merchant_id});
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.dialog.close()
			}
		}
	}
</script>

<style lang="less">
	.orcard-comp {
		.btn-whr {
			width: 130rpx;
			height: 54rpx;
		}
		.line{
			  text-overflow: -o-ellipsis-lastline;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  display: -webkit-box;
			  -webkit-line-clamp: 2;
			  line-clamp: 2;
			  -webkit-box-orient: vertical;
			  white-space: pre-wrap;
		}
	}
	
</style>
