// 封装转换表单数据成为json格式的数据函数
function format(data) {
	var obj = {};
	data.forEach(function(ele) {
		obj[ele['name']] = ele['value'];
	})
	return obj;
}

export {format}