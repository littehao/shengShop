import tools from '@/utils/httpRequest.js'
export default class {
	/**
	 * 线下商城专区分类
	 */
	static merchantCategory(data) {
		return tools.request(
			`/api/downMerchant/category`,
			'GET',
			data
		)
	}
	/**
	 * 线下商城专区tab分类
	 */
	static tabCategory(data) {
		return tools.request(
			`/api/downMerchant/tabCategory`,
			'GET'
		)
	}
	/**
	 * 获取线下商户
	 */
	static merchants(data) {
		return tools.request(
			`/api/downMerchant/merchants`,
			'GET',
			data
		)
	}
	/**
	 * 商户详情
	 */
	static downMerchantInfo(data) {
		return tools.request(
			`/api/downMerchant/info`,
			'GET',
			data
		)
	}
	/**
	 * 获取绑定商户信息
	 */
	static getDmerchantInfo(data) {
		return tools.request(
			`/api/member/getDmerchantInfo`,
			'GET'
		)
	}
	/**
	 * 扫码收款订单
	 */
	static getDmerchantScanOrder(data) {
		return tools.request(
			`/api/member/getDmerchantScanOrder`,
			'GET',
			data
		)
	}
}