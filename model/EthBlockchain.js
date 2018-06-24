var Web3 = require("web3");
var fs = require('fs');
var BN2Buf = require('./BN2Buf');

var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = JSON.parse(fs.readFileSync('./EthData/KittyGame.json'));
var address = fs.readFileSync('./EthData/KittyGame.txt').toString();
var KittyGame = web3.eth.contract(abi).at(address);

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

function getDNA(id) {
	return BN2Buf.bigNum2Buffer(new BigNumber('0x' + getKitty(id).dna));
}

function newKitty(kitty, acc, callback) {
	web3.personal.unlockAccount(web3.eth.accounts[0], "000000");
	var catID = KittyGame.createKitty.call(acc, kitty.dna, kitty.mid, kitty.fid, kitty.generation);
	KittyGame.createKitty.estimateGas(acc, kitty.dna, kitty.mid, kitty.fid, kitty.generation, function (err, gas) {
		KittyGame.createKitty.sendTransaction(acc, kitty.dna, kitty.mid, kitty.fid, kitty.generation, { from: web3.eth.accounts[0], gas: gas + 2000 },
			function (err, transactionHash) {
				if (err)
					callback(err, -1);
				else {
					check(transactionHash, function () {
						callback(err, catID);
					});
				}
			});
	});
}

function getKitty(id) {
	var data = KittyGame.getKitty.call(id);
	var sale = KittyGame.isSell.call(id);
	var salebreeding = KittyGame.isSireSell.call(id);
	var owner = KittyGame.ownerOf.call(id);
	var kitty = {
		id: id,
		own: owner,
		generation: parseInt(data[5].toString()),
		sale: sale,
		saleprice: 0,
		salebreeding: salebreeding,
		salebreedingprice: 0,
		cooling: !data[0],
		dna: data[1].toString(),
		mid: parseInt(data[2].toString()),
		fid: parseInt(data[3].toString()),
	};
	if (sale) {
		var temp = KittyGame.getAuctionByKitty.call(id)[1];
		kitty.saleprice = parseFloat(temp);
	}
	if (salebreeding) {
		var temp = KittyGame.getSireByKitty.call(id)[1];
		kitty.saleprice = parseFloat(temp);
	}
	return kitty;
}

/** 获取猫id的数组
  1.无地址，返回猫市中所有的猫
  2.有地址，返回用户的猫
*/
function gainKitty(address, type) {
	var data = new Array();   //返回的数组
	var result = KittyGame.getKitties.call(); //获取所有的猫的数组
	if (address === null || address === undefined || address === "") {  //没有地址，显示所有猫的数组
		data = result;
	} else { // 有地址 和用户有关
		var _result = KittyGame.getKittiesByOwner.call(address);  //用户所有猫
		if (type === '0') {
			data = _result;
		}
		else if (type === '1') {   //有地址  type == 1 显示所有出售的猫的数组
			var counter = 0;
			for (var i = 0; i < _result.length; i++) {  //遍历所有猫
				if (KittyGame.isSell.call(i)) {       //判断是否在出售
					data[counter] = i;
					counter++
				}
			}
		} else if (type === '2') {  //type == 2 获得所有出售交配权的猫的数组
			var counter = 0;
			for (var i = 0; i < _result.length; i++) {  //遍历所有猫
				if (KittyGame.isSireSell.call(i)) {  //判断是否出售交配权
					data[counter] = i;
					counter++;
				}
			}
		} else if (type === '3') {  //type === 3  显示所有已冷却的猫的数组
			var counter = 0;
			for (var i = 0; i < _result.length; i++) { //遍历所有猫
				if (KittyGame.isReady.call(i)) {  //判断是否冷却完毕
					data[counter] = i;
					counter++;
				}
			}
		}
	}
	return data;   //返回数组
}

function getListDeatil(idlist) {
	var temp = idlist.length;
	var data = new Array();
	for (var i = 0; i < temp; i++) {
		var kitty = getKitty(idlist[i]);
		var tmp = {
			id: idlist[i],
			sale: kitty.sale,
			breeding: kitty.salebreeding
		};
		data.push(tmp);
	}
	return data;
}

exports.getDNA=getDNA;
exports.newKitty = newKitty;
exports.getKitty = getKitty;
exports.gainKitty = gainKitty;
exports.getListDeatil = getListDeatil;