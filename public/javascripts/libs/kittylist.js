var kittys;
var pagenum;
function showlist(page) {
	$('#list').html('<img id="loading" alt="loading" src="images/loading.gif" class="img-responsive center-block">');
	var temp;
	location.hash = page;
	if (page < 1) { page = 1; }
	if (page > pagenum) { page = pagenum; }
	if (page == pagenum) {
		temp = kittys.slice((page - 1) * 12);
	} else {
		temp = kittys.slice((page - 1) * 12, page * 12);
	}
	$.post("/showlist",
		{
			kittys: temp,
			page: page,
			pagenum: pagenum
		},
		function (data, status) {
			$('#loading').fadeOut("fast");
			$('#list').html(data);
			$(".btn-block").fadeIn("slow");
		});
}

function getlist(user, type) {
	$.post("/getlist",
		{
			Account: user,
			type: type
		},
		function (data, status) {
				console.log(data);
			kittys = data;
			if (kittys.length == 0) {
				$('#list').html("<div class=\"row\"><div class=\"text-center\">" +
				"<h2 class=\"h2 text-center\">喵呜，似乎您并没有喵咪</h2>" +
				"<p class=\"text-center\">您可以去猫市购买。</p>" +
				"<img class=\"img-rounded\" src=\"/images/main-network.png\" alt=\"私有链网络\">" +
				"</div></div>");
			} else {
				pagenum = Math.ceil(kittys.length / 12);
				temp = location.hash.toString().slice(1);
				console.log(data);
				if (temp > 1)
					showlist(temp);
				else
					showlist(1);
			}
		});
}