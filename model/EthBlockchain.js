var Web3 = require("web3");
var fs = require('fs');
var inheritance = require('./DNAinheritance');
var BN2Buf = require('./BN2Buf');

var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = JSON.parse(fs.readFileSync('./EthData/KittyGame.json'));
var address = fs.readFileSync('./EthData/KittyGame.txt').toString();
var KittyGame = web3.eth.contract(abi).at(address);

function getDNA(catID) {
	var data = KittyGame.getKittyDna.call(catID);
	var DNA = BN2Buf.bigNum2Buffer(data);
	return DNA;
}

function getMaster(catID) {
	var data = KittyGame.getAdopt.call(catID);
	var master = data.toString(16);
	return master;
}

function getParents(catID) {
	var parents = {
		mID: KittyGame.getMatronId.call(catID).toString(16),
		fID: KittyGame.getSireId.call(catID).toString(16)
	}
	return parents;
}

function newCat(DNA, UserAddress) {
	var data = BN2Buf.buffer2BigNum(DNA);
	web3.personal.unlockAccount(web3.eth.accounts[0], "000000");
	var catID = KittyGame.saveKitty.call(data, UserAddress);
	var gasNeed = KittyGame.saveKitty.estimateGas(data, UserAddress);
	KittyGame.saveKitty.sendTransaction(data, UserAddress, { from: web3.eth.accounts[0], gas: gasNeed + 1000 });
	return catID.toString();
}

function babyCat(DNA, UserAddress, fID, mID) {
	var data = BN2Buf.buffer2BigNum(DNA);
	web3.personal.unlockAccount(web3.eth.accounts[0], "000000");
	var catID = KittyGame.creatNewKitty.call(data, UserAddress, mID, fID);
	var gasNeed = KittyGame.creatNewKitty.estimateGas(data, UserAddress, mID, fID);
	KittyGame.creatNewKitty.sendTransaction(data, UserAddress, mID, fID, { from: web3.eth.accounts[0], gas: gasNeed + 1000 });
	return catID.toString();
}

function deal(catID, TargetAddress) {
	var data = fs.readFileSync('./DNAtemp/' + catID + '.dna');
	var UserAddress = data.slice(27, 43);
	TargetAddress.copy(UserAddress);
}

exports.getDNA = getDNA;
exports.getMaster = getMaster;
exports.getParents = getParents;
exports.newCat = newCat;
exports.babyCat = babyCat;
exports.deal = deal;