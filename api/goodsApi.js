import tools from '@/utils/httpRequest.js'
export default class {
	/**
	 * 商品分类
	 */
	static goodsCategory(data) {
		return tools.request(
			`/api/goods/category`,
			'GET'
		)
	}
	/**
	 * 获取购物车
	 */
	static listCart(data) {
		return tools.request(
			`/api/cart/list`,
			'GET',
			data
		)
	}
	/**
	 * 购物车数量修改
	 */
	static modifyCart(data) {
		return tools.request(
			`/api/cart/modify`,
			'POST',
			data
		)
	}
	/**
	 * 删除购物车
	 */
	static deleteCart(data) {
		return tools.request(
			`/api/cart/delete`,
			'POST',
			data
		)
	}
	/**
	 * 商品列表
	 */
	static goodsList(data) {
		return tools.request(
			`/api/goods/list`,
			'GET',
			data
		)
	}
	/**
	 * 商品详情
	 */
	static goodsDetail(data) {
		return tools.request(
			`/api/goods/detail/${data.id}`,
			'GET'
		)
	}
	/**
	 * 商品收藏和取消收藏
	 */
	static goodsCollect(data) {
		return tools.request(
			`/api/goods/collect`,
			'POST',
			data
		)
	}
	/**
	 * 新增购物车
	 */
	static addCart(data) {
		return tools.request(
			`/api/cart/add`,
			'POST',
			data
		)
	}
	/**
	 * 商铺详情
	 */
	static merchantDetail(data) {
		return tools.request(
			`/api/merchant/info`,
			'GET',
			data
		)
	}
}