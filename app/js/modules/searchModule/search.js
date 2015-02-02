var $ = require('jquery');
require('datepicker');
$("#js-cityselect").click(function() {
  $("#js-citydropdown").toggleClass("is-showing");
  $("#js-citydropdown > li").click(function(){
    $("#js-citydropdown").removeClass("is-showing");
  });
  $("#js-citydropdown > li").click(function() {
    $("#js-cityselect").html($(this).html());
  });
});
$('.searchbar__input-js').on('keyup', function(e) {
	$searchObject = $('.searchbar__input-js');
  if (e.keyCode != 40 && e.keyCode != 38) {      
	makeSearchApiCall($searchObject);
  }
});

// Function to make search api calls to external server.
var makeSearchApiCall = function(searchObject) {
	var searchQuery = searchObject.val();
	if (searchQuery.length==0) { 
		return;
	}
  $.ajax({
    type: "GET",
    url: "https://regions.housing.com/api/v1/polygon/suggest?input="+searchQuery,
    cache: false,
    success: function(html)
    {
      showSearchResults(html);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log ("call failed");
    }
  });
}
// function to display search results in html
var showSearchResults = function(html) {
  if(html.length == 0){
    $(".searchbar__searchresults-js").html('');  
    var tmpStr = "<ul><li class='searchbar__searchresults--resultslist'><div class='anchor searchbar__searchresults--singleresul' >Sorry, No Results Found.</div></li></ul>";
    $(".searchbar__searchresults-js").html(tmpStr);
  }
  else{
    if($(".searchbar__searchresults-js").hasClass('hide')){
      $(".searchbar__searchresults-js").removeClass('hide');
    }
    var tmpStr = "<ul>";
    for (i = 0; i < html.length; i++) { 
      tmpHTML = html[i];
      tmpStr += "<li class='searchbar__searchresults--resultslist'><div class='anchor searchbar__searchresults--singleresult' >"+tmpHTML.name+"</div></li>";
    }
    tmpStr += "</ul>";
    $(".searchbar__searchresults-js").html(tmpStr);
  }
}

// Perform navigation functions
$(document).keydown(
  function(e)
  {  
      toggleSearchResults(e);
  });

var toggleSearchResults = function(e) {
  // down key
  if (e.keyCode == 40) {      
    var selected = $(".selected");
    if(selected.length == 0){
     var selected = $(".searchbar__searchresults--resultslist").siblings();
     selected.siblings().first().addClass("selected");
     return;
    }
    $(".searchbar__searchresults--resultslist").removeClass("selected");
      if (selected.next().length == 0) {
        selected.siblings().first().addClass("selected");
      } else {
        selected.next().addClass("selected");
      }
    }
    // Up key
    if (e.keyCode == 38) {      
      var selected = $(".selected");
      $(".searchbar__searchresults--resultslist").removeClass("selected");
      if (selected.prev().length == 0) {
        selected.siblings().last().addClass("selected");
      } else {
        selected.prev().addClass("selected");
      }   
    }
    // tab key pressed
    if (e.keyCode == 9) {      
      setValueToSearchBar();
    }
    //enter is pressed
    if (e.keyCode == 13) {    
      $(".searchbar__checkin-js").focus();  
      setValueToSearchBar();
    }
}

$(".searchbar__searchresults-js").on('mouseover click','ul li',function(e) {
    $(".searchbar__searchresults--resultslist").removeClass("selected");
    $(this).addClass("selected");
});

$(".searchbar__searchresults-js").on('click','ul li',function(e) {
    setValueToSearchBar();
});
// set value to search Field function 
var setValueToSearchBar = function(){
    var selected = $(".selected");
    if(selected.length != 0){
      var queryString = selected.find('div').text();
      $('.searchbar__input-js').val(queryString);
      hideSearchResults();
    }
  else
  {
    var selected = $(".searchbar__searchresults--resultslist").siblings();
     selected.siblings().first().addClass("selected");
     setValueToSearchBar();
  }
}

$(".searchbar__checkin-js, .searchbar__checkout-js").on('click',function(e) {
     $(this).datepicker();
});

$(function() {
        $( ".searchbar__checkin-js").datepicker({
            showOtherMonths: true,
            onSelect: function(date) {
              $( ".searchbar__checkout-js").datepicker({
                  dateFormat: 'dd-mm-yy',
                  showOtherMonths: true
                  }).val(getDateWithOffset(date,1));  // For previous month's date
                  $( ".searchbar__checkout-js").delay(200).datepicker("show");
              }  
        }); // For current date
});
 // $('.searchbar__checkin-js').datepicker( {
 //    showOtherMonths: true,
     
 //  });
function getDateWithOffset (selectedDate,val) {
    var t = new Date, day, month;
    var newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + val);
    var finalDate = newDate;
    var year = finalDate.getFullYear();
    if (finalDate.getDate() < 10) {
        day = "0" + finalDate.getDate();
    }
    else {
        day = finalDate.getDate();
    }
    if ((finalDate.getMonth() + 1) < 10) {
        month = "0" + (finalDate.getMonth() + 1);
    }
    else {
        month = finalDate.getMonth() + 1;
    }
    return (day + '/' + month + '/' + year);
   }

// rooms and guest count selector methods
$("#searchbar__guestselect-js").on('click focus',function(e) {
     if(!$('.guestselect__dropdown-menu').hasClass('is-showing')){
        prefillGuestInput();
        prefillRoomInput();
        showGuestSelector();
     }
});
$(document).mouseup(function (e)
{
    var container = $("#guestselect-js");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0 && $('.guestselect__dropdown-menu').hasClass('is-showing'))
    {
      hideGuestSelector();
    }
    var searchResultsContainer = $(".searchbar__searchresults-js");
    if (!searchResultsContainer.is(e.target) // if the target of the click isn't the container...
        && searchResultsContainer.has(e.target).length === 0 && !$('.guestselect__dropdown-menu').hasClass('hide'))
    {
      hideSearchResults();
    }
    var citySelectContainer =  $("#js-citydropdown");
    if (!citySelectContainer.is(e.target) // if the target of the click isn't the container...
        && citySelectContainer.has(e.target).length === 0 && $('#js-citydropdown').hasClass('is-showing'))
    {
      hideCitySelector();
    }
});
var prefillGuestInput = function(){
  var guestString = $('#searchbar__guestselect-js').val();
  var guestCount = guestString.substring(0, 1);
  $('#js-guestselect__input--guests').val(guestCount);
}
var prefillRoomInput = function(){
    var guestString = $('#searchbar__guestselect-js').val();
    var regularExp = /.*Guests &\s+(.*)\s+Room*/;
    var roomCount = guestString.replace(regularExp, "$1");
    $('#js-guestselect__input--rooms').val(roomCount);
}
$('.js-guestbutton').on('click',function(e){
  e.preventDefault();
  var newValue;
  if($(this).hasClass('js-plus')){
    newValue = parseInt($('#js-guestselect__input--guests').html()) + 1;  
  }
  else if($(this).hasClass('js-minus')){
    newValue = parseInt($('#js-guestselect__input--guests').html()) - 1;  
  }
  if(newValue >= 1 && newValue <= 15){
    $('#js-guestselect__input--guests').text(newValue);
    updateRoomsDynamically();
    changeGuestSelectorOnUpdate();
  }
});
$('.js-roombutton').on('click',function(e){
  e.preventDefault();
  var newValue;
  var roomRangeArray = calculateDynamicRoomCount();
  if($(this).hasClass('js-plus')){
      newValue = parseInt($('#js-guestselect__input--rooms').html()) + 1;  
  }
  else if($(this).hasClass('js-minus')){
      newValue = parseInt($('#js-guestselect__input--rooms').html()) - 1;  
  }
  if(newValue >= roomRangeArray[0] && newValue <= roomRangeArray[1]){
    $('#js-guestselect__input--rooms').text(newValue)
    changeGuestSelectorOnUpdate();
  }
});
var changeGuestSelectorOnUpdate = function(){
    var roomCount = $('#js-guestselect__input--rooms').html();
    var guestCount = $('#js-guestselect__input--guests').html();
    var completeString = guestCount + " Guests & " + roomCount + " Room";
    $('#searchbar__guestselect-js').text(completeString);
}

var calculateDynamicRoomCount = function(){
  var minNumberOfGuestsPerRoom = 1;
  var maxNumberOfGuestsPerRoom = 3;
  var maxRoomsAllowed = 5;
  var numberOfGuests = $('#js-guestselect__input--guests').html();
  var minRoomCalculated = parseInt(numberOfGuests)/maxNumberOfGuestsPerRoom;
  var maxRoomCalculated = Math.min(maxRoomsAllowed,parseInt(numberOfGuests)/minNumberOfGuestsPerRoom);
  return [Math.ceil(minRoomCalculated),Math.ceil(maxRoomCalculated)];
}
var updateRoomsDynamically = function(){
  var currentRoomCount = $('#js-guestselect__input--rooms').html();
  var roomRangeArray = calculateDynamicRoomCount();
  if(currentRoomCount >= roomRangeArray[0] && currentRoomCount <= roomRangeArray[1]){
  
  }
  else
  {
    var newRoomCount = roomRangeArray[0];  
    $('#js-guestselect__input--rooms').text(newRoomCount)
    changeGuestSelectorOnUpdate();
  }
}
// hide/show functions
var hideGuestSelector = function(){
  $('.guestselect__dropdown-menu').removeClass('is-showing');  
}
var showGuestSelector = function(){
  $('.guestselect__dropdown-menu').addClass('is-showing');  
}
var hideSearchResults = function(){
  $(".searchbar__searchresults-js").addClass('hide');
}
var hideCitySelector = function(){
  $("#js-citydropdown").removeClass("is-showing");
}
