//Polyline Decoding
(function () {
	'use strict';

	var defaultOptions = function (options) {
		if (typeof options === 'number') {
			// Legacy
			options = {
				precision: options
			};
		} else {
			options = options || {};
		}

		options.precision = options.precision || 5;
		options.factor = options.factor || Math.pow(10, options.precision);
		options.dimension = options.dimension || 2;
		return options;
	};

	var PolylineUtil = {
		encode: function (points, options) {
			options = defaultOptions(options);

			var flatPoints = [];
			for (var i = 0, len = points.length; i < len; ++i) {
				var point = points[i];

				if (options.dimension === 2) {
					flatPoints.push(point.lat || point[0]);
					flatPoints.push(point.lng || point[1]);
				} else {
					for (var dim = 0; dim < options.dimension; ++dim) {
						flatPoints.push(point[dim]);
					}
				}
			}

			return this.encodeDeltas(flatPoints, options);
		},

		decode: function (encoded, options) {
			options = defaultOptions(options);

			var flatPoints = this.decodeDeltas(encoded, options);

			var points = [];
			for (var i = 0, len = flatPoints.length; i + (options.dimension - 1) < len;) {
				var point = [];

				for (var dim = 0; dim < options.dimension; ++dim) {
					point.push(flatPoints[i++]);
				}

				points.push(point);
			}

			return points;
		},

		encodeDeltas: function (numbers, options) {
			options = defaultOptions(options);

			var lastNumbers = [];

			for (var i = 0, len = numbers.length; i < len;) {
				for (var d = 0; d < options.dimension; ++d, ++i) {
					var num = numbers[i];
					var delta = num - (lastNumbers[d] || 0);
					lastNumbers[d] = num;

					numbers[i] = delta;
				}
			}

			return this.encodeFloats(numbers, options);
		},

		decodeDeltas: function (encoded, options) {
			options = defaultOptions(options);

			var lastNumbers = [];

			var numbers = this.decodeFloats(encoded, options);
			for (var i = 0, len = numbers.length; i < len;) {
				for (var d = 0; d < options.dimension; ++d, ++i) {
					numbers[i] = Math.round((lastNumbers[d] = numbers[i] + (lastNumbers[d] || 0)) * options.factor) / options.factor;
				}
			}

			return numbers;
		},

		encodeFloats: function (numbers, options) {
			options = defaultOptions(options);

			for (var i = 0, len = numbers.length; i < len; ++i) {
				numbers[i] = Math.round(numbers[i] * options.factor);
			}

			return this.encodeSignedIntegers(numbers);
		},

		decodeFloats: function (encoded, options) {
			options = defaultOptions(options);

			var numbers = this.decodeSignedIntegers(encoded);
			for (var i = 0, len = numbers.length; i < len; ++i) {
				numbers[i] /= options.factor;
			}

			return numbers;
		},

		encodeSignedIntegers: function (numbers) {
			for (var i = 0, len = numbers.length; i < len; ++i) {
				var num = numbers[i];
				numbers[i] = (num < 0) ? ~(num << 1) : (num << 1);
			}

			return this.encodeUnsignedIntegers(numbers);
		},

		decodeSignedIntegers: function (encoded) {
			var numbers = this.decodeUnsignedIntegers(encoded);

			for (var i = 0, len = numbers.length; i < len; ++i) {
				var num = numbers[i];
				numbers[i] = (num & 1) ? ~(num >> 1) : (num >> 1);
			}

			return numbers;
		},

		encodeUnsignedIntegers: function (numbers) {
			var encoded = '';
			for (var i = 0, len = numbers.length; i < len; ++i) {
				encoded += this.encodeUnsignedInteger(numbers[i]);
			}
			return encoded;
		},

		decodeUnsignedIntegers: function (encoded) {
			var numbers = [];

			var current = 0;
			var shift = 0;

			for (var i = 0, len = encoded.length; i < len; ++i) {
				var b = encoded.charCodeAt(i) - 63;

				current |= (b & 0x1f) << shift;

				if (b < 0x20) {
					numbers.push(current);
					current = 0;
					shift = 0;
				} else {
					shift += 5;
				}
			}

			return numbers;
		},

		encodeSignedInteger: function (num) {
			num = (num < 0) ? ~(num << 1) : (num << 1);
			return this.encodeUnsignedInteger(num);
		},

		// This function is very similar to Google's, but I added
		// some stuff to deal with the double slash issue.
		encodeUnsignedInteger: function (num) {
			var value, encoded = '';
			while (num >= 0x20) {
				value = (0x20 | (num & 0x1f)) + 63;
				encoded += (String.fromCharCode(value));
				num >>= 5;
			}
			value = num + 63;
			encoded += (String.fromCharCode(value));

			return encoded;
		}
	};

	// Export Node module
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = PolylineUtil;
	}

	// Inject functionality into Leaflet
	if (typeof L === 'object') {
		if (!(L.Polyline.prototype.fromEncoded)) {
			L.Polyline.fromEncoded = function (encoded, options) {
				return L.polyline(PolylineUtil.decode(encoded), options);
			};
		}
		if (!(L.Polygon.prototype.fromEncoded)) {
			L.Polygon.fromEncoded = function (encoded, options) {
				return L.polygon(PolylineUtil.decode(encoded), options);
			};
		}

		var encodeMixin = {
			encodePath: function () {
				return PolylineUtil.encode(this.getLatLngs());
			}
		};

		if (!L.Polyline.prototype.encodePath) {
			L.Polyline.include(encodeMixin);
		}
		if (!L.Polygon.prototype.encodePath) {
			L.Polygon.include(encodeMixin);
		}

		L.PolylineUtil = PolylineUtil;
	}
})();


(function($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 54)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function() {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 56
	});

	// Collapse Navbar
	var navbarCollapse = function() {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);

})(jQuery);
var map = L.map('map',{
	center: [52.31, 4.766],
	zoom: 16,
	scrollWheelZoom: false,
});
L.esri.dynamicMapLayer({
	url: 'https://services.arcgisonline.nl/arcgis/rest/services/Basiskaarten/Donkergrijze_Canvas/MapServer'
}).addTo(map);

var layerGroup = L.featureGroup().addTo(map);
$(document).ready(function(){
	$('.customer-logos').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		cssEase: 'linear',          
		speed: 2500,
		arrows: false,
		dots: false,
		pauseOnHover: true,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 520,
			settings: {
				slidesToShow: 3
			}
		}]
	});
	$('.tool-logos').slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		cssEase: 'linear',          
		speed: 2500,
		arrows: false,
		dots: false,
		pauseOnHover: true,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 520,
			settings: {
				slidesToShow: 3
			}
		}]
	});
	console.clear()
	getRoute()
	//$('[href="#wayfinding"]').first().trigger("click")
});


$("#map").bind('mousewheel DOMMouseScroll', function (event) {
	event.stopPropagation();
	if (event.ctrlKey == true) {
		event.preventDefault();
		map.scrollWheelZoom.enable();
		$('#map').removeClass('map-scroll');
		setTimeout(function(){
			map.scrollWheelZoom.disable();
		}, 1000);
	} else {
		map.scrollWheelZoom.disable();
		$('#map').addClass('map-scroll');

		setTimeout(function(){
			$('#map').removeClass('map-scroll');
			map.scrollWheelZoom.disable();
		}, 2000);
	}

});
$(window).bind('mousewheel DOMMouseScroll', function (event) {
	$('#map').removeClass('map-scroll');
})

function getRoute(){

	layerGroup.clearLayers();

	r1 = $('.route1').val()
	r2 = $('.route2').val()
	r1 = (r1.length<4) ? 'A'+r1 : r1;
	r2 = (r2.length<4) ? 'D'+r2 : r2;
	url = "/wayfinding/route/waypoints/"+r1+"%3B"+r2 // 
	callAPI(url).then((response)=>{
		rs = JSON.parse(response.response)
		decodeOSRM(rs,r1,r2)
		$('#map-msg').html('')
		zoomTo()

	}).catch((error)=>{
		msg = "Route not found :/<br>"+r1+" -> "+r2
		$('#map-msg').html( msg)
		console.error(msg,error)
	})

}


function callAPI(endpoint){
	return new Promise((resolve,reject)=>{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if(request.readyState === XMLHttpRequest.DONE) {
				if (request.status === 200) {
					resolve(request);
				} else {
					console.warn(request)
					reject(request);
				}
			}
		}
		endpoint='/wayfinding/route/waypoints/plaza%3Bdd18'
		temp = {}
		temp.response = JSON.stringify({
			"code": "Ok",
			"routes": [
				{
					"legs": [
						{
							"steps": [
								{
									"weight": 0,
									"duration": 0,
									"distance": 0,
									"name": "",
									"maneuver": {
										"location": [
											52.30962302950463,
											4.762513354888553,
											0
										],
										"type": "depart",
										"modifier": "straight"
									},
									"geometry": "cvg~Huda\\??"
								},
								{
									"weight": 0.3762761,
									"duration": 22.576566,
									"distance": 28.2207070556706,
									"name": "",
									"maneuver": {
										"location": [
											52.30962302950463,
											4.762513354888553,
											0
										],
										"type": "notification",
										"modifier": "straight"
									},
									"geometry": "cvg~Huda\\RXRV"
								},
								{
									"weight": 1.6425080700000005,
									"duration": 98.55048420000003,
									"distance": 123.1881056290116,
									"name": "",
									"maneuver": {
										"location": [
											52.30942335575734,
											4.76225822539992,
											0
										],
										"type": "turn",
										"modifier": "left"
									},
									"geometry": "{tg~Hcca\\HSBI@CBIDMDIFQPa@?[?C?I@S?E?K?I?K@U?G?Q@O?i@"
								},
								{
									"weight": 0.09302998000000026,
									"duration": 5.581798800000016,
									"distance": 6.977248228578559,
									"name": "",
									"maneuver": {
										"location": [
											52.30909733880217,
											4.7638992909073234,
											0
										],
										"type": "turn",
										"modifier": "right"
									},
									"geometry": "{rg~Hkma\\H@B?"
								},
								{
									"weight": 0.36025473000000025,
									"duration": 21.615283800000014,
									"distance": 27.019104248450134,
									"name": "",
									"maneuver": {
										"location": [
											52.30903472023364,
											4.763893442539095,
											0
										],
										"type": "turn",
										"modifier": "left"
									},
									"geometry": "mrg~Hima\\?UEOAd@"
								},
								{
									"weight": 0.0691101200000001,
									"duration": 4.146607200000005,
									"distance": 5.183258652121581,
									"name": "",
									"maneuver": {
										"location": [
											52.30906606937499,
											4.763887572187062,
											10
										],
										"type": "turn",
										"modifier": "left"
									},
									"geometry": "urg~Hima\\B?D@"
								},
								{
									"weight": 0.40289477999999973,
									"duration": 24.173686799999984,
									"distance": 30.217109045437873,
									"name": "",
									"maneuver": {
										"location": [
											52.309019590687264,
											4.76388278578505,
											10
										],
										"type": "turn",
										"modifier": "left"
									},
									"geometry": "krg~Hgma\\?M?A@U?K@g@"
								},
								{
									"weight": 0.6567747999999999,
									"duration": 39.406487999999996,
									"distance": 49.258109949298884,
									"name": "",
									"maneuver": {
										"location": [
											52.30900422772029,
											4.7643251524268,
											10
										],
										"type": "turn",
										"modifier": "right"
									},
									"geometry": "grg~Hapa\\@@B?@?B?H@F?@?B?N@R@N@"
								},
								{
									"weight": 0.5645091400000003,
									"duration": 33.87054840000002,
									"distance": 42.33818546452822,
									"name": "",
									"maneuver": {
										"location": [
											52.30856239116965,
											4.764279719242032,
											10
										],
										"type": "turn",
										"modifier": "left"
									},
									"geometry": "oog~Hwoa\\?S?u@@q@"
								},
								{
									"weight": 1.0530819399999993,
									"duration": 63.18491639999996,
									"distance": 78.98114535697442,
									"name": "",
									"maneuver": {
										"location": [
											52.30854513786847,
											4.764899127774247,
											10
										],
										"type": "turn",
										"modifier": "right"
									},
									"geometry": "mog~Hssa\\rAHP@f@B"
								},
								{
									"weight": 1.5690049299999989,
									"duration": 94.14029579999993,
									"distance": 117.67536919682411,
									"name": "",
									"maneuver": {
										"location": [
											52.307836955410004,
											4.764819871058492,
											10
										],
										"type": "turn",
										"modifier": "sharp left"
									},
									"geometry": "_kg~Hcsa\\@u@e@YaAYOc@??OYIAGA"
								},
								{
									"weight": 2.9575645700000033,
									"duration": 177.4538742000002,
									"distance": 221.81734216927376,
									"name": "",
									"maneuver": {
										"location": [
											52.30860278581291,
											4.765679858654748,
											10
										],
										"type": "turn",
										"modifier": "right"
									},
									"geometry": "wog~Hoxa\\EQAAAE?C@U?C???A?A?A?I?M@q@BcBBcB?Y?MBcBBeB?G?G?K??@I?M?A?E?C?A?A"
								},
								{
									"weight": 1.6645771899999982,
									"duration": 99.87463139999988,
									"distance": 124.8432893624554,
									"name": "",
									"maneuver": {
										"location": [
											52.30853948109387,
											4.768908901797525,
											10
										],
										"type": "turn",
										"modifier": "right"
									},
									"geometry": "kog~Hulb\\B?n@o@j@m@RSZ[JKTWJK"
								},
								{
									"weight": 1.6147280300000015,
									"duration": 96.88368180000009,
									"distance": 121.10460223581828,
									"name": "",
									"maneuver": {
										"location": [
											52.30758588551038,
											4.769860233793677,
											10
										],
										"type": "turn",
										"modifier": "left"
									},
									"geometry": "mig~Hsrb\\FsADeCBgC"
								},
								{
									"weight": 0.6548404099999989,
									"duration": 39.29042459999994,
									"distance": 49.227085540074306,
									"name": "",
									"maneuver": {
										"location": [
											52.30749805413399,
											4.771628658492994,
											10
										],
										"type": "turn",
										"modifier": "sharp right"
									},
									"geometry": "{hg~Hu}b\\B?AhAAd@FT"
								},
								{
									"weight": 0,
									"duration": 0,
									"distance": 0,
									"name": "",
									"maneuver": {
										"location": [
											52.30745538548027,
											4.770957096111511,
											10
										],
										"type": "arrive",
										"modifier": "straight"
									},
									"geometry": "shg~Hoyb\\??"
								}
							],
							"distance": 1026.0506621345178,
							"duration": 820.7492874000001,
							"summary": "",
							"weight": 0
						}
					],
					"weight": 820.7492874000001,
					"weight_name": "routability",
					"distance": 1026.0506621345178,
					"duration": 820.7492874000001
				}
			],
			"waypoints": [
				{
					"location": [
						52.30962302950463,
						4.762513354888553,
						0
					],
					"name": ""
				},
				{
					"name": "",
					"location": [
						52.30745538548027,
						4.770957096111511,
						10
					]
				}
			],
			"poi_on_route": []
		})
		return resolve(temp)
		request.open('GET', 'https://api-acc.schiphol.nl' + endpoint, true);
		request.setRequestHeader("app_id", "086cb19d");
		request.setRequestHeader("app_key", "6ce3fbceeb95484cadc5f7c660e57ecc");
		request.setRequestHeader("resourceVersion", "v3");
		request.setRequestHeader("Accept", "application/json");
		request.send();
	})
}
$( window ).resize(function() {
	zoomTo();
});

function zoomTo(){
	var allLyrs = []

	map.fitBounds(layerGroup.getBounds(),{
		paddingTopLeft:[50,200],
		paddingBottomRight:[50,50],
	})


}

function decodeOSRM(osrmbody,r1,r2){
	i=0
	previousSameFloor = osrmbody["routes"][0]["legs"][0]["steps"][0]['maneuver']['location'][2]
	var oneroute = []
	osrmbody["routes"][0]["legs"].forEach((leg)=>{
		leg["steps"].forEach((step)=>{
			var floor = step['maneuver']['location'][2]
			routes  = L.Polyline.fromEncoded(step["geometry"], {pane:'markerPane',color: "yellow"})
			routes.addTo(layerGroup)


		})
	})

	marker1 =	L.marker(osrmbody['waypoints'][0]['location'])
	marker1.bindPopup( 'Start at waypoint: <b>'+r1+'</b>', {permanent: true, className: "labels",autoClose:false})
	marker1.addTo(layerGroup)
	marker1.openPopup()
	marker2 =	L.marker(osrmbody['waypoints'][1]['location'])
	marker2.bindPopup( 'End at waypoint: <b>'+r2+'</b>', {permanent: true, className: "labels"})

	marker2.addTo(layerGroup)
	marker2.openPopup()
}



