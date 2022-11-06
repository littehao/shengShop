<template>
	<view class="shop_card flex flex-column bgffff rounded-lg pb-3 boxsizing" id="box_img">
		<view @click="navTo">
			<view class="Img bgffff overflow-hidden rounded-top-lg boxsizing" :style="{height:boxHeight + 'px'}">
				<image style="width:100%;" class="mx-auto mb-2 bgF5F5F5 rounded-top-lg d-block" :src="isImg"
					mode="widthFix" fade-show lazy-load @load="ImageLoad"></image>
			</view>
			<view class="px-2 pt-2 mb-1">
				<text class="fs-26 ft3333 text-ellipsis2">{{item.goods_name}}</text>
			</view>
			<view class="flex align-center px-2">
				<text class="fs-40 ft5050 font-weight-bold mr-1"><text class="fs-20">￥</text>{{item.sale_price}}</text>
				<text class="fs-24 ft8385 text-through">￥{{item.price}}</text>
			</view>
			<view class="mt-1 flex align-center pl-2" v-if="Number(item.integral || 0) > 0">
				<image src="/static/images/contribution_icon.png" mode="widthFix" style="width: 40rpx;height: 28rpx;"></image>
				<text class="fs-24 ftE47D44 ml-1">赠送贡献值:</text>
				<text class="ftE47D44 rounded fs-28 font-weight-bold">{{Number(item.integral || 0).toFixed(2)}}</text>
			</view>
		</view>
		<view class="flex algin-center px-2 mt-2" v-if="item.recommend_goods">
			<block v-for="(gs,index) in item.recommend_goods" :key="index">
				<view style="width: 74rpx;height: 74rpx;" class="mr-1" @click="toGoods(gs.goods_id)">
					<image style="width: 74rpx;height: 74rpx;" class="rounded flex bgF5F5F5" :src="gs.img"
						mode="aspectFill"></image>
				</view>
			</block>
			<view class="ml-2 flex flex-column justify-center" @click="toShop">
				<image style="width: 20px;" src="/static/imgs/more.png" class="flex mx-auto" mode="widthFix"></image>
				<view class="fs-24 ft8385" style="margin-top: -8rpx;">更多</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getImageInfo
	} from "@/utils/common.js";
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				boxHeight: 240,
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
			},
		},
		methods: {
			navTo() {
				uni.navigateTo({
					url: "/pages/goods-details/goods-details?id=" + this.item.goods_id
				})
			},
			toGoods(goods_id) {
				uni.navigateTo({
					url: "/pages/goods-details/goods-details?id=" + goods_id
				})
			},
			toShop() {
				uni.navigateTo({
					url: "/pages/goods-details/store-details?merchant_id=" + this.item.merchant_id
				})
			},
			ImageLoad(e) {

			},
			async getImageInfo() {
				let _this = this;
				let res = await getImageInfo(this.item.img);
				let ImageWidth = res.width;
				let ImageHeight = res.height;
				const query = uni.createSelectorQuery().in(this);
				query.select('#box_img').boundingClientRect(res => {
					let widths = res.width;
					let boxHeight = widths * (ImageHeight / ImageWidth);
					_this.boxHeight = boxHeight;
				}).exec();
			}
		},
		mounted() {
			this.getImageInfo();
		},
	}
</script>

<style lang="scss">
	.community-card {
		.Img {
			width: 100%;
			// image{
			// 	display: block;
			// 	width: 100%;
			// }
		}

		.line {
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			white-space: pre-wrap;
		}

		.Info {
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 6rpx;
			}
		}

		.radius {
			border-radius: 50%;
		}
	}
</style>
