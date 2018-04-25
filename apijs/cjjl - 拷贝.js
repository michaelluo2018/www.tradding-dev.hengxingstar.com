// JavaScript Document

  $.ajax({
		type: "POST",
		url: api_url+"api/record_center/trade_record",
		data: {
			"token": token,
			"start_timestamp":'',
			"end_timestamp":'',
			"code":"SAC/BTC",
			"page_num":1,		
			"page_size":10		
		},
		async: false,
		dataType: "json",
		success: function(res) {
			//var len = data.result.list.length;			
			var result = res.data.ret;
			var pagination = result.pagination;
			var len = res.data.ret.list.length;
			var pagetotal =  Math.ceil(pagination.total/pagination.page_size);
			
			if(pagetotal < 2) {
				$(".pagination").hide();
			} else {
				$(".pagination").show();
				var page = '';
				$(".pagination").html('');
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
				var return_str = '<tr class="'+footable+'">'+
									/*'<td>'+(i+1)+'</td>'+*/
									'<td>'+result.list[i].tid+'</td>'+
									'<td>'+result.list[i].code+'</td>'+									
									'<td>买入</td>'+
									/*'<td>市价</td>'+
									'<td>1</td>'+*/
									'<td>'+getMyDate(result.list[i].time)+'</td>'+
									'<td>'+result.list[i].amount+'</td>'+
									'<td>1</td>'+
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
	
	
	//翻页和搜索
	$("body").on("click", ".page-link,#search", function() {
		$(".list").html("");
		
		var pageNum = $(this).html();
		if(pageNum == "搜索") pageNum = 1;
		
		$.ajax({
			type: "POST",
			url: api_url+"api/record_center/trade_record",
			data: {
				"token": "trd",
				"start_timestamp":'',
				"end_timestamp":'',
				"code":"SAC/BTC",
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
					$(".pagination").html('');
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
					var return_str = '<tr>'+
										'<td>'+(i+1)+'</td>'+
										'<td>'+result.list[i].tid+'</td>'+
										'<td>'+result.list[i].code+'</td>'+									
										'<td>买入</td>'+
										'<td>市价</td>'+
										'<td>1</td>'+
										'<td>'+getMyDate(result.list[i].time)+'</td>'+
										'<td>'+result.list[i].amount+'</td>'+
										'<td>1</td>'+
										'<td>'+result.list[i].total+'</td>'+
										'<td>成功</td>'+ 
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
