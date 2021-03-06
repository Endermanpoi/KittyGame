start();

function start() {
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
		console.log("MetaMask!");
		web3.version.getNetwork(function (err, netId) {
			if (netId == 519) {
				console.log("This is the private network.");
				var owner = $("#owner").text().toLowerCase();
				if (web3.eth.accounts[0] === owner) {
					$("#buy").hide();
					$(".hidden").removeClass("hidden");
					$("#add").html('主人<small>不就是我么</samll>');
				}
			}
		});
	} else {
		console.log("noMetaMask!");
	}
}

function breeding(id) {
	var owner = $("#owner").text().toLowerCase();
	if (web3.eth.accounts[0] === owner) {
		window.location.href = "/breeding?a_id=" + id;
	} else {
		window.location.href = "/breeding?b_id=" + id;
	}
}

function buykitty(id) {
	console.log('buy:' + id);
	$("#buyModal").modal('hide');
	$("#waitingModal").modal('show');
	initweb3(function () {
		buy(id, function () {
			setTimeout(function () {
				window.location.href = "/kitty?id=" + id;
			}, 5000);
		});
	});
}

function salekitty(id) {
	console.log('sale:' + id);
	$("#saleModal").modal('hide');
	$("#waitingModal").modal('show');
	createAuction(id, $("#salewant").val(), function (done) {
		if (done) {
			window.location.reload();
		} else {
			$("#errModal").modal('show');
		}
	});
}

function unsalekitty(id) {
	console.log('unsale:' + id);
	$("#unsaleModal").modal('hide');
	$("#waitingModal").modal('show');
	cancelAuction(id, function (done) {
		if (done) {
			window.location.reload();
		} else {
			$("#errModal").modal('show');
		}
	});
}

function salebreedingkitty(id) {
	console.log('salebreeding:' + id);
	$("#salebreedingModal").modal('hide');
	$("#waitingModal").modal('show');
	creatSireSell(id, $("#salebreedingwant").val(), function (done) {
		if (done) {
			window.location.reload();
		} else {
			$("#errModal").modal('show');
		}
	});
}

function unsalebreedingkitty(id) {
	console.log('unsalebreeding:' + id);
	$("#unsalebreedingModal").modal('hide');
	$("#waitingModal").modal('show');
	cancelSireSell(id, function (done) {
		if (done) {
			window.location.reload();
		} else {
			$("#errModal").modal('show');
		}
	});
}