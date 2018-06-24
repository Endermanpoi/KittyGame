var BN2Buf = require('./BN2Buf');
var inheritance = require('./DNAinheritance');
var analysis = require('./DNAanalysis');
var image = require('./DNA2image');
var Eth = require('./EthBlockchain');

function breeding(aid, bid, acc, callback) {
	var acat = Eth.getKitty(aid);
	var bcat = Eth.getKitty(bid);
	var adna = BN2Buf.bigNum2Buffer(new BigNumber('0x' + acat.dna));
	var bdna = BN2Buf.bigNum2Buffer(new BigNumber('0x' + bcat.dna));
	var kitty = {
		dna: inheritance.DNAinheritance(adna, bdna),
		mid: aid,
		fid: bid,
		generation: 0
	};
	if (acat.generation > bcat.generation)
		kitty.generation = acat.generation + 1;
	else
		kitty.generation = bcat.generation + 1;
	Eth.newKitty(kitty, acc, function (err, id) {
		if (err) throw err;
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
		callback(id);
	});
}

exports.breeding = breeding;
exports.newcat = newcat;