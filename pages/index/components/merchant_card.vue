
<template>
	<view class="rounded bgffffff flex p-2 mx-2 mb-2">
		<view class="flex">
			<image class="bgF5F5F5" :src="item.merchantappend && item.merchantappend.title_icon" mode="aspectFill" style="width: 200rpx;height: 200rpx;"></image>
		</view>
		<view class="flex-1 ml-2">
			<view class="fs-32 font-weight-bold ft333333 mb-1">{{item.merchant_name}}</view>
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<tui-rate :current="Number(item.score)" :size="16" active="#EA4E3D"></tui-rate>
					<text class="ml-1 ftEA4E3D fs-28">{{item.score}}</text>
				</view>
				<text class="ft666666 fs-28">￥{{item.avg_price}}/人</text>
			</view>
			<view class="ft666666 flex align-center justify-between my-1">
				<text class="fs-26">月售 {{item.sales_volume_month}}</text>
				<text class="fs-26">距离{{item.distance}}km</text>
			</view>
			<view class="fs-28 ft666666">{{item.tag_title}}</view>
		</view>
	</view>
</template>

<script>
	import tuiRate from "@/components/tui-rate/tui-rate.vue"
	export default {
		components: { tuiRate },
		props:{
			item:{
				type:Object,
				default:() => {}
			}
		},
		data(){
			return {
				current:1,
			}
		}
	}
</script>

<style>
</style>