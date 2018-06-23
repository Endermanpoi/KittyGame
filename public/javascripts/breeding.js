var aid, bid, now;
start();

function start() {
	initweb3(function () { });

	$(document).ready(function () {
		var aid = getPar('a_id');
		var bid = getPar('b_id');
		if (aid) {
			$("#kittyA").html('<img src="images/cat/' + aid + '.png" class="img-responsive"><h4>猫咪 #' + aid + '</h4>');
		}
		if (bid) {
			$("#kittyB").html('<img src="images/cat/' + bid + '.png" class="img-responsive"><h4>猫咪 #' + bid + '</h4>');
		}
		$('#tab').hide();
	});
}

function choose(id) {
	if (now == 0) {
		aid = id;
		$("#kittyA").html('<img src="images/cat/' + aid + '.png" class="img-responsive"><h4>猫咪 #' + aid + '</h4>');
	} else {
		bid = id;
		$("#kittyB").html('<img src="images/cat/' + bid + '.png" class="img-responsive"><h4>猫咪 #' + bid + '</h4>');

	}
}

function getPar(par) {
	//获取当前URL
	var local_url = document.location.href;
	//获取要取得的get参数位置
	var get = local_url.indexOf(par + "=");
	if (get == -1) {
		return false;
	}
	//截取字符串
	var get_par = local_url.slice(par.length + get + 1);
	//判断截取后的字符串是否还有其他get参数
	var nextPar = get_par.indexOf("&");
	if (nextPar != -1) {
		get_par = get_par.slice(0, nextPar);
	}
	return get_par.split('#')[0];
}

function mykitty() {
	getlist(userAccount, 3);
	now = 0;
	$('#tab').hide();
}

function otherkitty() {
	getlist(null, 3);
	now = 1; 
	$('#tab').show();
}

function alluncool() {
	getlist(null, 3);
	now = 1; 
	$("#tab li[class='active'").removeClass("active");
	$("#alluncool").addClass("active");
}

function myuncool() {
	getlist(null, 3);
	now = 1; 
	$("#tab li[class='active'").removeClass("active");
	$("#myuncool").addClass("active");
}