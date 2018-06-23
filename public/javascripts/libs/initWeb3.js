var userAccount;
var web3;
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
			console.log("acc:" + userAccount);
			$('#address').html('我的地址：'+userAccount);

			callback(callback);
		}
	}, 100);
}