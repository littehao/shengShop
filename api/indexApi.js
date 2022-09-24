import tools from '@/utils/httpRequest.js'
export default class {
	/**
	 * 首页 设备状态
	 */
	static banners(data) {
		return tools.request(
			`/api/banners`,
			'GET'
		)
	}
	/**
	 * 首页商品列表
	 */
	static homePageList(data) {
		return tools.request(
			`/api/goods/homePageList`,
			'GET',
			data
		)
	}
	/**
	 * 商品专区分类列表
	 */
	static specialCategory(data) {
		return tools.request(
			`/api/goods/special`,
			'GET'
		)
	}
}