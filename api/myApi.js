import tools from '@/utils/httpRequest.js'
export default class {
	/**
	 * 获取好友人数
	 */
	static getChildMemberCount(data) {
		return tools.request(
			`/api/member/getChildMemberCount`,
			'GET'
		)
	}
	/**
	 * 获取团队/个人收益数据
	 */
	static profitAllList(data) {
		return tools.request(
			`/api/balance/profitAllList`,
			'GET',
			data
		)
	}
	/**
	 * 各项流水记录
	 */
	static getbalanceAllList(data) {
		return tools.request(
			`/api/balance/balanceAllList`,
			'GET',
			data
		)
	}
	/**
	 * 除待付款外的其他订单
	 */
	static getOrderMerchantGoods(data) {
		return tools.request(
			`/api/order/getOrderMerchantGoods`,
			'GET',
			data
		)
	}
	/**
	 * 待付款订单列表
	 */
	static getNoPayOrder(data) {
		return tools.request(
			`/api/order/getNoPayOrder`,
			'GET',
			data
		)
	}
	/**
	 * 待付款--取消
	 */
	static orderCancle(data) {
		return tools.request(
			`/api/order/cancel`,
			'POST',
			data
		)
	}
	/**
	 * 订单确认收货
	 */
	static confirmReceipt(data) {
		return tools.request(
			`/api/order/confirmReceipt`,
			'POST',
			data
		)
	}
	/**
	 * 地址获取
	 */
	static getAddress(data) {
		return tools.request(
			`/api/member/address`,
			'GET',
			data
		)
	}
	/**
	 * 删除地址
	 */
	static delAddress(data) {
		return tools.request(
			`/api/member/address/${data.id}`,
			'DELETE'
		)
	}
	/**
	 * 新增/修改地址
	 */
	static addAddress(data) {
		return tools.request(
			`/api/member/address`,
			'POST',
			data
		)
	}
	/**
	 * 购买红包
	 */
	static rechargeRedPack(data) {
		return tools.request(
			`/api/shop-integral/rechargeRedPack`,
			'POST',
			data
		)
	}
	/**
	 * 创建发送红包的订单号
	 */
	static createSendRedPack(data) {
		return tools.request(
			`/api/shop-integral/createSendRedPack`,
			'POST',
			data
		)
	}
	/**
	 * 获取好友人数
	 */
	static getChildMemberCount(data) {
		return tools.request(
			`/api/member/getChildMemberCount`,
			'GET'
		)
	}
	/**
	 * 获取好友/粉丝列表
	 */
	static getChildMembers(data) {
		return tools.request(
			`/api/member/getChildMembers`,
			'GET',
			data
		)
	}
	/**
	 * 开红包-未注册的用户可注册
	 */
	static openRedPack(data) {
		return tools.request(
			`/api/shop-integral/openRedPack`,
			'GET',
			data
		)
	}
	/**
	 * 工分转换绿分
	 */
	static payYToJOrder(data) {
		return tools.request(
			`/api/shop-integral/payYToJOrder`,
			'POST',
			data
		)
	}
	/**
	 * 商户入驻
	 */
	static fssettlement(data) {
		return tools.request(
			`/api/merchant/settlement`,
			'POST',
			data
		)
	}
	/**
	 * 创建扫商家二维码支付订单
	 */
	static handScanMerchantOrder(data) {
		return tools.request(
			`/api/shop-integral/handScanMerchantOrder`,
			'POST',
			data
		)
	}
	/**
	 * 收藏商品列表
	 */
	static collectGoods(data) {
		return tools.request(
			`/api/member/collect-goods`,
			'GET',
			data
		)
	}
	/**
	 * 绑定手机号+密码
	 */
	static bindMobilePassword(data) {
		return tools.request(
			`/api/member/bindMobilePassword`,
			'POST',
			data
		)
	}
	/**
	 * 添加反馈
	 */
	static addFeedback(data) {
		return tools.request(
			`/api/shop-integral/addFeedback`,
			'POST',
			data
		)
	}
	/**
	 * 图片删除
	 */
	static deleteResource(data) {
		return tools.request(
			`/api/community/deleteResource`,
			'POST',
			data
		)
	}
	/**
	 * 反馈记录
	 */
	static feedbackList(data) {
		return tools.request(
			`/api/shop-integral/feedbackList`,
			'GET',
			data
		)
	}
	/**
	 * 发送红包订单列表
	 */
	static sendRedPackOrderList(data) {
		return tools.request(
			`/api/shop-integral/sendRedPackOrderList`,
			'GET',
			data
		)
	}
	/**
	 * 订单具体商铺详情
	 */
	static orderMerchantDetail(data) {
		return tools.request(
			`/api/order/getOrderMerchant`,
			'GET',
			data
		)
	}
	/**
	 * 订单详情
	 */
	static orderDetail(data) {
		return tools.request(
			`/api/order/getOrder`,
			'GET',
			data
		)
	}
	/**
	 * 充值消费券
	 */
	static rechargeVorchar(data) {
		return tools.request(
			`/api/shop-integral/rechargeVorchar`,
			'POST',
			data
		)
	}
	/**
	 * 快递查询
	 */
	static getExpressQuery(data) {
		return tools.request(
			`/api/order/getExpressQuery`,
			'GET',
			data
		)
	}
	/**
	 * 微信授权注册
	 */
	static registerWxInvite(data) {
		return tools.request(
			`/api/member/registerWxInvite`,
			'POST',
			data
		)
	}
	/**
	 * 工分转绿分统计
	 */
	static gongtolvTotal(data) {
		return tools.request(
			`/api/balance/gongtolvTotal`,
			'GET'
		)
	}
}