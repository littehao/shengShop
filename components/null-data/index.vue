<template>
<view class="flex flex-wrap justify-center align-center" style="height: 200px;">
	<view class="flex flex-column justify-center">
		<image class="mb-2 mx-auto" style="width: 100rpx;" src="../../static/images/null.png" mode="widthFix"></image>
		<view class="text-center" :style="{color:color}">
			<template v-if="intro">
				{{text}}
			</template>
			<slot></slot>
		</view>
	</view>
</view>
</template>

<script>
export default {
	props:{
		color:{
			type:String,
			default:"#E2231A"
		},
		intro:{
			type:Boolean,
			default:true
		},
		text:{
			type:String,
			default:"暂无数据"
		}
	}
}
</script>

<style lang="less" scoped>
.null-text{
	text-align: center;
	width: 100%;
	color: #dbdbdb;
}
</style>
