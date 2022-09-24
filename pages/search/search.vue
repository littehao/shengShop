<template>
	<view  class="search-page  bgf4f4">
		<view class="search-header bgffff topfiexd border-bottom" style="top: 0;">
			<comHead></comHead>
			<view class="flex align-center justify-between px-2" style="height: 44px;">
				<view class="bgf4f4 search-box bgf4f4 px-2 flex align-center">
					<text class="iconfont icon-sousuo_2 fs-36 ftb2b2 mr-1"></text>
					<input class="flex-1 fs-24 ft3333" @confirm="getGoodsList" type="text" v-model="search" confirm-type="search" focus placeholder="请您输入商品、品牌、店铺名称" placeholder-class="placeholder">
				</view>
				<text class="fs-28 ft3333" @click="back">取消</text>
			</view>
		</view>
		
		<view  class="flex  flex-wrap justify-between py-2  px-2">
			<template v-if="goods.length > 0">
				<block v-for="(item,index) in goods" :key="index">
					<shop-card :item="item"></shop-card>
				</block>
				<view v-if="isShow" class="py-3 w-100 text-center fta0a0">{{text}}</view>
			</template>
			<nulldata v-else style="width: 100%;"></nulldata>
		</view>
		<loading  ref="loading"></loading>
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import comHead from '@/components/header/index.vue'
	import shopCard from '../../components/card/home-bottom-card.vue'
	import nulldata from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	import {mapActions,mapGetters}  from 'vuex'
	export default {
		components:{comHead,shopCard,nulldata,loading},
		data() {
			return {
				goods:[],
				page:1,
				isNextpage:true,
				search:"",
				text:"加载中 . . .",
				isShow:false
			};
		},
		created() {
			
		},
		mounted() {
			this.$refs.loading.show();
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){//商品列表
				let data  = {
					page:this.page,
					limit:20
				}
				if(this.search)data.search = this.search;
				goodsApi.goodsList(data).then(res => {
					this.$refs.loading.hide();
					let listLength = res.data.length;
					if(this.page == 1){
						this.goods = [];
					}
					if(listLength > 19){
						this.isNextpage = true;
						this.text="加载中 . . .";
						this.isShow = false;
					}else{
						this.isNextpage = false;
						this.text = "暂无更多商品";
						this.isShow = true;
					}
					this.goods =  this.goods.concat(res.data);
				}).catch(e => {
					this.$refs.loading.hide();
				})
			},
			back(){
				uni.navigateBack()
			}
		},
		onReachBottom() {
			if(!this.isNextpage)return;
			this.isShow = true;
			this.page++;
			this.getGoodsList();
		}
	}
</script>

<style lang="less">
.search-page{
	min-height: 100vh;
	.search-box{
		width: 560rpx;
		height: 60rpx;
	}
}
</style>
