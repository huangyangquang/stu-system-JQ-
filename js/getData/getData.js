// 封装数据请求函数
var  getData = function (url, data, successFun) {
	// console.log(url, data);
	$.ajax({
		url: 'https:open.duyiedu.com' + url,
		type: "GET",
		data: {
			...data,
			appkey: 'huanyangquan_1572677518443'
		},
		dataType: 'json',
		success: successFun
	})
}

export { getData }
