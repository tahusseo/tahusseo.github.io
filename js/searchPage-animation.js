let productInfo = [];
let productNames = [];



$(document).ready(function() {
	//get product infos and names (again)
	$.getJSON("json/data-products.json", function(i) {
	//push json into object
	productInfo.push(i);
	//convert data to array / easier loop for names checking
	productNames = Object.keys(productInfo[0]);


	setTimeout(function(){
		populatePage();
		toggleInfos();
	}, 200);
	
	});

});


//toggle product infos
var filterBlur = 'blur(8px)';
function toggleInfos() {

	//blur product and toggle infos on hover
	$(".item").mouseenter(function() {
		blurElement(this.children[0], 10);
		$(this.children[0]).animate({"opacity": "0.3"});
		$(this.children[1]).animate({
			"opacity": "1",
			"top": "-10%"}, 200);
	});

	//un-blur(?) product and remove infos on mouseleave
	$(".item").mouseleave(function() {
		blurElement(this.children[0], 0);
		$(this.children[0]).animate({"opacity": "1"});
		$(this.children[1]).animate({
			"opacity": "0",
			"top": "-3%"}, 200);
	});
}


//copy-paste of blur smooth transition
function blurElement(element, size) {
	var filterVal = 'blur(' + size + 'px)';
	$(element).css({
		'filter':filterVal,
		'webkitFilter':filterVal,
		'mozFilter':filterVal,
		'oFilter':filterVal,
		'msFilter':filterVal,
		'transition':'all 0.3s ease-out',
		'-webkit-transition':'all 0.3s ease-out',
		'-moz-transition':'all 0.3s ease-out',
		'-o-transition':'all 0.3s ease-out'
	});
}


//get products match (off URL query) and displays them on searchPage
function populatePage() {

	var resultTotal = 0; //How many products were found (incremented when a product is found)

	for (var p = 0; p <= productNames.length-1; p++) {
		if (productNames[p].toLowerCase().startsWith(productParam)) {

			resultTotal = resultTotal + 1;

			//set variables p = product
			const pName = productNames[p];
			const pImage = data[0][pName][0].image;
			const pPrice = data[0][pName][0].price;
			const pResume = data[0][pName][0].resume;
			const pRating = data[0][pName][0].etoiles;
			
			//populate each product with info
			$(".itemContainer").append(
				"<div class='item'>"+
					"<a href=productPage.html?q=" + pName + "><img class='itemImg' src='" + pImage + "'></a>"+
					"<div class='itemInfo'>"+
						"<p class='itemName'><strong>" + pName + "</strong></p>"+
						"<p class=itemDescription>" + pResume + "</p>"+
						"<p class='itemPrice'><i>" + pPrice + "</i></p>"+
						"<p class='itemRating'>" + pRating + "/5</p>"+
						"<img class='ratingImg' src='images/star.png'>"+
					"</div>"+
				"</div>")
		}
	}
	//Return how many products were found
	$(".result").prepend("<i>" + resultTotal + " résultats trouvés pour : ");
}