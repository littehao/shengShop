<template>
	<view class="on-line bgf4f4">
		<!-- <comHead color="#333" backshow titleshow title="在线客服" bgcolor="#fff" class="border-bottom" style="z-index: 999;"></comHead> -->
		<web-view :src="url" :update-title="false" ></web-view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import config from '@/config/index.js'
	import comHead from '@/components/header/index.vue';
	export default {
		components: {
			comHead
		},
		data() {
			return {
				url:''
			};
		},
		computed:{
			...mapGetters(['getUser'])
		},
		onLoad() {
			uni.showLoading({
				title:'加载中'
			})
			this.url = `${config.href}/pages/on-line/on-line?isapp=true&uid=${this.getUser.id}&name=${this.getUser.member_name || this.getUser.member_phone}&mobile=${this.getUser.member_phone}`
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '在线客服',
				success: () => {
					console.log('修改标题成功')
					setTimeout(() => {
						uni.hideLoading()
					},4000)
				},
				fail: () => {
					console.log('修改标题失败')
				},
				complete: () => {
					console.log('修改标题结束')
				},
			})
		}
	}
</script>

<style lang="less">
	.on-line {
		min-height: 100vh;
	}
</style>
