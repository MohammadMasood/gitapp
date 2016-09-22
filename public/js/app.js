'use strict';

// Declare app level module which depends on filters, and services


var app = angular.module('myApp',[
'ngRoute',
'myApp.controllers',
'myApp.filters',
'myApp.services',
'myApp.directives'
]);

 app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
															 
	$routeProvider.	
	when('/home', {
      templateUrl: 'pages/home',
      controller: 'HomeCtrl',
	  activetab: 'home',
    }).
    when('/about-us', {
      templateUrl: 'pages/about-us',
      controller: 'AboutCtrl'
    }).
	when('/registration', {
      templateUrl: 'pages/registration',
      controller: 'RegCtrl'
    }).
	when('/edit_user/:id', {
      templateUrl: 'pages/edit_user/:id',
      controller: 'EditUsrCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
	
   $locationProvider.html5Mode(true);
   
 }]);
