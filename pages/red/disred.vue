<template>
	<view class="disred h-100vh position-relative">
		<com-head  :titleshow="true" color="#333" bgcolor="#fff"  title="拆红包啦"></com-head>
		<view class="disredBtn position-absolute flex align-center justify-center" @click="openRedPackFn">拆红包</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from "vuex";
	import myApi from '@/api/myApi.js'
	import { getWeChatCode, getUrlCode, isWechat } from '@/utils/common.js'
	import comHead from '@/components/header/index.vue';
	export default {
		components:{comHead},
		data() {
			return {
				trade_no:'',
				auth_code:''
			}
		},
		onLoad(query) {
			query.trade_no && uni.setStorageSync('trade_no',query.trade_no)
			this.isWeixin = isWechat()
			let code = getUrlCode('code')
			if(this.isWeixin && code){
				this.auth_code = code
				this.openRedPackFn()
			}
		},
		computed:{
			...mapGetters(['getToken'])
		},
		methods: {
			openRedPackFn(){
				let trade_no = uni.getStorageSync('trade_no')
				if(!trade_no){
					uni.showToast({
						title:'当前没有红包可拆',
						icon:'none'
					})
					return
				}
				let data = {
					trade_no:trade_no
				}
				if(!this.getToken && !this.auth_code){
					getWeChatCode()
					return;
				}
				if(this.auth_code)data.auth_code = this.auth_code
				myApi.openRedPack(data).then(res => {
					uni.removeStorageSync('trade_no')
					uni.showToast({
						title:res.msg
					})
					let token = "Bearer " + res.data.token;
					this.$store.commit("setToken", token);
					this.GetInfo();
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:'none'
					})
				})
			},
			GetInfo(){
				myApi.memberInfo().then(res => {
					uni.hideLoading();
					this.$store.commit("setUser",res.data)
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/main"
						});
					},2000)
				})
			}
		}
	}
</script>

<style lang="scss">
.disred{
	background-image:url('/static/images/chai.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	.disredBtn{
		width:200rpx;
		height:200rpx;
		border-radius: 50%;
		top:45%;
		left:50%;
		// margin-top:-100rpx;
		margin-left:-100rpx;
		background-color: #fffc00;
		font-size:20px;
	}
}
</style>
