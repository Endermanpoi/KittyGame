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
	if (web3.eth.accounts[0] === owner) {
		window.location.href = "/breeding?a_id=" + id;
	}else{
		window.location.href = "/breeding?b_id=" + id;
	}
}

function buykitty(id) {
	console.log(id);
	$("#buyModal").modal('hide');
	$("#waitingModal").modal('show');
}

function salekitty(id) {
	console.log(id);
	$("#saleModal").modal('hide');
}

function unsalekitty(id) {
	console.log(id);
	$("#unsaleModal").modal('hide');
}

function breedingkitty(id) {
	console.log(id);
	$("#breedingModal").modal('hide');
}

function unbreedingkitty(id) {
	console.log(id);
	$("#unbreedingModal").modal('hide');
}