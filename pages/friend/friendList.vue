<template>
	<view class="balace-page bgf4f4">
		<com-head :titleshow="true" :title="title" color="#fff" :backshow="true" class="header-bg"></com-head>
		<view class="balace-main px-2 pb-4">
			<view class="flex justify-around bgffff rounded px-2 mb-2 py-3" style="margin-top:100rpx">
				<view class="fs-28 flex-1 flex flex-column justify-center align-center ft9999">
					<text class="fs-36  font-weight-bolder ft3333">{{memberCount.active}}</text>
					活跃数
				</view>
				<view class="fs-28  flex-1 flex flex-column justify-center align-center ft9999">
					<text class="fs-36 font-weight-bolder ft3333">{{memberCount.total}}</text>
					总数
				</view>
			</view>
			<template v-if="List">
				<template v-if="List.length > 0">
					<view class="py-3 border-bottom border-light-secondary bgffffff p-2 not-border rounded mb-1"
						v-for="(item,index) in List" :key="index">
						<view class="fs-30 ft9999 mb-1 flex align-center justify-between">
							<text>{{item.member_name}}</text>
							<text>用户等级：{{item.agent_new_level?item.agent_new_level.agent_name:item.agent_new_level_id}}</text>
						</view>
						<view class="flex justify-between align-center fs-24">
							<view class="fs-30 flex align-center">
								<text class="fs-28 ft999999 mr-1">是否活跃:</text>
								<text
									:style="{color:item.is_valid != 1?'#1ca20b':'#ea361f'}">{{item.is_valid != 1?'否':'是'}}</text>
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view style="height: 100px;"></view>
					<nulldata></nulldata>
				</template>
			</template>
			<loading ref="loading"></loading>
		</view>
	</view>
</template>

<script>
	import myApi from '@/api/myApi.js'
	import comHead from "@/components/header/index.vue";
	import loading from '@/components/loading/loading.vue'
	import nulldata from '@/components/null-data/index.vue'
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				page: 1,
				List: null,
				temList: [],
				loadText: "加载中...",
				month_tatal: 0,
				all_total: 0,
				title: '',
				category: '',
				memberCount: {
					active: 0,
					total: 0
				},
			}
		},
		computed: {
			...mapGetters(['getUser']),
		},
		onLoad(query) {
			this.title = query.title
			this.category = query.type
		},
		mounted() {
			this.$refs.loading.show();
			this.getChildMembersFn()
			this.getChildMemberCountFn();
		},
		onReachBottom() {
			if (this.temList.length > 19) {
				this.page++;
				this.getChildMembersFn();
			} else {
				this.loadText = '没有更多数据了'
			}
		},
		methods: {
			getChildMemberCountFn() {
				myApi.getChildMemberCount().then(res => {
					this.$refs.loading.hide();
					let memberCount = res.data
					let data = []
					if (this.category == 1) {
						data = memberCount.direct_push.split('/')
					} else {
						data = memberCount.indirect_push.split('/')
					}
					
					this.memberCount = {
						...memberCount
					}
					this.memberCount.active = data[0]
					this.memberCount.total = data[1]
				}).catch(e => {
					this.$refs.loading.hide();
				})
			},
			getChildMembersFn() {
				let data = {
					type: this.category,
					page: this.page,
					limit: 20
				}
				myApi.getChildMembers(data).then(res => {
					this.$refs.loading.hide();
					this.temList = res.data;
					if (this.page == 1) {
						this.List = res.data
					} else {
						this.List = this.List.concat(res.data)
					}
				}).catch(e => {
					this.$refs.loading.hide();
				})
			},
			navTo() {
				uni.navigateTo({
					url: `/pages/cash/recharge-juan`
				})
			}
		},
		components: {
			comHead,
			nulldata,
			loading
		}
	}
</script>

<style lang="less" scoped>
	.balace-page {
		min-height: 100vh;
		background-image: url(../../static/images/balance_bg.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center top;

		.header-bg {
			height: 100%;
			background-image: url(../../static/images/balance_bg.png);
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center top;
		}

		.btn-wh {
			width: 92rpx;
			height: 48rpx;
			border-radius: 24rpx;
			line-height: 48rpx;
			text-align: center;
		}

		.not-border {
			&:nth-last-of-type(1) {
				border: 0;
			}
		}
	}
</style>
