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

function getMyDate(str){  
	var oDate = new Date(str),  
	oYear = oDate.getFullYear(),  
	oMonth = oDate.getMonth()+1,  
	oDay = oDate.getDate(),  
	oHour = oDate.getHours(),  
	oMin = oDate.getMinutes(),  
	oSen = oDate.getSeconds(),  
	oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
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