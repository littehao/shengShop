<template>
	<view class="on-line bgf4f4">
		<comHead v-if="!isapp" color="#333" backshow titleshow title="在线客服" bgcolor="#fff" class="border-bottom"></comHead>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from "vuex";
	//#ifdef H5
	import YSF from '@neysf/qiyu-web-sdk';
	//#endif
	import config from '@/config/index.js'
	import comHead from '@/components/header/index.vue';
	var wv; //计划创建的webview
	export default {
		components: {
			comHead
		},
		data() {
			return {
				url:'',
				uid:'',
				name:'',
				mobile:'',
				isapp:false
			};
		},
		computed:{
			...mapGetters(['getUser'])
		},
		onLoad(query) {
			//#ifdef H5
				const { uid, name, mobile, isapp } = query
				if(uid){
					this.uid = uid
					this.name = name
					this.mobile = mobile
					this.isapp = isapp
				} else {
					this.uid = this.getUser.id
					this.name = this.getUser.member_name || this.getUser.member_phone
					this.mobile = this.getUser.member_phone
				}
			//#endif
		},
		mounted() {
			//#ifdef H5
			const _this = this
			YSF.init('7b21ed071440e19ad1d4a2729df3d759',{
				templateId: 6640856, // templateId表示自定义会话邀请的模板标识
			}).then(ysf => {
					ysf('onready', function() {
						ysf('config', {
							uid: _this.uid,     
							name: _this.name,
							mobile: _this.mobile,
							groupid: '482709508',// 客服组id
							staffid:'6283669',//客服id
							success: function() { // 成功回调
								console.log('打开')
								ysf('open');
							},
							error: function() { // 错误回调
								console.log('失败')
								// handle error
							}
						});
					});
			}).catch(error => {
					console.log('sdk加载失败---', error);
			});
			//#endif
		}
	}
</script>

<style lang="less">
	.on-line {
		min-height: 100vh;
	}
</style>
