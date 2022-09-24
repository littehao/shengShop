<template>
	<view>
		<web-view :src="`/hybrid/html/${url}.html`"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				title:''
			}
		},
		onLoad(options) {
			this.url = options.url;
			if(options.title){
				this.title = options.title
				uni.setNavigationBarTitle({
				　　title:options.title
				})
			}
		}
	}
</script>

<style>
</style>
