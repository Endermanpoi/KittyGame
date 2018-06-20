function Hex2DNA(DNAdata) {
	var DNAcode = new Buffer.from(DNAdata);
	DNA = {
		mainColor: [0, 0, 0],
		secColor: [0, 0, 0],
		figure: 0,
		figureColor: [0, 0, 0],
		eye: 0,
		rightEyeColor: [0, 0, 0],
		deffientEyeColor: 0,
		leftEyeColor: [0, 0, 0],
		eyebrow: 0,
		eyebrowColor: [0, 0, 0],
		deffientEnd: 1,
		endColor: [0, 0, 0],
		tail: 0,
		head: 0,
		jaw: 0,
		down: 0,
		beard: 0,
		mouth: 0,
		ear: 0
	};
	DNA.mainColor = code2Color(DNAcode.slice(0, 3));
	DNA.secColor = code2Color(DNAcode.slice(3, 6));
	DNA.figureColor = code2Color(DNAcode.slice(6, 9));
	DNA.rightEyeColor = code2Color(DNAcode.slice(9, 12));
	DNA.leftEyeColor = code2Color(DNAcode.slice(12, 15));
	DNA.eyebrowColor = code2Color(DNAcode.slice(15, 18));
	DNA.endColor = code2Color(DNAcode.slice(18, 21));

	DNA.figure = parseInt(DNAcode[21] / 16);
	DNA.eye = parseInt(DNAcode[21] % 16);
	DNA.deffientEyeColor = parseInt(DNAcode[22] / 16);
	DNA.eyebrow = parseInt(DNAcode[22] % 16);
	DNA.deffientEnd = parseInt(DNAcode[23] / 16);
	DNA.tail = parseInt(DNAcode[23] % 16);
	DNA.head = parseInt(DNAcode[24] / 16);
	DNA.jaw = parseInt(DNAcode[24] % 16);
	DNA.down = parseInt(DNAcode[25] / 16);
	DNA.beard = parseInt(DNAcode[25] % 16);
	DNA.mouth = parseInt(DNAcode[26] / 16);
	DNA.ear = parseInt(DNAcode[26] % 16);

	return DNA;
}
function code2Color(colorHex) {
	return [
		parseInt(colorHex[0]),
		parseInt(colorHex[1]),
		parseInt(colorHex[2])
	];
}

function DNA2Hex(DNA) {
	var DNAcode = new Buffer.alloc(27);
	color2Hex(DNA.mainColor, DNAcode.slice(0, 3));
	color2Hex(DNA.secColor, DNAcode.slice(3, 6));
	color2Hex(DNA.figureColor, DNAcode.slice(6, 9));
	color2Hex(DNA.rightEyeColor, DNAcode.slice(9, 12));
	color2Hex(DNA.leftEyeColor, DNAcode.slice(12, 15));
	color2Hex(DNA.eyebrowColor, DNAcode.slice(15, 18));
	color2Hex(DNA.endColor, DNAcode.slice(18, 21));

	DNAcode[21] = type2Hex(DNA.figure, DNA.eye);
	DNAcode[22] = type2Hex(DNA.deffientEyeColor, DNA.eyebrow);
	DNAcode[23] = type2Hex(DNA.deffientEnd, DNA.tail);
	DNAcode[24] = type2Hex(DNA.head, DNA.jaw);
	DNAcode[25] = type2Hex(DNA.down, DNA.beard);
	DNAcode[26] = type2Hex(DNA.mouth, DNA.ear);

	return DNAcode;
}
function color2Hex(color, buf) {
	buf[0] = color[0];
	buf[1] = color[1];
	buf[2] = color[2];
}
function type2Hex(typeA, typeB) {
	return (typeA * 16 + typeB);
}

exports.DNA2Hex = DNA2Hex;
exports.Hex2DNA = Hex2DNA;