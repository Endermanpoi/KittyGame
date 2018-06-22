var list;
function showlist(page) {
	$.post("/showlist",
		{
			kittys:list[page]
		},
		function (data, status) {
			console.log(data);
			$('#list').html(data);
		});
}

function getlist(all, sale, breeding) {
	$.post("/getlist",
		{
			Account: userAccount,
			forAll: all,
			forSale: sale,
			forBreeding: breeding
		},
		function (data, status) {
			console.log(data);
			for(var i=0;data.lenth>12;i++)
		});
}