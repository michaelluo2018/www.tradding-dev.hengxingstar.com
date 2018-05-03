// JavaScript Document
//设置操盘策略 
$(document).ready(function(){
	 //get_phone(10,0);
	 start_time = new Date().getTime();
	 console.log(start_time/1000);
	 get_record("SAC",Math.ceil(start_time/1000)-2*24*60*60);
}); 

//资产类别选择
$('select[name="asset_type"]').change(function() {
	var start_time = $('input[name="start_time"]').val();
	
	start_time
	if(start_time != '')
		start_time = new Date(start_time).getTime();
	//alert($('input[name="start_time"]').val());
	//alert(start_time);	
	console.log($(this).val());
	console.log(start_time/1000);
	get_record($(this).val(),start_time/1000);
});

$('input[name="start_time"]').change(function() {	
	start_time = new Date($(this).val()).getTime();
	console.log($(this).val());
	get_record($('select[name="asset_type"]').val(),start_time/1000);
});


//获取操盘和用户的资产统计信息 
function get_record(asset_type,start_time){
	 if(asset_type == '')
		 var asset_type = "SAC";
	 if(start_time == '')	
	 	var start_time = "1525248000";
	 var time = new Array()//日期
	 var trader_avb = new Array();//操盘账户余额
	 var trader_frozen  = new Array();//操盘账户冻结
	 var customer_avb  = new Array();//客户账户余额
	 var customer_frozen  = new Array();//客户账户冻结	
	 var bg_start_time = start_time;
	 
	 $.ajax({
		type: "POST",
		url: api_url+"api/record_center/get_customer_trader_trend",
		data: {
			"token": token,
			"asset_type":asset_type,
			"start_time":start_time,
		},
		async: true,
		dataType: "json",
		success: function(res) {
			console.log(res);
			var list = res.data.customer_trader_trend;
			var list_len = res.data.customer_trader_trend.length;
			$(".phone_list").html('');
			time = new Array();
			trader_avb = new Array();
			trader_frozen = new Array();
			customer_avb = new Array();
			customer_frozen = new Array();
			for(var i = 0; i < list_len; i++) {				
				//组装时间
				//if(i >5) break;
				
				time.push(getMyDate(list[i].time));
				trader_avb.push(list[i].trader_avb);
				trader_frozen.push(list[i].trader_frozen);
				customer_avb.push(list[i].customer_avb);
				customer_frozen.push(list[i].customer_frozen);
			}
		
			// 基于准备好的dom，初始化echarts实例
			 var myChart = echarts.init(document.getElementById('main'));
			option = {
				title: {
					text: asset_type+' 开始日期：'+getMyDate(bg_start_time)
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					left: '40%',
					data:['操盘账户余额','操盘账户冻结','客户账户余额','客户账户冻结']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: time
				},
				yAxis: {
					type: 'value'
				},
				dataZoom : {  
					 show : true,  
					 realtime : true,  
					 start : 0,  
					 end : 100  
				},
				series: [
					{
						name:'操盘账户余额',
						type:'line',
						stack: '总量',
						data:trader_avb
					},
					{
						name:'操盘账户冻结',
						type:'line',
						stack: '总量',
						data:trader_frozen
					},
					{
						name:'客户账户余额',
						type:'line',
						stack: '总量',
						data:customer_avb
					},
					{
						name:'客户账户冻结',
						type:'line',
						stack: '总量',
						data:customer_frozen
					}
				]
			};
			
			console.log(option);
			console.log(trader_avb);
			console.log(trader_frozen);
			console.log(customer_frozen);
			myChart.setOption(option);
			
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
		}
	});
}

