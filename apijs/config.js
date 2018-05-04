var api_url = "http://www.tradding-dev.hengxingstar.com/";
var token = "";
var cookietime = 30*24*3600;//默认30天

var token = getCookie("token");
//console.log(token);


//当前
var cur_url = window.location.pathname;
if(cur_url.indexOf("login.html") <= 0 && token == ""){
	alert("身份过期，请重新登录！");
	location.href="login.html";
}

get_market();

setInterval("get_market()",5*60*1000);//5分钟获取一次所有品种的行情基础信息 

//获取所有品种的行情基础信息 
function get_market(){	
	$.ajax({
		type: "POST",
		url: api_url+"market_center/api/MarketApi/get_hang_qing_list.do",
		data: {
			"token": token
		},
		async: false,
		dataType: "json",
		success: function(res) {
			console.log(res);
			var list = res.data;
			var list_len = res.data.length;
			$(".market_list").html('');
			
			for(var i = 0; i < list_len; i++) {				
				var percentage = Math.floor(list[i].increased * 100) / 100 ;//24H涨跌
				var danger = 'text-danger';
				var down = 'fa-level-down';
				if(percentage > 0){
					danger = "text-success";
					down = "fa-level-up";
				}else if(percentage == 0){
					danger = "";
					down = "";
				}			
				//左侧菜单行情	
				var return_str = '<tr>'+
					'<td>'+list[i].code+'</td>'+
					'<td>'+list[i].price+'</td>'+
					'<td><span class="'+danger+' text-semibold"><i class="fa '+down+'" aria-hidden="true"></i>'+percentage+'%</span></td>'+
				'</tr>'
				
				$(".market_list").append(return_str);
				
				//右侧挂单类型
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
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
		}
	});
}



function getMyDate(str){  
	str = parseInt(str);
	var oDate = new Date(str) 
	var oYear = oDate.getFullYear()
	if(oYear == 1970){
		var oDate = new Date(str * 1000) 
		var oYear = oDate.getFullYear()	
	}
	var oMonth = oDate.getMonth()+1,  
	oDay = oDate.getDate(),  
	oHour = oDate.getHours(),  
	oMin = oDate.getMinutes(),  
	oSen = oDate.getSeconds()
	
	var oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
	//console.log(oDate);
	return oTime;  
};  
//补0操作  
function getzf(num){  
	if(parseInt(num) < 10){  
		num = '0'+num;  
	}  
	return num;  
}  



//退出登录
$(".logout").click(function(){
	if(confirm("确认退出登录吗!")){	
		setCookie("token","",0);
		location.href = "login.html";
	}
})


//获取cookie
function getCookie(c_name)
{
	//var c_start
	if (document.cookie.length>0)
	{
		var c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
}

//设置cookie
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}