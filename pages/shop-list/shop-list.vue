<template>
	<view class="shop-list-page bgF5F5F5">
		<comHead titleshow backshow :title="title"  bgcolor="#fff"></comHead>
		<view class="py-2">
			<template v-if="onlineDownList.length > 0">
				<block v-for="(item,index) in onlineDownList" :key="index">
					<merchantCard :item='item' @tap.native="navTo(`/pages/offline-merchants-details/offline-merchants-details?id=${item.id}`)"></merchantCard>
				</block>
			</template>
			<view class="flex-1" v-if="onlineDownList.length == 0">
				<nulldata></nulldata>
			</view>
		</view>
		<loading  ref="loading"></loading>
	</view>
</template>

<script>
	import merchantApi from '@/api/merchantApi.js'
	import merchantCard from '@/pages/index/components/merchant_card.vue'
	import comHead from '@/components/header/index.vue'
	import nulldata from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	import {mapActions,mapGetters}  from 'vuex'
	import { distance } from "@/utils/common.js";
	export default {
		components:{comHead,merchantCard,nulldata,loading},
		data() {
			return {
				title:"",
				gc_id:"",
				page:1,
				onlineDownList:[],
				text:'加载中 . . .',
				isShow:false,
				isNextpage:true,
				category_id:null,
				gc_id:null
			};
		},
		onLoad(query) {
			this.title = query.title;
			if(query.category_id)this.category_id  = query.category_id;
			if(query.gc_id)this.gc_id  = query.gc_id;
			
		},
		mounted() {
			this.$refs.loading.show();
			this.merchants();
		},
		methods:{
			merchants(){//商户列表
				let data = {
					page:this.page,
					limit: 20
				}
				if(this.category_id)data.category_id = this.category_id
				let location = uni.getStorageSync('location')
				merchantApi.merchants(data).then(res => {
					this.$refs.loading.hide();
					let listLength = res.data.length;
					let list = res.data
					list.forEach(item => {
						item.distance = item.merchantappend && distance(item.merchantappend.latitude,item.merchantappend.longitude,location)
					})
					if(this.page == 1){
						this.onlineDownList =  list
					} else {
						this.onlineDownList =  this.onlineDownList.concat(list);
					}
					if(listLength > 19){
						this.isNextpage = true;
						this.text = '加载中 . . .',
						this.isShow = false;
					}else{
						this.isNextpage = false;
						this.text = '暂无更多商品';
						this.isShow = true;
					}
					
				}).catch(e => {
					console.log(e)
				})
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		onReachBottom() {
			if(!this.isNextpage)return;
			this.isShow = true;
			this.page++;
			this.merchants();
		}
	}
</script>

<style lang="less" scoped>
.shop-list-page{
	min-height: 100vh;
}
</style>
