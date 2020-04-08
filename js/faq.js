console.log('fas');


//   Search FAQs Filter
$("#accordion_search_bar").on("keyup", function () {
	var value = $(this).val().toLowerCase();

	if(value.length <= 1){
		$(this).removeClass('show');
	}
	
	$("#accordion .card").filter(function () {
		console.log($(this).text().toLowerCase().indexOf(value) > -1);

		if($(this).text().toLowerCase().indexOf(value) > -1){
			
			$(this).show().addClass('there');
			
		} else {
			$(this).hide().removeClass('there');
			
		}
		
		// $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});

	if($("#accordion .card.there").length < 1){
		$('.noRelult').addClass('show')
	}else{
		$('.noRelult').removeClass('show');
	}
	
	
});
