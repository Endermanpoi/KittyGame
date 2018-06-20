var userAccount;
var web3;
window.addEventListener('load', function () {
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		console.log("noMist!");
	}
	web3.version.getNetwork(function (err, netId) {
		if (netId == 519)
			console.log('This is the private network.');
		else
			document.getElementById('main').innerHTML =
				"<div class=\"Hero\">" +
				"<div class=\"Container Container--sm Container--center\">" +
				"<h2 class=\"Hero-h2\">喵呜，您进入了错误的网络</h2>" +
				"<p class=\"Hero-description\">只需打开MetaMask并连接到我们的<strong>私有链网络</strong>即可。</p>" +
				"<img class=\"Hero-image\" src=\"/images/main-network.png\" alt=\"主要以太坊网络\">" +
				"</div>" +
				"</div>" +
				"</main>";
	})
	setInterval(function () {
		if (web3.eth.accounts[0] !== userAccount) {
			userAccount = web3.eth.accounts[0];
			console.log("acc:" + userAccount);
		}
	}, 100);
})