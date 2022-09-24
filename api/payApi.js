import tools from '@/utils/httpRequest.js'
export default class {
	/**
	 * 创建付款码-订单
	 */
	static createScanPayOrder(data) {
		return tools.request(
			`/api/shop-integral/createScanPayOrder`,
			'POST',
			data
		)
	}
	/**
	 * 创建付款码-订单
	 */
	static handScanOrder(data) {
		return tools.request(
			`/api/shop-integral/handScanOrder`,
			'GET',
			data
		)
	}
	/**
	 * 获取支付配置列表 
	 */
	static payConfigList(data) {
		return tools.request(
			`/api/payConfig/list`,
			'GET',
			data
		)
	}
	/**
	 * 待付款--立即付款
	 */
	static orderPay(data) {
		return tools.request(
			`/api/order/pay`,
			'POST',
			data
		)
	}
	/**
	 * 商品订单确认订单号获取
	 */
	static createOrderNo(data) {
		return tools.request(
			`/api/order/createOrderNo`,
			'GET'
		)
	}
	/**
	 * 商品确认下单
	 */
	static createPay(data) {
		return tools.request(
			`/api/order/create`,
			'POST',
			data
		)
	}
}