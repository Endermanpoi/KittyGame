var BigNumber = require('bignumber.js');
var BN2Buf = require('./BN2Buf');
var inheritance = require('./DNAinheritance');
var analysis = require('./DNAanalysis');
var image = require('./DNA2image');
var Eth = require('./EthBlockchain');

function breeding(aid, bid, acc, callback) {
	var acat = Eth.getKitty(aid);
	var bcat = Eth.getKitty(bid);
	var temp = new BigNumber("0x" + acat.dna);
	console.log(temp);
	var adna = BN2Buf.bigNum2Buffer(temp);
	console.log(adna);
	var bdna = BN2Buf.bigNum2Buffer(new BigNumber('0x' + bcat.dna));
	var kitty = {
		dna: BN2Buf.buffer2BigNum(inheritance.DNAinheritance(adna, bdna)).toString(16),
		mid: aid,
		fid: bid,
		generation: 0
	};
	console.log(kitty);
	if (acat.generation > bcat.generation)
		kitty.generation = acat.generation + 1;
	else
		kitty.generation = bcat.generation + 1;
	Eth.newKitty(kitty, acc, function (err, id) {
		console.log(id);
		if (err) throw err;
		image.findImage(id);
		callback(id);
	});
}

function newcat(acc, callback) {
	var temp = inheritance.newDNA();
	var newdna = BN2Buf.buffer2BigNum(temp).toString(16);
	var kitty = {
		dna: newdna,
		mid: 0,
		fid: 0,
		generation: 0
	};
	Eth.newKitty(kitty, acc, function (err, id) {
		if (err) throw err;
		image.findImage(id);
		callback(id);
	});
}

function rebuildImage() {
	var data = Eth.gainKitty(null, 1);
	console.log(data);
	for (var i = 0; i < data.length; i++) {
		image.findImage(i);
	}
}

exports.rebuildImage = rebuildImage;
exports.breeding = breeding;
exports.newcat = newcat;