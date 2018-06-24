start();

function start() {
	initweb3(function () {
		$('#address').html('我的地址：' + userAccount);
		allkitty();
	});
}

function choose(id) {
	window.location.href = "/kitty?id=" + id;
}

function allkitty() {
	getlist(userAccount, 0);
	$("#tab li[class='active'").removeClass("active");
	$("#all").addClass("active");
}

function sale() {
	getlist(userAccount, 1);
	$("#tab li[class='active'").removeClass("active");
	$("#sale").addClass("active");
}

function breeding() {
	getlist(userAccount, 2);
	$("#tab li[class='active'").removeClass("active");
	$("#breeding").addClass("active");
}
