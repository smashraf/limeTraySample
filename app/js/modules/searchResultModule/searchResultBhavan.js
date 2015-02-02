var $ = require('jquery');
$(".searchResults__radioSet li").mousedown(function(){
	var selector=$(this).parent();
	$(selector).find(".searchResults--radioSelected").removeClass('searchResults--radioSelected');
	$(this).find(".searchResults__radio").addClass('searchResults--radioSelected')
});

$(".searchResults__checkboxSet li").mousedown(function(){
	if($(this).find(".searchResults__checkbox").hasClass("searchResults--checkboxSelected")){
		$(this).find(".searchResults__checkbox").removeClass('searchResults--checkboxSelected')
	}
	else{
		$(this).find(".searchResults__checkbox").addClass('searchResults--checkboxSelected')
	}
});
