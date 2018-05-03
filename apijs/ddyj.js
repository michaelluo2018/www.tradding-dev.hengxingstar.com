// JavaScript Document
//大单预警
$(document).ready(function(){
	 get_list(0);
});
function get_list(day_length){	
	
	$.ajax({
		type: "POST",
		url: api_url+"api/record_center/get_big_deal",
		data: {
			"token":token,
			"page_num":1,		
			"page_size":10,
			"day_length":day_length,//天数，默认为0，今天
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
					<th >时间</th>
					<th data-hide="phone">交易类型</th>
					<th data-hide="phone">交易品种</th>                                               
					<th >数量</th>
					<th >用户账号</th>
				</tr>	
				*/
				if(i%2 == 0) footable = "footable-even";
				else  footable = "footable-odd";
				
				if(result.list[i].direction == "b") result.list[i].direction="买入";
				else result.list[i].direction="卖出";
				var return_str = '<tr class="'+footable+'">'+
									'<td>'+(i+1)+'</td>'+
									'<td>'+getMyDate(result.list[i].bd_time)+'</td>'+
									'<td>'+result.list[i].direction+'</td>'+									
									'<td>'+result.list[i].code+'</td>'+
									'<td>'+result.list[i].num+'</td>'+
									'<td>'+result.list[i].phone+'</td>'+
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

//天数选择
$('input[name="phone_num"]').click(function() {
	get_list($(this).val());
});
