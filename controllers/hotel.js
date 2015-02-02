var hotelList=[
  {
    "_id": "54ace9c82b36203aae89d9b8",
    "index": 0,
    "guid": "f6f868c4-768e-4578-b079-44a38e0086d0",
    "picture": "http://placehold.it/32x32",
    "name": "Richardson Valdez",
    "email": "richardsonvaldez@rameon.com",
    "phone": "+1 (963) 571-3097",
    "address": "207 Pacific Street, Maury, Washington, 7509",
    "about": "Aliquip et eiusmod Lorem consequat magna cupidatat excepteur eiusmod ad dolor pariatur magna dolor et. Occaecat adipisicing nostrud veniam aliquip proident. Ut nostrud commodo sit qui culpa consequat enim laboris esse duis aute commodo. Voluptate minim velit ea aliquip officia nisi ea amet fugiat. Tempor deserunt dolore ad ad fugiat qui deserunt occaecat consequat.\r\n",
    "latitude": -72.856945,
    "longitude": -112.801136
  },
  {
    "_id": "54ace9c8e331f0cc9306ea44",
    "index": 1,
    "guid": "130c0d62-627e-4b44-89be-6ec9ba113e87",
    "picture": "http://placehold.it/32x32",
    "name": "Espinoza Lawson",
    "email": "espinozalawson@rameon.com",
    "phone": "+1 (890) 565-3507",
    "address": "284 Melba Court, Twilight, Northern Mariana Islands, 2641",
    "about": "Nulla quis reprehenderit excepteur minim anim occaecat cillum esse. Consequat ex reprehenderit culpa do occaecat ad ipsum est. Consequat pariatur quis aliquip nulla et. Sunt adipisicing duis consectetur irure pariatur aliquip ea.\r\n",
    "latitude": 70.351788,
    "longitude": -43.78363
  },
  {
    "_id": "54ace9c83b4d4cb1c57d8ef3",
    "index": 2,
    "guid": "f8f5e354-4cb3-4e99-8969-38a6309c0f18",
    "picture": "http://placehold.it/32x32",
    "name": "Bianca Leonard",
    "email": "biancaleonard@rameon.com",
    "phone": "+1 (841) 423-2041",
    "address": "162 Dinsmore Place, Darrtown, Georgia, 5145",
    "about": "Sint qui quis dolore consequat eiusmod laboris. Fugiat reprehenderit occaecat amet Lorem do exercitation officia fugiat incididunt aliquip aute ad. Laborum duis proident mollit ea velit ut amet qui nostrud tempor amet labore. Ad dolor ad labore ex ea fugiat. Sit irure enim magna id id non cillum.\r\n",
    "latitude": -57.956341,
    "longitude": 105.685015
  },
  {
    "_id": "54ace9c8dfe8fc972fd470c7",
    "index": 3,
    "guid": "b995e884-9f72-4684-86ac-2c816a3304db",
    "picture": "http://placehold.it/32x32",
    "name": "Rebekah Gray",
    "email": "rebekahgray@rameon.com",
    "phone": "+1 (970) 554-3732",
    "address": "209 Fillmore Avenue, Longbranch, Delaware, 5392",
    "about": "Duis duis irure velit ut mollit proident ad incididunt laborum nostrud consequat ullamco dolor. Aliqua magna officia officia amet Lorem et. Nulla elit minim velit in veniam pariatur consectetur laborum duis deserunt proident aliquip quis.\r\n",
    "latitude": -76.395297,
    "longitude": -90.975616
  },
  {
    "_id": "54ace9c8a93b919e983fbd7e",
    "index": 4,
    "guid": "de067cb1-8a60-486f-9d6a-e3ec53fcbdc3",
    "picture": "http://placehold.it/32x32",
    "name": "Margo Morton",
    "email": "margomorton@rameon.com",
    "phone": "+1 (875) 469-3103",
    "address": "326 Kenmore Terrace, Floris, Guam, 3597",
    "about": "Id irure sit veniam proident exercitation adipisicing exercitation consequat voluptate. Ad non incididunt id elit. Mollit amet consectetur consectetur mollit sint commodo quis dolor. Pariatur sunt reprehenderit cillum labore dolor deserunt et esse do in. Velit non culpa consectetur ea veniam elit.\r\n",
    "latitude": 71.359074,
    "longitude": 77.880653
  }
];
module.exports = function() {
  return{
  	getHotelListpage:function(req,res){
  		res.render('hotelList', { hotels:hotelList,type:'hotel'})
  	},
  	getHotelDetailPage:function(req,res){
  		var foundHotel;
  		for(var i = 0 ; i< hotelList.length; i++){
        	if(hotelList[i].index==parseInt(req.params.id)){
        			foundHotel=hotelList[i]
        	}
        }
  		res.render('hotelDetail', { hotel: foundHotel,type:'hotel' })
  	}
  }

}