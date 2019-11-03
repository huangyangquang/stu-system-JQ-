/*参数
options = {
	parent: , 父级
	curPage: , 当前页码
	pageCount: , 页码的总数
	cb: , 切换页码的回调函数
}*/
(function($) {
	function TurnPage(options) {
		// console.log(options);
		this.parent = options.parent || null;
		this.curPage = options.curPage || 1;
		this.pageCount = options.pageCount || 0;
		this.cb = options.cb || null;
	};
	// 渲染元素
	TurnPage.prototype.renderDom = function() {
		$('.box', this.parent)[0] && $('.box', this.parent).empty()
		var str = "";
		if(this.curPage > 1) {
			str += '<li class="pre-page">上一页</li>'
		}
		if(this.curPage - 2 > 1) {
			str += '<li class="num">1</li>'
		}
		if(this.curPage > 4) {
			str += '<li>...</li>'
		}
		for(var i = this.curPage - 2; i <= this.curPage + 2; i ++) {
			if(i == this.curPage) {
				str += '<li class="num cur-page">' + i + '</li>'			
			} else if (i > 0 && i <= this.pageCount) {
				str += '<li class="num">' + i + '</li>'
			}
		}
		if(this.curPage + 2 < this.pageCount - 1) {
			str += '<li>...</li>'
		}
		if(this.curPage + 2 < this.pageCount) {
			str += '<li  class="num">' + this.pageCount + '</li>'
		}
		if(this.curPage < this.pageCount) {
			str += '<li class="next-page">下一页</li>'
		}
		if(!$('.box', this.parent)[0]) {
			$('<ul class="box"></ul>')
				.append(str)
					.appendTo(this.parent)
		}else {
			$('.box', this.parent).append(str);
		}	
		this.renderCss();
	}
	// 渲染样式
	TurnPage.prototype.renderCss = function() {
		$('.box li').css({
			"float": 'left',
			"padding": '0px 13px',
			"lineHeight": '40px',
			"height": "40px",
			"margin": "0px 5px",
			"border": "1px solid #000",
			"fontSize": "16px",
			"textAlign": "center",
			"cursor": "pointer",
			'color': "#767a7b"
		}).hover(function() {
			$(this).css({
				"borderColor": '#43b9e4'
			})
		}, function() {
			$(this).css({
				"borderColor": '#000'
			})
		})
		$('.box .cur-page').css({
			"borderColor": '#43b9e4',
			"backgroundColor": '#eee',
			"color": 'rgb(37, 28, 28);'
		})
	}
	// 事件监听
	TurnPage.prototype.bindEvent = function() {
		var self = this;
		$('.box', this.parent).on('click', '.num', function() {
			self.curPage = parseInt($(this).text());
			self.changePageCb();
		})
		$('.box', this.parent).on('click', '.pre-page', function() {
			if(self.curPage > 1) {
				self.curPage --;
				self.changePageCb()
			}
			
		})
		$('.box', this.parent).on('click', '.next-page', function() {
			if(self.curPage < self.pageCount) {
				self.curPage ++;
				self.changePageCb();
			}
		})
	}
	// 切换页码的回调函数
	TurnPage.prototype.changePageCb = function() {
		this.renderDom();
		this.cb && this.cb(this.curPage);
	}
	// 初始化
	TurnPage.prototype.init = function() {
		this.renderDom();
		this.bindEvent();
		// console.log('turnPage init')
	}

	$.fn.extend({
		turnPage: function(options) {
			options.parent = this
			var turnPageObj = new TurnPage(options);
			turnPageObj.init();
		}
	})

}(jQuery));

