var $ = require('jquery');
require('./hotelModule/hotel')();
require('./searchModule/search');
var searchResult=require('./searchResultModule/searchResult')();
var currentPage=$('body').data('pagetype')
switch(currentPage) {
    case 'searchResult':
        searchResult.init();
        break;
    default:
}
