//用户登陆
$("#loginSystem").click(function(){
	var cellphone = $.trim($('input[name="cellphone"]').val());
	var password = $.trim($('input[name="password"]').val());
	var login_type = $.trim($('input[name="login_type"]').val());
	var fund_pwd_md5 = $.trim($('input[name="fund_pwd_md5"]').val());
	
	if(cellphone == ""){
		$('input[name="cellphone"]').focus();
		$('#msg').html("请输入手机号");
		$('#msg').show(500);
		return false;
	}
	
	if(password == ""){
		$('input[name="password"]').focus();
		$('#msg').html("请输入加密密码");
		$('#msg').show(500);
		return false;
	}
	
	if(fund_pwd_md5 == ""){
		$('input[name="fund_pwd_md5"]').focus();
		$('#msg').html("请输入资金密码");
		$('#msg').show(500);
		return false;
	}
	
	
	password = $.md5(password);
	fund_pwd_md5 = $.md5(fund_pwd_md5);
	
	
	
	$.ajax({
		type: "POST",
		url: api_url+"api/user/login",
		data: {
			"cellphone":cellphone,//12345678901
			"password":password,//123xyz
			"login_type":3,
			"fund_pwd_md5":fund_pwd_md5,	//123456			
		},
		async: true,
		dataType: "json",
		success: function(res) {
			//var len = data.result.list.length;			
			console.log(res);
			if(res.err != 0){
				$('#msg').html(res.msg);
				$('#msg').show(500);
				return false;
			}
			
			setCookie("token",res.data.token,cookietime);
			location.href="gdsz.html";
			return false;
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "error"){
				alert("接口数据错误");
			}
			return false;
		}
	});
	return false;
});

//console.log();