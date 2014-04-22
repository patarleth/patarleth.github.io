"use strict";angular.module("golfinatorApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("golfinatorApp").controller("MainCtrl",["$sce","$scope","weather","geobytes","espn","thesaurus","peopleinspace",function(a,b,c,d,e,f,g){var h=function(a,b){var c=a;return b.noun&&b.noun.syn&&(c=b.noun.syn[0],console.log("thes noun syn "+c)),c},i=function(a){var c=a.split(/[\s,\.]+/);console.log("parts "+c);for(var d=[],e=c.length,g=0;g<c.length;g++){var i=0+g,j=c[i];f.words(j).then(function(a){d[i]=h(j,a),e--,console.log("total "+e),1>=e&&(b.mashup=d.join(" "),console.log("mashup "+b.mashup),console.log("resultBuf "+d))},function(){d[i]=j,e--,console.log("total(err) "+e),1>=e&&(b.mashup=d.join(" "),console.log("mashup "+b.mashup),console.log("resultBuf "+d))})}};g.names().then(function(a){b.peopleinspace=a},function(a){console.err(a)}),d.cityDetails("Bristol, CT, United States").then(function(a){b.geo=a,c.forcast(a.geobyteslongitude,a.geobyteslatitude).then(function(a){b.forcast=a,i(a.daily.summary)},function(a){console.err(a)}),e.feednow().then(function(a){b.feednow=a},function(a){console.log(a)})},function(a){console.err(a)}),b.trust=function(b){return a.trustAsResourceUrl(b)}}]),angular.module("golfinatorApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("golfinatorApp").controller("ContactCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("golfinatorApp").directive("nav",function(){return{templateUrl:"views/nav.html",transclude:!0,restrict:"E",link:function(a,b,c){c.menuId&&(a.menuId=c.menuId)}}}),angular.module("golfinatorApp").factory("weather",["$resource",function(a){var b=a("https://api.forecast.io/forecast/2f3de807d75b397cefd75771b50562d4/:long,:lat",{"long":"@long",lat:"@lat",callback:"JSON_CALLBACK"},{get:{method:"JSONP"}}),c=function(a,c){return b.get({"long":c,lat:a}).$promise};return{forcast:function(a,b){return b||(b="41.650228"),a||(a="-72.903514"),c(a,b)}}}]),angular.module("golfinatorApp").factory("geobytes",["$resource",function(a){var b=a("http://gd.geobytes.com/GetCityDetails?fqcn=:fqcn",{fqcn:"@fqcn",callback:"JSON_CALLBACK"},{get:{method:"JSONP"}}),c=function(a){return b.get({fqcn:a}).$promise};return{cityDetails:function(a){return c(a)}}}]),angular.module("golfinatorApp").factory("espn",["$resource",function(a){var b=a("http://api.espn.com/v1/now?apikey=v37fddaw8ge4knf8yqq7nnd9",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}}),c=function(){return b.get({}).$promise};return{feednow:function(){return c()}}}]),angular.module("golfinatorApp").factory("thesaurus",["$resource",function(a){var b=a("http://words.bighugelabs.com/api/2/f53932a6c17445e7577b336837569f05/:word/json",{word:"@word",callback:"JSON_CALLBACK"},{get:{method:"JSONP"}}),c=function(a){return b.get({word:a}).$promise};return{words:function(a){return c(a)}}}]),angular.module("golfinatorApp").factory("peopleinspace",["$resource",function(a){var b=a("http://api.open-notify.org/astros.json",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});return{names:function(){return b.get({}).$promise}}}]);