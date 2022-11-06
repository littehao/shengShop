<template>
	<view>
		<comHead titleshow title="注册登录中" bgcolor="#fff"></comHead>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from "vuex";
	import myApi from '@/api/myApi.js'
	import { getWeChatCode, getUrlCode, isWechat } from '@/utils/common.js'
	import comHead from '@/components/header/index.vue'
	export default {
		components:{ comHead },
		data() {
			return {
				inviter_code:'',
				auth_code:''
			}
		},
		computed:{
			...mapGetters(['getToken'])
		},
		onLoad(query) {
			uni.showLoading({
				title:'加载中...'
			})
			query.inviter_code && uni.setStorageSync('inviter_code',query.inviter_code)
			this.isWeixin = isWechat()
			let code = getUrlCode('code')
			if(this.isWeixin && code){
				this.auth_code = code
			}
			this.registerWxInvite()
		},
		methods: {
			registerWxInvite(){
				if(!this.auth_code){
					getWeChatCode()
					return;
				}
				let inviter_code = uni.getStorageSync('inviter_code')
				if(!inviter_code){
					uni.showToast({
						title:'邀请码丢失',
						icon:'none'
					})
					return
				}
				let data = {
					inviter_code:inviter_code
				}
				if(this.auth_code)data.auth_code = this.auth_code
				myApi.registerWxInvite(data).then(res => {
					uni.hideLoading()
					uni.removeStorageSync('inviter_code')
					uni.showToast({
						title:res.msg
					})
					let token = res.data.token;
					this.$store.commit("setToken", token);
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/main"
						});
					},2000)
				})
			},
		}
	}
</script>

<style>

</style>
