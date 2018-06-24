var userAccount;
var web3;
var KittyGame;
function initweb3(callback) {
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
		console.log("MetaMask!");
	} else {
		console.log("noMetaMask!");
		document.getElementById('main').innerHTML =
			"<div class=\"row\"><div class=\"text-center\">" +
			"<h2 class=\"h2 text-center\">喵呜，似乎您没有打开并登陆您的MetaMask</h2>" +
			"<p class=\"text-center\">只需打开MetaMask登陆并连接到我们的<strong>私有链网络</strong>即可。</p>" +
			"<img class=\"img-rounded\" src=\"/images/main-network.png\" alt=\"私有链网络\">" +
			"</div></div>";
	}
	web3.version.getNetwork(function (err, netId) {
		if (netId == 519)
			console.log("This is the private network.");
		else {
			console.log("This is not private network.");
			document.getElementById('main').innerHTML =
				"<div class=\"row\"><div class=\"text-center\">" +
				"<h2 class=\"h2 text-center\">喵呜，您进入了错误的网络</h2>" +
				"<p>只需打开MetaMask并连接到我们的<strong>私有链网络</strong>即可。</p>" +
				"<img class=\"img-rounded\" src=\"/images/main-network.png\" alt=\"私有链网络\">" +
				"</div></div>";
		}
	});
	setInterval(function () {
		if (web3.eth.accounts[0] !== userAccount) {
			userAccount = web3.eth.accounts[0];
			if (!(!callback || typeof callback == 'undefined' || callback == undefined))
				callback();
		}
	}, 100);
}

function initialization() {
	KittyGame = web3.eth.contract(KittyGameABI).at(kittygameAddress);
}

function buy(id, callback) {
	initialization();
	KittyGame.getAuctionByKitty.call(id, function (err, temp) {
		var price = weiToEther(temp[1]);
		KittyGame.buyKitty.estimateGas(id, function (err, gas) {
			KittyGame.buyKitty.sendTransaction(id,
				{ from: userAccount, value: web3.toWei(price, "ether"), gas: gas + 2000 },
				function (err, transactionHash) {
					if (err)
						callback(false);
					else {
						check(transactionHash, function () {
							callback(true);
						});
					}
				});
		});
	});
}

function breed(aid, bid, callback) {
	initialization();
	KittyGame.getSireByKitty.call(bid, function (err, temp) {
		console.log(temp);
		if (userAccount != temp[0]) {
			var price = weiToEther(temp[1]);
			KittyGame.buySire.estimateGas(bid, function (err, gas) {
				KittyGame.buySire.sendTransaction(bid, price,
					{ from: userAccount, value: web3.toWei(price, "ether"), gas: gas + 2000 },
					function (err, transactionHash) {
						if (err)
							callback(false);
						else {
							check(transactionHash, function () {
								callback(true);
							});
						}
					});
			});
		} else {
			callback(true);
		}
	});
}

function createAuction(id, price, callback) {
	initialization();
	console.log(price);
	price = etherToWei(price);
	console.log(price);
	KittyGame.createAuction.estimateGas(id, price, function (err, gas) {
		KittyGame.createAuction.sendTransaction(id, price,
			{ from: userAccount, gas: gas + 2000 },
			function (err, transactionHash) {
				if (err)
					callback(false);
				else {
					check(transactionHash, function () {
						callback(true);
					});
				}
			});
	});
}

function cancelAuction(id, callback) {
	initialization();
	KittyGame.cancelAuction.estimateGas(id, function (err, gas) {
		KittyGame.cancelAuction.sendTransaction(id,
			{ from: userAccount, gas: gas + 2000 },
			function (err, transactionHash) {
				if (err)
					callback(false);
				else {
					check(transactionHash, function () {
						callback(true);
					});
				}
			});
	});
}

function creatSireSell(id, price, callback) {
	initialization();
	price = etherToWei(price);
	KittyGame.creatSireSell.estimateGas(id, price, function (err, gas) {
		KittyGame.creatSireSell.sendTransaction(id, price,
			{ from: userAccount, gas: gas + 2000 },
			function (err, transactionHash) {
				if (err)
					callback(false);
				else {
					check(transactionHash, function () {
						callback(true);
					});
				}
			});
	});
}

function cancelSireSell(id, callback) {
	initialization();
	KittyGame.cancelSireSell.estimateGas(id, function (err, gas) {
		KittyGame.cancelSireSell.sendTransaction(id,
			{ from: userAccount, gas: gas + 2000 },
			function (err, transactionHash) {
				if (err)
					callback(false);
				else {
					check(transactionHash, function () {
						callback(true);
					});
				}
			});
	});
}

function check(transactionHash, callback) {
	web3.eth.getTransactionReceipt(transactionHash, function (err, done) {
		if (done != null) {
			callback();
		} else {
			setTimeout(function () {
				check(transactionHash, callback);
			}, 1000);
		}
	});
}

function weiToEther(number) {
	var value = web3.fromWei(number, "ether");
	return value;
}

function etherToWei(number) {
	var value = web3.toWei(number, "ether");
	return value;
}