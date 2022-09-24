import payApi from '@/api/payApi.js'
import myApi from '@/api/myApi.js'
export default{
		data(){
			return {
				
			}
		},
		methods:{
			pwdPay(e){//密码支付
				this.act_password = e.join("");
				if(this.fromType == 'orderList'){
					this.orderListPay()
				} else if(this.fromType == 'orderConfirm'){
					this.getOrderNum();
				}
			},
			paying(){//立即支付
				if(this.fromType == 'orderList'){
					this.orderListPay()
				} else if(this.fromType == 'orderConfirm'){
					this.getOrderNum();
				} else if(this.fromType == 'buyRed'){
					this.rechargeRedPackFn();
				} else if(this.fromType == 'exchange') {
					this.payYToJOrderFn()
				} else if(this.fromType == 'shoppay'){
					this.handScanMerchantOrderFn()
				}
			},
			orderListPay(){//订单列表立即付款
				if(!this.orderNo){
					uni.$tools.toast('订单获取失败')
					return;
				}
				let data = {
					order_no: this.orderNo,
					pay_code: this.way.pay_code,
					pay_id: this.way.pay_id,
				}
				if (this.act_password) data.act_password = this.act_password;
				uni.showLoading({
					title: '支付中...'
				})
				let _this = this
				payApi.orderPay(data).then(res => {
					uni.hideLoading();
					this.close();
					if (this.way.config_type == 11) { // 支付宝支付
						this.alipayFn(res.data.thirdPayUrl)
						return
					}
					if (res.data.thirdPayUrl) { // 微信公粽号支付
						this.beforePay(res.data.thirdPayUrl)
					} else {
							if (res.data.isSuccess) {
								uni.$tools.toast(res.data.returnMessage)
								setTimeout(() => {
									_this.$emit('loadData');
								}, 1000)
							}
						}
				}).catch(e => {
					uni.hideLoading()
					uni.$tools.toast(e.msg)
				})
			},
			getOrderNum(){//确认订单获取订单号
				if(!this.payFlag)return;
				this.payFlag = false;
				payApi.createOrderNo().then(res => {
					this.goodsConfirmPay(res.data.order_no);
				}).catch(e => {})
			},
			goodsConfirmPay(order_no){//商品确认下单
				try{
					let data = {
						order_no:order_no,
						pay_code:this.way.pay_code,
						pay_id:this.way.pay_id,
						address_id:this.address.address_id
					}
					if(this.act_password)data.act_password = this.act_password;
					if(this.type)data.type = this.type;
					let goodsList = [];
					this.cartList.forEach( item =>{
						item.goods.forEach( goods =>{
							let form = uni.getStorageSync('formCart')
							if(form  == 'toorder'){
								if(goods.checked){
									goodsList.push({
										goods_id:goods.goods_id,
										goods_num:goods.goods_num,
										specs:goods.specs
									})
								}
							}else{
								goodsList.push({
									goods_id:goods.goods_id,
									goods_num:goods.goods_num,
									specs:goods.rule
								})
							}
						})
					})
					data.goods = goodsList;
					uni.showLoading({
						title:'支付中...'
					})
					payApi.createPay(data).then(res => {
						uni.hideLoading();
						if(this.way.config_type == 11){
							this.alipayFn(res.data.thirdPayUrl)
							return
						}
						if(res.data.thirdPayUrl){
							this.beforePay(res.data.thirdPayUrl)
						}  else {
							uni.showToast({
								title:res.data.returnMessage,
							})
							setTimeout(()=>{
								this.payFlag =  true;
								uni.redirectTo({
									url:"/pages/order/order?id=0"
								})
							},1500)
						}
					})
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			rechargeRedPackFn() {//购买红包
				let data = {
					red_count:this.redCount,
					pay_code:this.way.pay_code,
					pay_id:this.way.pay_id
				}
				myApi.rechargeRedPack(data).then(res =>{
					this.$emit('buySuccess')
					if(this.way.config_type == 11){
						this.alipayFn(res.data.thirdPayUrl)
						return
					}
					if(res.data.thirdPayUrl){
						this.beforePay(res.data.thirdPayUrl)
					} else {
						uni.showToast({
							title:res.data.returnMessage
						})
						this.close()
					}
				}).catch(e => {
					uni.showToast({
						title:e.msg,
						icon:'none'
					})
				})
			},
			payYToJOrderFn(){//工分转换绿分
				if (!this.turnYinfen) {
					uni.$tools.toast('请输入转换数量')
					return
				}
				let data = {
					turn_yinfen: this.turnYinfen,
					pay_code: this.way.pay_code,
					pay_id: this.way.pay_id
				}
				myApi.payYToJOrder(data).then(res => {
					if(this.way.config_type == 11){
						this.alipayFn(res.data.thirdPayUrl)
						return
					}
					if (res.data.thirdPayUrl) {
						this.beforePay(res.data.thirdPayUrl)
					}
				})
			},
			handScanMerchantOrderFn(){//创建扫商家二维码支付订单
				let data = {
					member_code:this.memberCode,
					pay_money:this.goodsPayNum,
					pay_code:this.way.pay_code,
					pay_id:this.way.pay_id
				}
				myApi.handScanMerchantOrder(data).then(res => {
					if(this.way.config_type == 11){
						this.alipayFn(res.data.thirdPayUrl)
						return
					}
					if(res.data.thirdPayUrl){
						this.beforePay(res.data.thirdPayUrl)
					} else {
						uni.showToast({
							title:res.data.returnMessage
						})
						this.close()
					}
				}).catch(e => {
					uni.$tools.toast(e.msg)
				})
			},
			alipayFn(thirdPayUrl){
				// #ifdef APP-PLUS
				plus.runtime.openURL(thirdPayUrl);  
				// #endif
				// #ifdef H5
				window.location.href = thirdPayUrl
				// #endif
			},
			beforePay(data){
				let _this = this
				const thirdPayUrl = JSON.parse(data)
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', ()=>{
							_this.onBridgeReady(thirdPayUrl)
						}, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', ()=>{
							_this.onBridgeReady(thirdPayUrl)
						});
						document.attachEvent('onWeixinJSBridgeReady', ()=>{
							_this.onBridgeReady(thirdPayUrl)
						});
					}
				} else {
					_this.onBridgeReady(thirdPayUrl);
				}
			},
			onBridgeReady(data) {
				let _this = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						appId:data.appId,
						timeStamp: data.timeStamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
						nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
						package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: data.signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
						paySign: data.paySign, // 支付签名
					},
					function(res) {
						// 支付成功
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							uni.showToast({
								title: '支付成功'
							})
						}
						// 支付过程中用户取消
						if (res.err_msg == "get_brand_wcpay_request:cancel") {
							uni.showToast({
								title: '用户取消支付',
								icon:'none'
							})
						}
						// 支付失败
						if (res.err_msg == "get_brand_wcpay_request:fail") {
							uni.showToast({
								title: '支付失败，请稍后再试',
								icon: 'none'
							})
						}
						_this.close()
					});
			},
		}
}