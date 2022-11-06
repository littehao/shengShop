<template>
	<view>
		<view class="flex align-center justify-center pt-5 mt-2">
			<image src="/static/images/home_more.png" mode="widthFix" style="width: 260rpx;"></image>
		</view>
		<view class="position-relative" style="padding-top: 10px;min-height: 610px;">
			<goodsCard :wfList='dataList'></goodsCard>
			<null-data v-if="dataList.length == 0" class="mx-auto"
				style="height: 100px;width: 100px;margin-bottom: 50px;"></null-data>
			<loading ref="shoploading"></loading>
		</view>
	</view>
</template>

<script>
	import nullData from "@/components/null-data/index.vue";
	import loading from "@/components/loading/loading.vue";
	import goodsCard from '@/components/goodsCard/goodsCard.vue';
	export default {
		components:{nullData,loading,goodsCard},
		props:{
			dataList:{
				type:Array,
				default:() => []
			}
		}
	}
</script>

<style>
</style>