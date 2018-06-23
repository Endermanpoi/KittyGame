start();

function start() {
	sale();
}

function choose(id) {
	window.location.href = "/kitty?id=" + id;
}

function allkitty() {
	getlist(null, 0);
	$("#tab li[class='active'").removeClass("active");
	$("#all").addClass("active");
}

function sale() {
	getlist(null, 1);
	$("#tab li[class='active'").removeClass("active");
	$("#sale").addClass("active");
}

function breeding() {
	getlist(null, 2);
	$("#tab li[class='active'").removeClass("active");
	$("#breeding").addClass("active");
}

