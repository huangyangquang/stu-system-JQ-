var curPage = 1,
	curPageSize = 10,
	count = null,
	pageArr = [],
	inpValue;

import { bind } from './bindEvent/bindEvent.js'

// 初始化函数
function init() {
	bind(curPage, curPageSize, count, pageArr, inpValue);
	// 异步
	$('li[data-id="stu-List-box"]').trigger('click');
}

init();


// 插件：
// 分页插件 √

// 连续点击下一页或者上一页的话，会出现页面连续渲染，体验不好 √

// 数据请求是一个函数
// 数据处理，转换是一个函数
// 数据渲染到页面是一个函数

