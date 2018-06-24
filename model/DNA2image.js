var im = require('imagemagick');
var BigNumber = require('bignumber.js');
var fs = require('fs');
var async = require('async');
var analysis = require('./DNAanalysis');
var eth = require('./EthBlockchain')

async function findImage(catID, callback) {
	await fs.exists('./public/images/cat/' + catID + '.png', function (exists, temp) {
		if (exists)
			callback('images/cat/' + catID + '.png');
		else {
			build(catID, callback);
		}
	});
}

function build(catID, callback) {
	async.series({
		new: function (callback) {
			DNAData = analysis.Hex2DNA(eth.getDNA(catID));
			callback();
		},
		tailAndEar: function (callback) {
			im.convert(['./cat/ear/ear' + DNAData.ear + '.png',
				'-compose', 'over', './cat/tail/tail' + DNAData.tail + '.png',
				'-composite',
				'./cat/temp.png'],
				function (err, stdout) {
					if (err) throw err;
					callback();
				});
		},
		base: function (callback) {
			im.convert(['./cat/temp.png',
				'-compose', 'over', './cat/base/base.png',
				'-composite',
				'./cat/temp.png'],
				function (err, stdout) {
					if (err) throw err;
					callback();
				});
		},
		down: function (callback) {
			if (DNAData.down != 0) {
				im.convert(['./cat/temp.png',
					'-compose', 'over', './cat/down/down' + DNAData.down + '.png',
					'-composite',
					'./cat/temp.png'],
					function (err, stdout) {
						if (err) throw err;
						callback();
					});
			} else { callback(); }
		},
		head: function (callback) {
			if (DNAData.head != 0) {
				im.convert(['./cat/temp.png',
					'-compose', 'over', './cat/head/head' + DNAData.head + '.png',
					'-composite',
					'./cat/temp.png'],
					function (err, stdout) {
						if (err) throw err;
						callback();
					});
			} else { callback(); }
		},
		color: function (callback) {
			im.convert(['./cat/temp.png',
				'-fuzz', '10%',
				'-fill', 'rgb(' + DNAData.mainColor + ')',
				'-opaque', 'rgb(200,0,0)',
				'./cat/temp.png'],
				function (err, stdout) {
					if (err) throw err;
					callback();
				});
		},
		belly: function (callback) {
			im.convert(['./cat/base/belly.png',
				'-fuzz', '10%',
				'-fill', 'rgb(' + DNAData.secColor + ')',
				'-opaque', 'rgb(0,200,0)',
				'./cat/tmp.png'],
				function (err, stdout) {
					if (err) throw err;
					im.convert(['./cat/temp.png',
						'-compose', 'over', './cat/tmp.png',
						'-composite',
						'./cat/temp.png'],
						function (err, stdout) {
							if (err) throw err;
							callback();
						});
				});
		},
		jaw: function (callback) {
			im.convert(['./cat/jaw/jaw' + DNAData.jaw + '.png',
				'-fuzz', '10%',
				'-fill', 'rgb(' + DNAData.mainColor + ')',
				'-opaque', 'rgb(200,0,0)',
				'./cat/tmp.png'],
				function (err, stdout) {
					if (err) throw err;
					im.convert(['./cat/temp.png',
						'-compose', 'over', './cat/tmp.png',
						'-composite',
						'./cat/temp.png'],
						function (err, stdout) {
							if (err) throw err;
							callback();
						});
				});
		},
		endColor: function (callback) {
			if (DNAData.deffientEnd != 0) {
				im.convert(['./cat/base/end.png',
					'-fuzz', '10%',
					'-fill', 'rgb(' + DNAData.endColor + ')',
					'-opaque', 'rgb(0,100,0)',
					'./cat/tmp.png'],
					function (err, stdout) {
						if (err) throw err;
						im.convert(['./cat/temp.png',
							'-compose', 'atop', './cat/tmp.png',
							'-composite',
							'./cat/temp.png'],
							function (err, stdout) {
								if (err) throw err;
								callback();
							});
					});
			} else { callback(); }
		},
		figure: function (callback) {
			if (DNAData.figure != 0) {
				im.convert(['./cat/figure/figure' + DNAData.figure + '.png',
					'-fuzz', '10%',
					'-fill', 'rgb(' + DNAData.figureColor + ')',
					'-opaque', 'rgb(0,0,200)',
					'./cat/tmp.png'],
					function (err, stdout) {
						if (err) throw err;
						im.convert(['./cat/temp.png',
							'-compose', 'atop', './cat/tmp.png',
							'-composite',
							'./cat/temp.png'],
							function (err, stdout) {
								if (err) throw err;
								im.convert(['./cat/temp.png',
									'-edge', '1.5',
									'./cat/tmp.png'],
									function (err, stdout) {
										if (err) throw err;
										im.convert(['./cat/tmp.png',
											'-compose', 'atop', './cat/base/black.png',
											'-composite',
											'./cat/tmp.png'],
											function (err, stdout) {
												if (err) throw err;
												im.convert(['./cat/temp.png',
													'-compose', 'atop', './cat/tmp.png',
													'-composite',
													'./cat/temp.png'],
													function (err, stdout) {
														if (err) throw err;
														callback();
													});
											});
									});
							});
					});
			} else { callback(); }
		},
		eyeColor: function (callback) {
			if (DNAData.deffientEyeColor == 0) {
				im.convert(['./cat/eye/eye' + DNAData.eye + '.png',
					'-fuzz', '10%',
					'-fill', 'rgb(' + DNAData.rightEyeColor + ')',
					'-opaque', 'rgb(100,100,0)',
					'-opaque', 'rgb(0,100,100)',
					'./cat/tmp.png'],
					function (err, stdout) {
						if (err) throw err;
						callback();
					});
			} else {
				im.convert(['./cat/eye/eye' + DNAData.eye + '.png',
					'-region', '100x100+200+100',
					'-fuzz', '10%',
					'-fill', 'rgb(' + DNAData.rightEyeColor + ')',
					'-opaque', 'rgb(100,100,0)',
					'./cat/tmp.png'],
					function (err, stdout) {
						if (err) throw err;
						im.convert(['./cat/tmp.png',
							'-region', '100x100+90+100',
							'-fuzz', '10%',
							'-fill', 'rgb(' + DNAData.leftEyeColor + ')',
							'-opaque', 'rgb(0,100,100)',
							'./cat/tmp.png'],
							function (err, stdout) {
								if (err) throw err;
								callback();
							});
					});
			}
		},
		eye: function (callback) {
			im.convert(['./cat/temp.png',
				'-compose', 'over', './cat/tmp.png',
				'-composite',
				'./cat/temp.png'],
				function (err, stdout) {
					if (err) throw err;
					callback();
				});
		},
		eyebrow: function (callback) {
			if (DNAData.eyebrow != 0) {
				im.convert(['./cat/temp.png',
					'-compose', 'over', './cat/eyebrow/eyebrow' + DNAData.eyebrow + '.png',
					'-composite',
					'./cat/temp.png'],
					function (err, stdout) {
						if (err) throw err;
						im.convert(['./cat/temp.png',
							'-fuzz', '10%',
							'-fill', 'rgb(' + DNAData.eyebrowColor + ')',
							'-opaque', 'rgb(100,0,0)',
							'./cat/temp.png'],
							function (err, stdout) {
								if (err) throw err;
								callback();
							});
					});
			} else { callback(); }
		},
		mouth: function (callback) {
			im.convert(['./cat/temp.png',
				'-compose', 'over', './cat/mouth/mouth' + DNAData.mouth + '.png',
				'-composite',
				'./cat/temp.png'],
				function (err, stdout) {
					if (err) throw err;
					callback();
				});
		},
		beard: function (callback) {
			im.convert(['./cat/temp.png',
				'-compose', 'over', './cat/beard/beard' + DNAData.beard + '.png',
				'-composite',
				'./cat/temp.png'],
				function (err, stdout) {
					if (err) throw err;
					callback();
				});
		},
		doneBuild: function (callback) {
			fs.unlink("./cat/tmp.png",
				function () { });
			fs.rename('./cat/temp.png', './public/images/cat/' + catID + '.png',
				function () { });
			callback();
		}
	}, function () {
		callback('images/cat/' + catID + '.png');
	});
}

exports.findImage = findImage;
