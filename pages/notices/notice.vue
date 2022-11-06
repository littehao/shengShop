<template>
	<view class="bgF5F5F5 mh-100vh">
		<com-head :titleshow="true" title="公告详情" :backshow="true" bgcolor="#fff" class="header-bg"></com-head>
		<view class="p-2" v-if="notice">
			<view class="fs-40 font-weight-bold mb-1">{{notice.notice_title}}</view>
			<view class="fs-26 ft999999 mb-2">发布日期:{{notice.created_at}}</view>
			<view class="fs-28 ft666666" style="line-height: 50rpx;">{{notice.notice_content}}</view>
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
				notice:null
			}
		},
		onLoad(query) {
			this.noticesDetails(query.id)
		},
		methods: {
			//公告详细
			noticesDetails(notice_id){
				baseApi.noticesDetails({id:notice_id}).then(res => {
					this.notice = res.data
				}).catch(e => {
					console.log(e)
				})
			},
		}
	}
</script>

<style>

</style>
