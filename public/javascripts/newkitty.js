start();

function start() {
	initweb3();
}

function buynow() {
	console.log('buynew');
	$("#buynowModal").modal('hide');
	$("#waitingModal").modal('show');
	buynew(function (done) {
		if (done) {
			$.post("/newcat", { acc: userAccount },
				function (data, status) {
					var id = data.id;
					window.location.href = "/kitty?id=" + id;
				})
		} else {
			$("#errModal").modal('show');
		}
	});
}