<template>
	<view>
		<view class="flex align-center justify-between mx-2 pt-4 pb-2">
			<view>
				<image src="/static/images/seckill_title.png" mode="widthFix" style="width: 170rpx;"></image>
			</view>
			<text class="ft999999 fs-28" @tap="navTo('/pages/class/class-shoplist?title=秒杀专区&gc_id=0')">更多></text>
		</view>
		<view class="horizontal_list mx-2">
			<scroll-view :scroll-x="true" style="white-space: nowrap;">
				<view class="w-100 flex">
					<block v-for="(item,index) in goldengoods" :key="index">
						<view class="flex flex-column bgffffff rounded text-center mr-2 pb-2" style="width: 180rpx;">
							<view class="bgF5F5F5 rounded-top">
								<image class="rounded-top" :src="item.img" mode="scaleToFill" style="width: 180rpx;height: 180rpx;"></image>
							</view>
							<view class="flex align-center fs-24 justify-center mt-1">¥<text class="fs-30 font-weight-bold">{{item.sale_price}}</text></view>
							<view class="mx-auto bgF5F5F5 rounded-circle fs-24 px-2 ft999999">专区价</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		
		<view class="flex align-center justify-between mx-2 pt-4 pb-2">
			<view>
				<image src="/static/images/par_title.png" mode="widthFix" style="width: 170rpx;"></image>
			</view>
			<text class="ft999999 fs-28" @tap="navTo('/pages/class/class-shoplist?title=平价专区&gc_id=0')">更多></text>
		</view>
		<view class="horizontal_list mx-2">
			<scroll-view :scroll-x="true" style="white-space: nowrap;">
				<view class="w-100 flex">
					<block v-for="(item,index) in goldengoods" :key="index">
						<view class="flex flex-column bgffffff rounded text-center mr-2 pb-2" style="width: 180rpx;">
							<view class="bgF5F5F5 rounded-top">
								<image class="rounded-top" :src="item.img" mode="scaleToFill" style="width: 180rpx;height: 180rpx;"></image>
							</view>
							<view class="flex align-center fs-24 justify-center mt-1">¥<text class="fs-30 font-weight-bold">{{item.sale_price}}</text></view>
							<view class="mx-auto bgF5F5F5 rounded-circle fs-24 px-2 ft999999">专区价</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			goldengoods:{
				type:Array,
				default:() => []
			}
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
</style>