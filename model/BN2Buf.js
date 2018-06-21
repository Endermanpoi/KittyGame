var BigNumber = require('bignumber.js');

function getlenth(string) {
	var realLength = 0, len = string.length, charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = string.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
}
function bigNum2Buffer(bignum) {
	var test = bignum.toString(16);
	while (getlenth(test) < 54) {
		test = '0' + test;
	}
	t = getlenth(test)
	var temp = new Array();
	for (var i = 0; i * 2 < t; i++) {
		temp[i] = parseInt(test[i * 2] + test[i * 2 + 1], 16);
	}
	var buf = new Buffer.from(temp);
	return buf;
}
function buffer2BigNum(buf) {
	var temp = "0x";
	for (var i = 0; i < buf.length; i++) {
		var tmp = buf[i].toString(16);
		if (tmp.length > 1)
			temp += tmp;
		else
			temp += "0" + tmp;
	}
	var bigNum = new BigNumber(temp);
	return bigNum;
}

exports.bigNum2Buffer = bigNum2Buffer;
exports.buffer2BigNum = buffer2BigNum;