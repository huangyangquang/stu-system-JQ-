
import {renderTurnPage, renderStuInfo} from '../render/renderDom.js'
import { getData } from '../getData/getData.js'
import {format} from '../format/format.js'


// 事件绑定
var bind = function (curPage, curPageSize, count, pageArr, inpValue) {
	// 关键词搜索
	$('.btn', '.search-box').on('click', function() {
		inpValue = $('.search').val();	
		inpValue && getData('/api/student/searchStudent', {
			sex: -1,
			search: inpValue,
			page: curPage,
			size: curPageSize
		}, function(res) {
			$('.search').val('');
			pageArr = res.data.searchList;
			count = res.data.cont;
			renderStuInfo(pageArr);
			renderTurnPage('/api/student/searchStudent', {
				sex: -1,
				search: inpValue,
				page: curPage,
				size: curPageSize
			}, curPage, curPageSize, count, pageArr, inpValue);
		})
	})

	// 侧边栏 点击 获取data属性的值，渲染对应的页面
	$('.sidebar-nav', '.con-box').on('click', 'li', function () {
		// 侧边栏的切换
		$(this).addClass('active')
			.siblings().removeClass('active');

		// 进入不同页面时，对页面进行的数据渲染和设置默认值
		var pageClass = $(this).data('id');
		if(pageClass == 'add-stu-box') {
			$(`.${pageClass}`)[0].reset();
		}

		if(pageClass == 'stu-List-box') {
			getData('/api/student/findByPage', {
				page: curPage,
				size: curPageSize
			}, function(res) {
				console.log(res);
				count = res.data.cont;
				pageArr = res.data.findByPage;
				renderStuInfo(pageArr);
				renderTurnPage('/api/student/findByPage', {
					page: curPage,
					size: curPageSize
				}, curPage, curPageSize, count, pageArr, inpValue);
			})
		}
		// 页面的切换
		$(`.${pageClass}`).fadeIn()
			.siblings().fadeOut();
	})


	// 新增学生的表格：
	// 获取学生的信息 发送给服务器 询问是否要进行页面跳转
	$('.addStu', '.newStu-form').click(function (e) {
		e.preventDefault();
		var stuInfo = $('.newStu-form').serializeArray();
		var data = format(stuInfo);
		console.log(data);
		getData('/api/student/addStudent', data, function(res) {
			console.log(res);
			if(res.status == 'success') {
				var toFlag = window.confirm(res.msg + ',是否跳转到学生信息页面');
				if(toFlag) {
					$('li[data-id="stu-List-box"]').trigger('click');
				}
			} else {
				window.alert(res.msg);
			}
		})
	}) 

	// 清空表单信息
	$('.resetStu', '.newStu-form').click(function (e) {
		$('.newStu-form')[0].reset();
	}) 

	// 删除学生 获取学生在已存的数据中的index 根据index来换取对应学生的学号 
	// 通过学号告知后台删除学生 然后重新渲染页面学生信息
	// (这里可以通过已经保存的数据，通过直接修改数据，渲染页面，可以减少请求；
	// 但是就可以造成数据不准的情况，得结合业务看具体情况，可以和杉杉老师讨论一下)

	// 出现问题，元素还没有渲染出来前，我就监听了元素，是没有绑定上事件的
	// 通过事件冒泡解决
	$('.stuTable tbody').on('click', '.delStu', function() {
		var index = $(this).data('index');
		// console.log(index, pageArr, pageArr[index])
		var sNo = pageArr[index].sNo;
		getData('/api/student/delBySno', {
			sNo
		}, function(res) {
			console.log(res);
			if(res.status == 'success') {
				$('li[data-id="stu-List-box"]').trigger('click');
			}else {
				window.alert(res.msg);
			}
		})
	})


	// 修改学生的信息 获取学生在已存的数据中的index 根据index来换取对应学生的学号 
	// 通过学号告知后台删除学生 然后重新渲染页面学生信息
	$('.stuTable tbody').on('click', '.changeStuInfo', function() {
		var index = $(this).data('index');
		// 被修改学生信息
		var stuInfo = pageArr[index];
		$('.mask-box').slideDown().click(function(e) {
			$(this).slideUp();
		});
		var changeForm = $('.changeForm')[0];
		// 学生信息赋给表单
		for(var i = 0; i < changeForm.length - 2; i ++) {
			// 性别判断
			if(changeForm[i]['name'] == 'sex') {
				// 判断表单中sex
				if(+changeForm[i]['value'] == stuInfo[changeForm[i]['name']]) {
					$(changeForm[i]).prop('checked', true)				
				} else {
					$(changeForm[i]).prop('checked', false)
				}
			} else {
				changeForm[i]['value'] = stuInfo[changeForm[i]['name']];	
			}
		}
		// 阻止事件冒泡
		$('.changeForm').click(function(e) {
			e.stopPropagation();
		})
		// 修改学生信息提交操作
		$('.changeStu', '.changeForm').on('click', function(e) {
			// 取消默认事件，默认form表单会刷新
			e.preventDefault();
			var formData = $('.changeForm').serializeArray();
			var curData = format(formData);
			// console.log(curData);
			getData('/api/student/updateStudent', {
				...curData
			}, function(res) {
				$('li[data-id="stu-List-box"]').trigger('click');	
				window.alert(res.msg);
			})
		})
	})
}

export { bind }

