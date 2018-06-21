var analysis = require('./DNAanalysis');

function newDNA() {
	return analysis.DNA2Hex({
		mainColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		secColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		figure: parseInt(Math.random() * 5),
		figureColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		eye: parseInt(Math.random() * 6),
		rightEyeColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		deffientEyeColor: parseInt(Math.random() * 2),
		leftEyeColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		eyebrow: parseInt(Math.random() * 4),
		eyebrowColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		deffientEnd: parseInt(Math.random() * 2),
		endColor: [
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		],
		tail: parseInt(Math.random() * 3),
		head: parseInt(Math.random() * 4),
		jaw: parseInt(Math.random() * 3),
		down: parseInt(Math.random() * 4),
		beard: parseInt(Math.random() * 4),
		mouth: parseInt(Math.random() * 5),
		ear: parseInt(Math.random() * 2)
	});
}

function DNAinheritance(DNAcode1, DNAcode2) {
	var DNA1 = analysis.Hex2DNA(DNAcode1);
	var DNA2 = analysis.Hex2DNA(DNAcode2);
	var DNA = {
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
	DNA.mainColor = randomColor(DNA1.mainColor, DNA2.mainColor);
	DNA.secColor = randomColor(DNA1.secColor, DNA2.secColor);
	DNA.figureColor = randomColor(DNA1.figureColor, DNA2.figureColor);
	DNA.rightEyeColor = randomColor(DNA1.rightEyeColor, DNA2.rightEyeColor);
	DNA.leftEyeColor = randomColor(DNA1.leftEyeColor, DNA2.leftEyeColor);
	DNA.eyebrowColor = randomColor(DNA1.eyebrowColor, DNA2.eyebrowColor);
	DNA.endColor = randomColor(DNA1.endColor, DNA2.endColor);

	DNA.figure = randomType(DNA1.figure, DNA2.figure, 5);
	DNA.eye = randomType(DNA1.eye, DNA2.eye, 6);
	DNA.deffientEyeColor = randomType(DNA1.deffientEyeColor, DNA2.deffientEyeColor, 2);
	DNA.eyebrow = randomType(DNA1.eyebrow, DNA2.eyebrow, 4);
	DNA.deffientEnd = randomType(DNA1.deffientEnd, DNA2.deffientEnd, 2);
	DNA.tail = randomType(DNA1.tail, DNA2.tail, 3);
	DNA.head = randomType(DNA1.head, DNA2.head, 4);
	DNA.jaw = randomType(DNA1.jaw, DNA2.jaw, 3);
	DNA.down = randomType(DNA1.down, DNA2.down, 4);
	DNA.beard = randomType(DNA1.beard, DNA2.beard, 4);
	DNA.mouth = randomType(DNA1.mouth, DNA2.mouth, 5);
	DNA.ear = randomType(DNA1.ear, DNA2.ear, 2);
	return analysis.DNA2Hex(DNA);
}

function randomColor(ColorA, ColorB) {
	var temp = Math.random();
	if (temp < 0.3)
		return ColorA;
	else if (0.3 <= temp < 0.6)
		return ColorB;
	else if (0.6 <= temp < 0.9)
		return ([
			(ColorA[0] + ColorB[0]) / 2,
			(ColorA[1] + ColorB[1]) / 2,
			(ColorA[2] + ColorB[2]) / 2
		]);
	else
		return ([
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256),
			parseInt(Math.random() * 256)
		]);
}

function randomType(TypeA, TypeB, TypeNum) {
	var temp = Math.random();
	if (temp < 0.4)
		return TypeA;
	else if (0.4 <= temp < 0.8)
		return TypeB;
	else
		return parseInt(Math.random() * TypeNum);
}

exports.newDNA = newDNA;
exports.DNAinheritance = DNAinheritance;