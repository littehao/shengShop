<template>
	<view class="com-header" :style="{'background-color':bgcolor}" :class="{fiexd:isfiexd}">
		<view class="statuslan" :class="{bglan:statusbg}"></view>
		<view v-if="titleshow"  class="flex align-center position-relative"  :class="[left?'pl-100':'justify-center']" style="height: 44px;">
			<view v-if="backshow" class="back position-absolute  top-0 left-0" @click="back">
				<uni-icons type="back" size="28" :color="color"></uni-icons>
			</view>
			<slot name="left"></slot>
			<text  v-if="title"  class="fs-36" :style="{color:color}">{{title}}</text>
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
	props:['titleshow','title','isfiexd','color','bgcolor','statusbg','backshow','left','right','webview','url'],
	data(){
		return{
			
		}
	},
	computed: {
		...mapGetters([
			'getstatusBarHeight',
		])
	},
	methods:{
		back(){
			if(this.url){
				uni.reLaunch({
					url:url
				})
				return
			}
			uni.navigateBack()
		}
	}
}
</script>

<style lang="less"  scoped>
.com-header{
	width: 100%;
	position:sticky;
	position: -webkit-sticky;
	top:0px;
	z-index: 99999;
	.statuslan{
		height: var(--status-bar-height);
	}
	.back{
		width: 44px;
		height: 44px;
		text-align: center;
		line-height: 44px;
	}
}
.fiexd{
	background-image: url(../../static/images/homebg.png);
	background-size: 100% auto;
	background-position: center top;
	background-repeat: no-repeat;
}
</style>
