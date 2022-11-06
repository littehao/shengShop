<template>
	<view class="class-list-page bgF5F5F5">
		<comHead titleshow backshow :title="title"  bgcolor="#fff"></comHead>
		<view class="flex flex-wrap  py-2 px-2">
			<template v-if="goods.length > 0">
				<block v-for="(item,index) in goods" :key="index">
					<bottom-card :item="item" class="shop-item"></bottom-card>
				</block>
				<view v-if="isShow" class="py-3 w-100 text-center fta0a0">{{text}}</view>
			</template>
			<view class="flex-1" v-else>
				<nulldata></nulldata>
			</view>
		</view>
		<loading  ref="loading"></loading>
	</view>
</template>

<script>
	import goodsApi from '@/api/goodsApi.js'
	import bottomCard from '@/components/card/home-bottom-card.vue';
	import comHead from '@/components/header/index.vue'
	import nulldata from '@/components/null-data/index.vue'
	import loading from '@/components/loading/loading.vue'
	import  {mapActions,mapGetters}  from 'vuex'
	export default {
		components:{comHead,bottomCard,nulldata,loading},
		data() {
			return {
				title:"",
				gc_id:"",
				page:1,
				goods:[],
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
			this.getGoodsList();
		},
		methods:{
			async getGoodsList(){// 列表
				let data  = {
					page:this.page,
					limit:20
				}
				if(this.category_id)data.category_id = this.category_id
				if(this.gc_id)data.gc_id = this.gc_id
				goodsApi.goodsList(data).then(res => {
					this.$refs.loading.hide();
					let listLength = res.data.length;
					if(this.page == 1){this.goods = []};
					if(listLength > 19){
						this.isNextpage = true;
						this.text = '加载中 . . .',
						this.isShow = false;
					}else{
						this.isNextpage = false;
						this.text = '暂无更多商品';
						this.isShow = true;
					}
					this.goods =  this.goods.concat(res.data);
				}).catch(err => {})
			},
		},
		onReachBottom() {
			if(!this.isNextpage)return;
			this.isShow = true;
			this.page++;
			this.getGoodsList();
		}
	}
</script>

<style lang="less" scoped>
.class-list-page{
	min-height: 100vh;
	.shop-item{
		margin-right: 2%;
	}
	.shop-item:nth-child(2n){
		margin-right:0;
	}
}
</style>
