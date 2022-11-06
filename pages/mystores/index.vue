<template>
	<view class="main-page bgf4f4">
		<view class="main-content position-relative" :style="{height:'calc(100vh - 62px - ' + getbottom + 'px)'}">
			<homePage v-if="activeIndex == 0"></homePage>
			<orderPage v-if="activeIndex == 1"></orderPage>
		</view>
		<view  class="position-fixed left-0 right-0 bottom-0 boxsizing" style="z-index: 9999;">
			<view class="flex align-center border-top mian-tab boxsizing">
				<view class="flex flex-1 flex-column justify-center text-center" @click="changeTab(0)" :class="{'homeactive':activeIndex == 0}">
					<text class="tab_icon home mx-auto"></text>
					<text class="ft-24 ft333333 tab-text">首页</text>
				</view>
				<view class="flex flex-1 flex-column justify-center text-center"  @click="changeTab(1)" :class="{'homeactive':activeIndex == 1}">
					<text class="tab_icon order mx-auto"></text>
					<text class="ft-24 ft333333 tab-text">订单</text>
				</view>
			</view>
			<view :style="{height: getbottom+'px'}" class="bgffff position-relative" style="z-index: 99999;"></view>
		</view>
	</view>
</template>

<script>
	import homePage from './home.vue'
	import orderPage from './order.vue'
	import {mapActions,mapGetters} from "vuex";
	export default {
		components:{homePage,orderPage},
		data() {
			return {
				activeIndex:0,
				isshow:false,
			};
		},
		onLoad() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		mounted() {

		},
		computed:{
			...mapGetters(['getbottom']),
		},
		methods:{
			changeTab(index){
				this.activeIndex  = index;
			},
			async GetInfo(){
				try{
					let res = await this.merchantAssets();
					if(res.code == 200){
						this.$store.commit("setUser",res.data)
					}
				}catch(e){
					uni.showToast({
						title:e.data.msg,
						icon:'none'
					})
					console.log(e)
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="less">
.main-page{
	height: 100vh;
	.main-content{
		// height: calc(100vh - 124rpx);
	}
	.mian-tab{
		height: 62px;
		background-color: #fff;
		// background-image: url(../static/images/main_tab_bg.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
		z-index: 9999;
	}
	.tab_icon{
		width: 50rpx;
		height: 50rpx;
		background-size: 50rpx;
		background-repeat: no-repeat;
		background-position: center;
	}
	.home{
		background-image: url(/static/images/stores/home-icon.png);
	}
	.goods{
		background-image: url(/static/images/stores/goods-icon.png);
	}
	.order{
		background-image: url(/static/images/stores/order-icon.png);
	}
	.means{
		background-image: url(/static/images/stores/means-icon.png);
	}
	.homeactive .home{
		background-image: url(/static/images/stores/home-icon-on.png);
	}
	.homeactive .goods{
		background-image: url(/static/images/stores/goods-icon-on.png);
	}
	.homeactive .order{
		background-image: url(/static/images/stores/order-icon-on.png);
	}
	.homeactive .means{
		background-image: url(/static/images/stores/means-icon-on.png);
	}
	.homeactive  .tab-text{
		color:#E23D3C;
	}
}
</style>
