<template>
	<uni-popup ref="share" type="bottom" :mask-click="false"  style="z-index: 99999;">
		<view class="w-100 bgffff rounded-top-llg" style="min-height: 30vh;">
			<view class="position-relative text-center py-3 w-100  border-bottom">
				<text class="fs-30">选择分享方式</text>
				<text class="iconfont icon-cuowu fs-48 fta0a0 position-absolute icon-style" style="top: 10px;right:10px" @click="$refs.share.close()"></text>
			</view>
			<view class="py-5 flex justify-around align-center w-100">
				<view class="flex flex-column align-center">
					<view class="box-wh flex  justify-center align-center mb-2" @click="copyLink">
						<image style="width: 40px;height: 40px;" src="/static/images/copy_link.png" mode="widthFix"></image>
					</view>
					<text class="fs-24 fta0a0">复制链接</text>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import { copyTxt } from "@/utils/common.js";
	export default {
		name:"share",
		data() {
			return {
				
			};
		},
		methods:{
			copyLink(){
				let href = this.getConfig.share_link;
				if(this.getConfig.share_link.includes('web')){
					href = this.getConfig.share_link+"pages/goods-details/goods-details?back=main&id="+this.goodsId;
				}
				copyTxt(href)
			},
		}
	}
</script>

<style>

</style>