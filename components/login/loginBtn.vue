<template>
	<view class="flex flex-column">
		<button
		class="flex align-center justify-center ftffff py-2 rounded" 
		style="background-color: #00B42A;width: 100%;" 
		@click="$emit('click')">
			<image src="/static/images/wx.png" mode="widthFix" style="width: 25px;height: 25px;"></image>
			<text class="fs-32 ml-1">微信授权登录</text>
		</button>
		<view class="flex align-center justify-center mt-3">
			<text class="ft86909C fs-24">登录即代表同意</text>
			<text  class="ft3d3c fs-24 mx-1" @tap="linkToHTML('user-agreement','用户协议')">《用户协议》</text>
		</view>
	</view>
</template>

<script>
	export default{

	}
</script>

<style lang="scss">

</style>