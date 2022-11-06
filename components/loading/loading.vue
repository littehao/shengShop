<template>
	<view v-if="loading" class="main-loader bgF5F5F5 flex align-center justify-center position-absolute top-0 left-0  right-0 border-0 bgColor">
		<view class="ball-scale-multiple">
			<view></view><view></view><view></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"loading",
		data() {
			return {
				loading:false,
			};
		},
		methods:{
			show(){
				this.loading =  true;
			},
			hide(){
				this.loading =  false;
			}
		}
	}
</script>

<style lang="less"  scoped>
.main-loader {
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
	height: 100%;
	width: 100%;
	z-index: 99;
}
.ball-scale-multiple {
    position: relative;
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px)
}

.ball-scale-multiple>view:nth-child(2) {
    -webkit-animation-delay: -.4s;
    animation-delay: -.4s
}

.ball-scale-multiple>view:nth-child(3) {
    -webkit-animation-delay: -.2s;
    animation-delay: -.2s
}

.ball-scale-multiple>view {
    position: absolute;
    left: -30px;
    top: 0;
    opacity: 0;
    margin: 0;
    width: 60px;
    height: 60px;
    -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
    animation: ball-scale-multiple 1s 0s linear infinite;
	background-color: #E2231A;
	border-radius: 100%
}
@-webkit-keyframes ball-scale-multiple {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0
    }

    5% {
        opacity: 1
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 0
    }
}

@keyframes ball-scale-multiple {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0
    }

    5% {
        opacity: 1
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 0
    }
}

</style>
