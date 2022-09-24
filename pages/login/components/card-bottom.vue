<template>
  <uni-popup ref="Loginpopup" type="bottom">
	  <view class="w-100 bgffff rounded-top-llg" style="min-height: 30vh;">
	  	<view class="position-relative text-center py-3 w-100  border-bottom">
			<text class="fs-30">选择登录方式</text>
			<text class="iconfont icon-cuowu fs-48 fta0a0 position-absolute icon-style" @click="$refs.Loginpopup.close()"></text>
		</view>
		<view class="py-5 flex justify-center align-center w-100">
			<view class="flex flex-column align-center mx-3" v-if="pwd">
				<view class="box-wh border bgf4f4 flex justify-center align-center mb-2"  @click="navTo('/pages/login/login-pwd')">
					<text class="iconfont icon-mima1 fs-40 ft3333"></text>
				</view>
			</view>
			<view class="flex flex-column align-center mx-3" v-if="wx">
				<view class="box-wh border bgf4f4 flex  justify-center align-center mb-2"  @click="navTo('/pages/login/login')">
					<text class="iconfont icon-weixin1 weiXin fs-56"></text>
				</view>
			</view>
		</view>
	  </view>
	  
  </uni-popup>
</template>

<script>
export default {
	props:{
		phone:{
			type:Boolean,
			default:true
		},
		pwd:{
			type:Boolean,
			default:true
		},
		wx:{
			type:Boolean,
			default:true
		}
	},
  data () {
    return {
     
    }
  },
  methods:{
	  open(){
		  this.$refs.Loginpopup.open();
	  },
	  close(){
		  this.$refs.Loginpopup.close();
	  },
	  navTo(url){
			uni.navigateTo({
				url:url
			})
	  }
  }
}
</script>

<style lang="less" scoped>
.box-wh{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}
.weiXin {
	color: #05be01;
}
.icon-style{
	top: 50%;
	right: 20rpx;
	transform: translateY(-50%);
}
.checkbox{
		width: 30rpx;
		height: 30rpx;
		background-image: url(/static/images/checke.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		&.checked{
			background-image: url(/static/images/checked.png);
		}
	}
</style>

