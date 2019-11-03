// 渲染切换页码的插件

import { getData } from '../getData/getData.js'

var timer = null;
var renderTurnPage = function (url, ajax_data, curPage, curPageSize, count, pageArr, inpValue) {
	$('.turnPage', '.stu-List-box').turnPage({
		curPage: curPage,
		pageCount: Math.ceil( count / curPageSize ),
		cb: function(curPage) {
			clearTimeout(timer);
			// 请求下一页数据，返回并且渲染页面
			// 判断是按页请求，还是按搜索请求
			// 防止页面在短时间内频繁地请求和渲染 防抖
			timer = setTimeout(function() {
				getData(url, {
					...ajax_data,
					page: curPage,
					size: curPageSize
				}, function(res) {
					console.log(res);
					count = res.data.cont;
					pageArr = res.data.findByPage || res.data.searchList;
					renderStuInfo(pageArr);
				})
			}, 500);
		}
	})
}

// 进入页面 获取学生信息 渲染学生数据
var renderStuInfo = function (data) {
	var str = '';
	console.log(data, 'renderStuInfo');
	data.forEach(function(ele, index) {
		str += `<tr>
			<td>${ele.sNo}</td>
			<td>${ele.name}</td>
			<td>${ele.sex == 0 ? '男' : '女'}</td>
			<td>${new Date().getFullYear() - ele.birth}</td>
			<td>${ele.email}</td>
			<td>${ele.address}</td>
			<td>${ele.phone}</td>
			<td>
				<button class="delStu" data-index='${index}'>删除</button>
				<button class="changeStuInfo" data-index="${index}">修改</button>
			</td>
		</tr>`
	})
	$('tbody', '.stuTable').html(str);
}

export {renderTurnPage, renderStuInfo}