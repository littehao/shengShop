<template>
	<view class="bgF5F5F5 mh-100vh">
		<com-head :titleshow="true" title="公告列表" :backshow="true" bgcolor="#ffffff" class="topfiexd"></com-head>
		<view class="p-2">
			<block v-for="(item,index) in noticesList" :key="index">
				<view class="rounded bgffffff p-2 mb-2" @click="navTo(item.notice_id)">
					<view class="fs-32 font-weight-bold mb-1 flex align-center justify-between">
						{{item.notice_title}} 
						<text class="fs-26 ft999999">详情>></text>
					</view>
					<view class="fs-26 ft999999 mb-1">{{item.created_at}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import baseApi from '@/api/baseApi.js'
	import comHead from '@/components/header/index.vue';
	export default {
		components: {
			comHead
		},
		data() {
			return {
				noticesList:[]
			}
		},
		onLoad() {
			this.notices()
		},
		methods: {
			// 公告列表
			notices(){
				baseApi.notices().then(res => {
					this.noticesList = res.data
				})
			},
			navTo(id){
				uni.navigateTo({
					url:`/pages/notices/notice?id=${id}`
				})
			}
		}
	}
</script>

<style>

</style>
