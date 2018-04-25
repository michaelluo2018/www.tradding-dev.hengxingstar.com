// JavaScript Document
//设置操盘策略 
$(document).ready(function(){
	 get_phone(50);
});
get_code();

function get_phone(num){	
	$.ajax({
		type: "POST",
		url: api_url+"api/user/get_majia",
		data: {
			"token": token,
			"size":num,
		},
		async: false,
		dataType: "json",
		success: function(res) {
			var phone_list = res.data.phone_list;
			var phone_list_len = res.data.phone_list.length;
			$(".phone_list").html('');
			for(var i = 0; i < phone_list_len; i++) {				
				/*
				 <label class="custom-control custom-checkbox">
					<input id="radio1" name="styled_max_checkbox" type="checkbox" checked class="custom-control-input">
					<span class="custom-control-indicator"></span>
					<span class="custom-control-description">1354546445874</span>
				</label>
				*///checked 
				var return_str = '<label class="custom-control custom-checkbox col-md-2">'+
									'<input name="phones_str" type="checkbox" class="custom-control-input" checked="true" value="'+phone_list[i]+'">'+
									'<span class="custom-control-indicator"></span>'+
									'<span class="custom-control-description">'+phone_list[i]+'</span>'+
								'</label>';			
				$(".phone_list").append(return_str);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
		}
	});
}

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
		}
	});
}

//显示手机号数量
$(".phone_num").click(function(){
	var num = $(this).val();
	get_phone(num);
});
	
	
//全选
$('input[id="selectAll"]').click(function(){  
	$('input[name="phones_str"]').each(function(){  	
		//console.log($(this).attr("checked"));	
	$(this).prop("checked",true);  
	}); 
});  

//全选
$('input[id="unselectAll"]').click(function(){  
	$('input[name="phones_str"]').each(function(){  	
		$(this).prop("checked",false);  
	}); 
});  




//提交
$(".trader_submit").click(function(){
	var code = $('select[name="code"]').val();
	var price_range = $('input[name="price_range_min"]').val()+","+$('input[name="price_range_max"]').val();
	var one_entrust_amount_range = $('input[name="one_entrust_amount_range_min"]').val()+","+$('input[name="one_entrust_amount_range_max"]').val();
	var per_buy = $('input[name="per_buy"]').val();
	var dis_time = $('input[name="dis_time"]').val();
	var entrust_amount_range =  $('input[name="entrust_amount_range_min"]').val()+","+$('input[name="entrust_amount_range_max"]').val();
	//var phones_str = $('input[name="phones_str"]').val();
	var phones_str = '';
	$.each($('input[name=phones_str]:checked'),function(){
		phones_str += $(this).val()+',';
	});
	phones_str = phones_str.substr(0,phones_str.length-1);
	
	if(phones_str != ""){
			
	}
	//设置操盘策略 
	$.ajax({
		type: "POST",
		url: api_url+"api/entrust_proxy/set_trader_strategy",
		data: {
			"token": token,
			"code":code,
			"price_range":price_range,
			"one_entrust_amount_range":one_entrust_amount_range,
			"per_buy":per_buy,
			"dis_time":dis_time,
			"entrust_amount_range":entrust_amount_range,
			"phones_str":phones_str
		},
		async: false,
		dataType: "json",
		success: function(res) {
			//console.log(res);
			alert(res.msg);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
		}
	});
	
	
	//alert(entrust_amount_range);
});

