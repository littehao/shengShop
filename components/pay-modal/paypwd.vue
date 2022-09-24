<template>
	<view class="pay-modal position-fixed top-0 left-0 right-0 bottom-0" v-if="payshow">
		<view class="bgffff rounded pwd-box position-absolute" style="width: 560rpx;height: 425rpx;">
			<view><text class="iconfont icon-cuowu fs-56 fta0a0" @click="close"></text></view>
			<view class="fs-32 text-center ft3333 my-2">请输入支付密码</view>
			<view class="fs-28 ft3333 mb-4 text-center" v-if="paynum_show">付款{{paynum}}</view>
			<view class="flex align-center border rounded mx-4">
				<text class="num-item flex align-center justify-center fs-28 ft3333 font-weight-bold">{{pwd[0]?'*':""}}</text>
				<text class="line"></text>
				<text class="num-item flex align-center justify-center fs-28 ft3333 font-weight-bold">{{pwd[1]?'*':""}}</text>
				<text class="line"></text>
				<text class="num-item flex align-center justify-center fs-28 ft3333 font-weight-bold">{{pwd[2]?'*':""}}</text>
				<text class="line"></text>
				<text class="num-item flex align-center justify-center fs-28 ft3333 font-weight-bold">{{pwd[3]?'*':""}}</text>
				<text class="line"></text>
				<text class="num-item flex align-center justify-center fs-28 ft3333 font-weight-bold">{{pwd[4]?'*':""}}</text>
				<text class="line"></text>
				<text class="num-item flex align-center justify-center fs-28 ft3333 font-weight-bold">{{pwd[5]?'*':""}}</text>
			</view>
		</view>
		
		<view class="bgffff position-absolute left-0 right-0 bottom-0" style="height: 410rpx;">
			<block v-for="(item,index) in keyword" :key="index">
				<view class="flex align-center" style="border-bottom: 1px solid #f9f9f9;">
					<block v-for="(num,j) in item" :key="j">
						<text class="keydown flex-1  flex align-center justify-center fs-40  ft3333" @click="downFn(num,index,j)" :class="[`keydown${index}-${j}`]" style="height: 102rpx;">{{num}}</text>
					</block>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			paynum:{
				type:String || Number,
				default:'0.00'
			},
			paynum_show:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				payshow:false,
				pwd:[],
				keyword:[
					[1,2,3],
					[4,5,6],
					[7,8,9],
					["",0,''],
				]
			}
		},
		methods:{
			downFn(num,index,j){
				if(index ==  3 && j ==2){
					if(this.pwd.length > 0)this.pwd.pop()
					return;
				}
				if(this.pwd.length < 6){
					this.pwd.push(num.toString())
					if(this.pwd.length == 6){
						this.$emit('submit',this.pwd)
						this.payshow = false;
						this.pwd = [];
					}
				}
			},
			show(){
				this.payshow = true;
			},
			close(){
				this.pwd = [];
				this.payshow = false;
			}
		}
	}
</script>

<style lang="less">
.pay-modal{
	z-index: 999999;
	background-color: rgba(0,0,0,0.5);
	.pwd-box{
		bottom: 500rpx;
		left: 50%;
		margin-left: -280rpx;
	}
	.num-item{
		width: 80rpx;
		height: 69rpx;
	}
	.line{
		width: 1px;
		height: 69rpx;
		background-color: #EDEDED;
	}
	.keydown{
		border-right: 1px solid #f9f9f9;
	}
	.keydown:active{
		background-color: #F4F4F4;
	}
	.keydown:last-child{
		border-right: 0;
	}
	.keydown3-0,.keydown3-2{
		background-color: #F4F4F4;
	}
	.keydown3-2{
		background-image: url(../../static/images/delt.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 50rpx;
	}
}
</style>
