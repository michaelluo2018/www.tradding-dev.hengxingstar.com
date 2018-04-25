// JavaScript Document
//获取马甲交易记录
$(document).ready(function(){
	 get_list("SAC/BTC");
});
function get_list(code){	

	$.ajax({
		type: "POST",
		url: api_url+"api/record_center/majia_trade_record",
		data: {
			"token":token,
			"code":code,
			"page_num":1,		
			"page_size":10		
		},
		async: false,
		dataType: "json",
		success: function(res) {
			//var len = data.result.list.length;	
			console.log(res);		
			var result = res.data.ret;
			var pagination = result.pagination;
			var len = res.data.ret.list.length;
			var pagetotal =  Math.ceil(pagination.total/pagination.page_size);
			if(pagetotal >=10) pagetotal = 10
			$(".pagination").html('');
			$(".list").html('');
			if(pagetotal < 2) {
				$(".pagination").hide();
			} else {
				$(".pagination").show();
				var page = '';				
				for(var i = 1; i <= pagetotal; i++) {
					var cur = '';	
					//console.log(pagination.page_num+"=="+i);
					if(pagination.page_num == i) cur = ' active';			
					page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + i + '</a></li>';
				}
				$(".pagination").append(page);
			}			
		
			for(var i = 0; i < len; i++) {				
				/*
				 <tr>
					<th data-hide="phone">序号</th>
					<th>用户名</th>
					<th data-hide="phone">交易对</th>
					<th data-hide="phone">交易类型</th>
					<th data-hide="phone">委托类型</th>
					<th data-hide="phone">委托量</th>
					<th data-hide="phone">日期/时间</th>
					<th data-hide="phone">成交均价</th>
					<th data-hide="phone">成交量</th>
					<th>成交总额</th>
					<th>委托状态</th>
				</tr>	
				*/
				if(i%2 == 0) footable = "footable-even";
				else  footable = "footable-odd";
				
				if(result.list[i].direction == "b") result.list[i].direction="买入";
				else result.list[i].direction="卖出";
				var return_str = '<tr class="'+footable+'">'+
									/*'<td>'+(i+1)+'</td>'+*/
									'<td>'+result.list[i].account+'</td>'+
									'<td>'+result.list[i].code+'</td>'+									
									'<td>'+result.list[i].direction+'</td>'+
									/*'<td>市价</td>'+
									'<td>1</td>'+*/
									'<td>'+getMyDate(result.list[i].time)+'</td>'+
									'<td>'+result.list[i].price+'</td>'+
									'<td>'+result.list[i].amount+'</td>'+
									'<td>'+result.list[i].poundage+'</td>'+
									'<td>'+result.list[i].total+'</td>'+
									/*'<td>成功</td>'+ */
								'</tr>';			
				$(".list").append(return_str)
			}
			
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
		}
	});
}

//翻页和搜索
$("body").on("click", ".page-link,#search", function() {
	$(".list").html("");
	
	var pageNum = $(this).html();
	if(pageNum == "搜索") pageNum = 1;
	
	var code = $('select[name="code"]').val();
	$.ajax({
		type: "POST",
		url: api_url+"api/record_center/majia_trade_record",
		data: {
			"token":token,
			"code":code,
			"page_num":pageNum,		
			"page_size":10		
		},
		async: true,
		dataType: "json",
		success: function(res) {
			//var len = data.result.list.length;			
			var result = res.data.ret;
			//console.log(res);
			var pagination = result.pagination;
			var len = res.data.ret.list.length;
			var pagetotal =  Math.ceil(pagination.total/pagination.page_size);			
			
			if(pagetotal < 2) {
				$(".pagination").hide();
			} else {
				var page = '';
				var page_b = 0;
				var page_e = '';
				pageNum = parseInt(pageNum);
				$(".pagination").html('');
				if(pagetotal>=10){
					page_b = pageNum - 5;
					page_e = pageNum + 5;
				}else{
					page_b = 1;
					page_e = pagetotal;	
				}
				if(page_b<=1) page_b = 1;
				if(page_e>=pagetotal) page_e = pagetotal;
				 
				  console.log(pageNum);
				 console.log(pagetotal);
				 console.log(page_e);
				
				for(var i = page_b; i <= page_e; i++) {
					var cur = '';	
					//console.log(pagination.page_num+"=="+i);
					if(pagination.page_num == i) cur = ' active';			
					page += '<li class="page-item'+ cur +'"><a class="page-link" href="#">' + i + '</a></li>';
				}
				$(".pagination").append(page);
			}			
		
			for(var i = 0; i < len; i++) {				
				/*
				 <tr>
					<th data-hide="phone">序号</th>
					<th>用户名</th>
					<th data-hide="phone">交易对</th>
					<th data-hide="phone">交易类型</th>
					<th data-hide="phone">委托类型</th>
					<th data-hide="phone">委托量</th>
					<th data-hide="phone">日期/时间</th>
					<th data-hide="phone">成交均价</th>
					<th data-hide="phone">成交量</th>
					<th>成交总额</th>
					<th>委托状态</th>
				</tr>	
				*/
				if(i%2 == 0) footable = "footable-even";
				else  footable = "footable-odd";
				
				if(result.list[i].direction == "b") result.list[i].direction="买入";
				else result.list[i].direction="卖出";
				var return_str = '<tr class="'+footable+'">'+
									/*'<td>'+(i+1)+'</td>'+*/
									'<td>'+result.list[i].account+'</td>'+
									'<td>'+result.list[i].code+'</td>'+									
									'<td>'+result.list[i].direction+'</td>'+
									/*'<td>市价</td>'+
									'<td>1</td>'+*/
									'<td>'+getMyDate(result.list[i].time)+'</td>'+
									'<td>'+result.list[i].price+'</td>'+
									'<td>'+result.list[i].amount+'</td>'+
									'<td>'+result.list[i].poundage+'</td>'+
									'<td>'+result.list[i].total+'</td>'+
									/*'<td>成功</td>'+ */
								'</tr>';			
				$(".list").append(return_str)
			}
			
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
		}
	});
});


//获取所有品种的行情基础信息 code
function get_code(){
	//alert("123");
	$.ajax({
		type: "POST",
		url: api_url+"market_center/api/MarketApi/get_hang_qing_list.do",
		data: {			
		},
		async: false,
		dataType: "json",
		success: function(res) {	
			console.log(res);
			var option = '';
			$('select[name="code"]').html();
			$.each(res.data,function(index, value){
				option += '<option value="'+value.code+'">'+value.code+'</option>';
			});
			if(option == ''){
				option = '<option value="SAC/BTC">SAC/BTC</option>';
			}
			$('select[name="code"]').html(option);
			
			
			$('select[name="code"]').change(function(){ 
				get_list($(this).val());
			})
		}
	});
}

get_code();