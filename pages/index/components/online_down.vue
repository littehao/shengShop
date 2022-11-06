<template>
	<view>
		<view class="px-2 tabfiexd border-bottom border-top" style="top: calc(65px + var(--status-bar-height));" >
			<v-tabs v-model="model" activeColor="#E7331F" bgColor="#F5F5F5" :tabs="tabsList"
				field="name" @change="clickTab" lineColor="#E7331F" lineHeight="3px" :lineScale="0.3" height="50px" width="25%" :fontbold="true">
			</v-tabs>
		</view>
		<view class="position-relative" style="padding-top: 10px;min-height: 400rpx;">
			<block v-for="(item,index) in dataList" :key="index">
				<merchantCard :item='item' @tap.native="navTo(`/pages/offline-merchants-details/offline-merchants-details?id=${item.id}`)"></merchantCard>
			</block>
			<null-data v-if="dataList.length == 0" class="mx-auto"
				style="height: 100px;width: 100px;margin-bottom: 50px;"></null-data>
			<loading ref="shoploading"></loading>
		</view>
	</view>
</template>

<script>
	import nullData from "@/components/null-data/index.vue";
	import loading from "@/components/loading/loading.vue";
	import vTabs from "@/components/v-tabs/v-tabs.vue";
	import merchantCard from './merchant_card.vue'
	import merchantApi from '@/api/merchantApi.js'
	export default {
		components:{nullData,loading,vTabs,merchantCard},
		props:{
			dataList:{
				type:Array,
				default:() => []
			},
			tabsList:{
				type:Array,
				default:() => []
			}
		},
		data(){
			return {
				model:0
			}
		},
		methods:{
			clickTab(index){
				this.$emit('loadData',this.tabsList[index]['id'])
			},
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