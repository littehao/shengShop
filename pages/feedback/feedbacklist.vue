<template>
	<view class="h-100vh bgf4f4">
		<com-head bgcolor="#fff" :titleshow="true" title="反馈记录" :backshow="true" :isRefresh='true'></com-head>
		<view class="p-2">
			<block v-for="(item,index) in datalist">
				<view class="bgffff border-bottom p-2">
					<view class="mb-1 fs-28">{{item.remark}}</view>
					<view class="fs-24 ft9999 mb-2 flex align-center justify-between">
						<text>{{item.created_at}}</text>
						<text class="ft8385">{{item.status == 1?'等待查阅':'已查阅'}}</text>
					</view>
					<view class="flex flex-wrap">
						<block v-for="(item,index) in item.case_img">
							<image class="bgf4f4 rounded" :src="item" mode="widthFix" style="width: 200rpx;height: 200rpx;"></image>
						</block>
					</view>
				</view>
			</block>
			<null-data class="box-h" v-if="datalist.length == 0"></null-data>
		</view>
	</view>
</template>

<script>
	import { mapActions } from "vuex";
	import myApi from '@/api/myApi.js'
	import comHead from "@/components/header/index.vue";
	import nullData from "@/components/null-data/index.vue";
	export default {
		components:{
			comHead,
			nullData
		},
		data() {
			return {
				datalist:[]
			}
		},
		created() {
			this.feedbackListFn()
		},
		methods: {
			feedbackListFn(){
				myApi.feedbackList({page:1,page_limit:100}).then(res => {
					this.datalist = res.data
				})
			}
		}
	}
</script>

<style>

</style>
