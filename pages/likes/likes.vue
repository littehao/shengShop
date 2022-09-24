<template>
	<view class="likes-page bgf4f4">
		<com-head backshow  :titleshow="true" color="#333" bgcolor="#fff"  title="我的收藏"></com-head>
		<view class="main-page">
			<view class="position-relative"  style="min-height: 800rpx;">
				<view class="p-3 pb-0" :class="model?['flex','justify-between','flex-wrap']:''" v-if="List.length">
					<block v-for="(items,indexs) in List" :key="indexs">
						<good-card :item="items"></good-card>
					</block>
				</view>
				<null-data class="box-h" text="暂无收藏商品" v-else></null-data>
				<Loading ref="Load"></Loading>
			</view>
		</view>
		<Loading ref="Loading"></Loading>
	</view>
</template>

<script>
	import {mapActions,mapGetters} from "vuex";
	import myAPi from '@/api/myApi.js'
	import comHead from '@/components/header/index.vue';
	import goodCard from "@/components/card/home-bottom-card.vue";
	import Loading from "@/components/loading/loading.vue";
	import nullData from "@/components/null-data/index.vue";
	export default {
		components:{comHead,goodCard,Loading,nullData},
		data() {
			return {
				model:1,
				tabs:['商品'],
				page:1,
				pre_page:10,
				List:[],
				more:'more',
				contentText:{
					contentdown:'上拉或点击显示更多',
					contentrefresh:'加载中',
					contentnomore:'没有更多店铺了',
				},
				tips:"暂无更多",
			};
		},
		onReachBottom(){
			if(this.more == 'noMore')return;
			this.page++;
			this.more = 'loading';
			this.getGoodsList();
		},
		mounted() {
			this.$refs.Loading.show();
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){
				let data = {
					page:this.page,
					pre_page:this.pre_page
				}
				myAPi.collectGoods(data).then(res => {
					this.$refs.Loading.hide();
					this.$refs.Load.hide();
					let list = res.data
					if(this.page == 1){
						this.List = list;
					} else {
						this.List = this.List.concat(res.data);
					}
				}).catch(e => {
					this.$refs.Loading.hide();
					this.$refs.Load.hide();
					console.log(e);
				})
			}
		}
	}
</script>

<style lang="less">
.likes-page{
	min-height: 100vh;
}
</style>
