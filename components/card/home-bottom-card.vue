<template>
	<view class="shop_card flex flex-column bgffff rounded-lg  mb-2  pb-3 boxsizing" @click="navTo">
		<image style="width: 100%;height: 330rpx;" class="mx-auto mb-2 bgf4f4 rounded-top-lg bgffff" :src="isImg"
			mode="aspectFill"></image>
		<view class="px-2 mb-2">
			<text class="fs-26 ft3333 mb-1 text-ellipsis2" style="height: 72rpx;">{{item.goods_name}}</text>
		</view>
		<view class="px-2 mt-1" v-if="Number(item.integral || 0) > 0"><text style="border-color: #F15050;"
				class="ft5050 border rounded px-1 fs-24">赠送贡献值{{Number(item.integral || 0)}}</text></view>
		<view class="flex align-center px-2">
			<text class="fs-40 ft5050 font-weight-bold mr-1"><text class="fs-20">￥</text>{{item.sale_price}}</text>
			<text class="fs-24 ft8385 text-through">￥{{item.price}}</text>
		</view>
		
		<!-- <view class="px-2 mt-1" v-if="Number(item.contribution_integral) > 0"><text class="ft5050 rounded fs-24">抵扣{{Number(item.contribution_integral)}}u豆</text></view> -->
	</view>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return {

			}
		},
		computed: {
			isImg() {
				let {
					item: {
						img
					}
				} = this;
				if (Array.isArray(img)) {
					return this.item.img[0];
				} else {
					return this.item.img;
				}
			}
		},
		methods: {
			navTo() {
				uni.navigateTo({
					url: "/pages/goods-details/goods-details?id=" + this.item.goods_id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.shop_card {
		width: 49%;

		.price {
			height: 30rpx;
			line-height: 30rpx;
			border-radius: 6rpx;
		}
	}
</style>
